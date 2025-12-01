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
                        <h1 className="text-4xl md:text-6xl font-bold text-white tracking-[0.2em] uppercase opacity-90">Consciousness</h1>
                        <p className="text-zinc-400 mt-4 text-lg md:text-xl font-light tracking-wide">Narrating Consciousness Through Code</p>
                        <p className="text-zinc-500 mt-2 text-sm">connect@hxrnoorsingh.com</p>
                    </div>
                </section>

                {/* Craft Section */}
                <section className="min-h-screen bg-black text-white px-8 md:px-20 py-24 pointer-events-auto"> {/* Re-enable interaction for content */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <div className="flex justify-between items-end mb-8">
                            <h2 className="text-4xl font-bold tracking-tight text-white">Craft</h2>
                            <Link href="/craft" className="text-sm text-gray-500 hover:text-emerald-400 transition-colors">View All →</Link>
                        </div>

                        <p className="text-gray-400 text-lg max-w-2xl leading-relaxed mb-12">
                            Welcome to the Zettelkasten Galaxy. Here, ideas are not just static text, but living nodes in a network of thought.
                            Scroll down to explore the connections between design, cognition, and code.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {projects.map((project) => (
                                <Link key={project.id} href={`/craft/${project.slug}`} className="group block">
                                    <div className="h-full p-6 border border-zinc-800 rounded-lg bg-zinc-900/20 hover:bg-zinc-900/40 hover:border-emerald-500/50 transition-colors cursor-pointer">
                                        <h3 className="text-xl font-semibold mb-2 group-hover:text-white transition-colors">{project.title}</h3>
                                        <p className="text-sm text-gray-500 line-clamp-2">{project.description}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                </section>

                {/* Ideas Section */}
                <section className="min-h-screen bg-black text-white px-8 md:px-20 py-24 pointer-events-auto border-t border-zinc-800/50">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <div className="flex justify-between items-end mb-8">
                            <h2 className="text-4xl font-bold tracking-tight text-white">Neural Map</h2>
                            <Link href="/ideas" className="text-sm text-gray-500 hover:text-emerald-400 transition-colors">Explore Graph →</Link>
                        </div>

                        <p className="text-gray-400 text-lg max-w-2xl leading-relaxed mb-12">
                            Fragments of thought, connected. Navigate the knowledge graph to see how concepts interlink.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {ideas.map((idea) => (
                                <Link key={idea.id} href={`/ideas/${idea.slug}`} className="group block h-full">
                                    <div className="h-full p-6 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 backdrop-blur-sm flex flex-col">
                                        <div className="flex justify-between items-start mb-4 opacity-60 group-hover:opacity-100 transition-opacity">
                                            <span className="text-xs font-mono text-zinc-400">{idea.date}</span>
                                        </div>
                                        <h3 className="text-lg font-bold text-white mb-2 group-hover:text-zinc-300 transition-colors">
                                            {idea.title}
                                        </h3>
                                        <div className="flex flex-wrap gap-2 mt-auto pt-4">
                                            {idea.tags.slice(0, 2).map((tag) => (
                                                <span key={tag} className="text-[10px] uppercase tracking-wider px-2 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                </section>
            </div>
        </main>
    );
}
