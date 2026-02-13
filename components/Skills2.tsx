"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Antigravity from "./Antigravity";
import Folder from "./Folder";
import StackIcon from "tech-stack-icons";

type Skill = {
    id: string;
    title: string;
    tagline: string;
    description: string;
    tools: string[];
    color: string;
};

const ICON_MAP: Record<string, string> = {
    "React": "react",
    "Next.js": "nextjs",
    "Tailwind": "tailwindcss",
    "Framer Motion": "framer",
    "Node.js": "nodejs",
    "Express": "expressjs",
    "Postgres": "postgresql",
    "Prisma": "prisma",
    "Figma": "figma",
    "Illustrator": "adobeillustrator",
    "Premiere Pro": "adobepremierepro",
    "After Effects": "adobeaftereffects",
    "DaVinci Resolve": "davinciresolve",
    "Three.js": "threejs",
    "Blender": "blender",
    "Spline": "spline",
    "TypeScript": "typescript",
    "JavaScript": "js",
    "FastAPI": "fastapi"
};

const SKILLS: Skill[] = [
    {
        id: "frontend",
        title: "Frontend",
        tagline: "Beautiful, performant UIs",
        description: "I build responsive, accessible interfaces using React and Next.js.",
        tools: ["React", "Next.js", "Tailwind", "Framer Motion"],
        color: "#3b82f6"
    },
    {
        id: "backend",
        title: "Backend",
        tagline: "Reliable server systems",
        description: "Designing clean API contracts, database schemas and smooth workflows.",
        tools: ["Node.js", "Express", "Postgres", "Prisma"],
        color: "#10b981"
    },
    {
        id: "design",
        title: "Design",
        tagline: "UI/UX & brand systems",
        description: "Creating high-quality mockups, prototypes and brand visuals.",
        tools: ["Figma", "Illustrator", "Prototyping"],
        color: "#a855f7"
    },
    {
        id: "video",
        title: "Video",
        tagline: "Editing & motion",
        description: "Editing, motion graphics and visual storytelling for engaging content.",
        tools: ["Premiere Pro", "After Effects", "DaVinci Resolve"],
        color: "#ef4444"
    },
    {
        id: "3d",
        title: "3D Art",
        tagline: "Modeling & Texturing",
        description: "Creating immersive 3D assets and environments.",
        tools: ["Blender", "Spline", "Three.js"],
        color: "#f59e0b"
    }
];

const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

const modalVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 30 },
    visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: {
            type: "spring" as const,
            damping: 25,
            stiffness: 300,
            staggerChildren: 0.1,
            delayChildren: 0.1
        }
    },
    exit: {
        opacity: 0,
        scale: 0.9,
        y: 20,
        transition: { duration: 0.2 }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
};

