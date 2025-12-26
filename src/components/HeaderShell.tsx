"use client";

import { usePathname } from "next/navigation";
import Nav from "@/components/Nav";

export default function HeaderShell() {
  const pathname = usePathname();
  if (pathname === "/") return null; // hide on homepage
  return <Nav />;
}
