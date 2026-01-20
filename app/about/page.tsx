import NavBar from '@/components/NavBar';
import { getAboutContent } from '@/lib/content';

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-black text-white pt-32 px-8 md:px-20 pb-20">
            <NavBar />

            <div className="max-w-4xl mx-auto space-y-16">
                {/* Header */}
                <header className="text-center mb-20">
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight text-white">About Us</h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        We are the Beloit Neural Network.
                    </p>
                </header>

                {/* Identity Section */}
                <section className="bg-white/5 p-8 md:p-12 rounded-3xl border border-white/10 relative overflow-hidden group hover:border-[#F2A900]/50 transition-colors duration-500">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#003865] blur-3xl rounded-full opacity-20 group-hover:opacity-40 transition-opacity"></div>
                    <h2 className="text-3xl font-bold text-white mb-6 border-l-4 border-[#F2A900] pl-4">Identity</h2>
                    <p className="text-lg text-gray-300 leading-relaxed">
                        The Beloit Neural Network (BNN) is more than just a club; we are a collective of forward-thinkers, engineers, and visionaries.
                        Rooted in the liberal arts tradition of Beloit College, we bridge the gap between abstract consciousness and executable code.
                        We identify as explorers of the "black box"—constantly probing the limits of what Artificial Intelligence can achieve
                        when paired with human creativity.
                    </p>
                </section>

                {/* Vision Section */}
                <section className="bg-white/5 p-8 md:p-12 rounded-3xl border border-white/10 relative overflow-hidden group hover:border-[#F2A900]/50 transition-colors duration-500">
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#F2A900] blur-3xl rounded-full opacity-10 group-hover:opacity-30 transition-opacity"></div>
                    <h2 className="text-3xl font-bold text-white mb-6 border-l-4 border-[#003865] pl-4">Vision</h2>
                    <p className="text-lg text-gray-300 leading-relaxed">
                        Our vision is to democratize high-level engineering and AI concepts, making them accessible to every discipline on campus.
                        We visualize a campus where an Anthropologist uses ML to analyze culture, where an artist uses neural style transfer,
                        and where Computer Science students push the boundaries of LLMs.
                        We aim to build a "Neural Network" of students—connected, intelligent, and continuously learning from one another.
                    </p>
                </section>

                {/* Intro Video Placeholder */}
                <section className="text-center py-12">
                    <div className="w-full aspect-video bg-zinc-900 rounded-2xl flex items-center justify-center border border-zinc-800">
                        <p className="text-gray-500 font-mono">[Introduction Video Placeholder]</p>
                    </div>
                    <p className="mt-4 text-sm text-gray-500">See what we're building.</p>
                </section>
            </div>
        </main>
    );
}
