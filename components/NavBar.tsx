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
            <Link href="/" className="text-2xl font-bold tracking-tighter">Harnoor Singh</Link>
            <div className="space-x-8 text-sm font-medium tracking-wide">
                <Link href="/about" className="hover:text-white transition-colors">About</Link>
                <Link href="/craft" className="hover:text-white transition-colors">Craft</Link>
                <Link href="/ideas" className="hover:text-white transition-colors">Ideas</Link>
            </div>
        </motion.nav>
    );
}
