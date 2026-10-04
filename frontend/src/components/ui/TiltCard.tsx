"use client";

import { useRef, type ReactNode, type PointerEvent } from "react";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
}

export default function TiltCard({
  children,
  className = "",
  maxTilt = 8,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const frame = useRef<number | null>(null);

  const apply = (rx: number, ry: number, mx: number, my: number) => {
    const node = ref.current;
    if (!node) return;
    node.style.setProperty("--rx", `${rx}deg`);
    node.style.setProperty("--ry", `${ry}deg`);
    node.style.setProperty("--mx", `${mx}%`);
    node.style.setProperty("--my", `${my}%`);
  };

  const handleMove = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    const node = ref.current;
    if (!node) return;

    const rect = node.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    if (frame.current) cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      apply((0.5 - y) * maxTilt * 2, (x - 0.5) * maxTilt * 2, x * 100, y * 100);
    });
  };

  const handleLeave = () => {
    if (frame.current) cancelAnimationFrame(frame.current);
    apply(0, 0, 50, 50);
  };

  return (
    <div
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      className={`tilt-card ${className}`}
    >
      {children}
    </div>
  );
}