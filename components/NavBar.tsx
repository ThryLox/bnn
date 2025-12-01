import Link from 'next/link';

export default function NavBar() {
    return (
        <nav className="fixed top-0 left-0 w-full p-6 z-50 flex justify-between items-center text-white bg-gradient-to-b from-black/50 to-transparent">
            <Link href="/" className="text-2xl font-bold tracking-tighter">Harnoor Singh</Link>
            <div className="space-x-8 text-sm font-medium tracking-wide">
                <Link href="/about" className="hover:text-indigo-400 transition-colors">About</Link>
                <Link href="/craft" className="hover:text-indigo-400 transition-colors">Craft</Link>
                <Link href="/ideas" className="hover:text-indigo-400 transition-colors">Ideas</Link>
            </div>
        </nav>
    );
}
