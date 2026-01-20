"use client";

import dynamic from 'next/dynamic';
import NavBar from '@/components/NavBar';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import { Project, Idea } from '@/lib/content';

const BrainScene = dynamic(() => import('@/components/BrainScene'), { ssr: false });

interface LandingPageProps {
    projects: Project[];
    ideas: Idea[];
}

export default function LandingPage({ projects, ideas }: LandingPageProps) {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll(); // Track window scroll by default

    const opacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]); // Fade out by 40% scroll
    const scale = useTransform(scrollYProgress, [0, 0.4], [1, 0.8]);
    const y = useTransform(scrollYProgress, [0, 0.4], [0, 100]); // Parallax move down

    return (
        <main ref={containerRef} className="relative w-full min-h-[200vh] bg-black">
            <NavBar />

            {/* Fixed Background Layer - Z-0 */}
            <motion.div
                style={{ opacity, scale, y }}
                className="fixed top-0 left-0 w-full h-screen z-0"
            >
                <BrainScene />
            </motion.div>

            {/* Scrollable Content Layer - Z-10 */}
            {/* pointer-events-none ensures clicks pass through to the brain in empty areas */}
            <div className="relative z-10 pointer-events-none">

                {/* Hero Section */}
                <section className="h-screen flex flex-col items-center justify-end pb-20">
                    <div className="text-center pointer-events-auto"> {/* Enable text selection if needed */}
                        <h1 className="text-4xl md:text-6xl font-bold text-white tracking-[0.2em] uppercase opacity-90">Beloit Neural Network</h1>
                        <p className="text-gray-400 mt-4 text-lg md:text-xl font-light tracking-wide">Connecting Campus Consciousness</p>
                        <p className="text-[#F2A900] mt-2 text-sm font-bold">est. 2025</p>
                    </div>
                </section>

                <section className="min-h-screen bg-black text-white px-8 md:px-20 py-24 pointer-events-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="max-w-4xl mx-auto text-center"
                    >
                        <h2 className="text-4xl font-bold tracking-tight text-white mb-8">Connecting Campus Consciousness</h2>
                        <p className="text-gray-400 text-lg leading-relaxed mb-12">
                            The Beloit Neural Network is dedicated to fostering AI awareness, engineering excellence, and collaborative learning at Beloit College.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl mx-auto text-left mt-20">
                            {[
                                { title: "About", desc: "Our mission & vision", href: "/about" },
                                { title: "Leadership", desc: "Meet the team", href: "/leadership" },
                                { title: "Get Involved", desc: "Join the revolution", href: "/get-involved" },
                                { title: "Study Groups", desc: "Collaborative learning", href: "/study-groups" },
                                { title: "Seminars", desc: "Workshops & Talks", href: "/seminars" },
                                { title: "Club Rules", desc: "Code of Conduct", href: "/club-rules" },
                            ].map((item, i) => (
                                <Link key={i} href={item.href} className="group relative overflow-hidden p-8 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-300 backdrop-blur-md">
                                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 transition-opacity">
                                        <div className="w-16 h-16 rounded-full bg-[#F2A900] blur-xl"></div>
                                    </div>
                                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-[#F2A900] transition-colors">{item.title}</h3>
                                    <p className="text-gray-400 text-sm group-hover:text-gray-200 transition-colors">{item.desc}</p>
                                    <div className="mt-4 w-8 h-px bg-white/20 group-hover:w-full group-hover:bg-[#F2A900] transition-all duration-500"></div>
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                </section>
            </div>
        </main>
    );
}
