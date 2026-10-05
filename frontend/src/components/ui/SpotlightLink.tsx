"use client";

import Link from "next/link";
import { useRef, type ReactNode, type PointerEvent } from "react";

interface SpotlightLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
}

export default function SpotlightLink({
  href,
  children,
  className = "",
}: SpotlightLinkProps) {
  const ref = useRef<HTMLAnchorElement>(null);

  const handleMove = (e: PointerEvent<HTMLAnchorElement>) => {
    if (e.pointerType !== "mouse") return;
    const node = ref.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    node.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    node.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  return (
    <Link
      ref={ref}
      href={href}
      onPointerMove={handleMove}
      className={`spotlight ${className}`}
    >
      {children}
    </Link>
  );
}