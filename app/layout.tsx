import type { Metadata } from "next";
import "./globals.css";
import CursorTrail from "@/components/CursorTrail";

export const metadata: Metadata = {
  title: "Harnoor Singh",
  description: "Exploring consciousness, cognition, and design through interactive 3D systems.",
  openGraph: {
    title: 'Harnoor Singh | Cognitive Web',
    description: 'Narrating Consciousness Through Code',
    url: 'https://hxrnoorsingh.com',
    images: ['/og-preview.png'],
  },
  twitter: { card: 'summary_large_image', site: '@hxrnoorsingh' },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased text-white bg-black selection:bg-zinc-500/30" suppressHydrationWarning>
        <CursorTrail />
        {children}
      </body>
    </html>
  );
}
