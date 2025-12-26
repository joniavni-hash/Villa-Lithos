"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import Reveal from "@/components/Reveal";

type Experience = {
  id: string;
  title: string;
  desc: string;
  bullets: string[];
  imageUrl: string;
  imageAlt?: string;
  details: {
    includes: string[];
    idealFor: string[];
    notes: string[];
  };
};

function ExperienceCard({
  x,
  isOpen,
  onToggle,
  children,
}: {
  x: Experience;
  isOpen: boolean;
  onToggle: () => void;
  children?: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const sx = useSpring(mx, { stiffness: 160, damping: 18 });
  const sy = useSpring(my, { stiffness: 160, damping: 18 });

  const rotateY = useTransform(sx, [-0.5, 0.5], [-8, 8]);
  const rotateX = useTransform(sy, [-0.5, 0.5], [8, -8]);

  const glowX = useTransform(sx, [-0.5, 0.5], ["35%", "65%"]);
  const glowY = useTransform(sy, [-0.5, 0.5], ["30%", "70%"]);

  function onMove(e: React.MouseEvent) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    mx.set(px);
    my.set(py);
  }

  function onLeave() {
    mx.set(0);
    my.set(0);
  }

  return (
    <div style={{ perspective: 1200 }}>
      <motion.div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        onClick={onToggle}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") onToggle();
        }}
        aria-expanded={isOpen}
        className="card tile  overflow-hidden"
        style={{
          cursor: "pointer",
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        whileHover={{ scale: 1.01 }}
        transition={{ duration: 0.15 }}
      >
        {/* moving highlight */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            background: useTransform([glowX, glowY], ([gx, gy]) => {
              return `radial-gradient(420px circle at ${gx} ${gy}, rgba(215,201,163,.12), transparent 55%)`;
            }),
          }}
        />

        {/* subtle border glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            boxShadow:
              "inset 0 0 0 1px color-mix(in srgb, var(--border) 80%, transparent)",
            opacity: 0.9,
          }}
        />

        <div style={{ transform: "translateZ(18px)" }} className="relative">
          {/* image */}
          <div className="media-tile" style={{ marginBottom: 14 }}>
            <img src={x.imageUrl} alt={x.imageAlt || x.title} />
          </div>

          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="kicker">Experience</div>

              <h3
                style={{
                  marginTop: 8,
                  fontFamily: `ui-serif, Georgia, "Times New Roman", Times, serif`,
                  letterSpacing: ".04em",
                  textTransform: "uppercase",
                  fontSize: "1.05rem",
                  color: "var(--text)",
                  lineHeight: 1.2,
                }}
              >
                {x.title}
              </h3>

              <p
                className="mt-2 text-sm"
                style={{ color: "var(--muted)", lineHeight: 1.8 }}
              >
                {x.desc}
              </p>
            </div>

            <motion.span
              className="mt-1 inline-flex h-10 w-10 items-center justify-center"
              style={{
                borderRadius: 14,
                border: "1px solid var(--border)",
                background: "var(--panel)",
                color: "var(--text)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
              }}
              aria-hidden
              animate={{ rotate: isOpen ? 180 : 0, scale: isOpen ? 1.03 : 1 }}
              transition={{ duration: 0.2 }}
            >
              {isOpen ? "−" : "+"}
            </motion.span>
          </div>

          <div className="divider" style={{ marginTop: 14 }} />

          <ul style={{ marginTop: 14, display: "grid", gap: 8, fontSize: ".92rem" }}>
            {x.bullets.map((b) => (
              <li
                key={b}
                style={{ display: "flex", gap: 10, alignItems: "flex-start" }}
              >
                <span
                  aria-hidden
                  style={{
                    marginTop: 7,
                    width: 6,
                    height: 6,
                    borderRadius: 9999,
                    background: "color-mix(in srgb, var(--accent) 70%, white 10%)",
                  }}
                />
                <span style={{ color: "var(--text)", lineHeight: 1.7 }}>
                  {b}
                </span>
              </li>
            ))}
          </ul>

          {children}
        </div>
      </motion.div>
    </div>
  );
}

