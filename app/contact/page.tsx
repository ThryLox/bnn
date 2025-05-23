"use client";

import NavBar from '@/components/NavBar';

export default function ContactPage() {
    return (
        <main className="min-h-screen bg-black text-white">
            <NavBar />
            <div className="pt-32 px-8 max-w-4xl mx-auto">
                <h1 className="text-5xl font-bold mb-8 text-[#F2A900]">Contact Us</h1>
                <p className="text-xl text-gray-300">
                    Student suggestion box and contact info.
                </p>
            </div>
        </main>
    );
}
