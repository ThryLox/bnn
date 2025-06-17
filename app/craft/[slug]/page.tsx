import NavBar from '@/components/NavBar';
import { getAllProjects } from '@/lib/content';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    const projects = getAllProjects();
    const project = projects.find((p) => p.slug === params.slug);

    if (!project) return { title: 'Not Found' };

    return {
        title: `${project.title} | BNN`,
        description: project.description,
        openGraph: {
            title: `${project.title} | BNN`,
            description: project.description,
            type: 'website',
        },
    };
}

export async function generateStaticParams() {
    const projects = getAllProjects();
    return projects.map((project) => ({
        slug: project.slug,
    }));
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
    const projects = getAllProjects();
    const project = projects.find((p) => p.slug === params.slug);

    if (!project) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-black text-white pt-24 px-8 md:px-20 pb-20">
            <NavBar />

            <article className="max-w-3xl mx-auto">
                <Link href="/craft" className="text-zinc-400 hover:text-emerald-400 mb-8 inline-block transition-colors">
                    ← Back to Craft
                </Link>

                <header className="mb-12">
                    <div className="flex flex-wrap gap-3 mb-6">
                        {project.tags.map(tag => (
                            <span key={tag} className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs uppercase tracking-wider">
                                {tag}
                            </span>
                        ))}
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight text-white">{project.title}</h1>
                    <p className="text-xl text-gray-400 leading-relaxed">{project.description}</p>

                    {project.link && (
                        <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 mt-6 px-6 py-3 bg-white hover:bg-emerald-50 text-black rounded-lg font-medium transition-colors"
                        >
                            View Project External
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M7 17L17 7" />
                                <path d="M7 7h10v10" />
                            </svg>
                        </a>
                    )}
                </header>

                <div className="prose prose-invert prose-lg max-w-none prose-headings:text-white prose-a:text-emerald-400 hover:prose-a:text-emerald-300 prose-strong:text-emerald-200">
                    {/* 
                In a real app, you'd use a markdown renderer here like 'react-markdown' 
                For now, we'll just display the raw content or simple paragraphs
            */}
                    <div className="whitespace-pre-wrap font-sans text-gray-300 leading-relaxed">
                        {project.content}
                    </div>
                </div>
            </article>
        </main>
    );
}
