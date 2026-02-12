"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import Antigravity from "./Antigravity";

/*
  Full Skills.tsx with hover "pop" animation (card enlarges on hover).
  - Keeps your working navigation, modal, and animations.
  - Adds a stronger, smooth pop on hover using framer-motion's whileHover.
  - Screenshot reference: /mnt/data/8e21ceb5-b942-4018-816d-c08336a830c2.png
*/

type Skill = {
    id: string;
    title: string;
    tagline?: string;
    description?: string;
    tools?: string[];
};

const SKILLS: Skill[] = [
    { id: "frontend", title: "Frontend", tagline: "Beautiful, performant UIs", description: "I build responsive, accessible interfaces using React and Next.js.", tools: ["React", "Next.js", "Tailwind", "Framer Motion"] },
    { id: "backend", title: "Backend", tagline: "Reliable server systems", description: "Designing clean API contracts, database schemas and smooth workflows.", tools: ["Node.js", "Express", "Postgres", "Prisma"] },
    { id: "design", title: "Design", tagline: "UI/UX & brand systems", description: "Creating high-quality mockups, prototypes and brand visuals.", tools: ["Figma", "Illustrator", "Prototyping"] },
    { id: "video", title: "Video", tagline: "Editing & motion", description: "Editing, motion graphics and visual storytelling for engaging content.", tools: ["Premiere Pro", "After Effects", "DaVinci Resolve"] },
    { id: "3d", title: "3D Art", tagline: "Modeling & Texturing", description: "Creating immersive 3D assets and environments.", tools: ["Blender", "Spline", "Three.js"] },
];

function clamp(v: number, a: number, b: number) {
    return Math.max(a, Math.min(b, v));
}

