"use client";

import NavBar from '@/components/NavBar';

export default function LeadershipPage() {
    return (
        <main className="min-h-screen bg-black text-white">
            <NavBar />
            <div className="pt-32 px-8 max-w-4xl mx-auto">
                <h1 className="text-5xl font-bold mb-8 text-blue-500">Leadership</h1>
                <p className="text-xl text-gray-300">
                    Meet the team driving the Beloit Neural Network.
                </p>
                {/* Content will go here */}
            </div>
        </main>
    );
}
