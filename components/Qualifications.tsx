"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Calendar,
    MapPin,
    ExternalLink,
    Briefcase,
    Award,
    X,
} from "lucide-react";

/* ----------------------------- data & types ----------------------------- */

type EducationItem = {
    id: string;
    degree: string;
    institution: string;
    period: string;
    location?: string;
    description?: string;
    gpa?: string;
    previewImage?: string;
};

type CertificationItem = {
    id: string;
    name: string;
    issuer: string;
    date: string;
    url: string;
    skills: string[];
    previewImage?: string;
};

// <-- Use the uploaded file path here (per your session files) -->
const PREVIEW_IMG = "/mnt/data/c6d5a282-3d00-4ddd-bb3a-ca9f10d50df6.png";

const EDUCATION: EducationItem[] = [
    {
        id: "edu1",
        degree: "B.Tech — Computer Science",
        institution: "Kalyani Government Engineering College",
        period: "2021 — 2025",
        location: "Kalyani, West Bengal",
        description:
            "Focused on Data Structures, Algorithms and Full Stack Development. Active in GDSC and Automobile Club.",
        gpa: "8.9 CGPA",
        previewImage: PREVIEW_IMG,
    },
    {
        id: "edu2",
        degree: "Higher Secondary (Class XII)",
        institution: "City High School",
        period: "2019 — 2021",
        location: "Kolkata, India",
        description: "Science stream (PCM). Graduated with distinction.",
        gpa: "94%",
        previewImage: PREVIEW_IMG,
    },
];

const CERTIFICATIONS: CertificationItem[] = [
    {
        id: "cert1",
        name: "AWS Certified Cloud Practitioner",
        issuer: "Amazon Web Services",
        date: "Aug 2024",
        url: PREVIEW_IMG, // using uploaded path as sample link / preview
        skills: ["Cloud", "AWS"],
        previewImage: PREVIEW_IMG,
    },
    {
        id: "cert2",
        name: "Meta Front-End Developer",
        issuer: "Coursera",
        date: "Jan 2024",
        url: PREVIEW_IMG,
        skills: ["React", "Advanced JS"],
        previewImage: PREVIEW_IMG,
    },
];

/* ---------------------------- motion variants --------------------------- */

const list = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.06 } },
};

const card = {
    hidden: { opacity: 0, y: 8 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.32 } },
    hover: { scale: 1.02 },
};

const backdrop = { hidden: { opacity: 0 }, visible: { opacity: 1 } };
const modalMotion = {
    hidden: { opacity: 0, y: 12, scale: 0.98 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.26 } },
};

/* ------------------------------- component ------------------------------ */

