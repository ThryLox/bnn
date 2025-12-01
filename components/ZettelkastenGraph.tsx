"use client";

import { useMemo, useCallback, useRef, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Idea } from '@/lib/content';
import * as THREE from 'three';
import { useRouter } from 'next/navigation';

// Dynamic import to avoid SSR issues with ForceGraph
const ForceGraph3D = dynamic(() => import('react-force-graph-3d'), { ssr: false });

interface GraphProps {
    ideas: Idea[];
}

export default function ZettelkastenGraph({ ideas }: GraphProps) {
    const router = useRouter();
    const fgRef = useRef<any>();

    const graphData = useMemo(() => {
        const nodes = ideas.map(idea => ({
            id: idea.id,
            name: idea.title,
            group: idea.tags[0] || 'default',
            val: 5, // massive size for maximum visibility
            slug: idea.slug // pass slug for navigation
        }));

        const links: { source: string; target: string }[] = [];
        ideas.forEach(idea => {
            idea.connections.forEach(targetId => {
                if (ideas.find(i => i.id === targetId)) {
                    links.push({
                        source: idea.id,
                        target: targetId
                    });
                }
            });
        });

        return { nodes, links };
    }, [ideas]);

    const handleNodeClick = useCallback((node: any) => {
        if (node.slug) {
            router.push(`/ideas/${node.slug}`);
        }
    }, [router]);

    // Center graph on load with dynamic zoom
    useEffect(() => {
        if (fgRef.current) {
            // Wait for simulation to stabilize slightly
            setTimeout(() => {
                if (ideas.length < 5) {
                    // Stronger repulsion to spread them out
                    fgRef.current.d3Force('charge').strength(-500);
                    // Add link distance force to keep connected nodes somewhat related
                    fgRef.current.d3Force('link').distance(50);

                    // Very close camera
                    fgRef.current.cameraPosition({ x: 0, y: 0, z: 30 }, { x: 0, y: 0, z: 0 }, 1000);
                } else {
                    // Standard repulsion for larger graphs
                    fgRef.current.d3Force('charge').strength(-120);
                    // Zero padding
                    fgRef.current.zoomToFit(1000, 0);
                }
            }, 600);
        }
    }, [graphData, ideas.length]);

    return (
        <div className="w-full h-[500px] md:h-[600px] rounded-xl overflow-hidden relative group bg-black/20 backdrop-blur-sm border border-white/5">
            {/* Subtle gradient overlay instead of heavy border */}
            {/* Subtle gradient overlay instead of heavy border */}
            <div className="absolute inset-0 bg-gradient-to-b from-zinc-900/10 to-transparent pointer-events-none" />

            <div className="absolute top-4 left-4 z-10 pointer-events-none">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                    Neural Map
                </h3>
            </div>

            <div className="absolute bottom-4 right-4 z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <p className="text-xs text-zinc-500">Click nodes to navigate</p>
            </div>

            <ForceGraph3D
                ref={fgRef}
                graphData={graphData}
                nodeLabel="name"
                nodeColor={node => "#a1a1aa"} // Zinc-400
                nodeRelSize={8} // Larger nodes
                nodeResolution={16}
                linkColor={() => "#71717a"} // Zinc-500
                linkWidth={3} // Much thicker links
                linkOpacity={0.5} // More visible
                backgroundColor="rgba(0,0,0,0)"
                showNavInfo={false}
                d3VelocityDecay={0.2} // More drag
                cooldownTicks={100}
                onNodeClick={handleNodeClick}
                nodeThreeObjectExtend={true} // Allow custom shaders if needed later
                controlType="orbit"
            />
        </div>
    );
}
