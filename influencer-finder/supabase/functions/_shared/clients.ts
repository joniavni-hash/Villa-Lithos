// Shared clients for edge functions: Supabase (service role), Tavily, LLM.
// Keys are read from backend secrets only; nothing here is shipped to the browser.
import { createClient, type SupabaseClient } from 'https://esm.sh/@supabase/supabase-js@2.45.4';

export function adminClient(): SupabaseClient {
  const url = Deno.env.get('SUPABASE_URL')!;
  const key = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
  return createClient(url, key, { auth: { persistSession: false } });
}

export function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json', ...CORS } });
}

export const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
};

/** Verify the caller is an authenticated app user (single-owner tool). */
export async function requireUser(req: Request): Promise<{ userId: string } | Response> {
  const auth = req.headers.get('Authorization') ?? '';
  const token = auth.replace(/^Bearer\s+/i, '');
  if (!token) return json({ error: 'unauthenticated' }, 401);
  const anon = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_ANON_KEY')!, { global: { headers: { Authorization: `Bearer ${token}` } } });
  const { data, error } = await anon.auth.getUser();
  if (error || !data.user) return json({ error: 'unauthenticated' }, 401);
  return { userId: data.user.id };
}

// ---------------------------------------------------------------- Tavily
export interface TavilyResult { url: string; title?: string; content?: string; score?: number; raw_content?: string | null }

export class TavilyDisabled extends Error {}

export async function tavilySearch(query: string, opts: { includeDomains?: string[]; maxResults?: number; depth?: 'basic' | 'advanced' }): Promise<{ results: TavilyResult[]; credits: number }> {
  const key = Deno.env.get('TAVILY_API_KEY');
  if (!key) throw new TavilyDisabled('TAVILY_API_KEY not set');
  const body = { query, include_domains: opts.includeDomains ?? [], max_results: opts.maxResults ?? 8, search_depth: opts.depth ?? 'basic', topic: 'general' };
  const res = await withRetry(() => fetch('https://api.tavily.com/search', { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${key}` }, body: JSON.stringify(body) }));
  if (!res.ok) throw new Error(`tavily search ${res.status}: ${await res.text()}`);
  const data = await res.json();
  return { results: data.results ?? [], credits: opts.depth === 'advanced' ? 2 : 1 };
}

export async function tavilyExtract(urls: string[], query?: string): Promise<{ results: Array<{ url: string; raw_content: string }>; failed: string[]; credits: number }> {
  const key = Deno.env.get('TAVILY_API_KEY');
  if (!key) throw new TavilyDisabled('TAVILY_API_KEY not set');
  const res = await withRetry(() => fetch('https://api.tavily.com/extract', { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${key}` }, body: JSON.stringify({ urls, format: 'text', query }) }));
  if (!res.ok) throw new Error(`tavily extract ${res.status}: ${await res.text()}`);
  const data = await res.json();
  return { results: data.results ?? [], failed: (data.failed_results ?? []).map((f: { url: string }) => f.url), credits: Math.ceil(urls.length / 5) };
}

/** Retry on 429/5xx with exponential backoff; respects Retry-After. */
export async function withRetry(fn: () => Promise<Response>, attempts = 4): Promise<Response> {
  let last: Response | null = null;
  for (let i = 0; i < attempts; i++) {
    const res = await fn();
    if (res.status !== 429 && res.status < 500) return res;
    last = res;
    const ra = Number(res.headers.get('retry-after'));
    const wait = Number.isFinite(ra) && ra > 0 ? ra * 1000 : Math.min(20000, 1500 * 2 ** i);
    await new Promise((r) => setTimeout(r, wait));
  }
  return last!;
}

// ---------------------------------------------------------------- LLM (Claude)
export interface LlmMessage { role: 'user' | 'assistant'; content: string | Array<Record<string, unknown>> }

export interface LlmCall {
  system: string;
  messages: LlmMessage[];
  /** Logical tier; mapped to a concrete model per provider. */
  tier: 'screening' | 'deep';
  maxTokens?: number;
  /** JSON schema for structured output. */
  schema?: Record<string, unknown>;
}

export interface LlmResult { text: string; model: string; inputTokens: number; outputTokens: number; costUsd: number; provider: 'anthropic_api' | 'lovable_gateway' }

const ANTHROPIC_MODELS = { screening: 'claude-haiku-4-5', deep: 'claude-sonnet-5' };
const GATEWAY_MODELS = { screening: 'anthropic/claude-haiku-4-5', deep: 'anthropic/claude-sonnet-5' };
// Approximate list prices per 1M tokens for the cost tracker (owner can adjust in settings).
const PRICE = { screening: { in: 1, out: 5 }, deep: { in: 3, out: 15 } };

