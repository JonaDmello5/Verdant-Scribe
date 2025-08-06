
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'My Garden | Verdant Scribe',
  description: 'Cultivate your own digital garden.',
  alternates: {
    canonical: '/garden',
  },
};

export default function GardenLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
