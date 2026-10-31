-- Villa Lithos Influencer Finder — database schema (Supabase / Lovable Cloud)
-- Single-owner tool: every table has RLS enabled with policies for authenticated users.
-- Private insights documents live in a private storage bucket and are never public.

create extension if not exists pgcrypto;

-- Enums -------------------------------------------------------------------
do $$ begin
  create type provenance as enum ('verified_public_fact','evidence_supported_inference','influencer_reported','document_backed','independently_verified','ai_estimate','unknown');
exception when duplicate_object then null; end $$;

do $$ begin
  create type pipeline_stage as enum ('discovered','publicly_qualified','verification_queue','insights_requested','insights_received','ai_analysis_complete','commercially_verified','contacted','replied','negotiating','booked','rejected','not_relevant');
exception when duplicate_object then null; end $$;

do $$ begin
  create type verification_status as enum ('public_only','insights_requested','insights_received','privately_assessed');
exception when duplicate_object then null; end $$;

do $$ begin
  create type run_status as enum ('queued','running','paused','completed','failed','cancelled');
exception when duplicate_object then null; end $$;

do $$ begin
  create type source_status as enum ('enabled','disabled','needs_approval','needs_credentials');
exception when duplicate_object then null; end $$;

-- Settings (singleton row id = 1) -------------------------------------------
create table if not exists villa_settings (
  id int primary key default 1 check (id = 1),
  villa jsonb not null,                       -- VillaProfile
  season jsonb not null,                      -- {label,start,end}
  weights jsonb not null,                     -- Weights (sum 100)
  floor_price_per_night_eur numeric not null default 1500,
  floor_price_verified boolean not null default false,
  venue_budget_share numeric not null default 0.35,
  referral_commission_rate numeric not null default 0.10,
  collaboration_cost_eur jsonb not null,      -- per track
  nightly_revenue_eur numeric,                -- for net value, owner-set
  run_spend_cap_usd numeric not null default 15,
  unit_costs_usd jsonb not null,
  instagram_handle text,
  llm_provider text not null default 'lovable_gateway' check (llm_provider in ('lovable_gateway','anthropic_api')),
  updated_at timestamptz not null default now()
);

-- Data sources ----------------------------------------------------------------
create table if not exists sources (
  id text primary key,                        -- tavily | instagram_graph | apify | manual | influencer_upload
  label text not null,
  status source_status not null,
  note text not null,
  updated_at timestamptz not null default now()
);

insert into sources (id,label,status,note) values
 ('tavily','Tavily web discovery (Instagram-focused)','needs_credentials','Add TAVILY_API_KEY as a backend secret to enable discovery. Without it no new candidates can be found.'),
 ('instagram_graph','Instagram Graph API (Business Discovery, Hashtag Search)','needs_credentials','Requires the Villa Lithos Instagram Business account linked to a Facebook Page, a Meta app and a long-lived token with instagram_basic + pages_read_engagement (or instagram_business_basic). Adds authorised follower counts, media counts and up to recent media for Business/Creator accounts by username; does not expose personal accounts or third-party audience insights.'),
 ('apify','Apify Instagram scrapers','needs_approval','Disabled by policy until the owner approves: cost per run, reliability risk and platform-terms exposure must be reviewed first.'),
 ('manual','Manual entry','enabled','Candidates and notes entered by the owner.'),
 ('influencer_upload','Private insights uploads','enabled','Documents shared voluntarily by influencers (Stage 2).')
on conflict (id) do nothing;

-- Research runs ------------------------------------------------------------------
create table if not exists research_runs (
  id uuid primary key default gen_random_uuid(),
  label text,
  params jsonb not null,                      -- RunParameters + depth/budget
  status run_status not null default 'queued',
  queries_total int not null default 0,
  queries_done int not null default 0,
  candidates_new int not null default 0,
  candidates_updated int not null default 0,
  cost_usd numeric not null default 0,
  spend_cap_usd numeric not null default 15,
  error text,
  created_at timestamptz not null default now(),
  started_at timestamptz,
  finished_at timestamptz
);

