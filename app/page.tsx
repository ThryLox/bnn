"use client";
import dynamic from 'next/dynamic';
import NavBar from '@/components/NavBar';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const BrainScene = dynamic(() => import('@/components/BrainScene'), { ssr: false });

export default function Home() {
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
            <p className="text-indigo-300 mt-4 text-lg md:text-xl font-light tracking-wide">Narrating Consciousness Through Code</p>
            <p className="text-indigo-400/60 mt-2 text-sm">connect@hxrnoorsingh.com</p>
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
            <h2 className="text-4xl font-bold mb-8 tracking-tight text-indigo-400">Craft</h2>
            <p className="text-gray-400 text-lg max-w-2xl leading-relaxed">
              Welcome to the Zettelkasten Galaxy. Here, ideas are not just static text, but living nodes in a network of thought.
              Scroll down to explore the connections between design, cognition, and code.
            </p>
            {/* Placeholder for future content */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-6 border border-indigo-900/50 rounded-lg bg-indigo-950/20 hover:bg-indigo-950/40 transition-colors cursor-pointer">
                <h3 className="text-xl font-semibold mb-2">System Architecture</h3>
                <p className="text-sm text-gray-500">Designing scalable, resilient digital ecosystems.</p>
              </div>
              <div className="p-6 border border-indigo-900/50 rounded-lg bg-indigo-950/20 hover:bg-indigo-950/40 transition-colors cursor-pointer">
                <h3 className="text-xl font-semibold mb-2">Neural Interfaces</h3>
                <p className="text-sm text-gray-500">Bridging the gap between biological and artificial intelligence.</p>
              </div>
            </div>
          </motion.div>
        </section>
      </div>
    </main>
  );
}