const EXPERIENCES: Experience[] = [
  {
    id: "villa-overview",
    title: "Designed for Groups & Retreats",
    desc: "A spacious private villa with premium amenities — ideal for large families, groups, and curated retreats.",
    bullets: ["9 bedrooms • 8.5 bathrooms", "Multiple indoor & outdoor living areas", "Privacy with shared comfort"],
    imageUrl: "/img/gallery/01.jpg",
    details: {
      includes: ["9 bedrooms with comfortable beds and linens", "8.5 bathrooms with hot water & essentials", "Large dining and lounge areas", "Elevator access across floors"],
      idealFor: ["Large families", "Groups of friends", "Wellness or corporate retreats"],
      notes: ["Sleeping configuration depends on booking setup.", "Quiet hours apply out of respect for neighbors."],
    },
  },
  {
    id: "pool-outdoor",
    title: "Private Pool & Outdoor Living",
    desc: "Relax outdoors with sea, mountain, and garden views — from sunrise to sunset.",
    bullets: ["Private outdoor pool", "Sun loungers & seating", "BBQ & outdoor dining"],
    imageUrl: "/img/gallery/02.jpg",
    details: {
      includes: ["Private outdoor pool for exclusive use", "Outdoor seating & dining furniture", "BBQ grill & utensils", "Garden and backyard areas"],
      idealFor: ["Families with children", "Groups enjoying outdoor living", "Summer stays & celebrations"],
      notes: ["Children must be supervised near the pool.", "Pool experience depends on weather conditions."],
    },
  },
  {
    id: "views-location",
    title: "Panoramic Views",
    desc: "Enjoy sea, mountain, city, and garden views from multiple points of the villa.",
    bullets: ["Sea & water views", "Mountain & garden scenery", "Balconies & patios"],
    imageUrl: "/img/gallery/03.jpg",
    details: {
      includes: ["Sea and water views", "Mountain and city views", "Balconies, patios, and outdoor viewpoints"],
      idealFor: ["Relaxation-focused stays", "Photography & sunset lovers"],
      notes: ["Views may vary depending on room location."],
    },
  },
  {
    id: "wellness",
    title: "Wellness, Gym & Sauna",
    desc: "Maintain your routine or unwind with dedicated wellness amenities.",
    bullets: ["Private gym", "Sauna", "Indoor fireplace"],
    imageUrl: "/img/gallery/04.jpg",
    details: {
      includes: ["On-site gym for workouts", "Sauna for relaxation and recovery", "Indoor fireplace for cozy evenings"],
      idealFor: ["Wellness-focused guests", "Active travelers", "Retreat groups"],
      notes: ["Use sauna responsibly and stay hydrated."],
    },
  },
  {
    id: "family-friendly",
    title: "Family & Child Friendly",
    desc: "Thoughtfully equipped for families traveling with children and babies.",
    bullets: ["Crib & baby bath", "Family-friendly layout", "Safe private entrance"],
    imageUrl: "/img/gallery/05.jpg",
    details: {
      includes: ["Crib and baby bath", "Bathtub and family-friendly amenities", "Private entrance & safe environment"],
      idealFor: ["Families with young children", "Multi-generational stays"],
      notes: ["Please request baby equipment availability in advance."],
    },
  },
  {
    id: "comfort-access",
    title: "Comfort, Accessibility & Technology",
    desc: "Modern comforts combined with easy access and reliable amenities.",
    bullets: ["Elevator", "High-speed internet", "Workspace & entertainment"],
    imageUrl: "/img/gallery/06.jpg",
    details: {
      includes: ["Elevator access across floors", "High-speed wireless internet", "Laptop-friendly workspace", "TV, cable TV & sound system", "Air conditioning & heating"],
      idealFor: ["Long stays", "Remote work", "Mixed-age groups"],
      notes: ["Long-term stays are allowed."],
    },
  },
];

function LinkLike() {
  return (
    <a href="/#details" className="btn link">
      Explore Details
    </a>
  );
}

export default function ServicesGrid() {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <section className="section" aria-label="Experiences">
      <div className="container-page">
        <div className="page-header">
          <span className="badge">Experiences</span>
          <h2 className="h2" style={{ marginTop: 12 }}>
            Curated moments at Villa Lithos
          </h2>
          <p className="lead" style={{ marginTop: 12 }}>
            Tap a card to view what’s included, who it’s ideal for, and key notes.
          </p>
        </div>

        <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
          {EXPERIENCES.map((x, i) => {
            const isOpen = openId === x.id;

            return (
              <Reveal key={x.id} delay={i * 0.06} y={22}>
                <ExperienceCard
                  x={x}
                  isOpen={isOpen}
                  onToggle={() => setOpenId((cur) => (cur === x.id ? null : x.id))}
                >
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 5 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.22 }}
                        className="overflow-hidden"
                        onClick={(e) => e.stopPropagation()}
                        style={{ transform: "translateZ(14px)" }}
                      >
                        <div style={{ marginTop: 18, display: "grid", gap: 14 }}>
                          <div>
                            <p
                              style={{
                                fontSize: ".9rem",
                                fontWeight: 650,
                                letterSpacing: ".08em",
                                textTransform: "uppercase",
                                color: "var(--text)",
                              }}
                            >
                              What’s included
                            </p>
                            <ul
                              style={{
                                marginTop: 10,
                                display: "grid",
                                gap: 8,
                                color: "var(--muted)",
                                fontSize: ".92rem",
                                lineHeight: 1.7,
                              }}
                            >
                              {x.details.includes.map((t) => (
                                <li key={t}>• {t}</li>
                              ))}
                            </ul>
                          </div>

                          <div>
                            <p
                              style={{
                                fontSize: ".9rem",
                                fontWeight: 650,
                                letterSpacing: ".08em",
                                textTransform: "uppercase",
                                color: "var(--text)",
                              }}
                            >
                              Ideal for
                            </p>
                            <ul
                              style={{
                                marginTop: 10,
                                display: "grid",
                                gap: 8,
                                color: "var(--muted)",
                                fontSize: ".92rem",
                                lineHeight: 1.7,
                              }}
                            >
                              {x.details.idealFor.map((t) => (
                                <li key={t}>• {t}</li>
                              ))}
                            </ul>
                          </div>

                          <div>
                            <p
                              style={{
                                fontSize: ".9rem",
                                fontWeight: 650,
                                letterSpacing: ".08em",
                                textTransform: "uppercase",
                                color: "var(--text)",
                              }}
                            >
                              Notes
                            </p>
                            <ul
                              style={{
                                marginTop: 10,
                                display: "grid",
                                gap: 8,
                                color: "var(--muted)",
                                fontSize: ".92rem",
                                lineHeight: 1.7,
                              }}
                            >
                              {x.details.notes.map((t) => (
                                <li key={t}>• {t}</li>
                              ))}
                            </ul>
                          </div>

                          <div
                            style={{
                              paddingTop: 10,
                              display: "flex",
                              flexWrap: "wrap",
                              gap: 12,
                            }}
                          >
                            <a href="/#inquiry" className="btn primary">
                              Inquire
                            </a>
                            <a href="/#gallery" className="btn ghost">
                              View Gallery
                            </a>
                            <LinkLike />
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </ExperienceCard>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
