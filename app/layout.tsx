import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Lozikheyi Estate | A New Standard of Living',
  description: 'Explore the Lozikheyi Estate concept — an interactive residential development experience by VanillaWebz.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