export default function Qualifications() {
    const [activeTab, setActiveTab] = useState<"education" | "certifications">(
        "education"
    );
    const [openEdu, setOpenEdu] = useState<EducationItem | null>(null);

    // ESC to close modal
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") setOpenEdu(null);
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, []);

    return (
        <section className="py-20 px-4 md:px-6 w-full max-w-6xl mx-auto">
            <div className="text-center mb-10">
                <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-3">
                    Qualifications
                </h2>
                <p className="text-neutral-400 max-w-2xl mx-auto">
                    Clean education cards — click “Details” for more (modal). Certifications
                    use tall rectangular cards with subtle elevation.
                </p>
            </div>

            {/* Tab switcher */}
            <div className="flex items-center justify-center mb-8">
                <div className="inline-flex rounded-full bg-neutral-900/30 p-1 gap-1 border border-white/6">
                    <TabButton
                        label="Education"
                        active={activeTab === "education"}
                        onClick={() => setActiveTab("education")}
                    />
                    <TabButton
                        label="Certifications"
                        active={activeTab === "certifications"}
                        onClick={() => setActiveTab("certifications")}
                        icon={<Award className="w-4 h-4 mr-2" />}
                    />
                </div>
            </div>

            <div className="min-h-[380px]">
                <AnimatePresence mode="wait" initial={false}>
                    {activeTab === "education" ? (
                        <motion.div
                            key="edu"
                            variants={list}
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                            className="max-w-4xl mx-auto grid gap-6"
                        >
                            {EDUCATION.map((e) => (
                                <motion.article
                                    key={e.id}
                                    variants={card}
                                    whileHover="hover"
                                    className="relative"
                                >
                                    <div className="flex items-start gap-4">
                                        <div className="flex-shrink-0 pt-2">
                                        </div>

                                        <div className="flex-1">
                                            <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5 shadow-sm flex items-center justify-between gap-4">
                                                <div className="min-w-0">
                                                    <h3 className="text-lg font-semibold text-white truncate">
                                                        {e.degree}
                                                    </h3>
                                                    <div className="text-indigo-400 text-sm mt-1 truncate">
                                                        {e.institution}
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-3">
                                                    <div className="text-xs font-mono text-neutral-400 inline-flex items-center gap-2 bg-neutral-800/40 px-2 py-1 rounded">
                                                        <Calendar className="w-3.5 h-3.5" />
                                                        <span>{e.period}</span>
                                                    </div>

                                                    <button
                                                        onClick={() => setOpenEdu(e)}
                                                        className="ml-2 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-600/10 text-indigo-200 hover:bg-indigo-600/20 transition text-sm"
                                                    >
                                                        Details
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="mt-3 text-xs text-neutral-400">
                                                {e.location}
                                            </div>
                                        </div>
                                    </div>
                                </motion.article>
                            ))}
                        </motion.div>
                    ) : (
                        // Certifications: restored as tall rectangular elevated cards (Option B)
                        <motion.div
                            key="certs"
                            variants={list}
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                            className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6"
                        >
                            {CERTIFICATIONS.map((c) => (
                                <motion.article
                                    key={c.id}
                                    className="relative bg-neutral-900 border border-neutral-800 rounded-2xl p-6 flex items-center justify-between gap-4 shadow-[0_8px_30px_rgba(2,6,23,0.6)] hover:shadow-[0_14px_40px_rgba(2,6,23,0.75)] transition-transform transform hover:-translate-y-1"
                                    variants={card}
                                >
                                    <div className="flex items-center gap-4 min-w-0">
                                        <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-indigo-700/12 to-indigo-600/8 flex items-center justify-center ring-1 ring-indigo-600/10">
                                            <Briefcase className="w-6 h-6 text-indigo-300" />
                                        </div>

                                        <div className="min-w-0">
                                            <h4 className="text-lg font-semibold text-white leading-tight">
                                                {c.name}
                                            </h4>
                                            <div className="text-neutral-400 text-sm mt-1">{c.issuer}</div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <div className="text-xs font-mono text-neutral-400 inline-flex items-center gap-2 bg-neutral-800/40 px-3 py-1 rounded">
                                            {c.date}
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <a
                                                href={c.url}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="p-2 rounded hover:bg-neutral-800/30 transition text-neutral-300"
                                                aria-label={`Open ${c.name}`}
                                            >
                                                <ExternalLink className="w-5 h-5" />
                                            </a>
                                        </div>
                                    </div>
                                </motion.article>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Education details modal */}
            <AnimatePresence>
                {openEdu && (
                    <EducationModal item={openEdu} onClose={() => setOpenEdu(null)} />
                )}
            </AnimatePresence>
        </section>
    );
}

/* ----------------------------- Tab button ------------------------------ */

function TabButton({
    label,
    active,
    onClick,
    icon,
}: {
    label: string;
    active: boolean;
    onClick: () => void;
    icon?: React.ReactNode;
}) {
    return (
        <button
            onClick={onClick}
            className={`relative z-10 px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 transition ${active ? "text-white" : "text-neutral-400 hover:text-white"
                }`}
            aria-pressed={active}
        >
            {active && (
                <span
                    aria-hidden
                    className="absolute inset-0 rounded-full bg-gradient-to-br from-indigo-700/25 to-indigo-600/10 shadow-inner"
                />
            )}
            <span className="relative z-20 flex items-center">
                {icon} {label}
            </span>
        </button>
    );
}

/* ----------------------------- Education Modal -------------------------- */

function EducationModal({
    item,
    onClose,
}: {
    item: EducationItem;
    onClose: () => void;
}) {
    const closeRef = useRef<HTMLButtonElement | null>(null);

    useEffect(() => {
        // prevent background scroll
        const prev = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        // focus close btn when opened
        setTimeout(() => closeRef.current?.focus(), 80);
        return () => {
            document.body.style.overflow = prev;
        };
    }, []);

    return (
        <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center px-4"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={backdrop}
            onClick={onClose}
        >
            <motion.div
                className="absolute inset-0 bg-black/60"
                aria-hidden
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            />

            <motion.div
                className="relative max-w-3xl w-full mx-auto bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden"
                variants={modalMotion}
                initial="hidden"
                animate="visible"
                exit="hidden"
                onClick={(e) => e.stopPropagation()}
                role="dialog"
                aria-modal="true"
                aria-label={`${item.degree} details`}
            >
                <div className="flex items-start justify-between p-5 border-b border-white/6">
                    <div>
                        <h3 className="text-xl font-bold text-white">{item.degree}</h3>
                        <div className="text-sm text-indigo-400 mt-1">{item.institution}</div>
                    </div>

                    <button
                        ref={closeRef}
                        onClick={onClose}
                        className="p-2 rounded text-neutral-300 hover:text-white hover:bg-neutral-800/30 transition"
                        aria-label="Close details"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <p className="text-neutral-300 leading-relaxed mb-4">
                            {item.description ?? "No additional details available."}
                        </p>

                        <div className="flex flex-wrap gap-3 items-center">
                            {item.gpa && (
                                <div className="inline-flex items-center gap-2 text-sm bg-yellow-500/8 px-3 py-1 rounded-full border border-yellow-400/8">
                                    <Award className="w-4 h-4 text-yellow-400" />
                                    <span className="font-mono text-xs text-white">{item.gpa}</span>
                                </div>
                            )}

                            {item.location && (
                                <div className="inline-flex items-center gap-2 text-sm text-neutral-400 bg-neutral-800/30 px-3 py-1 rounded-full">
                                    <MapPin className="w-4 h-4" />
                                    <span className="text-xs">{item.location}</span>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="flex flex-col gap-4">
                        <div className="rounded-lg overflow-hidden border border-white/6 bg-neutral-800/20">
                            <img
                                src={item.previewImage ?? PREVIEW_IMG}
                                alt="Preview"
                                className="w-full h-44 object-cover"
                                draggable={false}
                            />
                        </div>

                        <div className="flex items-center justify-between gap-4">
                            <button
                                onClick={onClose}
                                className="px-4 py-2 rounded border border-white/6 text-sm text-neutral-300 hover:bg-neutral-800/30 transition"
                            >
                                Close
                            </button>

                            <a
                                href="#"
                                className="inline-flex items-center gap-2 px-4 py-2 rounded bg-indigo-600 text-white hover:brightness-95 transition"
                                onClick={(e) => e.preventDefault()}
                            >
                                Learn more
                                <ExternalLink className="w-4 h-4" />
                            </a>
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}