export default function Skills2() {
    const [selectedId, setSelectedId] = useState<string | null>(null);

    return (
        <section id="skills" className="relative min-h-[800px] py-24 md:py-32 overflow-hidden bg-black flex flex-col items-center">
            {/* Proper Antigravity Background Integration */}
            <div className="absolute inset-0 pointer-events-none">
                <Antigravity
                    count={300}
                    magnetRadius={10}
                    ringRadius={8}
                    waveSpeed={0.5}
                    waveAmplitude={1.5}
                    particleSize={0.4}
                    lerpSpeed={0.06}
                    color="#ffffff"
                    autoAnimate
                    particleVariance={1.5}
                    rotationSpeed={0.5}
                    depthFactor={1.2}
                    pulseSpeed={2}
                    particleShape="capsule"
                    fieldStrength={15}
                />
                {/* Vignette effect for depth */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,black_90%)]" />
            </div>

            <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12">
                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="text-center mb-32"
                >
                    <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-4">
                        Mastery & Craft
                    </h2>
                    <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
                        Blending technical precision with creative vision to build exceptional digital experiences.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-32 gap-x-8 justify-items-center">
                    {SKILLS.map((skill) => (
                        <motion.div
                            key={skill.id}
                            className="flex flex-col items-center"
                            variants={fadeUp}
                        >
                            <div className="h-[120px] flex items-center justify-center relative">
                                <Folder
                                    size={1.8}
                                    color={skill.color}
                                    items={[
                                        <div key="1" className="paper-content h-full w-full flex items-center justify-center p-2">
                                            <div className="w-10 h-10 flex items-center justify-center">
                                                {ICON_MAP[skill.tools[0]] ? <StackIcon name={ICON_MAP[skill.tools[0]]} variant="light" className="w-full h-full object-contain" /> : <span className="text-[20px]">🛠️</span>}
                                            </div>
                                        </div>,
                                        <div key="2" className="paper-content h-full w-full flex items-center justify-center p-2">
                                            <div className="w-10 h-10 flex items-center justify-center">
                                                {ICON_MAP[skill.tools[1]] ? <StackIcon name={ICON_MAP[skill.tools[1]]} variant="light" className="w-full h-full object-contain" /> : <span className="text-[20px]">📁</span>}
                                            </div>
                                        </div>,
                                        <div key="3" className="paper-content h-full w-full flex flex-col items-center justify-center p-2 space-y-1" onClick={() => setSelectedId(skill.id)}>
                                            <motion.span
                                                className="text-[20px]"
                                                animate={{ y: [0, -4, 0] }}
                                                transition={{
                                                    duration: 1.5,
                                                    repeat: Infinity,
                                                    ease: "easeInOut"
                                                }}
                                            >
                                                👆
                                            </motion.span>
                                            <span className="text-[5px] font-black uppercase tracking-tighter text-zinc-900 bg-zinc-200 px-2 py-0.5 rounded-full">Click to Open</span>
                                        </div>
                                    ]}
                                />
                            </div>
                            <div className="mt-16 text-center">
                                <h3 className="text-xl font-bold text-white mb-1">{skill.title}</h3>
                                <p className="text-zinc-500 text-sm">{skill.tagline}</p>
                                <button
                                    onClick={() => setSelectedId(skill.id)}
                                    className="mt-4 text-xs font-bold text-zinc-400 hover:text-white transition-colors"
                                >
                                    OPEN FOLDER →
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Modal Overlay */}
            <AnimatePresence>
                {selectedId && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedId(null)}
                            className="absolute inset-0 bg-black/90 backdrop-blur-xl"
                        />

                        {SKILLS.filter(s => s.id === selectedId).map(skill => (
                            <motion.div
                                key="modal"
                                variants={modalVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                className="relative z-10 w-full max-w-2xl bg-zinc-900 border border-zinc-800 p-10 rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden"
                            >
                                {/* Background Glow */}
                                <div
                                    className="absolute -top-24 -right-24 w-64 h-64 blur-[120px] rounded-full opacity-20 pointer-events-none"
                                    style={{ backgroundColor: skill.color }}
                                />
                                <div
                                    className="absolute -bottom-24 -left-24 w-64 h-64 blur-[120px] rounded-full opacity-10 pointer-events-none"
                                    style={{ backgroundColor: skill.color }}
                                />

                                <button
                                    onClick={() => setSelectedId(null)}
                                    className="absolute top-6 right-6 text-zinc-500 hover:text-white transition-colors z-20"
                                >
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12" /></svg>
                                </button>

                                <motion.div variants={itemVariants}>
                                    <div
                                        className="inline-block px-4 py-1 rounded-full text-white text-xs font-bold mb-6"
                                        style={{ backgroundColor: skill.color }}
                                    >
                                        {skill.title}
                                    </div>
                                </motion.div>

                                <motion.h3 variants={itemVariants} className="text-4xl font-bold text-white mb-4">{skill.tagline}</motion.h3>
                                <motion.p variants={itemVariants} className="text-zinc-400 text-lg leading-relaxed mb-8">{skill.description}</motion.p>

                                <motion.div variants={itemVariants} className="space-y-6">
                                    <h4 className="text-sm font-bold text-zinc-500 uppercase tracking-widest">Stack</h4>
                                    <div className="flex flex-wrap items-center gap-x-10 gap-y-8 py-4">
                                        {skill.tools.map(tool => (
                                            <div key={tool} className="flex flex-col items-center gap-3 group/tool cursor-default">
                                                <motion.div
                                                    className={`relative flex items-center justify-center ${tool === "Next.js" ? "w-20 h-20" : "w-14 h-14"}`}
                                                    whileHover={{ scale: 1.1 }}
                                                >
                                                    {/* Hover Glow Effect */}
                                                    <div
                                                        className="absolute inset-0 rounded-full blur-2xl opacity-0 group-hover/tool:opacity-70 transition-opacity pointer-events-none"
                                                        style={{ backgroundColor: skill.color }}
                                                    />

                                                    {ICON_MAP[tool] ? (
                                                        <StackIcon
                                                            name={ICON_MAP[tool]}
                                                            variant="light"
                                                            className={`w-full h-full object-contain relative z-10 ${tool === "Framer Motion" ? "brightness-0 invert" : ""}`}
                                                        />
                                                    ) : (
                                                        <div className="text-zinc-600 text-[10px] font-mono uppercase tracking-widest border border-zinc-800 px-3 py-1 rounded relative z-10">
                                                            {tool}
                                                        </div>
                                                    )}
                                                </motion.div>
                                                <span className="text-[10px] font-bold text-zinc-600 group-hover/tool:text-zinc-400 uppercase tracking-[0.2em] text-center transition-colors">
                                                    {tool}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </AnimatePresence>
        </section>
    );
}
