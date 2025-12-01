import NavBar from '@/components/NavBar';
import { getAboutContent } from '@/lib/content';

export default function AboutPage() {
    const { title, description, content } = getAboutContent();

    return (
        <main className="min-h-screen bg-black text-white pt-24 px-8 md:px-20 pb-20">
            <NavBar />

            <article className="max-w-3xl mx-auto">
                <header className="mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight text-white">{title}</h1>
                    <p className="text-xl text-zinc-400 font-light">{description}</p>
                </header>

                <div className="prose prose-invert prose-lg max-w-none prose-headings:text-white prose-a:text-zinc-300 hover:prose-a:text-white prose-strong:text-zinc-200">
                    <div className="whitespace-pre-wrap font-sans text-gray-300 leading-relaxed">
                        {content}
                    </div>
                </div>
            </article>
        </main>
    );
}
