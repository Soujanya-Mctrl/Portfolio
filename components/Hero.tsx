"use client"

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import Lanyard from "./Lanyard";

// Hero.tsx
// A responsive, accessible hero section for a developer/designer portfolio.
// - uses Tailwind CSS classes
// - uses Framer Motion for subtle entrance and text animations
// - uses shadcn/ui Button component (import path: @/components/ui/button)
// - uses interactive 3D Lanyard component

const roles = ["Frontend Engineer", "UI/UX Designer", "React Developer", "Open Source Enthusiast"];

export function Hero() {
    const [wordIndex, setWordIndex] = useState(0);

    // cycle role words every 2.2s
    useEffect(() => {
        const t = setInterval(() => {
            setWordIndex((i) => (i + 1) % roles.length);
        }, 2200);
        return () => clearInterval(t);
    }, []);

    return (
        <section
            id="hero"
            aria-labelledby="hero-heading"
            className="relative overflow-x-hidden overflow-y-visible py-24 md:py-32"
        >
            <div className="w-full max-w-7xl mx-auto px-6 md:px-12">
                <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-12">

                    {/* left: text */}
                    <motion.div
                        initial={{ opacity: 0, x: -24 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" as const }}
                        className="z-10"
                    >
                        <p className="mb-4 text-sm font-medium uppercase tracking-wide text-muted-foreground">
                            Hi, I’m
                        </p>

                        <h1 id="hero-heading" className="mb-6 max-w-2xl text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
                            Soujanya Mallick — building delightful interfaces
                        </h1>

                        <p className="mb-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
                            I design and build modern web experiences with a focus on performance, accessibility and craft.
                            Currently working on React + Next.js projects and open-source tooling.
                        </p>

                        <div className="mb-8 flex flex-wrap gap-3">
                            <Link href="#projects" aria-label="View projects">
                                <Button>
                                    View work
                                </Button>
                            </Link>

                            <Link href="#contact" aria-label="Contact me">
                                <Button variant="outline">
                                    Contact
                                </Button>
                            </Link>

                            <span className="ml-2 inline-flex items-center text-sm text-muted-foreground">
                                <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c.9 0 1.7.35 2.3.9m-4.6 0C9.3 8.35 10.1 8 11 8m7 8v1a3 3 0 01-3 3H9a3 3 0 01-3-3v-1m14 0H5" />
                                </svg>
                                <span>Open to freelance</span>
                            </span>
                        </div>

                        <div className="flex items-center gap-4 whitespace-nowrap text-sm text-muted-foreground">
                            <div className="font-medium">I’m a</div>
                            <motion.div
                                key={wordIndex}
                                initial={{ opacity: 0, y: 6 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -6 }}
                                transition={{ duration: 0.25 }}
                                className="rounded-md bg-muted px-2 py-1 font-mono text-sm"
                                aria-live="polite"
                            >
                                {roles[wordIndex]}
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* right: image / profile / LANYARD */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.15 }}
                        className="flex justify-center lg:justify-end min-h-[500px] md:min-h-[600px] relative z-20 overflow-visible"
                    >
                        <div className="absolute inset-0 pointer-events-none">
                            <div className="absolute -inset-0 rounded-2xl bg-gradient-to-tr from-primary/20 via-transparent to-accent/10 blur-3xl opacity-50" aria-hidden />
                        </div>
                        <div className="w-full h-full min-h-[500px] md:min-h-[600px] relative overflow-visible">
                            <Lanyard
                                position={[0, 0, 20]}
                                gravity={[0, -40, 0]}
                                transparent={true}
                            />
                        </div>
                    </motion.div>

                </div>

                {/* subtle scroll hint */}
                <div className="mt-12 flex justify-center">
                    <a href="#about" className="group -mb-2 inline-flex items-center text-sm text-muted-foreground" aria-label="Scroll to about">
                        <span className="mr-2">Scroll</span>
                        <span className="inline-block h-10 w-6 overflow-hidden">
                            <motion.span
                                animate={{ y: [0, 8, 0] }}
                                transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" as const }}
                                className="inline-block rounded-full bg-muted px-0.5 py-2"
                            />
                        </span>
                    </a>
                </div>
            </div>
        </section>
    );
}

/*
Usage notes:
- Ensure you have Tailwind set up and the `container` utility configured.
- Replace the Image `src` with your profile image path or a remote URL (update next.config.js for external images).
- The Button import expects shadcn/ui Button at `@/components/ui/button`. Adjust the import or use normal <button> if you don't have it.
- Customize copy, roles array and timings to taste.
*/