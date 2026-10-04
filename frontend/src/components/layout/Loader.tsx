"use client";

import { useEffect, useState } from "react";

type Phase = "show" | "hide" | "gone";

export default function Loader({ siteName }: { siteName: string }) {
  const [phase, setPhase] = useState<Phase>("show");

  useEffect(() => {
    const hideTimer = setTimeout(() => setPhase("hide"), 1400);
    const removeTimer = setTimeout(() => setPhase("gone"), 2100);
    return () => {
      clearTimeout(hideTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (phase === "gone") return null;

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-[100] grid place-items-center bg-bg transition-opacity duration-700 ${
        phase === "hide" ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      <div className="flex flex-col items-center gap-6">
        <span className="font-display text-4xl font-semibold tracking-tight">
          {siteName}
        </span>
        <div className="h-[3px] w-48 overflow-hidden rounded-full bg-line">
          <div
            className="h-full origin-left rounded-full bg-gradient-to-r from-brand to-glow"
            style={{ animation: "load-bar 1.3s ease-out forwards" }}
          />
        </div>
      </div>
    </div>
  );
}