// components/Footer.tsx
"use client";

import React from "react";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="w-full bg-neutral-950 border-t border-white/5 pt-12 pb-8">
            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">

                {/* Left Side: Brand & Copyright */}
                <div className="text-center md:text-left">
                    <h3 className="text-lg font-bold text-white tracking-tight mb-1">
                        Your Name
                    </h3>
                    <p className="text-sm text-neutral-500">
                        &copy; {currentYear} All rights reserved.
                    </p>
                </div>

                {/* Right Side: Tech Stack Credit */}
                <div className="text-center md:text-right">
                    <p className="text-xs text-neutral-600">
                        Built with <span className="text-neutral-400">Next.js</span>,{" "}
                        <span className="text-neutral-400">Tailwind</span> &{" "}
                        <span className="text-neutral-400">Framer Motion</span>
                    </p>
                </div>
            </div>
        </footer>
    );
}