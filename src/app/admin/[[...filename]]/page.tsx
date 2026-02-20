"use client";

import { useState, useEffect, useCallback, useRef } from "react";

/* ═══════════════════════════════════════════════════════
   Types
   ═══════════════════════════════════════════════════════ */

type AnyContent = Record<string, unknown>;
type Tab = "dashboard" | "global" | "page" | "images";

type Toast = {
  id: number;
  text: string;
  type: "success" | "error" | "info";
};

/* ═══════════════════════════════════════════════════════
   Icons (inline SVG components)
   ═══════════════════════════════════════════════════════ */

const Icons = {
  dashboard: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
  ),
  settings: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
  ),
  home: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
  ),
  images: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
  ),
  save: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
  ),
  logout: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
  ),
  external: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
  ),
  chevronDown: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
  ),
  plus: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
  ),
  trash: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
  ),
  upload: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
  ),
  search: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
  ),
  info: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
  ),
  check: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
  ),
  error: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
  ),
  menu: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
  ),
  close: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
  ),
  globe: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>
  ),
  photo: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
  ),
  arrowUp: (
    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" /></svg>
  ),
  arrowDown: (
    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
  ),
  copy: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
  ),
  warning: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4.5c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" /></svg>
  ),
};

/* ═══════════════════════════════════════════════════════
   Toast Notification System
   ═══════════════════════════════════════════════════════ */

let toastId = 0;

