"use client";

import { useEffect, useRef } from "react";

const INTERACTIVE = "a, button, input, textarea, select, [role='button']";
const SIZE = 36;

export default function CursorFollower() {
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const node = ring.current;
    if (!node || !finePointer.matches || reduceMotion.matches) return;

    let targetX = -100;
    let targetY = -100;
    let currentX = -100;
    let currentY = -100;
    let scale = 1;
    let targetScale = 1;
    let frameId = 0;

    const onMove = (event: PointerEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;
      node.style.opacity = "1";
    };

    const onOver = (event: PointerEvent) => {
      const target = event.target as Element | null;
      targetScale = target?.closest(INTERACTIVE) ? 1.8 : 1;
    };

    const onLeaveWindow = () => {
      node.style.opacity = "0";
    };

    const tick = () => {
      currentX += (targetX - currentX) * 0.18;
      currentY += (targetY - currentY) * 0.18;
      scale += (targetScale - scale) * 0.2;
      node.style.transform = `translate3d(${currentX - SIZE / 2}px, ${
        currentY - SIZE / 2
      }px, 0) scale(${scale})`;
      frameId = requestAnimationFrame(tick);
    };
    frameId = requestAnimationFrame(tick);

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeaveWindow);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      document.documentElement.removeEventListener("pointerleave", onLeaveWindow);
    };
  }, []);

  return (
    <div
      ref={ring}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[110] rounded-full border border-glow/70 opacity-0 transition-opacity duration-300"
      style={{ width: SIZE, height: SIZE }}
    />
  );
}