import NavBar from '@/components/NavBar';
import { getAllIdeas } from '@/lib/content';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    const ideas = getAllIdeas();
    const idea = ideas.find((i) => i.slug === params.slug);

    if (!idea) return { title: 'Not Found' };

    return {
        title: `${idea.title} | BNN`,
        description: idea.description,
        openGraph: {
            title: `${idea.title} | BNN`,
            description: idea.description,
            type: 'article',
        },
    };
}

export async function generateStaticParams() {
    const ideas = getAllIdeas();
    return ideas.map((idea) => ({
        slug: idea.slug,
    }));
}

export default function IdeaPage({ params }: { params: { slug: string } }) {
    const ideas = getAllIdeas();
    const idea = ideas.find((i) => i.slug === params.slug);

    if (!idea) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-black text-white pt-24 px-8 md:px-20 pb-20">
            <NavBar />

            <article className="max-w-3xl mx-auto">
                <Link href="/ideas" className="text-zinc-400 hover:text-emerald-400 mb-8 inline-block transition-colors">
                    ← Back to Neural Map
                </Link>

                <header className="mb-12">
                    <div className="flex justify-between items-start mb-6">
                        <div className="flex flex-wrap gap-3">
                            {idea.tags.map(tag => (
                                <span key={tag} className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs uppercase tracking-wider">
                                    {tag}
                                </span>
                            ))}
                        </div>
                        <span className="text-sm font-mono text-zinc-600">#{idea.id}</span>
                    </div>

                    <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight text-white">{idea.title}</h1>
                    <p className="text-sm font-mono text-gray-500 mb-8">{idea.date}</p>
                </header>

                <div className="prose prose-invert prose-lg max-w-none prose-headings:text-white prose-a:text-emerald-400 hover:prose-a:text-emerald-300 prose-code:text-emerald-300 prose-code:bg-emerald-900/20 prose-code:px-1 prose-code:rounded">
                    <div className="whitespace-pre-wrap font-sans text-gray-300 leading-relaxed">
                        {idea.content}
                    </div>
                </div>

                {idea.connections.length > 0 && (
                    <div className="mt-16 pt-8 border-t border-zinc-800/50">
                        <h3 className="text-lg font-bold text-zinc-400 mb-4 uppercase tracking-wider">Connected Nodes</h3>
                        <div className="flex flex-wrap gap-4">
                            {idea.connections.map(connectionId => {
                                const connectedIdea = ideas.find(i => i.id === connectionId);
                                if (!connectedIdea) return null;
                                return (
                                    <Link key={connectionId} href={`/ideas/${connectedIdea.slug}`} className="px-4 py-2 bg-zinc-900/20 border border-zinc-800 rounded-lg hover:bg-zinc-900/40 hover:border-emerald-500/50 transition-all text-sm text-zinc-300 hover:text-white">
                                        {connectedIdea.title}
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                )}
            </article>
        </main>
    );
}
