import NavBar from '@/components/NavBar';
import { getAllProjects } from '@/lib/content';
import Link from 'next/link';

export default function CraftPage() {
    const projects = getAllProjects();

    return (
        <main className="min-h-screen bg-black text-white pt-24 px-8 md:px-20 pb-20">
            <NavBar />
            <header className="mb-16 max-w-4xl">
                <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight text-white">
                    <span className="text-zinc-500">Craft</span> / Projects
                </h1>
                <p className="text-gray-400 text-lg leading-relaxed max-w-2xl">
                    A showcase of engineered reality. Systems, applications, and experiments.
                </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {projects.map((project) => (
                    <Link key={project.id} href={`/craft/${project.slug}`} className="group block">
                        <div className="h-full p-8 border border-zinc-800/50 rounded-2xl bg-zinc-900/10 hover:bg-zinc-900/30 transition-all duration-300 hover:border-zinc-500/50 hover:shadow-[0_0_30px_rgba(255,255,255,0.1)]">
                            <div className="flex justify-between items-start mb-6">
                                <div className="flex gap-2">
                                    {project.tags.slice(0, 3).map(tag => (
                                        <span key={tag} className="text-[10px] uppercase tracking-wider px-2 py-1 rounded-full bg-zinc-800/50 text-zinc-300 border border-zinc-700/30">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                                <span className="text-xs font-mono text-zinc-600">{project.date}</span>
                            </div>

                            <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-white transition-colors">
                                {project.title}
                            </h3>
                            <p className="text-gray-400 leading-relaxed mb-6">
                                {project.description}
                            </p>

                            <span className="text-zinc-400 text-sm font-medium group-hover:translate-x-2 transition-transform inline-block">
                                Read Case Study →
                            </span>
                        </div>
                    </Link>
                ))}
            </div>
        </main>
    );
}
