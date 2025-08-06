import Image from 'next/image';
import { Mail, Github, Leaf, TreeDeciduous, Grape, Scissors, Sprout, Footprints } from 'lucide-react';
import { Logo } from '@/components/logo';
import Head from 'next/head';

export const metadata = {
  title: 'About | Verdant Scribe',
  description: 'Meet the gardeners behind the words and discover the philosophy of our digital sanctuary.',
  alternates: {
    canonical: '/about',
  },
};

const plants = [
    {
        icon: Leaf,
        name: 'Flower',
        description: 'Fleeting thoughts, daily joys, and brief moments of inspiration that blossom quickly.',
        use: 'For the everyday updates and simple ideas that brighten the garden.'
    },
    {
        icon: TreeDeciduous,
        name: 'Tree',
        description: 'Deep-rooted, long-form articles that take time to develop and stand as pillars of knowledge.',
        use: 'For foundational posts, detailed research, and core concepts.'
    },
    {
        icon: Grape,
        name: 'Vine',
        description: 'Interconnected ideas, short stories, and narratives that weave through different topics.',
        use: 'For exploring connections between thoughts and creating narrative threads.'
    },
    {
        icon: Scissors,
        name: 'Bonsai',
        description: 'Tiny, polished essays—haiku-like in their clarity and focus. A single, powerful idea.',
        use: 'For distilling a complex topic into its essential, beautiful form.'
    },
    {
        icon: Sprout,
        name: 'Wildflower',
        description: 'Curated links to external articles and resources, annotated with a brief thought.',
        use: 'For sharing inspiration from around the web and building a bed of shared knowledge.'
    },
    {
        icon: Footprints,
        name: 'Mushroom',
        description: 'Quick mindfulness exercises, moments of pause, and gentle reminders to breathe.',
        use: 'For adding moments of wellness and calm that spring up unexpectedly.'
    },
]

export default function About() {
  return (
    <>
    <Head>
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9370081174240595"
     crossOrigin="anonymous"></script>
    </Head>
    <main className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto max-w-4xl px-4 py-16">
        <header className="text-center mb-16">
          <h1 className="text-5xl font-bold font-headline text-primary mb-4">
            About Verdant Scribe
          </h1>
          <p className="text-lg text-muted-foreground">
            Cultivating a digital space where ideas grow and tranquility blossoms.
          </p>
        </header>

        <section className="flex flex-col md:flex-row items-center gap-12 mb-20">
            <Logo className="w-48 h-48 text-foreground" />
            <div className="prose dark:prose-invert max-w-none">
                <p className="text-xl leading-relaxed">
                    🌱 Verdant Scribe is a digital garden tended by <strong>Salakha and Patil</strong>, two creators passionate about mindful productivity, sustainable technology, and the quiet power of words. We believe that the process of writing and thinking should be as natural and life-giving as tending to a garden. This project was born from a desire to move away from the rigid, linear structure of traditional note-taking apps and embrace a more organic, visual, and contemplative approach. We wanted to create a tool that not only helps you organize your thoughts but also encourages a deeper, more mindful connection with your own creative process.
                </p>
            </div>
        </section>

        <section className="mb-20 text-center">
          <h2 className="text-3xl font-bold font-headline mb-4">Our Mission</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            To create a sanctuary for writers and thinkers—a tool that transforms the act of journaling into a visual, meditative experience. We aim to help you cultivate your ideas with the same care and patience as a gardener tends to their plants, fostering growth both for your thoughts and for your own well-being. Our core philosophy is built on the principles of slow technology and digital wellness. We're not focused on cramming in features for the sake of productivity, but on crafting an environment that feels calming, inspiring, and deeply personal. We believe your best ideas need space to breathe and grow, not to be confined in a sterile list.
          </p>
        </section>
        
        <section className="mb-16">
          <h2 className="text-3xl font-bold font-headline text-center mb-12">The Life of the Garden</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-10">
            In Verdant Scribe, every piece of writing is a living part of your garden. We use the metaphor of different plants to represent different kinds of thoughts. This isn't just a gimmick; it's a way to encourage varied thinking and to visually organize your mental landscape. A fleeting idea might be a wildflower, while a foundational essay could become a sturdy tree. This system helps you see, at a glance, the shape and texture of your intellectual journey.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {plants.map((plant) => (
                <div key={plant.name} className="bg-card p-6 rounded-xl shadow-md border border-border/50 hover:shadow-lg transition-shadow duration-300">
                    <div className="flex items-center gap-4 mb-3">
                        <plant.icon className="w-8 h-8 text-primary" />
                        <h3 className="text-2xl font-bold font-headline text-card-foreground">{plant.name}</h3>
                    </div>
                    <p className="text-muted-foreground mb-2">{plant.description}</p>
                    <p className="text-sm text-primary/80 font-semibold">{plant.use}</p>
                </div>
            ))}
          </div>
        </section>

        <section className="text-center">
            <h2 className="text-3xl font-bold font-headline mb-4">Elsewhere</h2>
            <div className="flex justify-center gap-6 text-xl">
                <a
                    href="mailto:hello@verdant-scribe.com"
                    aria-label="Email"
                    target="_blank"
                    rel="noopener"
                    className="flex items-center gap-2 hover:text-primary transition-colors"
                >
                    <Mail className="w-6 h-6" />
                    <span className="text-base">Email Us</span>
                </a>
                <a
                    href="#"
                    aria-label="GitHub"
                    target="_blank"
                    rel="noopener"
                    className="flex items-center gap-2 hover:text-primary transition-colors"
                >
                    <Github className="w-6 h-6" />
                    <span className="text-base">GitHub</span>
                </a>
            </div>
        </section>

      </div>
    </main>
    </>
  );
}
