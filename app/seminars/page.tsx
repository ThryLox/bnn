"use client";

import NavBar from '@/components/NavBar';

export default function SeminarsPage() {
    return (
        <main className="min-h-screen bg-black text-white">
            <NavBar />
            <div className="pt-32 px-8 max-w-4xl mx-auto">
                <h1 className="text-5xl font-bold mb-8 text-purple-400">Seminars</h1>
                <p className="text-xl text-gray-300">
                    Workshops, talks, and hands-on sessions.
                </p>
            </div>
        </main>
    );
}