create table if not exists run_queries (
  run_id uuid not null references research_runs(id) on delete cascade,
  query_id text not null,
  spec jsonb not null,                        -- QuerySpec
  status text not null default 'pending' check (status in ('pending','done','failed','skipped')),
  results_count int,
  cost_usd numeric not null default 0,
  error text,
  done_at timestamptz,
  primary key (run_id, query_id)
);

create table if not exists run_logs (
  id bigserial primary key,
  run_id uuid not null references research_runs(id) on delete cascade,
  ts timestamptz not null default now(),
  level text not null default 'info' check (level in ('debug','info','warn','error','cost')),
  message text not null,
  meta jsonb
);
create index if not exists run_logs_run_ts on run_logs(run_id, ts);

create table if not exists api_usage (
  id bigserial primary key,
  run_id uuid references research_runs(id) on delete set null,
  candidate_id uuid,
  provider text not null,                     -- tavily | claude | instagram_graph
  operation text not null,                    -- search | extract | classify | deep | insights
  units numeric not null default 1,
  cost_usd numeric not null default 0,
  meta jsonb,
  created_at timestamptz not null default now()
);

-- Candidates ---------------------------------------------------------------------
create table if not exists candidates (
  id uuid primary key default gen_random_uuid(),
  handle text not null unique,                -- lowercase instagram handle, identity key (dedupe)
  profile_url text not null,
  display_name text,
  profile_picture_url text,
  country text,
  languages text[] default '{}',
  niche text,
  followers int,
  followers_provenance provenance default 'unknown',
  bio text,
  links text[] default '{}',
  website text,
  engagement jsonb,
  recent_posts jsonb default '[]',
  account_type text default 'person_or_brand' check (account_type in ('person_or_brand','venue','agency','unknown')),
  markets text[] default '{}',
  candidate_group text check (candidate_group in ('A_retreat_organizer','B_reaches_organizers','C_high_value_host','none')),
  classification jsonb,
  public_score jsonb,
  verified_score jsonb,
  fit_score numeric,                          -- current (verified if present else public)
  confidence numeric,
  tier text check (tier in ('A','B','C','D','excluded')),
  ebn jsonb,                                  -- EbnResult
  budget jsonb,                               -- BudgetEstimate
  recommended_track text,
  verification_status verification_status not null default 'public_only',
  pipeline_stage pipeline_stage not null default 'discovered',
  not_relevant_reason text,
  manual_override jsonb,                      -- {fitScore?, tier?, note, at}
  notes text,
  follow_up_at timestamptz,
  first_run_id uuid references research_runs(id) on delete set null,
  last_run_id uuid references research_runs(id) on delete set null,
  discovery_queries text[] default '{}',
  discovered_at timestamptz not null default now(),
  last_seen_at timestamptz not null default now(),
  classified_at timestamptz,
  updated_at timestamptz not null default now()
);
create index if not exists candidates_tier_fit on candidates(tier, fit_score desc);
create index if not exists candidates_stage on candidates(pipeline_stage);

create table if not exists evidence (
  id uuid primary key default gen_random_uuid(),
  candidate_id uuid not null references candidates(id) on delete cascade,
  url text not null,
  title text,
  excerpt text,
  kind text not null default 'other',
  source text not null default 'tavily',
  observed_at timestamptz not null default now(),
  score numeric,
  query_id text,
  run_id uuid references research_runs(id) on delete set null,
  raw jsonb,
  unique (candidate_id, url)
);