/**
 * Calls Claude through the Anthropic API when ANTHROPIC_API_KEY is set, otherwise
 * through the Lovable AI gateway (LOVABLE_API_KEY, injected by Lovable Cloud),
 * which serves the same Claude models without a BYO key.
 */
export async function callClaude(call: LlmCall): Promise<LlmResult> {
  const anthropicKey = Deno.env.get('ANTHROPIC_API_KEY');
  const maxTokens = call.maxTokens ?? 4000;
  const jsonInstruction = call.schema ? `\n\nRespond with a single JSON object that validates against this JSON schema, and nothing else:\n${JSON.stringify(call.schema)}` : '';
  if (anthropicKey) {
    const model = ANTHROPIC_MODELS[call.tier];
    const res = await withRetry(() => fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-api-key': anthropicKey, 'anthropic-version': '2023-06-01' },
      body: JSON.stringify({ model, max_tokens: maxTokens, system: call.system + jsonInstruction, messages: call.messages }),
    }));
    if (!res.ok) throw new Error(`anthropic ${res.status}: ${await res.text()}`);
    const data = await res.json();
    const text = (data.content ?? []).filter((b: { type: string }) => b.type === 'text').map((b: { text: string }) => b.text).join('');
    const inTok = data.usage?.input_tokens ?? 0, outTok = data.usage?.output_tokens ?? 0;
    return { text, model, inputTokens: inTok, outputTokens: outTok, costUsd: (inTok * PRICE[call.tier].in + outTok * PRICE[call.tier].out) / 1e6, provider: 'anthropic_api' };
  }
  const gatewayKey = Deno.env.get('LOVABLE_API_KEY');
  if (!gatewayKey) throw new Error('No LLM credentials: set ANTHROPIC_API_KEY or enable Lovable AI (LOVABLE_API_KEY)');
  const model = GATEWAY_MODELS[call.tier];
  const res = await withRetry(() => fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${gatewayKey}` },
    body: JSON.stringify({ model, max_tokens: maxTokens, messages: [{ role: 'system', content: call.system + jsonInstruction }, ...call.messages.map(toOpenAiMessage)] }),
  }));
  if (!res.ok) throw new Error(`lovable gateway ${res.status}: ${await res.text()}`);
  const data = await res.json();
  const text = data.choices?.[0]?.message?.content ?? '';
  const inTok = data.usage?.prompt_tokens ?? 0, outTok = data.usage?.completion_tokens ?? 0;
  return { text, model, inputTokens: inTok, outputTokens: outTok, costUsd: (inTok * PRICE[call.tier].in + outTok * PRICE[call.tier].out) / 1e6, provider: 'lovable_gateway' };
}

function toOpenAiMessage(m: LlmMessage) {
  if (typeof m.content === 'string') return { role: m.role, content: m.content };
  // Convert Anthropic-style image/document blocks to OpenAI-style parts.
  const parts = m.content.map((b) => {
    if (b.type === 'text') return { type: 'text', text: b.text };
    if (b.type === 'image') { const s = b.source as { media_type: string; data: string }; return { type: 'image_url', image_url: { url: `data:${s.media_type};base64,${s.data}` } }; }
    if (b.type === 'document') { const s = b.source as { media_type: string; data: string }; return { type: 'file', file: { filename: 'document.pdf', file_data: `data:${s.media_type};base64,${s.data}` } }; }
    return { type: 'text', text: JSON.stringify(b) };
  });
  return { role: m.role, content: parts };
}

/** Extract the first JSON object from model text (tolerates code fences). */
export function parseJson<T = unknown>(text: string): T {
  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/);
  const body = fenced ? fenced[1] : text;
  const start = body.indexOf('{');
  const end = body.lastIndexOf('}');
  if (start < 0 || end < 0) throw new Error('model returned no JSON');
  return JSON.parse(body.slice(start, end + 1)) as T;
}

export async function logRun(sb: SupabaseClient, runId: string, level: 'debug' | 'info' | 'warn' | 'error' | 'cost', message: string, meta?: unknown) {
  await sb.from('run_logs').insert({ run_id: runId, level, message, meta: meta ?? null });
}

export async function recordUsage(sb: SupabaseClient, u: { runId?: string | null; candidateId?: string | null; provider: string; operation: string; units?: number; costUsd: number; meta?: unknown }) {
  await sb.from('api_usage').insert({ run_id: u.runId ?? null, candidate_id: u.candidateId ?? null, provider: u.provider, operation: u.operation, units: u.units ?? 1, cost_usd: u.costUsd, meta: u.meta ?? null });
}
