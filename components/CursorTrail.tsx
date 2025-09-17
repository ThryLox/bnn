"use client";

import { useEffect, useRef } from "react";

interface Point {
    x: number;
    y: number;
    age: number; // 0 to 1 (1 = dead)
}

export default function CursorTrail() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const pointsRef = useRef<Point[]>([]);
    const lastPosRef = useRef<{ x: number; y: number } | null>(null);
    const requestRef = useRef<number>();

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Set canvas size
        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        handleResize();
        window.addEventListener("resize", handleResize);

        // Mouse tracking
        const handleMouseMove = (e: MouseEvent) => {
            const current = { x: e.clientX, y: e.clientY };

            if (lastPosRef.current) {
                // Interpolate
                const dist = Math.hypot(current.x - lastPosRef.current.x, current.y - lastPosRef.current.y);
                const steps = Math.ceil(dist / 2); // More dense: point every 2px

                for (let i = 1; i <= steps; i++) {
                    const t = i / steps;
                    pointsRef.current.push({
                        x: lastPosRef.current.x + (current.x - lastPosRef.current.x) * t,
                        y: lastPosRef.current.y + (current.y - lastPosRef.current.y) * t,
                        age: 0
                    });
                }
            } else {
                pointsRef.current.push({ x: current.x, y: current.y, age: 0 });
            }
            lastPosRef.current = current;
        };
        window.addEventListener("mousemove", handleMouseMove);

        // Animation Loop
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Update and draw points
            // We iterate backwards to allow easy removal
            for (let i = pointsRef.current.length - 1; i >= 0; i--) {
                const p = pointsRef.current[i];
                p.age += 0.02; // Fade speed

                if (p.age >= 1) {
                    pointsRef.current.splice(i, 1);
                    continue;
                }

                const opacity = 1 - p.age;
                const size = 3 * (1 - p.age * 0.5); // Shrink slightly

                ctx.beginPath();
                ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`; // White
                ctx.fill();
            }

            requestRef.current = requestAnimationFrame(animate);
        };
        requestRef.current = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener("resize", handleResize);
            window.removeEventListener("mousemove", handleMouseMove);
            if (requestRef.current) cancelAnimationFrame(requestRef.current);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="pointer-events-none fixed inset-0 z-[9999]"
        />
    );
}
