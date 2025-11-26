"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, MapPin, Send, CheckCircle2, Github, Linkedin, Twitter, Copy } from "lucide-react";

/* -------------------------------------------------------------------------- */
/* DATA                                                                       */
/* -------------------------------------------------------------------------- */

const SOCIALS = [
    { name: "GitHub", icon: Github, href: "https://github.com" },
    { name: "LinkedIn", icon: Linkedin, href: "https://linkedin.com" },
    { name: "X / Twitter", icon: Twitter, href: "https://twitter.com" },
];

const MY_EMAIL = "hello@example.com";

/* -------------------------------------------------------------------------- */
/* COMPONENT                                                                  */
/* -------------------------------------------------------------------------- */

export default function Contact() {
    const [formState, setFormState] = useState({ name: "", email: "", message: "" });
    const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
    const [copied, setCopied] = useState(false);

    // Mock form submission
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formState.name || !formState.email || !formState.message) return;

        setStatus("submitting");

        // Simulate network request
        setTimeout(() => {
            setStatus("success");
            setFormState({ name: "", email: "", message: "" });

            // Reset status after showing success message
            setTimeout(() => setStatus("idle"), 3000);
        }, 1500);
    };

    const copyEmail = () => {
        navigator.clipboard.writeText(MY_EMAIL);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <section className="relative py-24 px-4 overflow-hidden" id="contact">
            {/* Background Ambient Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-500/10 blur-[120px] rounded-full -z-10 pointer-events-none" />

            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">

                {/* LEFT COLUMN: Info & Context */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-indigo-300 text-xs font-medium uppercase tracking-wider mb-6">
                        <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                        Open for work
                    </div>

                    <h2 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-6 leading-tight">
                        Let's build something <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">extraordinary.</span>
                    </h2>

                    <p className="text-lg text-neutral-400 mb-10 leading-relaxed max-w-lg">
                        I'm currently available for freelance projects and full-time roles.
                        Whether you have a question or just want to say hi, I'll try my best to get back to you!
                    </p>

                    <div className="space-y-6">
                        {/* Email Card */}
                        <div
                            onClick={copyEmail}
                            className="group cursor-pointer flex items-center gap-4 p-4 rounded-2xl bg-neutral-900/50 border border-neutral-800 hover:bg-neutral-800 hover:border-neutral-700 transition-all duration-300"
                        >
                            <div className="h-12 w-12 rounded-xl bg-neutral-800 flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                                <Mail className="w-5 h-5" />
                            </div>
                            <div className="flex-1">
                                <p className="text-xs text-neutral-500 font-medium mb-1">Email me at</p>
                                <p className="text-white font-semibold">{MY_EMAIL}</p>
                            </div>
                            <div className="relative p-2 text-neutral-500 group-hover:text-white transition-colors">
                                {copied ? <CheckCircle2 className="w-5 h-5 text-green-400" /> : <Copy className="w-5 h-5" />}
                            </div>
                        </div>

                        {/* Socials Row */}
                        <div className="flex gap-4">
                            {SOCIALS.map((social) => (
                                <a
                                    key={social.name}
                                    href={social.href}
                                    target="_blank"
                                    rel="noreferrer"
                                    aria-label={social.name}
                                    className="h-12 w-12 rounded-xl border border-neutral-800 bg-neutral-900/50 flex items-center justify-center text-neutral-400 hover:text-white hover:border-neutral-600 hover:bg-neutral-800 transition-all duration-300"
                                >
                                    <social.icon className="w-5 h-5" />
                                </a>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* RIGHT COLUMN: Interactive Form */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="relative"
                >
                    {/* Decorative Backdrops */}
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/5 rounded-3xl transform rotate-2 scale-[1.02] -z-10" />

                    <form
                        onSubmit={handleSubmit}
                        className="bg-neutral-900/80 backdrop-blur-xl border border-white/10 p-8 md:p-10 rounded-3xl shadow-2xl"
                    >
                        <div className="space-y-6">
                            {/* Name Input */}
                            <div className="space-y-2">
                                <label htmlFor="name" className="text-sm font-medium text-neutral-300 ml-1">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    required
                                    value={formState.name}
                                    onChange={e => setFormState({ ...formState, name: e.target.value })}
                                    placeholder="John Doe"
                                    className="w-full px-5 py-4 bg-black/40 border border-neutral-800 rounded-xl text-white placeholder:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all"
                                />
                            </div>

                            {/* Email Input */}
                            <div className="space-y-2">
                                <label htmlFor="email" className="text-sm font-medium text-neutral-300 ml-1">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    required
                                    value={formState.email}
                                    onChange={e => setFormState({ ...formState, email: e.target.value })}
                                    placeholder="john@example.com"
                                    className="w-full px-5 py-4 bg-black/40 border border-neutral-800 rounded-xl text-white placeholder:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all"
                                />
                            </div>

                            {/* Message Input */}
                            <div className="space-y-2">
                                <label htmlFor="message" className="text-sm font-medium text-neutral-300 ml-1">Message</label>
                                <textarea
                                    id="message"
                                    required
                                    rows={4}
                                    value={formState.message}
                                    onChange={e => setFormState({ ...formState, message: e.target.value })}
                                    placeholder="Tell me about your project..."
                                    className="w-full px-5 py-4 bg-black/40 border border-neutral-800 rounded-xl text-white placeholder:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all resize-none"
                                />
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={status !== "idle"}
                                className="relative w-full group overflow-hidden rounded-xl bg-white text-black font-bold text-lg px-6 py-4 disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-indigo-400 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                <div className="relative flex items-center justify-center gap-2">
                                    {status === "idle" && (
                                        <>
                                            <span>Send Message</span>
                                            <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                        </>
                                    )}
                                    {status === "submitting" && (
                                        <span className="flex items-center gap-2">
                                            <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                                            Sending...
                                        </span>
                                    )}
                                    {status === "success" && (
                                        <span className="flex items-center gap-2 text-green-700">
                                            <CheckCircle2 className="w-5 h-5" />
                                            Sent!
                                        </span>
                                    )}
                                </div>
                            </button>
                        </div>
                    </form>
                </motion.div>
            </div>
        </section>
    );
}