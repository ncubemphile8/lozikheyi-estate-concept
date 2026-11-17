import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Lozikheyi Estate | Residential Development, Bulawayo',
    template: '%s | Lozikheyi Estate',
  },
  description: 'Explore Lozikheyi Estate, a residential development promoted by Southland Regional in partnership with NMB Properties, located along Khami Road in Bulawayo. View house concepts and request development information.',
  applicationName: 'Lozikheyi Estate',
  openGraph: {
    title: 'Lozikheyi Estate | Bulawayo',
    description: 'Explore the residential development, house concepts and enquiry options for Lozikheyi Estate in Bulawayo.',
    type: 'website',
    locale: 'en_ZW',
    siteName: 'Lozikheyi Estate',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en-ZW"><body>{children}</body></html>;
}
