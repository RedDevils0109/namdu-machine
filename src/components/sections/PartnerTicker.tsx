"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/cn";
import type { Partner } from "@/types";

interface PartnerTickerProps {
  partners: Partner[];
  eyebrow: string;
  title: string;
  /** Section background; also used for the fade at both edges of the strip. */
  tone: "cream" | "olive";
  className?: string;
}

const TONES = {
  cream: { section: "bg-cream-50", fade: "from-cream-50" },
  olive: { section: "bg-olive-50", fade: "from-olive-50" },
} as const;

/** Pixels per second of the automatic scroll. */
const SPEED = 30;
/** How long auto-scroll waits after the visitor stops interacting. */
const RESUME_DELAY = 2000;
/** Movement (px) after which a mouse press counts as a drag, not a click. */
const DRAG_THRESHOLD = 5;
/**
 * Each copy of the list must be wider than the strip for the loop to be
 * seamless, so short lists are repeated up to this many logos.
 */
const MIN_ITEMS = 8;

function safeLink(link: string | undefined): string | null {
  if (!link) return null;
  try {
    return new URL(link).protocol === "https:" ? link : null;
  } catch {
    return null;
  }
}

function fillList(partners: Partner[]): Partner[] {
  if (partners.length === 0) return [];
  const items = [...partners];
  while (items.length < MIN_ITEMS) items.push(...partners);
  return items;
}

export function PartnerTicker({ partners, eyebrow, title, tone, className }: PartnerTickerProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const items = fillList(partners);
  const fadeFrom = TONES[tone].fade;

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let hovering = false;
    let focused = false;
    let pausedUntil = 0;
    let position = scroller.scrollLeft;
    let last = performance.now();
    let frame = 0;
    let drag: { x: number; scroll: number; moved: boolean } | null = null;
    let suppressClick = false;

    const half = () => scroller.scrollWidth / 2;
    const pause = () => {
      pausedUntil = performance.now() + RESUME_DELAY;
    };

    const tick = (now: number) => {
      const elapsed = now - last;
      last = now;
      const idle = !hovering && !focused && !drag && now >= pausedUntil && !reducedMotion.matches;
      if (idle) {
        position += (SPEED * elapsed) / 1000;
        if (position >= half()) position -= half();
        scroller.scrollLeft = position;
      } else {
        position = scroller.scrollLeft;
      }
      frame = requestAnimationFrame(tick);
    };

    // Keep manual scrolling endless in both directions by jumping between the two identical copies.
    const onScroll = () => {
      const width = half();
      if (scroller.scrollLeft >= width) scroller.scrollLeft -= width;
      else if (scroller.scrollLeft <= 0 && (hovering || drag || performance.now() < pausedUntil)) {
        scroller.scrollLeft += width;
      }
    };

    const onPointerEnter = (event: PointerEvent) => {
      if (event.pointerType === "mouse") hovering = true;
    };
    const onPointerLeave = () => {
      hovering = false;
      drag = null;
    };
    const onPointerDown = (event: PointerEvent) => {
      pause();
      if (event.pointerType === "mouse" && event.button === 0) {
        drag = { x: event.clientX, scroll: scroller.scrollLeft, moved: false };
      }
    };
    const onPointerMove = (event: PointerEvent) => {
      if (!drag) return;
      const delta = event.clientX - drag.x;
      if (Math.abs(delta) > DRAG_THRESHOLD) drag.moved = true;
      if (drag.moved) scroller.scrollLeft = drag.scroll - delta;
    };
    const onPointerUp = () => {
      if (drag?.moved) suppressClick = true;
      drag = null;
      pause();
    };
    const onClickCapture = (event: MouseEvent) => {
      if (!suppressClick) return;
      suppressClick = false;
      event.preventDefault();
      event.stopPropagation();
    };
    const onFocusIn = () => {
      focused = true;
    };
    const onFocusOut = () => {
      focused = false;
      pause();
    };

    scroller.addEventListener("scroll", onScroll, { passive: true });
    scroller.addEventListener("pointerenter", onPointerEnter);
    scroller.addEventListener("pointerleave", onPointerLeave);
    scroller.addEventListener("pointerdown", onPointerDown);
    scroller.addEventListener("pointermove", onPointerMove);
    scroller.addEventListener("click", onClickCapture, true);
    scroller.addEventListener("touchstart", pause, { passive: true });
    scroller.addEventListener("touchmove", pause, { passive: true });
    scroller.addEventListener("wheel", pause, { passive: true });
    scroller.addEventListener("focusin", onFocusIn);
    scroller.addEventListener("focusout", onFocusOut);
    window.addEventListener("pointerup", onPointerUp);
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      scroller.removeEventListener("scroll", onScroll);
      scroller.removeEventListener("pointerenter", onPointerEnter);
      scroller.removeEventListener("pointerleave", onPointerLeave);
      scroller.removeEventListener("pointerdown", onPointerDown);
      scroller.removeEventListener("pointermove", onPointerMove);
      scroller.removeEventListener("click", onClickCapture, true);
      scroller.removeEventListener("touchstart", pause);
      scroller.removeEventListener("touchmove", pause);
      scroller.removeEventListener("wheel", pause);
      scroller.removeEventListener("focusin", onFocusIn);
      scroller.removeEventListener("focusout", onFocusOut);
      window.removeEventListener("pointerup", onPointerUp);
    };
  }, []);

  if (items.length === 0) return null;

  return (
    <section className={cn("py-10 sm:py-14", TONES[tone].section, className)}>
      <Container>
        <SectionHeading eyebrow={eyebrow} title={title} />
      </Container>
      <div className="relative mx-auto mt-8 max-w-7xl sm:mt-10">
        <div
          ref={scrollerRef}
          className="scrollbar-none flex cursor-grab overflow-x-auto overscroll-x-contain select-none [scroll-behavior:auto] active:cursor-grabbing"
        >
          {[0, 1].map((copy) => (
            <ul key={copy} className="flex shrink-0 items-center gap-12 pr-12 sm:gap-16 sm:pr-16" aria-hidden={copy === 1 || undefined}>
              {items.map((partner, index) => (
                <li
                  key={`${partner.name}-${index}`}
                  className="shrink-0"
                  aria-hidden={(copy === 0 && index >= partners.length) || undefined}
                >
                  <PartnerLogo partner={partner} hidden={copy === 1 || index >= partners.length} />
                </li>
              ))}
            </ul>
          ))}
        </div>
        <div className={cn("pointer-events-none absolute inset-y-0 left-0 w-12 bg-linear-to-r to-transparent sm:w-24", fadeFrom)} />
        <div className={cn("pointer-events-none absolute inset-y-0 right-0 w-12 bg-linear-to-l to-transparent sm:w-24", fadeFrom)} />
      </div>
    </section>
  );
}

function PartnerLogo({ partner, hidden }: { partner: Partner; hidden: boolean }) {
  const href = safeLink(partner.link);
  const image = (
    <Image
      src={partner.logo}
      alt={hidden ? "" : partner.name}
      width={200}
      height={80}
      draggable={false}
      className="h-10 w-auto object-contain opacity-70 grayscale transition duration-300 ease-brand hover:opacity-100 hover:grayscale-0 sm:h-12"
    />
  );

  if (!href) return <div className="px-1 py-2">{image}</div>;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      tabIndex={hidden ? -1 : undefined}
      draggable={false}
      className="block rounded-md px-1 py-2"
    >
      {image}
    </a>
  );
}
