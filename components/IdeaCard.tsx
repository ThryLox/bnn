import Link from 'next/link';
import { Idea } from '@/lib/content';

export default function IdeaCard({ idea }: { idea: Idea }) {
    return (
        <Link href={`/ideas/${idea.slug}`} className="block group h-full">
            <div className="h-full p-6 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 backdrop-blur-sm flex flex-col">
                <div className="flex justify-between items-start mb-4 opacity-60 group-hover:opacity-100 transition-opacity">
                    <span className="text-xs font-mono text-zinc-400">{idea.date}</span>
                    <span className="text-xs font-mono text-zinc-500">#{idea.id}</span>
                </div>

                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-white transition-colors">
                    {idea.title}
                </h3>

                <div className="flex flex-wrap gap-2 mt-auto pt-4">
                    {idea.tags.map((tag) => (
                        <span key={tag} className="text-[10px] uppercase tracking-wider px-2 py-1 rounded-full bg-zinc-500/10 text-zinc-300 border border-zinc-500/20">
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        </Link>
    );
}
