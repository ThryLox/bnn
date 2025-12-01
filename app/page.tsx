"use client";
import dynamic from 'next/dynamic';
import NavBar from '@/components/NavBar';

const BrainScene = dynamic(() => import('@/components/BrainScene'), { ssr: false });

export default function Home() {
  return (
    <main className="relative w-full h-screen overflow-hidden">
      <NavBar />
      <BrainScene />
      <div className="absolute bottom-10 w-full text-center pointer-events-none z-10">
        <h1 className="text-4xl md:text-6xl font-bold text-white tracking-[0.2em] uppercase opacity-90">Consciousness</h1>
        <p className="text-indigo-300 mt-4 text-lg md:text-xl font-light tracking-wide">Narrating Consciousness Through Code</p>
        <p className="text-indigo-400/60 mt-2 text-sm">connect@hxrnoorsingh.com</p>
      </div>
    </main>
  );
}