export default function Skills() {
    const [open, setOpen] = useState<Skill | null>(null);

    // Navigation State
    const [index, setIndex] = useState(0);
    const [dir, setDir] = useState<1 | -1>(1);

    // Constants
    const visible = 2;
    const total = SKILLS.length;
    const maxIndex = Math.max(0, total - visible);

    const cardWidth = 360;
    const gap = 40;
    const viewportWidth = visible * cardWidth + (visible - 1) * gap;

    // Handlers
    const handlePrev = () => {
        if (index <= 0) return;
        setDir(-1);
        setIndex((prev) => clamp(prev - 1, 0, maxIndex));
    };

    const handleNext = () => {
        if (index >= maxIndex) return;
        setDir(1);
        setIndex((prev) => clamp(prev + 1, 0, maxIndex));
    };

    // Keyboard navigation
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "ArrowLeft") handlePrev();
            if (e.key === "ArrowRight") handleNext();
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [index, maxIndex]);

    // Sliced Data
    const visibleItems = SKILLS.slice(index, index + visible);

    // Animation Variants
    const cardVariants = {
        hidden: (d: number) => ({
            opacity: 0,
            x: d > 0 ? 100 : -100,
            scale: 0.95,
        }),
        visible: {
            opacity: 1,
            x: 0,
            scale: 1,
            transition: { duration: 0.42, type: "spring" as const, bounce: 0.18 },
        },
        exit: (d: number) => ({
            opacity: 0,
            x: d > 0 ? -100 : 100,
            scale: 0.95,
            transition: { duration: 0.28 },
        }),
    };

    const fadeUp = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
    };

    return (
        <section className="relative py-20 text-center overflow-hidden">
            <div className="absolute inset-0 z-0">
                <Antigravity
                    count={300}
                    magnetRadius={6}
                    ringRadius={7}
                    waveSpeed={0.4}
                    waveAmplitude={1}
                    particleSize={0.5}
                    lerpSpeed={0.05}
                    color="#e2e2e4"
                    autoAnimate
                    particleVariance={1}
                    rotationSpeed={0}
                    depthFactor={1}
                    pulseSpeed={3}
                    particleShape="capsule"
                    fieldStrength={10}
                />
            </div>

            <div className="relative z-10">
                <motion.h2
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.3 }}
                    className="text-4xl sm:text-6xl font-extrabold text-center text-zinc-100 mb-35"
                >
                    Skills
                </motion.h2>

                {/* Main Viewport */}
                <div className="relative mx-auto mb-40" style={{ width: viewportWidth }}>
                    {/* Left Arrow */}
                    <button
                        onClick={handlePrev}
                        disabled={index === 0}
                        className="absolute -left-24 top-1/2 -translate-y-1/2 z-40 h-14 w-14 rounded-full 
                     flex items-center justify-center border border-white/10 bg-neutral-900/50 backdrop-blur-md 
                     hover:bg-neutral-800 hover:scale-110 disabled:opacity-20 disabled:pointer-events-none transition-all"
                        aria-label="Previous skills"
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
                    </button>

                    {/* Right Arrow */}
                    <button
                        onClick={handleNext}
                        disabled={index >= maxIndex}
                        className="absolute -right-24 top-1/2 -translate-y-1/2 z-40 h-14 w-14 rounded-full 
                     flex items-center justify-center border border-white/10 bg-neutral-900/50 backdrop-blur-md 
                     hover:bg-neutral-800 hover:scale-110 disabled:opacity-20 disabled:pointer-events-none transition-all"
                        aria-label="Next skills"
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6" /></svg>
                    </button>

                    {/* Card Track (render visible slice) */}
                    <div className="flex" style={{ gap }}>
                        <AnimatePresence initial={false} custom={dir} mode="popLayout">
                            {visibleItems.map((skill) => (
                                <motion.div
                                    layout
                                    key={skill.id}
                                    custom={dir}
                                    variants={cardVariants}
                                    initial="hidden"
                                    animate="visible"
                                    exit="exit"
                                    style={{ width: cardWidth }}
                                    className="shrink-0"
                                >
                                    {/* ======= Aesthetic Card with Hover Pop ======= */}
                                    <motion.div
                                        whileHover={{
                                            scale: 1.06,
                                            y: -10,
                                            transition: { type: "spring", stiffness: 300, damping: 22 },
                                            boxShadow: "0 30px 60px rgba(0,0,0,0.65)",
                                        }}
                                        whileTap={{ scale: 0.995 }}
                                        className="w-full"
                                    >
                                        <Card
                                            onClick={() => setOpen(skill)}
                                            className="
                      group relative h-[360px] w-full cursor-pointer rounded-3xl
                      bg-neutral-900/70 backdrop-blur-xl
                      border border-white/8
                      shadow-[0_8px_40px_-6px_rgba(0,0,0,0.5)]
                      hover:border-white/16
                      transition-all duration-300 ease-out
                      overflow-hidden flex flex-col items-center justify-center
                    "
                                        >
                                            {/* subtle glass highlight on hover */}
                                            <div
                                                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                                                style={{
                                                    background: "linear-gradient(135deg, rgba(255,255,255,0.03), rgba(255,255,255,0.00))",
                                                }}
                                            />

                                            {/* top gloss */}
                                            <div
                                                className="absolute top-0 left-0 right-0 h-20 opacity-20 group-hover:opacity-40 transition-opacity duration-300 pointer-events-none"
                                                style={{
                                                    background: "linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0))",
                                                }}
                                            />

                                            <CardHeader className="relative z-10 text-center px-6">
                                                <CardTitle className="text-2xl font-semibold text-white mb-2 tracking-tight">
                                                    {skill.title}
                                                </CardTitle>
                                                <CardDescription className="text-neutral-400 text-base">
                                                    {skill.tagline}
                                                </CardDescription>
                                            </CardHeader>

                                            {/* small badge */}
                                            <div
                                                className="absolute bottom-6 right-6 h-11 w-11 rounded-xl
                                 bg-gradient-to-br from-indigo-500/20 to-purple-500/20
                                 flex items-center justify-center text-indigo-200 font-bold backdrop-blur-xl
                                 shadow-[0_6px_22px_rgba(0,0,0,0.5)] border border-white/10"
                                                aria-hidden
                                            >
                                                {skill.title[0]}
                                            </div>

                                            {/* hover scale helper */}
                                            <div className="absolute inset-0 scale-100 group-hover:scale-[1.02] transition-transform duration-300 pointer-events-none" />
                                        </Card>
                                    </motion.div>
                                    {/* ======= /Aesthetic Card ======= */}
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                </div>

                {/* Modal */}
                <AnimatePresence>
                    {open && <SkillModal skill={open} onClose={() => setOpen(null)} />}
                </AnimatePresence>
            </div>
        </section>
    );
}

// Modal component (keeps same behavior + left-aligned description + tools)
function SkillModal({ skill, onClose }: { skill: Skill; onClose: () => void }) {
    useEffect(() => {
        const onEsc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
        window.addEventListener("keydown", onEsc);
        return () => window.removeEventListener("keydown", onEsc);
    }, [onClose]);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

            <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 30, scale: 0.96 }}
                className="relative z-10 w-full max-w-lg rounded-2xl bg-neutral-900 border border-neutral-800 p-8 shadow-2xl"
            >
                <button onClick={onClose} className="absolute top-4 right-4 p-2 text-neutral-500 hover:text-white" aria-label="Close">
                    <svg width="20" height="20" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18M6 6l12 12" /></svg>
                </button>

                <h3 className="text-3xl font-bold text-white mb-1">{skill.title}</h3>
                <p className="text-indigo-400 mb-6">{skill.tagline}</p>
                <p className="text-neutral-300 mb-6 leading-relaxed">{skill.description}</p>

                <div className="flex flex-wrap gap-2">
                    {skill.tools?.map((t) => (
                        <span key={t} className="px-3 py-1 bg-white/5 border border-white/10 rounded-md text-sm text-neutral-300">
                            {t}
                        </span>
                    ))}
                </div>
            </motion.div>
        </div>
    );
}
