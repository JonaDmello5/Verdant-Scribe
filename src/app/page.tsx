
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Leaf } from 'lucide-react';
import Header from '@/components/header';
import Image from 'next/image';
import Head from 'next/head';

export default function LandingPage() {
  return (
    <>
    <Head>
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9370081174240595"
     crossOrigin="anonymous"></script>
    </Head>
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-grow">
        <section className="container mx-auto max-w-5xl px-4 py-20 text-center">
          <Leaf className="w-16 h-16 mx-auto text-primary mb-6" />
          <h1 className="text-5xl md:text-6xl font-bold font-headline text-primary mb-6">
            Welcome to Verdant Scribe
          </h1>
          <p className="text-xl text-muted-foreground mb-10 max-w-3xl mx-auto">
            A digital sanctuary where your thoughts can grow. Verdant Scribe is a new kind of journaling app that turns your words into a beautiful, ever-evolving digital garden. Each entry you write blossoms into a unique plant, creating a visual representation of your creative journey.
          </p>
          <div className="flex justify-center gap-4">
            <Button asChild size="lg">
              <Link href="/garden">
                Start Your Garden <ArrowRight className="ml-2" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/about">Learn More</Link>
            </Button>
          </div>
        </section>

        <section className="bg-card/50">
          <div className="container mx-auto max-w-5xl px-4 py-20 grid md:grid-cols-2 gap-12 items-center">
            <div>
              <Image 
                src="/images/image.png" 
                alt="A placeholder image representing a garden."
                data-ai-hint="garden illustration"
                width={600}
                height={400}
                className="rounded-lg shadow-xl"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold font-headline mb-4">Cultivate Your Ideas</h2>
              <p className="text-muted-foreground text-lg mb-4">
                In your private garden, each note you write becomes a unique plant. Watch your ideas take root and flourish as you write. The more you nurture your thoughts, the more vibrant your garden becomes. This is not just a notes app; it is a space for mindfulness and creativity. Our goal is to provide a calm, organic, and visually rewarding journaling experience.
              </p>
              <ul className="list-disc list-inside space-y-2 text-lg">
                <li><span className="font-semibold text-primary">Write Freely:</span> Capture thoughts, big or small.</li>
                <li><span className="font-semibold text-primary">Watch it Grow:</span> See a visual representation of your work.</li>
                <li><span className="font-semibold text-primary">Stay Mindful:</span> Experience a calmer, more organic way to journal.</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="container mx-auto max-w-5xl px-4 py-20 text-center">
          <h2 className="text-3xl font-bold font-headline mb-6">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-card p-6 rounded-lg shadow-md border border-border/50">
              <h3 className="text-2xl font-bold mb-2 font-headline">Private & Secure</h3>
              <p className="text-muted-foreground">Everything you write is stored locally in your browser. No accounts, no clouds. Just your space.</p>
            </div>
            <div className="bg-card p-6 rounded-lg shadow-md border border-border/50">
              <h3 className="text-2xl font-bold mb-2 font-headline">Visual Feedback</h3>
              <p className="text-muted-foreground">Your garden's ambiance changes based on the mood of your writing, creating an immersive experience.</p>
            </div>
            <div className="bg-card p-6 rounded-lg shadow-md border border-border/50">
              <h3 className="text-2xl font-bold mb-2 font-headline">Ambient Sound</h3>
              <p className="text-muted-foreground">Choose from gentle soundscapes like wind and rain to help you focus and relax.</p>
            </div>
          </div>
        </section>
      </main>
    </div>
    </>
  );
}
