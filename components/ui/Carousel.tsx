// components/ui/carousel.tsx
"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export type CarouselProps = {
    children: React.ReactNode;
    className?: string;
    /** fraction of container width to scroll when clicking arrows (0..1) */
    scrollFraction?: number;
};

export function Carousel({ children, className, scrollFraction = 0.6 }: CarouselProps) {
    const containerRef = React.useRef<HTMLDivElement | null>(null);

    // helper: get slides (direct children inside the inner flex)
    const getSlides = React.useCallback(() => {
        const el = containerRef.current;
        if (!el) return [] as HTMLElement[];
        // inner flex is the first child
        const flex = el.querySelector<HTMLElement>(":scope > .__carousel_inner_flex");
        if (!flex) return [] as HTMLElement[];
        return Array.from(flex.children) as HTMLElement[];
    }, []);

    // Scroll to a particular slide element (so it fully appears)
    const scrollToSlide = React.useCallback((slideEl?: HTMLElement | null) => {
        const el = containerRef.current;
        if (!el || !slideEl) return;
        // align to start so the slide fully appears at left edge
        const left = slideEl.offsetLeft - (el.clientLeft || 0);
        el.scrollTo({ left, behavior: "smooth" });
    }, []);

    // Scroll to next whole slide (arrow right)
    const scrollNext = React.useCallback(() => {
        const el = containerRef.current;
        if (!el) return;
        const slides = getSlides();
        const scrollLeft = Math.round(el.scrollLeft);
        // find first slide whose left is > current scrollLeft + 1
        const target = slides.find((s) => s.offsetLeft > scrollLeft + 1) ?? slides[slides.length - 1];
        scrollToSlide(target as HTMLElement);
    }, [getSlides, scrollToSlide]);

    // Scroll to previous whole slide (arrow left)
    const scrollPrev = React.useCallback(() => {
        const el = containerRef.current;
        if (!el) return;
        const slides = getSlides();
        const scrollLeft = Math.round(el.scrollLeft);
        // find last slide whose right edge is < current scrollLeft - 1
        let target: HTMLElement | undefined;
        for (let i = slides.length - 1; i >= 0; i--) {
            const s = slides[i];
            if (s.offsetLeft + s.clientWidth < scrollLeft - 1) {
                target = s;
                break;
            }
        }
        // if none found, pick first slide
        if (!target) target = slides[0];
        scrollToSlide(target as HTMLElement);
    }, [getSlides, scrollToSlide]);

    // keyboard support
    React.useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "ArrowLeft") scrollPrev();
            if (e.key === "ArrowRight") scrollNext();
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [scrollNext, scrollPrev]);

    return (
        <div className={cn("relative w-full", className)}>
            {/* left arrow */}
            <button
                type="button"
                aria-label="Scroll left"
                onClick={() => scrollPrev()}
                className="absolute left-0 top-1/2 z-20 -translate-y-1/2 ml-2 inline-flex h-10 w-10 items-center justify-center rounded-full
                   bg-black/40 backdrop-blur-sm shadow-md hover:bg-black/60 transition"
            >
                <svg width="16" height="16" viewBox="0 0 24 24" className="text-white" aria-hidden>
                    <path d="M15 6L9 12L15 18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </button>

            {/* viewport */}
            <div
                ref={containerRef}
                className="no-scrollbar -mx-3 overflow-x-auto px-3 py-1"
                style={{ WebkitOverflowScrolling: "touch" }}
            >
                {/* inner flex wrapper gets a stable selector so we can locate slides */}
                <div className="__carousel_inner_flex flex items-stretch gap-6">{children}</div>
            </div>

            {/* right arrow */}
            <button
                type="button"
                aria-label="Scroll right"
                onClick={() => scrollNext()}
                className="absolute right-0 top-1/2 z-20 -translate-y-1/2 mr-2 inline-flex h-10 w-10 items-center justify-center rounded-full
                   bg-black/40 backdrop-blur-sm shadow-md hover:bg-black/60 transition"
            >
                <svg width="16" height="16" viewBox="0 0 24 24" className="text-white" aria-hidden>
                    <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </button>

            {/* hide native scrollbars (all browsers) and ensure children snap to start */}
            <style jsx>{`
        .no-scrollbar {
          -ms-overflow-style: none; /* IE & Edge */
          scrollbar-width: none; /* Firefox */
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none; /* WebKit */
        }

        /* enable snap from the start of each item so items align fully in view */
        .no-scrollbar {
          scroll-snap-type: x mandatory;
        }
        .__carousel_inner_flex > * {
          scroll-snap-align: start;
        }
      `}</style>
        </div>
    );
}

/** CarouselItem: wrap your slide content with this so default widths apply.
 *  Adjust min-w in the className to control how many items per viewport.
 */
export function CarouselItem({ children, className }: { children: React.ReactNode; className?: string }) {
    // default is ~two cards visible on wide screens (min-w ~44%)
    return <div className={cn("min-w-[44%] shrink-0 px-3 snap-start", className)}>{children}</div>;
}