create table if not exists events (
  id uuid primary key default gen_random_uuid(),
  candidate_id uuid not null references candidates(id) on delete cascade,
  title text not null,
  event_type text,
  start_date text,                             -- ISO or partial (YYYY-MM)
  end_date text,
  nights int,
  location text,
  country text,
  group_size int,
  price_per_person numeric,
  currency text,
  sold_out boolean,
  role text not null default 'unknown' check (role in ('organizer','co_host','promoter','unknown')),
  is_winter boolean not null default false,
  provenance provenance not null default 'unknown',
  evidence_urls text[] default '{}',
  created_at timestamptz not null default now(),
  -- nulls not distinct (Postgres 15+): an undated event must not be duplicated on re-classification,
  -- otherwise events-per-year and Expected Booked Nights are inflated.
  unique nulls not distinct (candidate_id, title, start_date)
);

create table if not exists score_history (
  id bigserial primary key,
  candidate_id uuid not null references candidates(id) on delete cascade,
  run_id uuid references research_runs(id) on delete set null,
  kind text not null check (kind in ('public','verified','manual')),
  score jsonb not null,
  weights jsonb,
  created_at timestamptz not null default now()
);

create table if not exists candidate_runs (
  candidate_id uuid not null references candidates(id) on delete cascade,
  run_id uuid not null references research_runs(id) on delete cascade,
  outcome text not null check (outcome in ('new','updated','unchanged')),
  primary key (candidate_id, run_id)
);

create table if not exists pipeline_history (
  id bigserial primary key,
  candidate_id uuid not null references candidates(id) on delete cascade,
  from_stage pipeline_stage,
  to_stage pipeline_stage not null,
  note text,
  created_at timestamptz not null default now()
);

-- Private insights (Stage 2) -------------------------------------------------------
create table if not exists insights_documents (
  id uuid primary key default gen_random_uuid(),
  candidate_id uuid not null references candidates(id) on delete cascade,
  storage_path text not null,                 -- bucket 'insights' (private)
  file_name text not null,
  mime_type text not null,
  kind text not null default 'screenshot' check (kind in ('screenshot','pdf','insights_export','media_kit','campaign_report','sales_report','other')),
  is_test boolean not null default false,     -- test fixtures are never shown as real influencer data
  status text not null default 'uploaded' check (status in ('uploaded','extracting','extracted','failed')),
  extraction jsonb,                           -- model output for this document
  reporting_period_start text,
  reporting_period_end text,
  error text,
  uploaded_at timestamptz not null default now(),
  extracted_at timestamptz
);

create table if not exists private_insights (
  candidate_id uuid primary key references candidates(id) on delete cascade,
  data jsonb not null,                        -- PrivateInsights
  derived jsonb,                              -- DerivedMetrics
  rescore jsonb,                              -- RescoreResult minus scores
  model text,
  document_ids uuid[] default '{}',
  analysed_at timestamptz not null default now()
);

