import NavBar from '@/components/NavBar';

export default function IdeasPage() {
    return (
        <main className="min-h-screen pt-24 px-8 md:px-20">
            <NavBar />
            <h1 className="text-4xl font-bold mb-8 tracking-tight text-white">Ideas</h1>
            <p className="text-gray-400">Modular Zettelkasten ideas...</p>
        </main>
    );
}
