"use client";

import NavBar from '@/components/NavBar';

export default function StudyGroupsPage() {
    return (
        <main className="min-h-screen bg-black text-white">
            <NavBar />
            <div className="pt-32 px-8 max-w-4xl mx-auto">
                <h1 className="text-5xl font-bold mb-8 text-blue-400">Study Groups</h1>
                <p className="text-xl text-gray-300">
                    Collaboratve learning tracks for ML and Deep Learning.
                </p>
            </div>
        </main>
    );
}