-- Outreach & feedback -------------------------------------------------------------
create table if not exists outreach_drafts (
  id uuid primary key default gen_random_uuid(),
  candidate_id uuid not null references candidates(id) on delete cascade,
  kind text not null default 'outreach' check (kind in ('outreach','insights_request')),
  track text,
  language text not null check (language in ('en','he')),
  subject text,
  body text not null,
  personalisation_facts jsonb default '[]',
  why_this_track text,
  status text not null default 'draft' check (status in ('draft','sent_manually','archived')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists feedback (
  id bigserial primary key,
  candidate_id uuid not null references candidates(id) on delete cascade,
  kind text not null check (kind in ('quality','not_relevant','replied','booked','rejected','note')),
  reason text,
  booked_nights int,
  booked_value_eur numeric,
  created_at timestamptz not null default now()
);

-- Learning: aggregated calibration, only reported once enough outcomes exist ------
create table if not exists learning_snapshots (
  id bigserial primary key,
  outcomes_count int not null,
  booked_count int not null,
  feature_stats jsonb not null,               -- per-criterion mean for booked vs not
  weight_suggestion jsonb,                    -- null until outcomes_count >= 10
  note text,
  created_at timestamptz not null default now()
);

-- updated_at trigger ------------------------------------------------------------------
create or replace function set_updated_at() returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end $$;
drop trigger if exists candidates_updated_at on candidates;
create trigger candidates_updated_at before update on candidates for each row execute function set_updated_at();
drop trigger if exists outreach_updated_at on outreach_drafts;
create trigger outreach_updated_at before update on outreach_drafts for each row execute function set_updated_at();

-- Pipeline stage history trigger -----------------------------------------------------
create or replace function log_pipeline_change() returns trigger language plpgsql as $$
begin
  if (tg_op = 'UPDATE' and new.pipeline_stage is distinct from old.pipeline_stage) then
    insert into pipeline_history(candidate_id, from_stage, to_stage) values (new.id, old.pipeline_stage, new.pipeline_stage);
  end if;
  return new;
end $$;
drop trigger if exists candidates_pipeline_history on candidates;
create trigger candidates_pipeline_history after update on candidates for each row execute function log_pipeline_change();

-- RLS ------------------------------------------------------------------------------------
do $$ declare t text; begin
  foreach t in array array['villa_settings','sources','research_runs','run_queries','run_logs','api_usage','candidates','evidence','events','score_history','candidate_runs','pipeline_history','insights_documents','private_insights','outreach_drafts','feedback','learning_snapshots'] loop
    execute format('alter table %I enable row level security', t);
    execute format('drop policy if exists "owner_all_%s" on %I', t, t);
    execute format('create policy "owner_all_%s" on %I for all to authenticated using (true) with check (true)', t, t);
  end loop;
end $$;

-- Private storage bucket for insights documents -------------------------------------
insert into storage.buckets (id, name, public) values ('insights', 'insights', false) on conflict (id) do nothing;
drop policy if exists "insights_owner_rw" on storage.objects;
create policy "insights_owner_rw" on storage.objects for all to authenticated using (bucket_id = 'insights') with check (bucket_id = 'insights');

-- Dashboard view --------------------------------------------------------------------------
-- security_invoker: the view runs with the caller's rights, so RLS applies (anon sees nothing).
create or replace view dashboard_summary with (security_invoker = true) as
select
  (select count(*) from candidates) as candidates_total,
  (select count(*) from candidates where tier = 'A') as tier_a,
  (select count(*) from candidates where tier = 'B') as tier_b,
  (select count(*) from candidates where verification_status in ('insights_received','privately_assessed')) as insights_received,
  (select count(*) from candidates where pipeline_stage in ('contacted','replied','negotiating')) as in_conversation,
  (select count(*) from candidates where pipeline_stage = 'booked') as booked,
  (select coalesce(sum((ebn->'expectedBookedNights'->>'base')::numeric),0) from candidates where tier in ('A','B')) as expected_nights_base,
  (select coalesce(sum(cost_usd),0) from research_runs) as research_cost_usd,
  (select max(finished_at) from research_runs where status = 'completed') as last_run_at;

-- Discovery working tables ---------------------------------------------------------------
create table if not exists unresolved_posts (
  url text primary key,
  run_id uuid references research_runs(id) on delete cascade,
  title text,
  excerpt text,
  score numeric,
  query_id text,
  candidate_id uuid references candidates(id) on delete set null,
  resolution text,
  resolved_at timestamptz,
  created_at timestamptz not null default now()
);
create table if not exists listing_leads (
  url text primary key,
  run_id uuid references research_runs(id) on delete cascade,
  title text,
  excerpt text,
  query_id text,
  lane text,
  organizer_name text,
  instagram_handle text,
  created_at timestamptz not null default now()
);
alter table unresolved_posts enable row level security;
alter table listing_leads enable row level security;
drop policy if exists "owner_all_unresolved_posts" on unresolved_posts;
create policy "owner_all_unresolved_posts" on unresolved_posts for all to authenticated using (true) with check (true);
drop policy if exists "owner_all_listing_leads" on listing_leads;
create policy "owner_all_listing_leads" on listing_leads for all to authenticated using (true) with check (true);

create or replace function increment_queries_done(p_run_id uuid) returns void language sql as $$
  update research_runs set queries_done = queries_done + 1 where id = p_run_id;
$$;
