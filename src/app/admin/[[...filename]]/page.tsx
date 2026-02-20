"use client";

import { Component, type ReactNode } from "react";
import dynamic from "next/dynamic";
import config from "../../../../tina/config";

/* ── Error Boundary ─────────────────────────────────── */
class AdminErrorBoundary extends Component<
  { children: ReactNode },
  { error: Error | null }
> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { error: null };
  }
  static getDerivedStateFromError(error: Error) {
    return { error };
  }
  render() {
    if (this.state.error) {
      return (
        <div style={{ padding: 40, fontFamily: "sans-serif" }}>
          <h1>Admin failed to load</h1>
          <pre style={{ whiteSpace: "pre-wrap", color: "red" }}>
            {this.state.error.message}
          </pre>
          <pre style={{ whiteSpace: "pre-wrap", fontSize: 12, color: "#666" }}>
            {this.state.error.stack}
          </pre>
          <p style={{ marginTop: 20 }}>
            Check that TinaCloud has indexed the <b>main</b> branch and that
            environment variables are correct.
          </p>
        </div>
      );
    }
    return this.props.children;
  }
}

/* ── Dynamic TinaAdmin (no SSR) ─────────────────────── */
const TinaAdmin = dynamic(
  () =>
    import("tinacms").then((m) => {
      console.log("[TinaCMS] Loaded module, TinaAdmin:", typeof m.TinaAdmin);
      return { default: m.TinaAdmin };
    }),
  {
    ssr: false,
    loading: () => (
      <div style={{ padding: 40, fontFamily: "sans-serif" }}>
        Loading TinaCMS admin...
      </div>
    ),
  }
);

export default function AdminPage() {
  console.log("[Admin] Config clientId:", config.clientId);
  console.log("[Admin] Config branch:", config.branch);
  console.log("[Admin] Config token exists:", !!config.token);

  return (
    <AdminErrorBoundary>
      <TinaAdmin config={config} />
    </AdminErrorBoundary>
  );
}