function ToastContainer({ toasts, onDismiss }: { toasts: Toast[]; onDismiss: (id: number) => void }) {
  return (
    <div className="fixed top-4 right-4 z-[100] flex flex-col gap-3 pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`pointer-events-auto flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-lg border backdrop-blur-sm transition-all animate-in slide-in-from-right duration-300 ${
            toast.type === "success"
              ? "bg-emerald-50/95 border-emerald-200 text-emerald-800"
              : toast.type === "error"
              ? "bg-red-50/95 border-red-200 text-red-800"
              : "bg-blue-50/95 border-blue-200 text-blue-800"
          }`}
        >
          <span className="flex-shrink-0">
            {toast.type === "success" ? Icons.check : toast.type === "error" ? Icons.error : Icons.info}
          </span>
          <span className="text-sm font-medium">{toast.text}</span>
          <button
            onClick={() => onDismiss(toast.id)}
            className="ml-2 flex-shrink-0 opacity-60 hover:opacity-100 transition-opacity"
          >
            {Icons.close}
          </button>
        </div>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   Reusable Field Components
   ═══════════════════════════════════════════════════════ */

function Field({
  label,
  help,
  children,
}: {
  label?: string;
  help?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-5">
      {label && (
        <label className="flex items-center gap-2 text-[13px] font-semibold text-stone-600 mb-2 tracking-wide">
          {label}
        </label>
      )}
      {children}
      {help && (
        <p className="mt-1.5 text-xs text-stone-400 leading-relaxed">{help}</p>
      )}
    </div>
  );
}

const inputClasses =
  "w-full px-4 py-2.5 bg-white border border-stone-200 rounded-xl text-stone-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#c83d49]/30 focus:border-[#c83d49]/50 transition-all placeholder:text-stone-300";

const textareaClasses =
  "w-full px-4 py-3 bg-white border border-stone-200 rounded-xl text-stone-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#c83d49]/30 focus:border-[#c83d49]/50 transition-all min-h-[100px] resize-y placeholder:text-stone-300";

function TextField({
  label,
  value,
  onChange,
  help,
  maxLength,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  help?: string;
  maxLength?: number;
  placeholder?: string;
}) {
  const len = (value || "").length;
  return (
    <Field label={label} help={help}>
      <div className="relative">
        <input
          type="text"
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          className={inputClasses}
          placeholder={placeholder || `Enter ${label.toLowerCase()}...`}
          maxLength={maxLength}
        />
        {maxLength && (
          <span className={`absolute right-3 top-1/2 -translate-y-1/2 text-[11px] font-medium ${len > maxLength * 0.9 ? "text-red-400" : "text-stone-300"}`}>
            {len}/{maxLength}
          </span>
        )}
      </div>
    </Field>
  );
}

function TextAreaField({
  label,
  value,
  onChange,
  help,
  maxLength,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  help?: string;
  maxLength?: number;
}) {
  const len = (value || "").length;
  return (
    <Field label={label} help={help}>
      <div className="relative">
        <textarea
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          className={textareaClasses}
          placeholder={`Enter ${label.toLowerCase()}...`}
          maxLength={maxLength}
        />
        {maxLength && (
          <span className={`absolute right-3 bottom-3 text-[11px] font-medium ${len > maxLength * 0.9 ? "text-red-400" : "text-stone-300"}`}>
            {len}/{maxLength}
          </span>
        )}
      </div>
    </Field>
  );
}

function ImagePickerField({
  label,
  value,
  onChange,
  folder = "img/gallery",
  help,
}: {
  label?: string;
  value: string;
  onChange: (v: string) => void;
  folder?: string;
  help?: string;
}) {
  const [images, setImages] = useState<{ name: string; path: string }[]>([]);

  useEffect(() => {
    let mounted = true;
    const loadImages = async () => {
      try {
        const res = await fetch(`/api/admin/images?path=${encodeURIComponent(folder)}`);
        if (res.ok) {
          const items = await res.json();
          if (mounted) {
            setImages(
              items.filter(
                (i: any) =>
                  i.type === "file" &&
                  [".jpg", ".jpeg", ".png", ".webp", ".svg", ".gif"].some((ext) =>
                    i.name.toLowerCase().endsWith(ext)
                  )
              )
            );
          }
        }
      } catch {}
    };
    loadImages();
    return () => { mounted = false; };
  }, [folder]);

  const valPath = value?.startsWith("/") ? value.substring(1) : value;
  const isCustom = value && !images.some((i) => i.path === valPath);

  return (
    <Field label={label} help={help}>
      <div className="flex flex-col gap-2">
        <div className="relative">
          <select
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
            className={`${inputClasses} appearance-none pr-10 cursor-pointer`}
          >
            <option value="">-- Select an image --</option>
            {images.map((img) => (
              <option key={img.path} value={`/${img.path}`}>
                {img.name}
              </option>
            ))}
            {isCustom && <option value={value}>{value} (custom)</option>}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-stone-400">
            {Icons.chevronDown}
          </div>
        </div>
        {isCustom && (
          <input
            type="text"
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
            className={inputClasses}
            placeholder="Or type custom image path..."
          />
        )}
        {/* Image Preview */}
        {value && (
          <div className="mt-1 relative w-full max-w-[200px] aspect-[4/3] rounded-xl overflow-hidden border border-stone-200 bg-stone-50">
            <img
              src={value.startsWith("/") ? value : `/${value}`}
              alt="Preview"
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
          </div>
        )}
      </div>
    </Field>
  );
}

function StringListField({
  label,
  items,
  onChange,
  textarea,
  help,
}: {
  label: string;
  items: string[];
  onChange: (items: string[]) => void;
  textarea?: boolean;
  help?: string;
}) {
  const InputEl = textarea ? "textarea" : "input";
  const styleClass = textarea ? textareaClasses : inputClasses;

  const moveItem = (from: number, to: number) => {
    if (to < 0 || to >= items.length) return;
    const next = [...items];
    const [item] = next.splice(from, 1);
    next.splice(to, 0, item);
    onChange(next);
  };

  return (
    <Field label={label} help={help}>
      <div className="space-y-3">
        {(items || []).map((item, i) => (
          <div key={i} className="flex gap-2 items-start group">
            {/* Reorder buttons */}
            <div className="flex flex-col gap-0.5 pt-2.5 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                type="button"
                onClick={() => moveItem(i, i - 1)}
                disabled={i === 0}
                className="p-0.5 text-stone-300 hover:text-stone-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                title="Move up"
              >
                {Icons.arrowUp}
              </button>
              <button
                type="button"
                onClick={() => moveItem(i, i + 1)}
                disabled={i === items.length - 1}
                className="p-0.5 text-stone-300 hover:text-stone-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                title="Move down"
              >
                {Icons.arrowDown}
              </button>
            </div>
            <div className="flex-1">
              <InputEl
                value={item}
                onChange={(e: any) => {
                  const next = [...items];
                  next[i] = e.target.value;
                  onChange(next);
                }}
                className={styleClass}
                placeholder={`Item ${i + 1}...`}
              />
            </div>
            <button
              type="button"
              onClick={() => onChange(items.filter((_, j) => j !== i))}
              className="mt-2 p-2 text-stone-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors flex-shrink-0"
              title="Remove"
            >
              {Icons.trash}
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => onChange([...(items || []), ""])}
          className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-[#c83d49] bg-[#c83d49]/5 hover:bg-[#c83d49]/10 rounded-xl transition-colors"
        >
          {Icons.plus}
          Add Item
        </button>
      </div>
    </Field>
  );
}

function ObjectListField({
  label,
  items,
  fields,
  onChange,
  help,
}: {
  label: string;
  items: Record<string, string>[];
  fields: {
    key: string;
    label: string;
    type?: "text" | "image";
    folder?: string;
    placeholder?: string;
  }[];
  onChange: (items: Record<string, string>[]) => void;
  help?: string;
}) {
  const empty = Object.fromEntries(fields.map((f) => [f.key, ""]));

  const moveItem = (from: number, to: number) => {
    if (to < 0 || to >= items.length) return;
    const next = [...items];
    const [item] = next.splice(from, 1);
    next.splice(to, 0, item);
    onChange(next);
  };

  return (
    <Field label={label} help={help}>
      <div className="space-y-4">
        {(items || []).map((item, i) => (
          <div
            key={i}
            className="relative bg-stone-50/50 border border-stone-200 rounded-2xl overflow-hidden transition-all hover:border-stone-300"
          >
            {/* Item header */}
            <div className="flex justify-between items-center px-5 py-3 bg-stone-100/50 border-b border-stone-200/60">
              <div className="flex items-center gap-3">
                {/* Reorder */}
                <div className="flex gap-1">
                  <button
                    type="button"
                    onClick={() => moveItem(i, i - 1)}
                    disabled={i === 0}
                    className="p-1 text-stone-300 hover:text-stone-600 disabled:opacity-30 disabled:cursor-not-allowed rounded transition-colors"
                    title="Move up"
                  >
                    {Icons.arrowUp}
                  </button>
                  <button
                    type="button"
                    onClick={() => moveItem(i, i + 1)}
                    disabled={i === items.length - 1}
                    className="p-1 text-stone-300 hover:text-stone-600 disabled:opacity-30 disabled:cursor-not-allowed rounded transition-colors"
                    title="Move down"
                  >
                    {Icons.arrowDown}
                  </button>
                </div>
                <span className="text-xs font-bold text-stone-400 uppercase tracking-widest">
                  #{i + 1}
                </span>
                {/* Show first text field value as title preview */}
                {item[fields[0]?.key] && (
                  <span className="text-sm text-stone-600 font-medium truncate max-w-[200px]">
                    {item[fields[0].key]}
                  </span>
                )}
              </div>
              <button
                type="button"
                onClick={() => onChange(items.filter((_, j) => j !== i))}
                className="text-xs font-medium text-red-400 hover:text-red-600 hover:bg-red-50 px-3 py-1.5 rounded-lg transition-colors"
              >
                Remove
              </button>
            </div>

            <div className="p-5 space-y-4">
              {fields.map((f) => (
                <div key={f.key}>
                  <label className="block text-xs font-medium text-stone-500 mb-1.5">
                    {f.label}
                  </label>
                  {f.type === "image" ? (
                    <ImagePickerField
                      value={item[f.key] || ""}
                      onChange={(v) => {
                        const next = [...items];
                        next[i] = { ...next[i], [f.key]: v };
                        onChange(next);
                      }}
                      folder={f.folder}
                    />
                  ) : (
                    <input
                      type="text"
                      value={item[f.key] || ""}
                      onChange={(e) => {
                        const next = [...items];
                        next[i] = { ...next[i], [f.key]: e.target.value };
                        onChange(next);
                      }}
                      className={inputClasses}
                      placeholder={f.placeholder || `Enter ${f.label}...`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={() => onChange([...(items || []), empty])}
          className="inline-flex w-full items-center justify-center px-4 py-3.5 text-sm font-medium text-stone-500 bg-white border-2 border-dashed border-stone-200 rounded-2xl hover:border-[#c83d49]/40 hover:text-[#c83d49] hover:bg-[#c83d49]/5 transition-all"
        >
          {Icons.plus}
          <span className="ml-2">Add New Item</span>
        </button>
      </div>
    </Field>
  );
}

/* ═══════════════════════════════════════════════════════
   Section wrapper (collapsible)
   ═══════════════════════════════════════════════════════ */

function Section({
  title,
  description,
  icon,
  children,
  defaultOpen = true,
}: {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="mb-6 bg-white border border-stone-200/80 rounded-2xl overflow-hidden shadow-sm transition-all hover:shadow-md">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full px-6 py-4 flex justify-between items-center hover:bg-stone-50/50 transition-colors focus:outline-none group"
      >
        <div className="flex items-center gap-3">
          {icon && (
            <span className="text-[#c83d49]/70 group-hover:text-[#c83d49] transition-colors">
              {icon}
            </span>
          )}
          <div className="text-left">
            <span className="font-semibold text-[15px] text-stone-800">{title}</span>
            {description && (
              <p className="text-xs text-stone-400 mt-0.5">{description}</p>
            )}
          </div>
        </div>
        <div
          className={`p-1.5 rounded-lg bg-stone-100 text-stone-400 group-hover:bg-stone-200 transform transition-all duration-300 ${
            open ? "rotate-180" : "rotate-0"
          }`}
        >
          {Icons.chevronDown}
        </div>
      </button>
      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          open ? "max-h-[5000px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="p-6 border-t border-stone-100 bg-white">{children}</div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   Dashboard Overview
   ═══════════════════════════════════════════════════════ */

function DashboardView({
  globalData,
  pageData,
  onNavigate,
}: {
  globalData: AnyContent | null;
  pageData: AnyContent | null;
  onNavigate: (tab: Tab) => void;
}) {
  const seo = (globalData?.seo || {}) as AnyContent;
  const header = (globalData?.header || {}) as AnyContent;
  const amenities = (pageData?.amenities || {}) as AnyContent;
  const concierge = (pageData?.concierge || {}) as AnyContent;

  const stats = [
    {
      label: "Navigation Links",
      value: ((header.navLinks as any[]) || []).length,
      color: "bg-blue-50 text-blue-700 border-blue-100",
    },
    {
      label: "Amenities",
      value: ((amenities.items as any[]) || []).length,
      color: "bg-emerald-50 text-emerald-700 border-emerald-100",
    },
    {
      label: "Services",
      value: ((concierge.services as any[]) || []).length,
      color: "bg-purple-50 text-purple-700 border-purple-100",
    },
    {
      label: "SEO Keywords",
      value: ((seo.keywords as any[]) || []).length,
      color: "bg-amber-50 text-amber-700 border-amber-100",
    },
  ];

  const quickActions = [
    {
      label: "Edit Site Settings",
      description: "SEO, header, footer",
      icon: Icons.settings,
      tab: "global" as Tab,
    },
    {
      label: "Edit Home Page",
      description: "Hero, sections, content",
      icon: Icons.home,
      tab: "page" as Tab,
    },
    {
      label: "Media Library",
      description: "Upload & manage images",
      icon: Icons.images,
      tab: "images" as Tab,
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Welcome */}
      <div className="relative rounded-3xl overflow-hidden bg-[#1a1a1a]">
        {/* Decorative elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#c83d49]/20 rounded-full -translate-y-1/3 translate-x-1/3 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-60 h-60 bg-[#c83d49]/10 rounded-full translate-y-1/3 -translate-x-1/3 blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/[0.02] rounded-full"></div>
          {/* Subtle grid pattern */}
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "24px 24px" }}></div>
        </div>
        <div className="relative px-8 py-10 sm:px-10 sm:py-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-[#c83d49] shadow-lg shadow-[#c83d49]/30">
              <span className="text-white text-sm font-black tracking-tight" style={{ fontFamily: "system-ui, sans-serif" }}>VL</span>
            </div>
            <span className="text-[#c83d49] text-xs font-bold uppercase tracking-[0.2em]" style={{ fontFamily: "system-ui, sans-serif" }}>Admin Panel</span>
          </div>
          <h1 className="text-[28px] sm:text-[34px] font-black text-white leading-tight tracking-tight mb-3" style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}>
            Welcome Back
          </h1>
          <p className="text-stone-400 text-sm sm:text-[15px] max-w-md leading-relaxed" style={{ fontFamily: "system-ui, sans-serif" }}>
            Manage your website content, images, and settings. Changes are automatically published after saving.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#c83d49] hover:bg-[#a72d37] rounded-xl text-sm font-bold text-white transition-colors shadow-lg shadow-[#c83d49]/25"
              style={{ fontFamily: "system-ui, sans-serif" }}
            >
              {Icons.external}
              View Live Site
            </a>
            <button
              onClick={() => onNavigate("page")}
              className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/15 backdrop-blur-sm rounded-xl text-sm font-semibold text-white/90 transition-colors border border-white/10"
              style={{ fontFamily: "system-ui, sans-serif" }}
            >
              {Icons.home}
              Edit Home Page
            </button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div
            key={s.label}
            className={`${s.color} border rounded-2xl p-5 transition-transform hover:scale-[1.02]`}
          >
            <div className="text-3xl font-bold">{s.value}</div>
            <div className="text-sm font-medium mt-1 opacity-80">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-lg font-bold text-stone-800 mb-4">Quick Actions</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          {quickActions.map((action) => (
            <button
              key={action.label}
              onClick={() => onNavigate(action.tab)}
              className="text-left p-6 bg-white border border-stone-200 rounded-2xl hover:border-[#c83d49]/30 hover:shadow-md transition-all group"
            >
              <span className="inline-flex p-3 rounded-xl bg-stone-100 text-stone-500 group-hover:bg-[#c83d49]/10 group-hover:text-[#c83d49] transition-colors">
                {action.icon}
              </span>
              <h3 className="mt-4 font-semibold text-stone-800 group-hover:text-[#c83d49] transition-colors">
                {action.label}
              </h3>
              <p className="text-sm text-stone-400 mt-1">{action.description}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Tips */}
      <div className="bg-amber-50/50 border border-amber-200/50 rounded-2xl p-6">
        <div className="flex gap-3">
          <span className="text-amber-500 flex-shrink-0 mt-0.5">{Icons.info}</span>
          <div>
            <h3 className="text-sm font-semibold text-amber-800 mb-1">Tips</h3>
            <ul className="text-sm text-amber-700/80 space-y-1">
              <li>After saving, the website updates automatically in ~2 minutes.</li>
              <li>Images should be under 5MB for best performance.</li>
              <li>SEO description should be 150-160 characters for best results.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   Editors
   ═══════════════════════════════════════════════════════ */

function GlobalEditor({
  data,
  onChange,
}: {
  data: AnyContent;
  onChange: (data: AnyContent) => void;
}) {
  const seo = (data.seo || {}) as AnyContent;
  const header = (data.header || {}) as AnyContent;
  const footer = (data.footer || {}) as AnyContent;

  const setSeo = (k: string, v: any) =>
    onChange({ ...data, seo: { ...seo, [k]: v } });
  const setHeader = (k: string, v: any) =>
    onChange({ ...data, header: { ...header, [k]: v } });
  const setFooter = (k: string, v: any) =>
    onChange({ ...data, footer: { ...footer, [k]: v } });

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <Section
        title="SEO Settings"
        description="Search engine optimization for Google results"
        icon={Icons.globe}
        defaultOpen={true}
      >
        <TextField
          label="Site Name"
          value={seo.siteName as string}
          onChange={(v) => setSeo("siteName", v)}
          help="The name of your website as it appears in search engines."
        />
        <TextField
          label="Slogan"
          value={seo.slogan as string}
          onChange={(v) => setSeo("slogan", v)}
          help="A short tagline for the site."
        />
        <TextAreaField
          label="Meta Description"
          value={seo.description as string}
          onChange={(v) => setSeo("description", v)}
          maxLength={160}
          help="The description shown in Google search results. Aim for 150-160 characters."
        />
        <StringListField
          label="Keywords"
          items={seo.keywords as string[]}
          onChange={(v) => setSeo("keywords", v)}
          help="Keywords help search engines understand your site content."
        />
      </Section>

      <Section
        title="Header & Navigation"
        description="Top bar branding and navigation menu"
        icon={Icons.home}
        defaultOpen={false}
      >
        <TextField
          label="Brand Name"
          value={header.brandName as string}
          onChange={(v) => setHeader("brandName", v)}
          help="Displayed in the website header."
        />
        <TextField
          label="Booking URL"
          value={header.bookingUrl as string}
          onChange={(v) => setHeader("bookingUrl", v)}
          help="Link for the Book Now button."
        />
        <ObjectListField
          label="Navigation Links"
          items={header.navLinks as Record<string, string>[]}
          fields={[
            { key: "label", label: "Label", placeholder: "e.g., The Villa" },
            { key: "href", label: "Link", placeholder: "e.g., /#about" },
          ]}
          onChange={(v) => setHeader("navLinks", v)}
          help="The menu items shown in the website header."
        />
      </Section>

      <Section
        title="Footer"
        description="Bottom section with contact info and credits"
        icon={Icons.info}
        defaultOpen={false}
      >
        <TextField
          label="Brand Name"
          value={footer.brandName as string}
          onChange={(v) => setFooter("brandName", v)}
        />
        <TextField
          label="Tagline"
          value={footer.tagline as string}
          onChange={(v) => setFooter("tagline", v)}
        />
        <div className="grid sm:grid-cols-2 gap-x-6">
          <TextField
            label="Phone"
            value={footer.phone as string}
            onChange={(v) => setFooter("phone", v)}
          />
          <TextField
            label="Email"
            value={footer.email as string}
            onChange={(v) => setFooter("email", v)}
          />
        </div>
        <TextField
          label="Address"
          value={footer.address as string}
          onChange={(v) => setFooter("address", v)}
        />
        <TextField
          label="Copyright Text"
          value={footer.copyright as string}
          onChange={(v) => setFooter("copyright", v)}
        />
        <div className="grid sm:grid-cols-2 gap-x-6">
          <TextField
            label="Managed By"
            value={footer.managedBy as string}
            onChange={(v) => setFooter("managedBy", v)}
          />
          <TextField
            label="Managed By URL"
            value={footer.managedByUrl as string}
            onChange={(v) => setFooter("managedByUrl", v)}
          />
        </div>
      </Section>
    </div>
  );
}

function PageEditor({
  data,
  onChange,
}: {
  data: AnyContent;
  onChange: (data: AnyContent) => void;
}) {
  const hero = (data.hero || {}) as AnyContent;
  const marquee = (data.marquee || {}) as AnyContent;
  const intro = (data.villaIntro || {}) as AnyContent;
  const amenities = (data.amenities || {}) as AnyContent;
  const concierge = (data.concierge || {}) as AnyContent;
  const gallery = (data.gallery || {}) as AnyContent;
  const mapArgs = (data.map || {}) as AnyContent;
  const contact = (data.contact || {}) as AnyContent;

  const set = (section: string, key: string, v: any) =>
    onChange({
      ...data,
      [section]: { ...((data as any)[section] || {}), [key]: v },
    });

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <Section
        title="Hero Banner"
        description="The large banner at the top of the page"
        icon={Icons.photo}
        defaultOpen={true}
      >
        <TextField
          label="Kicker"
          value={hero.kicker as string}
          onChange={(v) => set("hero", "kicker", v)}
          help="Small text above the main title."
        />
        <TextField
          label="Title"
          value={hero.title as string}
          onChange={(v) => set("hero", "title", v)}
          help="The main heading visitors see first."
        />
        <TextAreaField
          label="Subtitle"
          value={hero.subtitle as string}
          onChange={(v) => set("hero", "subtitle", v)}
          help="Short description below the title."
        />
        <ImagePickerField
          label="Background Image"
          value={hero.image as string}
          onChange={(v) => set("hero", "image", v)}
          folder="img"
          help="The large background image of the hero section."
        />
      </Section>

      <Section title="Marquee Line" description="Scrolling text strip" defaultOpen={false}>
        <TextField
          label="Scrolling Text"
          value={marquee.text as string}
          onChange={(v) => set("marquee", "text", v)}
          help="This text scrolls across the page."
        />
      </Section>

      <Section title="Villa Introduction" description="Main description of the villa" defaultOpen={false}>
        <TextField
          label="Kicker"
          value={intro.kicker as string}
          onChange={(v) => set("villaIntro", "kicker", v)}
          help="Small text above the section title."
        />
        <TextField
          label="Title"
          value={intro.title as string}
          onChange={(v) => set("villaIntro", "title", v)}
        />
        <TextField
          label="Tagline"
          value={intro.tagline as string}
          onChange={(v) => set("villaIntro", "tagline", v)}
        />
        <StringListField
          label="Body Paragraphs"
          items={intro.bodyParagraphs as string[]}
          onChange={(v) => set("villaIntro", "bodyParagraphs", v)}
          textarea
          help="Each item is a separate paragraph in the intro section."
        />
        <ObjectListField
          label="Stats"
          items={intro.stats as Record<string, string>[]}
          fields={[
            { key: "label", label: "Label", placeholder: "e.g., Bedrooms" },
            { key: "value", label: "Value", placeholder: "e.g., 9" },
          ]}
          onChange={(v) => set("villaIntro", "stats", v)}
          help="Key numbers displayed prominently (e.g., Bedrooms: 9)."
        />
        <TextField
          label="The Space - Section Title"
          value={intro.spaceTitle as string}
          onChange={(v) => set("villaIntro", "spaceTitle", v)}
        />
        <StringListField
          label="The Space - Paragraphs"
          items={intro.spaceParagraphs as string[]}
          onChange={(v) => set("villaIntro", "spaceParagraphs", v)}
          textarea
        />
        <ImagePickerField
          label="Featured Image"
          value={intro.featuredImage as string}
          onChange={(v) => set("villaIntro", "featuredImage", v)}
          folder="img/gallery"
        />
        <ObjectListField
          label="Gallery Images"
          items={intro.galleryImages as Record<string, string>[]}
          fields={[
            { key: "src", label: "Image", type: "image", folder: "img/gallery" },
            { key: "alt", label: "Alt Text", placeholder: "Describe the image..." },
          ]}
          onChange={(v) => set("villaIntro", "galleryImages", v)}
          help="Images shown in the intro gallery grid."
        />
      </Section>

      <Section title="Amenities" description="Villa features like pool, sauna, etc." defaultOpen={false}>
        <TextField
          label="Section Title"
          value={amenities.sectionTitle as string}
          onChange={(v) => set("amenities", "sectionTitle", v)}
        />
        <ObjectListField
          label="Amenity Items"
          items={amenities.items as Record<string, string>[]}
          fields={[
            { key: "name", label: "Amenity Name", placeholder: "e.g., Heated Pool" },
            {
              key: "icon",
              label: "Icon (Emoji)",
              type: "text",
              placeholder: "e.g., 🏊 or 🌊",
            },
            { key: "image", label: "Background Image", type: "image", folder: "img/gallery" },
          ]}
          onChange={(v) => set("amenities", "items", v)}
          help="Each amenity shows as a card on the website."
        />
      </Section>

      <Section title="Concierge Services" description="Premium services offered to guests" defaultOpen={false}>
        <TextField
          label="Title"
          value={concierge.title as string}
          onChange={(v) => set("concierge", "title", v)}
        />
        <TextField
          label="Kicker"
          value={concierge.kicker as string}
          onChange={(v) => set("concierge", "kicker", v)}
        />
        <StringListField
          label="Description Paragraphs"
          items={concierge.paragraphs as string[]}
          onChange={(v) => set("concierge", "paragraphs", v)}
          textarea
        />
        <StringListField
          label="Services List"
          items={concierge.services as string[]}
          onChange={(v) => set("concierge", "services", v)}
          help="Each item appears as a service offering."
        />
        <TextField
          label="Closing Text"
          value={concierge.closingText as string}
          onChange={(v) => set("concierge", "closingText", v)}
        />
      </Section>

      <Section title="Gallery Header" description="Title above the photo gallery" defaultOpen={false}>
        <TextField
          label="Title"
          value={gallery.title as string}
          onChange={(v) => set("gallery", "title", v)}
        />
        <TextField
          label="Subtitle"
          value={gallery.subtitle as string}
          onChange={(v) => set("gallery", "subtitle", v)}
        />
        <TextAreaField
          label="Description"
          value={gallery.description as string}
          onChange={(v) => set("gallery", "description", v)}
        />
      </Section>

      <Section title="Map & Location" description="Address and distance information" defaultOpen={false}>
        <TextField
          label="Section Title"
          value={mapArgs.title as string}
          onChange={(v) => set("map", "title", v)}
        />
        <TextField
          label="Address"
          value={mapArgs.address as string}
          onChange={(v) => set("map", "address", v)}
        />
        <TextField
          label="Getting Here - Title"
          value={mapArgs.gettingHereTitle as string}
          onChange={(v) => set("map", "gettingHereTitle", v)}
        />
        <TextAreaField
          label="Getting Here - Intro"
          value={mapArgs.gettingHereIntro as string}
          onChange={(v) => set("map", "gettingHereIntro", v)}
        />
        <ObjectListField
          label="Distances"
          items={mapArgs.distances as Record<string, string>[]}
          fields={[
            { key: "name", label: "Location", placeholder: "e.g., Airport" },
            { key: "detail", label: "Distance", placeholder: "e.g., 15 min drive" },
          ]}
          onChange={(v) => set("map", "distances", v)}
          help="Key distances from the villa to nearby places."
        />
      </Section>

      <Section title="Contact Section" description="Contact form header area" defaultOpen={false}>
        <TextField
          label="Badge"
          value={contact.badge as string}
          onChange={(v) => set("contact", "badge", v)}
          help="Small label above the contact title."
        />
        <TextField
          label="Title"
          value={contact.title as string}
          onChange={(v) => set("contact", "title", v)}
        />
        <TextField
          label="Subtitle"
          value={contact.subtitle as string}
          onChange={(v) => set("contact", "subtitle", v)}
        />
      </Section>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   Images Editor
   ═══════════════════════════════════════════════════════ */

type ImageItem = {
  name: string;
  path: string;
  sha: string;
  size: number;
  url: string;
  type: string;
};

const IMAGE_FOLDERS = [
  { key: "img/gallery", label: "Gallery Images", icon: Icons.images },
  { key: "img", label: "General Images", icon: Icons.photo },
];

function ImagesEditor({
  password,
  addToast,
}: {
  password: string;
  addToast: (text: string, type: Toast["type"]) => void;
}) {
  const [folder, setFolder] = useState<string>("img/gallery");
  const [images, setImages] = useState<ImageItem[]>([]);
  const [loadingImages, setLoadingImages] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const loadImages = useCallback(async (path: string) => {
    setLoadingImages(true);
    try {
      const res = await fetch(`/api/admin/images?path=${encodeURIComponent(path)}`);
      if (res.ok) {
        const items = await res.json();
        setImages(items.filter((i: any) => i.type === "file"));
      } else {
        addToast("Failed to load images", "error");
      }
    } catch {
      addToast("Error loading images", "error");
    }
    setLoadingImages(false);
  }, [addToast]);

  useEffect(() => {
    loadImages(folder);
  }, [folder, loadImages]);

  const processUpload = async (files: File[]) => {
    if (files.length === 0) return;
    setUploading(true);

    let successCount = 0;
    for (const file of files) {
      try {
        const base64 = await fileToBase64(file);
        const res = await fetch("/api/admin/images", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            path: folder,
            filename: file.name,
            content: base64,
            password,
          }),
        });
        if (res.ok) successCount++;
      } catch {}
    }

    addToast(
      `Uploaded ${successCount}/${files.length} images successfully.`,
      successCount > 0 ? "success" : "error"
    );
    setUploading(false);
    loadImages(folder);
  };

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    processUpload(Array.from(files));
    e.target.value = "";
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const files = Array.from(e.dataTransfer.files).filter((f) =>
      f.type.startsWith("image/")
    );
    processUpload(files);
  };

  const handleDelete = async (img: ImageItem) => {
    if (!confirm(`Delete "${img.name}"? This cannot be undone.`)) return;

    try {
      const res = await fetch("/api/admin/images", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ filePath: img.path, password }),
      });
      const result = await res.json();
      if (res.ok) {
        addToast(`"${img.name}" deleted`, "success");
        setImages((prev) => prev.filter((i) => i.sha !== img.sha));
      } else {
        addToast(result.error || "Delete failed", "error");
      }
    } catch {
      addToast("Delete failed", "error");
    }
  };

  const copyPath = (img: ImageItem) => {
    navigator.clipboard.writeText(`/${img.path}`);
    addToast(`Path copied: /${img.path}`, "info");
  };

  const filteredImages = searchQuery
    ? images.filter((img) =>
        img.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : images;

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Folder selector + search */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex gap-2">
          {IMAGE_FOLDERS.map((f) => (
            <button
              key={f.key}
              onClick={() => { setFolder(f.key); setSearchQuery(""); }}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm transition-all ${
                folder === f.key
                  ? "bg-stone-900 text-white shadow-lg shadow-stone-900/20"
                  : "bg-white text-stone-600 border border-stone-200 hover:border-stone-300 hover:bg-stone-50"
              }`}
            >
              {f.icon}
              {f.label}
            </button>
          ))}
        </div>
        <div className="flex-1 relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-300">
            {Icons.search}
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search images by name..."
            className={`${inputClasses} pl-10`}
          />
        </div>
      </div>

      {/* Upload Zone */}
      <div
        className={`relative group transition-all ${dragOver ? "scale-[1.01]" : ""}`}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
      >
        <label
          className={`flex flex-col items-center justify-center w-full min-h-[180px] border-2 border-dashed rounded-2xl cursor-pointer transition-all ${
            dragOver
              ? "border-[#c83d49] bg-[#c83d49]/5"
              : "border-stone-200 bg-stone-50/30 hover:bg-stone-50 hover:border-stone-300"
          }`}
        >
          <div className="flex flex-col items-center justify-center py-6">
            <span
              className={`mb-3 transition-colors ${
                uploading
                  ? "text-stone-300 animate-bounce"
                  : dragOver
                  ? "text-[#c83d49]"
                  : "text-stone-300 group-hover:text-stone-400"
              }`}
            >
              {Icons.upload}
            </span>
            {uploading ? (
              <p className="text-sm font-medium text-stone-500 animate-pulse">
                Uploading files...
              </p>
            ) : (
              <>
                <p className="text-sm font-medium text-stone-600">
                  <span className="text-[#c83d49] font-semibold">Click to upload</span>{" "}
                  or drag & drop
                </p>
                <p className="text-xs text-stone-400 mt-1">
                  JPG, PNG, WebP, SVG, GIF (max 5MB recommended)
                </p>
              </>
            )}
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleUpload}
            disabled={uploading}
            className="hidden"
          />
        </label>
      </div>

      {/* Image count */}
      {!loadingImages && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-stone-400">
            {filteredImages.length} image{filteredImages.length !== 1 ? "s" : ""}
            {searchQuery && ` matching "${searchQuery}"`}
          </p>
        </div>
      )}

      {/* Image grid */}
      {loadingImages ? (
        <div className="flex flex-col items-center justify-center py-20 bg-white border border-stone-100 rounded-2xl">
          <div className="w-10 h-10 border-4 border-stone-200 border-t-[#c83d49] rounded-full animate-spin mb-4"></div>
          <span className="text-sm font-medium text-stone-400">Loading images...</span>
        </div>
      ) : filteredImages.length === 0 ? (
        <div className="text-center py-20 bg-white border border-stone-200 border-dashed rounded-2xl">
          <span className="text-stone-200 block mb-3">{Icons.images}</span>
          <span className="block text-sm font-medium text-stone-400">
            {searchQuery ? "No images match your search" : "No images in this folder"}
          </span>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {filteredImages.map((img) => (
            <div
              key={img.sha}
              className="group flex flex-col bg-white border border-stone-200 rounded-2xl overflow-hidden hover:shadow-lg hover:border-stone-300 transition-all"
            >
              <div
                className="w-full aspect-square bg-stone-100 bg-cover bg-center relative"
                style={{
                  backgroundImage: `url("${img.path.split("/").map((s) => s.replace(/%/g, "%25").replace(/ /g, "%20").replace(/#/g, "%23")).join("/")}")`,
                }}
              >
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => copyPath(img)}
                      className="p-2 bg-white/90 backdrop-blur-sm rounded-lg text-stone-600 hover:text-stone-900 shadow-sm transition-colors"
                      title="Copy image path"
                    >
                      {Icons.copy}
                    </button>
                    <button
                      onClick={() => handleDelete(img)}
                      className="p-2 bg-white/90 backdrop-blur-sm rounded-lg text-red-500 hover:text-red-700 shadow-sm transition-colors"
                      title="Delete image"
                    >
                      {Icons.trash}
                    </button>
                  </div>
                </div>
              </div>
              <div className="p-3">
                <div
                  className="text-xs font-medium text-stone-700 truncate"
                  title={img.name}
                >
                  {img.name}
                </div>
                <span className="text-[10px] font-medium text-stone-400 mt-1 block">
                  {(img.size / 1024).toFixed(0)} KB
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      resolve(result.split(",")[1]);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

/* ═══════════════════════════════════════════════════════
   Sidebar Navigation
   ═══════════════════════════════════════════════════════ */

const TABS = [
  {
    key: "dashboard" as Tab,
    label: "Dashboard",
    icon: Icons.dashboard,
    description: "Overview & quick actions",
  },
  {
    key: "global" as Tab,
    label: "Site Settings",
    icon: Icons.settings,
    description: "SEO, navigation, footer",
  },
  {
    key: "page" as Tab,
    label: "Home Page",
    icon: Icons.home,
    description: "Sections & content",
  },
  {
    key: "images" as Tab,
    label: "Media Library",
    icon: Icons.images,
    description: "Images & uploads",
  },
];

function Sidebar({
  activeTab,
  onTabChange,
  hasUnsavedChanges,
  onSignOut,
  mobileOpen,
  onMobileClose,
}: {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
  hasUnsavedChanges: boolean;
  onSignOut: () => void;
  mobileOpen: boolean;
  onMobileClose: () => void;
}) {
  return (
    <>
      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden backdrop-blur-sm"
          onClick={onMobileClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-72 bg-white border-r border-stone-200 z-50 flex flex-col transition-transform duration-300 lg:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo */}
        <div className="px-6 py-5 border-b border-stone-100">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-lg font-bold text-stone-900 tracking-tight">
                Villa Lithos
              </h1>
              <p className="text-xs text-stone-400 font-medium">Content Manager</p>
            </div>
            <button
              onClick={onMobileClose}
              className="lg:hidden p-1.5 text-stone-400 hover:text-stone-600 rounded-lg"
            >
              {Icons.close}
            </button>
          </div>
        </div>

        {/* Nav Items */}
        <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => {
                onTabChange(tab.key);
                onMobileClose();
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all ${
                activeTab === tab.key
                  ? "bg-[#c83d49]/10 text-[#c83d49]"
                  : "text-stone-600 hover:bg-stone-50 hover:text-stone-800"
              }`}
            >
              <span
                className={`flex-shrink-0 ${
                  activeTab === tab.key ? "text-[#c83d49]" : "text-stone-400"
                }`}
              >
                {tab.icon}
              </span>
              <div className="min-w-0">
                <div
                  className={`text-sm font-medium ${
                    activeTab === tab.key ? "text-[#c83d49]" : ""
                  }`}
                >
                  {tab.label}
                </div>
                <div className="text-[11px] text-stone-400 truncate">
                  {tab.description}
                </div>
              </div>
            </button>
          ))}
        </nav>

        {/* Unsaved Changes Indicator */}
        {hasUnsavedChanges && (
          <div className="mx-3 mb-3 px-4 py-3 bg-amber-50 border border-amber-200/50 rounded-xl">
            <div className="flex items-center gap-2 text-amber-700">
              <span className="w-2 h-2 bg-amber-500 rounded-full animate-pulse flex-shrink-0"></span>
              <span className="text-xs font-medium">Unsaved changes</span>
            </div>
          </div>
        )}

        {/* Bottom actions */}
        <div className="border-t border-stone-100 p-3 space-y-2">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-4 py-2.5 text-stone-500 hover:text-stone-700 hover:bg-stone-50 rounded-xl transition-colors text-sm"
          >
            {Icons.external}
            View Live Site
          </a>
          <button
            onClick={onSignOut}
            className="w-full flex items-center gap-3 px-4 py-2.5 text-stone-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors text-sm"
          >
            {Icons.logout}
            Sign Out
          </button>
        </div>
      </aside>
    </>
  );
}

/* ═══════════════════════════════════════════════════════
   Main Admin Page (Login)
   ═══════════════════════════════════════════════════════ */

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);

  useEffect(() => {
    const saved = sessionStorage.getItem("admin_pw");
    if (saved) {
      setPassword(saved);
      setAuthed(true);
    }
  }, []);

  const handleLogin = async () => {
    setLoggingIn(true);
    setLoginError("");
    try {
      const res = await fetch("/api/admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const { valid } = await res.json();
      if (valid) {
        sessionStorage.setItem("admin_pw", password);
        setAuthed(true);
      } else {
        setLoginError("Incorrect password. Please try again.");
      }
    } catch {
      setLoginError("Connection error. Please check your internet.");
    }
    setLoggingIn(false);
  };

  if (!authed) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-stone-50 via-stone-100 to-stone-50 flex flex-col justify-center py-12 px-4">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          {/* Logo / Branding */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-stone-900 rounded-2xl mb-4 shadow-lg shadow-stone-900/20">
              <span className="text-white text-2xl font-bold">VL</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-stone-900">
              Villa Lithos
            </h1>
            <p className="mt-1 text-sm text-stone-500">Content Management System</p>
          </div>

          {/* Login Card */}
          <div className="bg-white py-8 px-6 shadow-xl shadow-stone-200/50 rounded-3xl border border-stone-100">
            <form
              className="space-y-6"
              onSubmit={(e) => {
                e.preventDefault();
                handleLogin();
              }}
            >
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-stone-300">
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoFocus
                    className="block w-full pl-12 pr-4 py-3.5 border border-stone-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#c83d49]/30 focus:border-[#c83d49]/50 text-sm text-stone-900 transition-all placeholder:text-stone-300"
                    placeholder="Enter your password..."
                  />
                </div>
              </div>

              {loginError && (
                <div className="flex items-center gap-2 p-3.5 rounded-xl bg-red-50 text-red-700 text-sm font-medium border border-red-100">
                  {Icons.error}
                  {loginError}
                </div>
              )}

              <button
                type="submit"
                disabled={loggingIn || !password}
                className="w-full flex justify-center py-3.5 px-4 rounded-2xl text-sm font-semibold text-white bg-stone-900 hover:bg-stone-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-stone-900 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-lg shadow-stone-900/20"
              >
                {loggingIn ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Signing in...
                  </span>
                ) : (
                  "Sign In"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return <AdminDashboard password={password} />;
}

/* ═══════════════════════════════════════════════════════
   Admin Dashboard (shown after login)
   ═══════════════════════════════════════════════════════ */

function AdminDashboard({ password }: { password: string }) {
  const [globalData, setGlobalData] = useState<AnyContent | null>(null);
  const [pageData, setPageData] = useState<AnyContent | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>("dashboard");
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Track original data for dirty checking
  const originalGlobal = useRef<string>("");
  const originalPage = useRef<string>("");

  const addToast = useCallback((text: string, type: Toast["type"]) => {
    const id = ++toastId;
    setToasts((prev) => [...prev, { id, text, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  const dismissToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // Load content
  useEffect(() => {
    Promise.all([
      fetch("/api/admin?file=global").then((r) => r.json()),
      fetch("/api/admin?file=page").then((r) => r.json()),
    ])
      .then(([g, p]) => {
        setGlobalData(g);
        setPageData(p);
        originalGlobal.current = JSON.stringify(g);
        originalPage.current = JSON.stringify(p);
        setLoading(false);
      })
      .catch(() => {
        addToast("Failed to load content", "error");
        setLoading(false);
      });
  }, [addToast]);

  // Detect unsaved changes
  useEffect(() => {
    if (!globalData || !pageData) return;
    const gChanged = JSON.stringify(globalData) !== originalGlobal.current;
    const pChanged = JSON.stringify(pageData) !== originalPage.current;
    setHasUnsavedChanges(gChanged || pChanged);
  }, [globalData, pageData]);

  // Warn before leaving with unsaved changes
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [hasUnsavedChanges]);

  const handleGlobalChange = useCallback((data: AnyContent) => {
    setGlobalData(data);
  }, []);

  const handlePageChange = useCallback((data: AnyContent) => {
    setPageData(data);
  }, []);

  const handleSave = useCallback(async () => {
    setSaving(true);
    try {
      const file = activeTab === "global" ? "global" : "page";
      const content = activeTab === "global" ? globalData : pageData;
      const res = await fetch("/api/admin", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ file, content, password }),
      });
      const result = await res.json();
      if (res.ok) {
        addToast(result.message || "Changes saved! Site will update in ~2 min.", "success");
        // Update original data reference
        if (activeTab === "global") {
          originalGlobal.current = JSON.stringify(globalData);
        } else {
          originalPage.current = JSON.stringify(pageData);
        }
        setHasUnsavedChanges(false);
      } else {
        addToast(result.error || "Save failed. Please try again.", "error");
      }
    } catch {
      addToast("Network error. Please check your connection.", "error");
    }
    setSaving(false);
  }, [activeTab, globalData, pageData, password, addToast]);

  const handleSignOut = () => {
    if (hasUnsavedChanges && !confirm("You have unsaved changes. Are you sure you want to sign out?")) {
      return;
    }
    sessionStorage.removeItem("admin_pw");
    window.location.reload();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-stone-50 flex flex-col items-center justify-center">
        <div className="w-12 h-12 border-4 border-stone-200 border-t-[#c83d49] rounded-full animate-spin mb-4"></div>
        <p className="text-stone-500 font-medium">Loading CMS...</p>
      </div>
    );
  }

  const showSaveBar = (activeTab === "global" || activeTab === "page") && hasUnsavedChanges;

  return (
    <div className="min-h-screen bg-stone-50" data-admin>
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />

      {/* Sidebar */}
      <Sidebar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        hasUnsavedChanges={hasUnsavedChanges}
        onSignOut={handleSignOut}
        mobileOpen={sidebarOpen}
        onMobileClose={() => setSidebarOpen(false)}
      />

      {/* Main Content */}
      <div className="lg:pl-72">
        {/* Mobile Top Bar */}
        <div className="sticky top-0 z-30 lg:hidden bg-white/90 backdrop-blur-md border-b border-stone-200">
          <div className="flex items-center justify-between px-4 h-14">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 text-stone-600 hover:text-stone-900 rounded-lg hover:bg-stone-100 transition-colors"
            >
              {Icons.menu}
            </button>
            <span className="text-sm font-bold text-stone-800">
              {TABS.find((t) => t.key === activeTab)?.label}
            </span>
            <div className="w-10" /> {/* Spacer for centering */}
          </div>
        </div>

        {/* Page Header */}
        <div className="px-6 sm:px-8 lg:px-10 pt-8 pb-2">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-stone-900">
                {TABS.find((t) => t.key === activeTab)?.label}
              </h2>
              <p className="text-sm text-stone-400 mt-1">
                {activeTab === "dashboard" && "Overview of your website content."}
                {activeTab === "global" && "Site-wide settings, SEO, and navigation."}
                {activeTab === "page" && "Edit the content of the main landing page."}
                {activeTab === "images" && "Upload, manage, and organize your images."}
              </p>
            </div>
            {/* Save button in header for quick access */}
            {(activeTab === "global" || activeTab === "page") && (
              <button
                onClick={handleSave}
                disabled={saving || !hasUnsavedChanges}
                className={`hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-sm ${
                  hasUnsavedChanges
                    ? "bg-[#c83d49] text-white hover:bg-[#a72d37] shadow-[#c83d49]/20"
                    : "bg-stone-100 text-stone-400 cursor-not-allowed"
                }`}
              >
                {saving ? (
                  <>
                    <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Saving...
                  </>
                ) : (
                  <>
                    {Icons.save}
                    {hasUnsavedChanges ? "Save Changes" : "All Saved"}
                  </>
                )}
              </button>
            )}
          </div>
        </div>

        {/* Content Area */}
        <div className="px-6 sm:px-8 lg:px-10 py-6 pb-32 max-w-5xl">
          {activeTab === "dashboard" && (
            <DashboardView
              globalData={globalData}
              pageData={pageData}
              onNavigate={setActiveTab}
            />
          )}
          {activeTab === "global" && globalData && (
            <GlobalEditor data={globalData} onChange={handleGlobalChange} />
          )}
          {activeTab === "page" && pageData && (
            <PageEditor data={pageData} onChange={handlePageChange} />
          )}
          {activeTab === "images" && (
            <ImagesEditor password={password} addToast={addToast} />
          )}
        </div>
      </div>

      {/* Sticky Save Bar - always visible at bottom when there are unsaved changes */}
      {showSaveBar && (
        <div className="fixed bottom-0 right-0 left-0 lg:left-72 bg-white/95 backdrop-blur-md border-t border-stone-200 p-4 z-50 shadow-[0_-4px_12px_-1px_rgb(0,0,0,0.08)]">
          <div className="max-w-5xl mx-auto flex items-center justify-between gap-4 px-2">
            <div className="flex items-center gap-2 text-amber-600">
              {Icons.warning}
              <span className="text-sm font-medium hidden sm:inline">You have unsaved changes</span>
              <span className="text-sm font-medium sm:hidden">Unsaved changes</span>
            </div>
            <button
              onClick={handleSave}
              disabled={saving}
              className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold text-white bg-[#c83d49] hover:bg-[#a72d37] disabled:opacity-50 transition-all shadow-lg shadow-[#c83d49]/20"
            >
              {saving ? (
                <>
                  <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Saving...
                </>
              ) : (
                <>
                  {Icons.save}
                  Save & Publish
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
