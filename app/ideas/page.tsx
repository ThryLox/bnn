import NavBar from '@/components/NavBar';
import { getAllIdeas } from '@/lib/content';
import IdeaCard from '@/components/IdeaCard';
import ZettelkastenGraph from '@/components/ZettelkastenGraph';

export default function IdeasPage() {
    const ideas = getAllIdeas();

    return (
        <main className="min-h-screen bg-black text-white pt-24 px-8 md:px-20 pb-20">
            <NavBar />

            <header className="mb-16 max-w-4xl">
                <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight text-white">
                    <span className="text-emerald-500">Zettelkasten</span> / Ideas
                </h1>
                <p className="text-gray-400 text-lg leading-relaxed max-w-2xl">
                    A collection of thoughts, snippets, and explorations.
                    Each node is a potential connection in the cognitive web.
                </p>
            </header>

            <div className="mb-12">
                <ZettelkastenGraph ideas={ideas} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {ideas.map((idea) => (
                    <IdeaCard key={idea.id} idea={idea} />
                ))}
            </div>
        </main>
    );
}
