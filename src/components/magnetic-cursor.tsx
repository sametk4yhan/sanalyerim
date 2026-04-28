"use client";

import { useEffect, useRef } from "react";
import styles from "@/app/page.module.css";

const HOVER_SELECTOR = "[data-magnetic], a, button, input, textarea, [role='button']";
const PULL_SELECTOR = "[data-magnetic]";
const PULL_STRENGTH = 0.25;

export function MagneticCursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef<HTMLElement | null>(null);
  const posRef = useRef({ x: -100, y: -100 });
  const ringPosRef = useRef({ x: -100, y: -100 });

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    document.body.classList.add("hide-native-cursor");

    let raf = 0;
    const tick = () => {
      const ring = ringRef.current;
      const dot = dotRef.current;
      if (ring && dot) {
        ringPosRef.current.x += (posRef.current.x - ringPosRef.current.x) * 0.18;
        ringPosRef.current.y += (posRef.current.y - ringPosRef.current.y) * 0.18;
        ring.style.transform = `translate3d(${ringPosRef.current.x}px, ${ringPosRef.current.y}px, 0) translate(-50%, -50%)`;
        dot.style.transform = `translate3d(${posRef.current.x}px, ${posRef.current.y}px, 0) translate(-50%, -50%)`;
      }
      if (targetRef.current) {
        const el = targetRef.current;
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = (posRef.current.x - cx) * PULL_STRENGTH;
        const dy = (posRef.current.y - cy) * PULL_STRENGTH;
        el.style.transform = `translate3d(${dx}px, ${dy}px, 0)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const onMove = (e: MouseEvent) => {
      posRef.current.x = e.clientX;
      posRef.current.y = e.clientY;
    };

    const onOver = (e: MouseEvent) => {
      const node = e.target as HTMLElement | null;
      const hover = node?.closest(HOVER_SELECTOR);
      if (hover) ringRef.current?.classList.add(styles.cursorActive);
      const pullTarget = node?.closest(PULL_SELECTOR) as HTMLElement | null;
      if (!pullTarget || pullTarget === targetRef.current) return;
      releasePull();
      targetRef.current = pullTarget;
      pullTarget.style.transition = "transform 0.18s ease-out";
    };

    const onOut = (e: MouseEvent) => {
      const related = e.relatedTarget as HTMLElement | null;
      const stillHover = related?.closest(HOVER_SELECTOR);
      if (!stillHover) ringRef.current?.classList.remove(styles.cursorActive);
      if (targetRef.current && (!related || !targetRef.current.contains(related))) {
        releasePull();
      }
    };

    const releasePull = () => {
      const el = targetRef.current;
      if (el) {
        el.style.transform = "";
        setTimeout(() => {
          if (el && targetRef.current !== el) el.style.transition = "";
        }, 200);
      }
      targetRef.current = null;
    };

    const onLeave = () => {
      posRef.current.x = -100;
      posRef.current.y = -100;
      releasePull();
      ringRef.current?.classList.remove(styles.cursorActive);
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);
    document.addEventListener("mouseleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      document.removeEventListener("mouseleave", onLeave);
      releasePull();
      document.body.classList.remove("hide-native-cursor");
    };
  }, []);

  return (
    <>
      <div ref={ringRef} className={styles.cursorRing} aria-hidden="true" />
      <div ref={dotRef} className={styles.cursorDot} aria-hidden="true" />
    </>
  );
}
