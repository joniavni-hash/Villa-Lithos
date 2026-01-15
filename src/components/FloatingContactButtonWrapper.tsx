"use client";

import dynamic from "next/dynamic";

// Dynamic import with ssr: false must be in a Client Component
const FloatingContactButton = dynamic(
  () => import("@/components/FloatingContactButton"),
  { ssr: false }
);

export default function FloatingContactButtonWrapper() {
  return <FloatingContactButton />;
}
