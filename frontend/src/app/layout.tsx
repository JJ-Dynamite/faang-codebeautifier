import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Cleanly format any code',
  description: 'Cleanly format any code - Built with Rust + Next.js',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
