"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";

const LERP = 0.16;
const OUTER_SIZE = 14;
const DOT_SIZE = 2;

function lerp(start: number, end: number, amount: number) {
  return start + (end - start) * amount;
}

function enableNativeCursorHide() {
  document.documentElement.classList.add("custom-cursor-active");
  document.body.classList.add("custom-cursor-active");
  document.body.style.cursor = "none";
}

function disableNativeCursorHide() {
  document.documentElement.classList.remove("custom-cursor-active");
  document.body.classList.remove("custom-cursor-active");
  document.body.style.cursor = "";
}

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);

  const target = useRef({ x: 0, y: 0 });
  const follower = useRef({ x: 0, y: 0 });
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const rafId = useRef<number>(0);
  const hasMoved = useRef(false);

  useLayoutEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (!finePointer || reducedMotion) return;

    enableNativeCursorHide();
    setEnabled(true);

    return () => disableNativeCursorHide();
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const onMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY };

      if (!hasMoved.current) {
        hasMoved.current = true;
        follower.current = { x: e.clientX, y: e.clientY };
      }

      setVisible(true);

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
      }
    };

    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    const tick = () => {
      follower.current = {
        x: lerp(follower.current.x, target.current.x, LERP),
        y: lerp(follower.current.y, target.current.y, LERP),
      };

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${follower.current.x}px, ${follower.current.y}px, 0) translate(-50%, -50%)`;
      }

      rafId.current = requestAnimationFrame(tick);
    };

    const onOver = (e: MouseEvent) => {
      const el = (e.target as HTMLElement)?.closest(
        "a, button, [role='button'], input, textarea, select, label, [data-cursor-hover]"
      );
      setHovering(!!el);
    };

    rafId.current = requestAnimationFrame(tick);
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    document.documentElement.addEventListener("mouseenter", onEnter);

    return () => {
      cancelAnimationFrame(rafId.current);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.removeEventListener("mouseenter", onEnter);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      aria-hidden
      className={`custom-cursor-root pointer-events-none fixed inset-0 z-[9999] overflow-hidden transition-opacity duration-200 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        ref={ringRef}
        className="custom-cursor-ring absolute left-0 top-0 will-change-transform"
        style={{
          width: OUTER_SIZE,
          height: OUTER_SIZE,
          transform: "translate3d(-100px, -100px, 0) translate(-50%, -50%)",
        }}
      >
        <div
          className={`h-full w-full rounded-full border border-white/15 bg-white/[0.08] transition-[transform,opacity,background-color] duration-300 ease-out ${
            hovering ? "scale-[1.4] bg-white/12 border-white/25" : "scale-100"
          }`}
        />
      </div>

      <div
        ref={dotRef}
        className="custom-cursor-dot absolute left-0 top-0 will-change-transform"
        style={{
          width: DOT_SIZE,
          height: DOT_SIZE,
          transform: "translate3d(-100px, -100px, 0) translate(-50%, -50%)",
        }}
      >
        <div
          className={`h-full w-full rounded-full bg-black shadow-[0_0_0_1px_rgba(255,255,255,0.12)] transition-transform duration-200 ease-out ${
            hovering ? "scale-90" : "scale-100"
          }`}
        />
      </div>
    </div>
  );
}
