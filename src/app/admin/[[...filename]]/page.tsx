"use client";

import { useState, useEffect, useCallback } from "react";

/* ═══════════════════════════════════════════════════════
   Types
   ═══════════════════════════════════════════════════════ */

type AnyContent = Record<string, unknown>;

/* ═══════════════════════════════════════════════════════
   Reusable Field Components
   ═══════════════════════════════════════════════════════ */

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div style={{ marginBottom: 16 }}>
      <label
        style={{
          display: "block",
          fontWeight: 600,
          fontSize: 13,
          marginBottom: 4,
          color: "#374151",
        }}
      >
        {label}
      </label>
      {children}
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "8px 12px",
  border: "1px solid #d1d5db",
  borderRadius: 6,
  fontSize: 14,
  fontFamily: "inherit",
  boxSizing: "border-box",
};

const textareaStyle: React.CSSProperties = {
  ...inputStyle,
  minHeight: 80,
  resize: "vertical",
};

function TextField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <Field label={label}>
      <input
        type="text"
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        style={inputStyle}
      />
    </Field>
  );
}

function TextAreaField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <Field label={label}>
      <textarea
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        style={textareaStyle}
      />
    </Field>
  );
}

function StringListField({
  label,
  items,
  onChange,
  textarea,
}: {
  label: string;
  items: string[];
  onChange: (items: string[]) => void;
  textarea?: boolean;
}) {
  const InputEl = textarea ? "textarea" : "input";
  const style = textarea ? textareaStyle : inputStyle;

  return (
    <Field label={label}>
      {(items || []).map((item, i) => (
        <div
          key={i}
          style={{
            display: "flex",
            gap: 8,
            marginBottom: 6,
            alignItems: "flex-start",
          }}
        >
          <InputEl
            value={item}
            onChange={(e) => {
              const next = [...items];
              next[i] = e.target.value;
              onChange(next);
            }}
            style={{ ...style, flex: 1 }}
          />
          <button
            type="button"
            onClick={() => onChange(items.filter((_, j) => j !== i))}
            style={{
              padding: "8px 12px",
              background: "#fee2e2",
              color: "#dc2626",
              border: "none",
              borderRadius: 6,
              cursor: "pointer",
              fontSize: 14,
              flexShrink: 0,
            }}
          >
            Remove
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => onChange([...(items || []), ""])}
        style={{
          padding: "6px 14px",
          background: "#f3f4f6",
          border: "1px solid #d1d5db",
          borderRadius: 6,
          cursor: "pointer",
          fontSize: 13,
        }}
      >
        + Add item
      </button>
    </Field>
  );
}

function ObjectListField({
  label,
  items,
  fields,
  onChange,
}: {
  label: string;
  items: Record<string, string>[];
  fields: { key: string; label: string }[];
  onChange: (items: Record<string, string>[]) => void;
}) {
  const empty = Object.fromEntries(fields.map((f) => [f.key, ""]));

  return (
    <Field label={label}>
      {(items || []).map((item, i) => (
        <div
          key={i}
          style={{
            padding: 12,
            marginBottom: 8,
            background: "#f9fafb",
            borderRadius: 8,
            border: "1px solid #e5e7eb",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 8,
            }}
          >
            <span
              style={{ fontWeight: 600, fontSize: 12, color: "#6b7280" }}
            >
              #{i + 1}
            </span>
            <button
              type="button"
              onClick={() => onChange(items.filter((_, j) => j !== i))}
              style={{
                padding: "4px 10px",
                background: "#fee2e2",
                color: "#dc2626",
                border: "none",
                borderRadius: 4,
                cursor: "pointer",
                fontSize: 12,
              }}
            >
              Remove
            </button>
          </div>
          {fields.map((f) => (
            <div key={f.key} style={{ marginBottom: 6 }}>
              <label
                style={{ fontSize: 12, color: "#6b7280", display: "block" }}
              >
                {f.label}
              </label>
              <input
                type="text"
                value={item[f.key] || ""}
                onChange={(e) => {
                  const next = [...items];
                  next[i] = { ...next[i], [f.key]: e.target.value };
                  onChange(next);
                }}
                style={{ ...inputStyle, fontSize: 13 }}
              />
            </div>
          ))}
        </div>
      ))}
      <button
        type="button"
        onClick={() => onChange([...(items || []), empty])}
        style={{
          padding: "6px 14px",
          background: "#f3f4f6",
          border: "1px solid #d1d5db",
          borderRadius: 6,
          cursor: "pointer",
          fontSize: 13,
        }}
      >
        + Add item
      </button>
    </Field>
  );
}

/* ═══════════════════════════════════════════════════════
   Section wrapper (collapsible)
   ═══════════════════════════════════════════════════════ */

function Section({
  title,
  children,
  defaultOpen = true,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div
      style={{
        marginBottom: 20,
        background: "#fff",
        border: "1px solid #e5e7eb",
        borderRadius: 10,
        overflow: "hidden",
      }}
    >
      <button
        type="button"
        onClick={() => setOpen(!open)}
        style={{
          width: "100%",
          padding: "14px 20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: "#f9fafb",
          border: "none",
          borderBottom: open ? "1px solid #e5e7eb" : "none",
          cursor: "pointer",
          fontSize: 15,
          fontWeight: 700,
          color: "#111827",
          fontFamily: "inherit",
        }}
      >
        {title}
        <span style={{ fontSize: 18 }}>{open ? "\u2212" : "+"}</span>
      </button>
      {open && <div style={{ padding: 20 }}>{children}</div>}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   Global Settings Editor
   ═══════════════════════════════════════════════════════ */

function GlobalEditor({
  data,
  onChange,
}: {
  data: AnyContent;
  onChange: (data: AnyContent) => void;
}) {
  const seo = (data?.seo || {}) as AnyContent;
  const header = (data?.header || {}) as AnyContent;
  const footer = (data?.footer || {}) as AnyContent;

  const set = (section: string, key: string, val: unknown) => {
    const sec = { ...((data?.[section] || {}) as AnyContent), [key]: val };
    onChange({ ...data, [section]: sec });
  };

  return (
    <>
      <Section title="SEO & Meta">
        <TextField
          label="Site Name"
          value={seo.siteName as string}
          onChange={(v) => set("seo", "siteName", v)}
        />
        <TextField
          label="Slogan"
          value={seo.slogan as string}
          onChange={(v) => set("seo", "slogan", v)}
        />
        <TextAreaField
          label="Meta Description"
          value={seo.description as string}
          onChange={(v) => set("seo", "description", v)}
        />
        <StringListField
          label="Keywords"
          items={seo.keywords as string[]}
          onChange={(v) => set("seo", "keywords", v)}
        />
      </Section>

      <Section title="Header">
        <TextField
          label="Brand Name"
          value={header.brandName as string}
          onChange={(v) => set("header", "brandName", v)}
        />
        <TextField
          label="Booking URL"
          value={header.bookingUrl as string}
          onChange={(v) => set("header", "bookingUrl", v)}
        />
        <ObjectListField
          label="Navigation Links"
          items={header.navLinks as Record<string, string>[]}
          fields={[
            { key: "label", label: "Label" },
            { key: "href", label: "URL" },
          ]}
          onChange={(v) => set("header", "navLinks", v)}
        />
      </Section>

      <Section title="Footer">
        <TextField
          label="Brand Name"
          value={footer.brandName as string}
          onChange={(v) => set("footer", "brandName", v)}
        />
        <TextAreaField
          label="Tagline"
          value={footer.tagline as string}
          onChange={(v) => set("footer", "tagline", v)}
        />
        <TextField
          label="Phone"
          value={footer.phone as string}
          onChange={(v) => set("footer", "phone", v)}
        />
        <TextField
          label="Email"
          value={footer.email as string}
          onChange={(v) => set("footer", "email", v)}
        />
        <TextField
          label="Address"
          value={footer.address as string}
          onChange={(v) => set("footer", "address", v)}
        />
        <TextField
          label="Copyright Name"
          value={footer.copyright as string}
          onChange={(v) => set("footer", "copyright", v)}
        />
        <TextField
          label="Managed By"
          value={footer.managedBy as string}
          onChange={(v) => set("footer", "managedBy", v)}
        />
        <TextField
          label="Managed By URL"
          value={footer.managedByUrl as string}
          onChange={(v) => set("footer", "managedByUrl", v)}
        />
      </Section>
    </>
  );
}

/* ═══════════════════════════════════════════════════════
   Home Page Editor
   ═══════════════════════════════════════════════════════ */

function PageEditor({
  data,
  onChange,
}: {
  data: AnyContent;
  onChange: (data: AnyContent) => void;
}) {
  const set = (section: string, key: string, val: unknown) => {
    const sec = { ...((data?.[section] || {}) as AnyContent), [key]: val };
    onChange({ ...data, [section]: sec });
  };

  const hero = (data?.hero || {}) as AnyContent;
  const marquee = (data?.marquee || {}) as AnyContent;
  const intro = (data?.villaIntro || {}) as AnyContent;
  const amenities = (data?.amenities || {}) as AnyContent;
  const concierge = (data?.concierge || {}) as AnyContent;
  const gallery = (data?.gallery || {}) as AnyContent;
  const map = (data?.map || {}) as AnyContent;
  const contact = (data?.contact || {}) as AnyContent;

  return (
    <>
      <Section title="Hero Banner">
        <TextField
          label="Kicker"
          value={hero.kicker as string}
          onChange={(v) => set("hero", "kicker", v)}
        />
        <TextField
          label="Title"
          value={hero.title as string}
          onChange={(v) => set("hero", "title", v)}
        />
        <TextAreaField
          label="Subtitle"
          value={hero.subtitle as string}
          onChange={(v) => set("hero", "subtitle", v)}
        />
      </Section>

      <Section title="Marquee Line" defaultOpen={false}>
        <TextAreaField
          label="Scrolling Text (use \u2022 as separator)"
          value={marquee.text as string}
          onChange={(v) => set("marquee", "text", v)}
        />
      </Section>

      <Section title="Villa Introduction">
        <TextField
          label="Kicker"
          value={intro.kicker as string}
          onChange={(v) => set("villaIntro", "kicker", v)}
        />
        <TextField
          label="Title"
          value={intro.title as string}
          onChange={(v) => set("villaIntro", "title", v)}
        />
        <TextAreaField
          label="Tagline"
          value={intro.tagline as string}
          onChange={(v) => set("villaIntro", "tagline", v)}
        />
        <StringListField
          label="Body Paragraphs"
          items={intro.bodyParagraphs as string[]}
          onChange={(v) => set("villaIntro", "bodyParagraphs", v)}
          textarea
        />
        <ObjectListField
          label="Stats"
          items={intro.stats as Record<string, string>[]}
          fields={[
            { key: "label", label: "Label" },
            { key: "value", label: "Value" },
          ]}
          onChange={(v) => set("villaIntro", "stats", v)}
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
      </Section>

      <Section title="Amenities" defaultOpen={false}>
        <TextField
          label="Section Title"
          value={amenities.sectionTitle as string}
          onChange={(v) => set("amenities", "sectionTitle", v)}
        />
        <StringListField
          label="Amenity Names (icons mapped by position)"
          items={amenities.items as string[]}
          onChange={(v) => set("amenities", "items", v)}
        />
      </Section>

      <Section title="Concierge" defaultOpen={false}>
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
          label="Body Paragraphs"
          items={concierge.paragraphs as string[]}
          onChange={(v) => set("concierge", "paragraphs", v)}
          textarea
        />
        <TextField
          label="Closing Text"
          value={concierge.closingText as string}
          onChange={(v) => set("concierge", "closingText", v)}
        />
        <StringListField
          label="Services List"
          items={concierge.services as string[]}
          onChange={(v) => set("concierge", "services", v)}
        />
      </Section>

      <Section title="Gallery" defaultOpen={false}>
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
        <TextField
          label="Description"
          value={gallery.description as string}
          onChange={(v) => set("gallery", "description", v)}
        />
      </Section>

      <Section title="Location / Map" defaultOpen={false}>
        <TextField
          label="Title"
          value={map.title as string}
          onChange={(v) => set("map", "title", v)}
        />
        <TextField
          label="Address"
          value={map.address as string}
          onChange={(v) => set("map", "address", v)}
        />
        <TextField
          label="Getting Here Title"
          value={map.gettingHereTitle as string}
          onChange={(v) => set("map", "gettingHereTitle", v)}
        />
        <TextAreaField
          label="Getting Here Intro"
          value={map.gettingHereIntro as string}
          onChange={(v) => set("map", "gettingHereIntro", v)}
        />
        <ObjectListField
          label="Distances"
          items={map.distances as Record<string, string>[]}
          fields={[
            { key: "name", label: "Place Name" },
            { key: "detail", label: "Distance Detail" },
          ]}
          onChange={(v) => set("map", "distances", v)}
        />
      </Section>

      <Section title="Contact Form" defaultOpen={false}>
        <TextField
          label="Badge"
          value={contact.badge as string}
          onChange={(v) => set("contact", "badge", v)}
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
    </>
  );
}

/* ═══════════════════════════════════════════════════════
   Images Manager
   ═══════════════════════════════════════════════════════ */

interface ImageItem {
  name: string;
  type: string;
  size: number;
  sha: string;
  path: string;
}

const IMAGE_FOLDERS = [
  { key: "img/gallery", label: "Gallery" },
  { key: "img", label: "General (hero, logo, etc.)" },
];

const IMAGE_EXTS = [".jpg", ".jpeg", ".png", ".webp", ".svg", ".gif"];

function ImagesEditor({ password }: { password: string }) {
  const [folder, setFolder] = useState(IMAGE_FOLDERS[0].key);
  const [images, setImages] = useState<ImageItem[]>([]);
  const [loadingImages, setLoadingImages] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [imgMessage, setImgMessage] = useState<{
    text: string;
    type: "success" | "error";
  } | null>(null);

  const loadImages = useCallback(async (path: string) => {
    setLoadingImages(true);
    setImgMessage(null);
    try {
      const res = await fetch(`/api/admin/images?path=${encodeURIComponent(path)}`);
      if (res.ok) {
        const items: ImageItem[] = await res.json();
        // Filter to only image files
        setImages(
          items.filter(
            (i) =>
              i.type === "file" &&
              IMAGE_EXTS.some((ext) => i.name.toLowerCase().endsWith(ext))
          )
        );
      } else {
        setImgMessage({ text: "Failed to load images", type: "error" });
      }
    } catch {
      setImgMessage({ text: "Network error loading images", type: "error" });
    }
    setLoadingImages(false);
  }, []);

  useEffect(() => {
    loadImages(folder);
  }, [folder, loadImages]);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    setImgMessage(null);

    let successCount = 0;
    for (const file of Array.from(files)) {
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
      } catch {
        /* skip failed */
      }
    }

    setImgMessage({
      text: `Uploaded ${successCount}/${files.length} images. Site will redeploy.`,
      type: successCount > 0 ? "success" : "error",
    });
    setUploading(false);
    e.target.value = "";
    loadImages(folder);
  };

  const handleDelete = async (img: ImageItem) => {
    if (!confirm(`Delete ${img.name}?`)) return;
    setImgMessage(null);

    try {
      const res = await fetch("/api/admin/images", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ filePath: img.path, password }),
      });
      const result = await res.json();
      if (res.ok) {
        setImgMessage({ text: result.message, type: "success" });
        setImages((prev) => prev.filter((i) => i.sha !== img.sha));
      } else {
        setImgMessage({ text: result.error, type: "error" });
      }
    } catch {
      setImgMessage({ text: "Delete failed", type: "error" });
    }
  };

  return (
    <>
      {/* Folder selector */}
      <div style={{ marginBottom: 20, display: "flex", gap: 8 }}>
        {IMAGE_FOLDERS.map((f) => (
          <button
            key={f.key}
            onClick={() => setFolder(f.key)}
            style={{
              padding: "8px 16px",
              borderRadius: 6,
              border: folder === f.key ? "2px solid #111827" : "1px solid #d1d5db",
              background: folder === f.key ? "#111827" : "#fff",
              color: folder === f.key ? "#fff" : "#374151",
              cursor: "pointer",
              fontSize: 13,
              fontWeight: folder === f.key ? 600 : 400,
              fontFamily: "inherit",
            }}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Upload */}
      <div
        style={{
          marginBottom: 20,
          padding: 20,
          border: "2px dashed #d1d5db",
          borderRadius: 10,
          textAlign: "center",
          background: "#f9fafb",
        }}
      >
        <label
          style={{
            cursor: "pointer",
            display: "block",
          }}
        >
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleUpload}
            disabled={uploading}
            style={{ display: "none" }}
          />
          <div
            style={{
              fontSize: 14,
              color: uploading ? "#9ca3af" : "#374151",
              fontWeight: 500,
            }}
          >
            {uploading
              ? "Uploading..."
              : "Click to upload images (or drag & drop)"}
          </div>
          <div style={{ fontSize: 12, color: "#9ca3af", marginTop: 4 }}>
            JPG, PNG, WebP, SVG supported
          </div>
        </label>
      </div>

      {/* Message */}
      {imgMessage && (
        <div
          style={{
            marginBottom: 16,
            padding: "10px 16px",
            borderRadius: 6,
            background:
              imgMessage.type === "success" ? "#ecfdf5" : "#fef2f2",
            color: imgMessage.type === "success" ? "#059669" : "#dc2626",
            fontSize: 13,
          }}
        >
          {imgMessage.text}
        </div>
      )}

      {/* Image grid */}
      {loadingImages ? (
        <div style={{ textAlign: "center", padding: 40, color: "#9ca3af" }}>
          Loading images...
        </div>
      ) : images.length === 0 ? (
        <div style={{ textAlign: "center", padding: 40, color: "#9ca3af" }}>
          No images in this folder
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
            gap: 12,
          }}
        >
          {images.map((img) => (
            <div
              key={img.sha}
              style={{
                border: "1px solid #e5e7eb",
                borderRadius: 8,
                overflow: "hidden",
                background: "#fff",
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: 120,
                  backgroundImage: `url(${img.path.split("/").map(s => encodeURIComponent(s)).join("/")})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundColor: "#f3f4f6",
                }}
              />
              <div style={{ padding: "8px 10px" }}>
                <div
                  style={{
                    fontSize: 11,
                    color: "#374151",
                    wordBreak: "break-all",
                    marginBottom: 4,
                  }}
                  title={img.name}
                >
                  {img.name.length > 25
                    ? img.name.slice(0, 22) + "..."
                    : img.name}
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span style={{ fontSize: 10, color: "#9ca3af" }}>
                    {(img.size / 1024).toFixed(0)} KB
                  </span>
                  <button
                    onClick={() => handleDelete(img)}
                    style={{
                      padding: "2px 8px",
                      background: "#fee2e2",
                      color: "#dc2626",
                      border: "none",
                      borderRadius: 4,
                      cursor: "pointer",
                      fontSize: 11,
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      // Remove data:image/...;base64, prefix
      resolve(result.split(",")[1]);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

/* ═══════════════════════════════════════════════════════
   Main Admin Page
   ═══════════════════════════════════════════════════════ */

type Tab = "global" | "page" | "images";

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);

  // Check sessionStorage for existing session
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
        setLoginError("Wrong password");
      }
    } catch {
      setLoginError("Connection error");
    }
    setLoggingIn(false);
  };

  if (!authed) {
    return (
      <div
        style={{
          maxWidth: 360,
          margin: "80px auto",
          padding: 30,
          fontFamily: "system-ui, sans-serif",
          textAlign: "center",
        }}
      >
        <h1 style={{ fontSize: 22, fontWeight: 800, marginBottom: 8 }}>
          Admin Login
        </h1>
        <p style={{ color: "#6b7280", fontSize: 14, marginBottom: 24 }}>
          Enter the admin password to manage content.
        </p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
        >
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoFocus
            style={{
              ...inputStyle,
              marginBottom: 12,
              textAlign: "center",
              fontSize: 16,
            }}
          />
          <button
            type="submit"
            disabled={loggingIn || !password}
            style={{
              width: "100%",
              padding: "12px 0",
              background: loggingIn ? "#9ca3af" : "#111827",
              color: "#fff",
              border: "none",
              borderRadius: 8,
              cursor: loggingIn ? "default" : "pointer",
              fontWeight: 600,
              fontSize: 15,
              fontFamily: "inherit",
            }}
          >
            {loggingIn ? "Checking..." : "Login"}
          </button>
        </form>
        {loginError && (
          <p style={{ color: "#dc2626", marginTop: 12, fontSize: 14 }}>
            {loginError}
          </p>
        )}
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
  const [activeTab, setActiveTab] = useState<Tab>("global");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{
    text: string;
    type: "success" | "error";
  } | null>(null);
  const [loading, setLoading] = useState(true);

  // Load content on mount
  useEffect(() => {
    Promise.all([
      fetch("/api/admin?file=global").then((r) => r.json()),
      fetch("/api/admin?file=page").then((r) => r.json()),
    ])
      .then(([g, p]) => {
        setGlobalData(g);
        setPageData(p);
        setLoading(false);
      })
      .catch(() => {
        setMessage({ text: "Failed to load content", type: "error" });
        setLoading(false);
      });
  }, []);

  const handleSave = useCallback(async () => {
    setSaving(true);
    setMessage(null);
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
        setMessage({ text: result.message || "Saved!", type: "success" });
      } else {
        setMessage({
          text: result.error || "Save failed",
          type: "error",
        });
      }
    } catch {
      setMessage({ text: "Network error", type: "error" });
    }
    setSaving(false);
  }, [activeTab, globalData, pageData, password]);

  if (loading) {
    return (
      <div
        style={{
          padding: 60,
          textAlign: "center",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        Loading content...
      </div>
    );
  }

  return (
    <div
      style={{
        maxWidth: 800,
        margin: "0 auto",
        padding: "30px 20px 80px",
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: 30 }}>
        <h1
          style={{
            fontSize: 24,
            fontWeight: 800,
            margin: "0 0 4px",
            color: "#111827",
          }}
        >
          Content Manager
        </h1>
        <p style={{ color: "#6b7280", fontSize: 14, margin: 0 }}>
          Edit your website content. Changes are saved to GitHub and
          auto-deployed.
        </p>
      </div>

      {/* Tabs */}
      <div
        style={{
          display: "flex",
          gap: 0,
          marginBottom: 24,
          borderBottom: "2px solid #e5e7eb",
        }}
      >
        {(
          [
            { key: "global", label: "Site Settings" },
            { key: "page", label: "Home Page" },
            { key: "images", label: "Images" },
          ] as const
        ).map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            style={{
              padding: "10px 24px",
              border: "none",
              borderBottom:
                activeTab === tab.key
                  ? "2px solid #111827"
                  : "2px solid transparent",
              marginBottom: -2,
              background: "none",
              cursor: "pointer",
              fontWeight: activeTab === tab.key ? 700 : 400,
              color: activeTab === tab.key ? "#111827" : "#6b7280",
              fontSize: 14,
              fontFamily: "inherit",
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      {activeTab === "global" && globalData && (
        <GlobalEditor data={globalData} onChange={setGlobalData} />
      )}
      {activeTab === "page" && pageData && (
        <PageEditor data={pageData} onChange={setPageData} />
      )}
      {activeTab === "images" && <ImagesEditor password={password} />}

      {/* Save bar */}
      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          padding: "14px 20px",
          background: "#fff",
          borderTop: "1px solid #e5e7eb",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 12,
          zIndex: 100,
        }}
      >
        {activeTab !== "images" && (
          <button
            onClick={handleSave}
            disabled={saving}
            style={{
              padding: "10px 32px",
              background: saving ? "#9ca3af" : "#111827",
              color: "#fff",
              border: "none",
              borderRadius: 8,
              cursor: saving ? "default" : "pointer",
              fontWeight: 600,
              fontSize: 14,
              fontFamily: "inherit",
            }}
          >
            {saving
              ? "Saving..."
              : `Save ${activeTab === "global" ? "Site Settings" : "Home Page"}`}
          </button>
        )}
        {message && (
          <span
            style={{
              fontSize: 13,
              color: message.type === "success" ? "#059669" : "#dc2626",
              fontWeight: 500,
            }}
          >
            {message.text}
          </span>
        )}
        <button
          onClick={() => {
            sessionStorage.removeItem("admin_pw");
            window.location.reload();
          }}
          style={{
            padding: "8px 16px",
            background: "none",
            border: "1px solid #d1d5db",
            borderRadius: 6,
            cursor: "pointer",
            fontSize: 12,
            color: "#6b7280",
            fontFamily: "inherit",
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}
