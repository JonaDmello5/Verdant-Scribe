import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact | Verdant Scribe',
  description: 'Get in touch with the team at Verdant Scribe.',
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
