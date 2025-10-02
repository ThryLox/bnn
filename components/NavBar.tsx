"use client";

import Link from 'next/link';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { useState } from 'react';

export default function NavBar() {
    const { scrollY } = useScroll();
    const [hidden, setHidden] = useState(false);

    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious() || 0;
        if (latest > previous && latest > 150) {
            setHidden(true);
        } else {
            setHidden(false);
        }
    });

    return (
        <motion.nav
            variants={{
                visible: { y: 0 },
                hidden: { y: "-100%" },
            }}
            animate={hidden ? "hidden" : "visible"}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="fixed top-0 left-0 w-full p-6 z-50 flex justify-between items-center text-white bg-gradient-to-b from-black/80 to-transparent backdrop-blur-sm"
        >
            <div className="flex items-center gap-4">
                <Link href="/" className="text-2xl font-bold tracking-tighter hover:text-white/80 transition-opacity">BNN</Link>
                <span className="text-xs font-mono text-[#F2A900] border border-[#F2A900]/30 px-2 py-1 rounded-full bg-[#F2A900]/10">
                    est. 2025
                </span>
            </div>

            <div className="flex space-x-6 text-sm font-medium tracking-wide">
                <Link href="/contact" className="text-white hover:text-[#F2A900] transition-colors border-b border-transparent hover:border-[#F2A900]">
                    Contact
                </Link>
            </div>
        </motion.nav>
    );
}
