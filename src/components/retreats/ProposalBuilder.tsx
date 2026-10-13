"use client";

import { useMemo, useState } from "react";
import { Mail, Phone } from "lucide-react";
import { RETREAT_EMAIL, waLink, WhatsAppIcon } from "./contact";

// On-page retreat request: a few taps compose a ready-to-send WhatsApp or email
// message, so planners never leave the page and the team gets the brief in one go.
// No form submission and no data stored; the visitor sends it from their own app.

const SIZES = ["8 to 9", "10 to 15", "16 to 22"];
const MONTHS = ["October", "November", "December", "January", "February", "March", "April", "May", "Flexible"];
const NIGHTS = ["2", "3", "4", "5+"];
const BOARD = ["Dinners only", "Half board", "Full board", "Not sure yet"];

function Chips({ label, options, value, onChange }: { label: string; options: string[]; value: string; onChange: (v: string) => void }) {
  return (
    <fieldset style={{ border: 0, padding: 0, margin: 0 }}>
      <legend className="text-xs font-semibold uppercase" style={{ letterSpacing: "0.15em", color: "#7a8c6e", marginBottom: 10 }}>{label}</legend>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {options.map((o) => (
          <button key={o} type="button" className="rc-chip" aria-pressed={value === o} onClick={() => onChange(value === o ? "" : o)}>
            {o}
          </button>
        ))}
      </div>
    </fieldset>
  );
}

export default function ProposalBuilder() {
  const [size, setSize] = useState("");
  const [month, setMonth] = useState("");
  const [nights, setNights] = useState("");
  const [board, setBoard] = useState("");
  const [company, setCompany] = useState("");

  const message = useMemo(() => {
    const lines = ["Hi Villa Lithos, we're planning a company retreat."];
    if (company.trim()) lines.push(`Company: ${company.trim()}`);
    if (size) lines.push(`Team size: ${size} people`);
    if (month) lines.push(month === "Flexible" ? "When: flexible on dates" : `When: ${month}`);
    if (nights) lines.push(`Nights: ${nights}`);
    if (board) lines.push(`Catering: ${board}`);
    lines.push("Could you send availability and a proposal?");
    return lines.join("\n");
  }, [size, month, nights, board, company]);

  const mailto = `mailto:${RETREAT_EMAIL}?subject=${encodeURIComponent(
    `Retreat proposal request${company.trim() ? `: ${company.trim()}` : ""}`
  )}&body=${encodeURIComponent(message)}`;

  return (
    <div className="rounded-2xl text-left shadow-md" style={{ background: "#faf8f3", color: "#1A2332", padding: "clamp(22px, 4vw, 36px)" }} data-lead-block="retreats-proposal">
      <div style={{ display: "grid", gap: 22 }}>
        <Chips label="Team size" options={SIZES} value={size} onChange={setSize} />
        <Chips label="When" options={MONTHS} value={month} onChange={setMonth} />
        <div style={{ display: "grid", gap: 22 }} className="md:grid-cols-2">
          <Chips label="Nights" options={NIGHTS} value={nights} onChange={setNights} />
          <Chips label="Catering" options={BOARD} value={board} onChange={setBoard} />
        </div>
        <label style={{ display: "block" }}>
          <span className="text-xs font-semibold uppercase" style={{ letterSpacing: "0.15em", color: "#7a8c6e" }}>Company (optional)</span>
          <input
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            maxLength={80}
            autoComplete="organization"
            placeholder="Your company"
            className="mt-2"
            style={{ display: "block", width: "100%", minHeight: 48, padding: "0 16px", borderRadius: 12, border: "1.5px solid rgba(26,35,50,0.18)", background: "#fff", fontSize: 16, color: "#1A2332" }}
          />
        </label>
      </div>

      <div className="mt-6 rounded-xl" style={{ background: "#fff", border: "1px dashed rgba(26,35,50,0.2)", padding: "14px 16px" }}>
        <div className="text-xs font-semibold uppercase" style={{ letterSpacing: "0.15em", color: "#6B7280" }}>Your message</div>
        <p className="mt-2 text-sm" style={{ whiteSpace: "pre-line", color: "#3D4A5C", margin: "8px 0 0" }}>{message}</p>
      </div>

      <div className="mt-6" style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
        <a href={waLink(message)} target="_blank" rel="noopener noreferrer" className="rc-wa" style={{ flex: "1 1 240px" }}>
          <WhatsAppIcon /> Send on WhatsApp
        </a>
        <a href={mailto} className="rc-sec" style={{ color: "#1A2332", flex: "1 1 200px" }}>
          <Mail size={18} /> Send by email
        </a>
      </div>
      <p className="mt-4 text-sm" style={{ color: "#6B7280", margin: "16px 0 0", display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
        <Phone size={15} /> Prefer to call? <a href="tel:+306932757142" style={{ color: "#1A2332", fontWeight: 600 }}>+30 693 275 7142</a>
      </p>
    </div>
  );
}
