import Image from "next/image";

export const metadata = {
  title: "About | Verdant Scribe",
  description: "Meet the gardener behind the words.",
};

export default function About() {
  return (
    <main className="prose mx-auto max-w-3xl px-4 py-10">
      <h1>About Verdant Scribe</h1>

      <Image
        src="https://placehold.co/120x120.png"
        alt="Founder Portrait"
        width={120}
        height={120}
        className="rounded-full mb-4"
        data-ai-hint="portrait person"
      />

      <p>
        🌱 Verdant Scribe is a digital garden tended by
        <strong>[Your Name]</strong>, a writer passionate about
        mindful productivity and sustainable tech.
      </p>

      <h2>Mission</h2>
      <p>
        To cultivate ideas that help creatives work gently with
        the planet and themselves.
      </p>

      <h2>Elsewhere</h2>
      <ul>
        <li>
          <a href="#" target="_blank">Twitter</a>
        </li>
        <li>
          <a href="#">GitHub</a>
        </li>
      </ul>
    </main>
  );
}
