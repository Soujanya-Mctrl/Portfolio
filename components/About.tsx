"use client";

import { motion } from "framer-motion";

// Optional dev screenshot (uncomment if needed)
// import Image from "next/image";
// const DEBUG_SCREENSHOT = "/mnt/data/a1fbaad7-baff-42d4-87d4-8177877134c9.png";

export const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const staggerParent = {
    hidden: {},
    show: {
        transition: { staggerChildren: 0.12, delayChildren: 0.04 },
    },
};

const slideInRightSpring = {
    hidden: { opacity: 0, x: 40, scale: 0.98 },
    show: {
        opacity: 1,
        x: 0,
        scale: 1,
        transition: { type: "spring", stiffness: 85, damping: 14 },
    },
};

export default function About() {
    return (
        <section id="about" className="w-full py-24 bg-transparent dark:bg-transparent">
            <div className="max-w-7xl mx-auto px-6">

                {/* CENTERED HEADING (separate from columns) */}
                <motion.h2
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.3 }}
                    className="text-4xl sm:text-6xl font-extrabold text-center text-zinc-100 mb-35"
                >
                    About Me
                </motion.h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

                    {/* LEFT COLUMN — animated text */}
                    <motion.div
                        variants={staggerParent}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, amount: 0.25 }}
                    >
                        <motion.p
                            variants={fadeUp}
                            className="text-lg sm:text-xl leading-8 text-zinc-400 max-w-2xl"
                        >
                            Hello! I'm{" "}
                            <span className="font-semibold text-zinc-100">Soujanya Mallick</span>, a passionate
                            developer & designer who loves crafting digital experiences that are functional,
                            aesthetic, and meaningful. I specialize in{" "}
                            <span className="font-medium text-zinc-100">React, Next.js, UI/UX, and modern
                                design systems</span>.
                        </motion.p>

                        <motion.p
                            variants={fadeUp}
                            className="mt-6 text-base sm:text-lg leading-8 text-zinc-400 max-w-2xl"
                        >
                            My work balances thoughtful interface design with clean and scalable development.
                            Whether it's building interactive web apps, aesthetic UI layouts, or full-stack
                            projects, I focus on creating smooth, elegant, and user-centered digital solutions.
                        </motion.p>
                    </motion.div>

                    {/* RIGHT COLUMN — stacked cards */}
                    <div className="flex justify-end">
                        <motion.div
                            variants={staggerParent}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true, amount: 0.25 }}
                            className="relative"
                        >
                            {/* connector line */}
                            <div className="absolute left-4 top-6 bottom-6 w-px bg-zinc-800/60 rounded" />

                            <div className="flex flex-col gap-6">

                                <motion.div
                                    variants={slideInRightSpring}
                                    className="w-80 sm:w-96 p-5 rounded-2xl bg-[rgba(255,255,255,0.03)] border border-zinc-800/40 backdrop-blur-md shadow-[0_8px_28px_rgba(2,6,23,0.6)]"
                                >
                                    <span className="text-sm text-zinc-400">Experience</span>
                                    <div className="flex items-center justify-between mt-1">
                                        <h3 className="text-2xl sm:text-3xl font-extrabold text-zinc-100">2+ Years</h3>
                                        <div className="h-9 w-9 rounded-full bg-zinc-800/60 flex items-center justify-center ring-1 ring-zinc-700/30">
                                            <span className="text-xs text-zinc-300 font-semibold">★</span>
                                        </div>
                                    </div>
                                </motion.div>

                                <motion.div
                                    variants={slideInRightSpring}
                                    className="w-80 sm:w-96 p-5 rounded-2xl bg-[rgba(255,255,255,0.03)] border border-zinc-800/40 backdrop-blur-md shadow-[0_8px_28px_rgba(2,6,23,0.6)]"
                                >
                                    <span className="text-sm text-zinc-400">Projects</span>
                                    <div className="flex items-center justify-between mt-1">
                                        <h3 className="text-2xl sm:text-3xl font-extrabold text-zinc-100">20+ Builds</h3>
                                        <div className="h-9 w-9 rounded-full bg-zinc-800/60 flex items-center justify-center ring-1 ring-zinc-700/30">
                                            <span className="text-xs text-zinc-300 font-semibold">✓</span>
                                        </div>
                                    </div>
                                </motion.div>

                                <motion.div
                                    variants={slideInRightSpring}
                                    className="w-80 sm:w-96 p-6 rounded-2xl bg-[rgba(255,255,255,0.03)] border border-zinc-800/40 backdrop-blur-md shadow-[0_8px_28px_rgba(2,6,23,0.6)]"
                                >
                                    <span className="text-sm text-zinc-400">Specialty</span>
                                    <div className="flex items-center justify-between mt-1">
                                        <h3 className="text-2xl sm:text-3xl font-extrabold text-zinc-100">
                                            Frontend & UI/UX
                                        </h3>
                                        <div className="h-9 w-9 rounded-full bg-zinc-800/60 flex items-center justify-center ring-1 ring-zinc-700/30">
                                            <span className="text-xs text-zinc-300 font-semibold">⚡</span>
                                        </div>
                                    </div>
                                </motion.div>

                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
