"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link"; // Imported for routing

/* -------------------------------------------------------------------------- */
/* TYPES                                   */
/* -------------------------------------------------------------------------- */

type Project = {
    id: string;
    title: string;
    short: string;
    description: string;
    screenshot: string;
    tools: string[];
    repo?: string;
    live?: string;
};

/* -------------------------------------------------------------------------- */
/* CONSTANTS                                 */
/* -------------------------------------------------------------------------- */

const AUTO_ADVANCE_MS = 6000;

const TRANSITION = {
    type: "spring" as const,
    stiffness: 180,
    damping: 24,
    mass: 1,
};

/* -------------------------------------------------------------------------- */
/* COMPONENT                                 */
/* -------------------------------------------------------------------------- */

export default function ProjectsCarousel() {
    // Demo Data
    const projects: Project[] = useMemo(
        () => [
            {
                id: "p1",
                title: "AI Flashcard Creator",
                short: "Generative study aids from PDFs.",
                description:
                    "Upload syllabus or PDFs and generate topic-based flashcards instantly. Includes MCQ quiz mode, adaptive difficulty levels, and Supabase integration for progress tracking.",
                screenshot: "/mnt/data/5378ff0d-c7c9-4a9c-882e-d75bf1a32332.png",
                tools: ["FastAPI", "Supabase", "React", "OpenAI"],
                repo: "#",
                live: "#",
            },
            {
                id: "p2",
                title: "Pomerado Timer",
                short: "Focus timer with gamification.",
                description:
                    "A distinct focus timer built in React featuring deep session analytics, distraction logging, and subtle gamification elements to maintain flow state.",
                screenshot: "/mnt/data/5378ff0d-c7c9-4a9c-882e-d75bf1a32332.png",
                tools: ["React", "Framer Motion", "Tailwind", "Vite"],
                repo: "#",
                live: "#",
            },
            {
                id: "p3",
                title: "ProtoNexus Dash",
                short: "Real-time analytics ecosystem.",
                description:
                    "A modular dashboard for ProtoNexus featuring drag-and-drop widgets, WebSocket-powered realtime charts, and role-based authentication.",
                screenshot: "/mnt/data/5378ff0d-c7c9-4a9c-882e-d75bf1a32332.png",
                tools: ["Next.js", "TypeScript", "D3.js", "FastAPI"],
                repo: "#",
                live: "#",
            },
        ],
        []
    );

    const [active, setActive] = useState<number>(0);
    const [isPaused, setIsPaused] = useState(false);
    const timerRef = useRef<number | null>(null);

    // Logic: Active card is first, followed by the next 2 in the loop
    const ordered = useMemo(() => {
        const out: Project[] = [];
        for (let i = 0; i < 3; i++) {
            const idx = (active + i) % projects.length;
            out.push(projects[idx]);
        }
        return out;
    }, [projects, active]);

    // Auto-advance Logic
    useEffect(() => {
        if (isPaused) return;
        timerRef.current = window.setInterval(() => {
            setActive((s) => (s + 1) % projects.length);
        }, AUTO_ADVANCE_MS);
        return () => {
            if (timerRef.current) window.clearInterval(timerRef.current);
            timerRef.current = null;
        };
    }, [isPaused, projects.length]);

    const fadeUp = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
    };

    return (
        <section id="projects" className="w-full py-24 md:py-32">
            <div className="w-full max-w-7xl mx-auto px-6 md:px-12">
                <motion.h2
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.3 }}
                    className="text-4xl sm:text-6xl font-extrabold text-center text-zinc-100"
                >
                    Projects
                </motion.h2>

                <div
                    className="relative w-full h-[380px] mt-16"
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                >
                    <div className="flex gap-8 h-full items-stretch">
                        <AnimatePresence mode="popLayout" initial={false}>
                            {ordered.map((p, i) => {
                                const isActive = i === 0;

                                // --- INACTIVE CARD (Collapsed Preview) ---
                                if (!isActive) {
                                    return (
                                        <motion.article
                                            layout
                                            key={p.id}
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, scale: 0.9 }}
                                            transition={TRANSITION}
                                            className="hidden md:flex flex-col w-56 min-w-[14rem] rounded-2xl bg-neutral-900/40 border border-neutral-800 backdrop-blur-sm cursor-pointer hover:bg-neutral-800/60 hover:border-neutral-700 transition-colors group overflow-hidden"
                                            onClick={() => {
                                                setActive((active + i) % projects.length);
                                                setIsPaused(true);
                                            }}
                                        >
                                            {/* Small preview text */}
                                            <div className="p-5 flex flex-col h-full">
                                                <div className="flex items-center justify-between text-xs text-neutral-500 mb-3">
                                                    <span>0{((active + i) % projects.length) + 1}</span>
                                                    <span className="opacity-0 group-hover:opacity-100 transition-opacity text-indigo-400">
                                                        View →
                                                    </span>
                                                </div>
                                                <h3 className="text-lg font-bold text-neutral-200 group-hover:text-white transition-colors">
                                                    {p.title}
                                                </h3>
                                                <p className="mt-2 text-sm text-neutral-400 line-clamp-3">
                                                    {p.short}
                                                </p>

                                                {/* Faded image hint at bottom */}
                                                <div className="mt-auto pt-4 relative h-32 w-full overflow-hidden rounded-lg opacity-40 group-hover:opacity-80 transition-opacity">
                                                    <img
                                                        src={p.screenshot}
                                                        alt=""
                                                        className="object-cover w-full h-full grayscale group-hover:grayscale-0 transition-all duration-500"
                                                    />
                                                </div>
                                            </div>
                                        </motion.article>
                                    );
                                }

                                // --- ACTIVE CARD (Hero) ---
                                return (
                                    <motion.article
                                        layout
                                        key={p.id}
                                        initial={{ opacity: 0, scale: 0.98 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={TRANSITION}
                                        className="relative flex-1 md:flex-[0.9] rounded-3xl overflow-hidden shadow-2xl border border-white/5 bg-neutral-900 group"
                                    >
                                        {/* Background Image with Zoom Effect */}
                                        <div className="absolute inset-0 z-0">
                                            <motion.img
                                                layoutId={`img-${p.id}`}
                                                src={p.screenshot}
                                                alt={p.title}
                                                className="w-full h-full object-cover opacity-60 transition-transform duration-700 group-hover:scale-105"
                                            />
                                            {/* Gradient Overlays for readability */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/80 to-transparent" />
                                            <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/90 via-transparent to-transparent" />
                                        </div>

                                        {/* Content Container */}
                                        <div className="relative z-10 h-full flex flex-col justify-end p-6 md:p-10 lg:p-12">
                                            <motion.div
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.1, duration: 0.4 }}
                                                className="max-w-3xl"
                                            >
                                                {/* Badge / Counter */}
                                                <div className="flex items-center gap-3 mb-4">
                                                    <span className="flex items-center justify-center h-6 px-2 text-[10px] font-bold tracking-wider text-black bg-white rounded uppercase">
                                                        Featured
                                                    </span>
                                                    <span className="text-xs font-medium text-neutral-400">
                                                        0{active + 1} / 0{projects.length}
                                                    </span>
                                                </div>

                                                {/* Title & Desc */}
                                                <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 leading-tight">
                                                    {p.title}
                                                </h3>
                                                <p className="text-neutral-300 md:text-base leading-relaxed mb-6 max-w-2xl">
                                                    {p.description}
                                                </p>

                                                {/* Tools & Links Row */}
                                                <div className="flex flex-col md:flex-row md:items-center gap-4">
                                                    {/* Tools */}
                                                    <div className="flex flex-wrap gap-2">
                                                        {p.tools.map((t) => (
                                                            <span
                                                                key={t}
                                                                className="px-3 py-1 text-xs font-medium text-indigo-200 bg-indigo-500/10 border border-indigo-500/20 rounded-full"
                                                            >
                                                                {t}
                                                            </span>
                                                        ))}
                                                    </div>

                                                    {/* Divider */}
                                                    <div className="hidden md:block w-px h-6 bg-white/10" />

                                                    {/* Links */}
                                                    <div className="flex gap-3">
                                                        {p.live && (
                                                            <a
                                                                href={p.live}
                                                                target="_blank"
                                                                rel="noreferrer"
                                                                className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/5 rounded-lg backdrop-blur-md transition-all hover:scale-105 active:scale-95"
                                                            >
                                                                Live Demo
                                                                <svg
                                                                    width="14"
                                                                    height="14"
                                                                    viewBox="0 0 24 24"
                                                                    fill="none"
                                                                    stroke="currentColor"
                                                                    strokeWidth="2"
                                                                >
                                                                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                                                                    <polyline points="15 3 21 3 21 9" />
                                                                    <line x1="10" y1="14" x2="21" y2="3" />
                                                                </svg>
                                                            </a>
                                                        )}
                                                        {p.repo && (
                                                            <a
                                                                href={p.repo}
                                                                target="_blank"
                                                                rel="noreferrer"
                                                                className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-neutral-300 hover:text-white transition-colors"
                                                            >
                                                                <svg
                                                                    width="18"
                                                                    height="18"
                                                                    viewBox="0 0 24 24"
                                                                    fill="currentColor"
                                                                >
                                                                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                                                </svg>
                                                                Source Code
                                                            </a>
                                                        )}
                                                    </div>
                                                </div>
                                            </motion.div>
                                        </div>
                                    </motion.article>
                                );
                            })}
                        </AnimatePresence>
                    </div>
                </div>

                {/* Controls & Routing Button */}
                <div className="mt-8 w-full flex flex-col items-center gap-8">
                    {/* Indicators */}
                    <div className="flex flex-col md:flex-row items-center justify-between w-full gap-4">
                        <div className="relative w-full md:w-64 h-1 bg-neutral-800 rounded-full overflow-hidden">
                            <motion.div
                                className="absolute top-0 left-0 h-full bg-white"
                                initial={{ width: "0%" }}
                                animate={{ width: isPaused ? "0%" : "100%" }}
                                transition={{
                                    duration: AUTO_ADVANCE_MS / 1000,
                                    ease: "linear" as const,
                                    repeat: isPaused ? 0 : Infinity,
                                }}
                                key={active}
                            />
                        </div>

                        <div className="flex gap-2">
                            {projects.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => {
                                        setActive(idx);
                                        setIsPaused(true);
                                    }}
                                    className={`h-2 rounded-full transition-all duration-300 ${idx === active
                                        ? "w-8 bg-white"
                                        : "w-2 bg-neutral-700 hover:bg-neutral-500"
                                        }`}
                                    aria-label={`Go to slide ${idx + 1}`}
                                />
                            ))}
                        </div>
                    </div>

                    {/* View All Projects Button */}
                    <div className="mt-12 flex justify-center">
                        <Link
                            href="/projects"
                            className="group flex items-center gap-3 px-6 py-3 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white hover:border-neutral-700 transition-all hover:shadow-[0_0_20px_rgba(255,255,255,0.05)] active:scale-95"
                        >
                            <span className="font-medium">View All Projects</span>
                            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-neutral-800 group-hover:bg-neutral-700 transition-colors">
                                <svg
                                    width="14"
                                    height="14"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="group-hover:translate-x-0.5 transition-transform"
                                >
                                    <path d="M5 12h14" />
                                    <path d="M12 5l7 7-7 7" />
                                </svg>
                            </span>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}