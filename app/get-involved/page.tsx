"use client";

import NavBar from '@/components/NavBar';

export default function GetInvolvedPage() {
    return (
        <main className="min-h-screen bg-black text-white">
            <NavBar />
            <div className="pt-32 px-8 max-w-4xl mx-auto">
                <h1 className="text-5xl font-bold mb-8 text-[#F2A900]">Get Involved</h1>
                <p className="text-xl text-gray-300">
                    Join our mission to explore artificial intelligence.
                </p>
                {/* Content will go here */}
            </div>
        </main>
    );
}
