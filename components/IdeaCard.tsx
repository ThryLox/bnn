import Link from 'next/link';
import { Idea } from '@/lib/content';

export default function IdeaCard({ idea }: { idea: Idea }) {
    return (
        <Link href={`/ideas/${idea.slug}`} className="group block p-6 h-full bg-zinc-900/30 border border-zinc-800/50 hover:border-emerald-500/30 rounded-xl transition-all duration-300 hover:bg-zinc-900/50">
            <div className="flex flex-wrap gap-2 mb-4">
                {idea.tags.map(tag => (
                    <span key={tag} className="px-2 py-1 text-xs rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        {tag}
                    </span>
                ))}
            </div>
            <h3 className="text-xl font-semibold mb-2 text-zinc-200 group-hover:text-white transition-colors">{idea.title}</h3>
            <p className="text-zinc-500 text-sm line-clamp-3 group-hover:text-zinc-400 transition-colors">
                {idea.description}
            </p>
        </Link>
    );
}
