"use client";

import NavBar from '@/components/NavBar';

export default function ClubRulesPage() {
    return (
        <main className="min-h-screen bg-black text-white">
            <NavBar />
            <div className="pt-32 px-8 max-w-4xl mx-auto">
                <h1 className="text-5xl font-bold mb-8 text-[#F2A900]">Club Rules</h1>
                <p className="text-xl text-gray-300 mb-8">
                    Our Code of Conduct and Operational Guidelines.
                </p>
                <div className="bg-white/5 p-8 rounded-2xl border border-white/10">
                    <h2 className="text-2xl font-bold text-blue-400 mb-4">1. Respect & Collaboration</h2>
                    <p className="text-gray-400">We foster a supportive environment for all levels of AI enthusiasts.</p>
                </div>
            </div>
        </main>
    );
}
