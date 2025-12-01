import NavBar from '@/components/NavBar';

export default function AboutPage() {
    return (
        <main className="min-h-screen pt-24 px-8 md:px-20">
            <NavBar />
            <h1 className="text-4xl font-bold mb-8 tracking-tight text-white">About</h1>
            <p className="text-gray-400">Exploring consciousness, cognition, and design.</p>
        </main>
    );
}
