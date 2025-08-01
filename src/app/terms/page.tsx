import Link from 'next/link';

export const metadata = {
  title: 'Terms of Service | Verdant Scribe',
  description: 'The rules of the garden. Our commitment to you and your creative space.',
};

export default function Terms() {
  const today = new Date();
  const effectiveDate = `${today.getDate()} ${today.toLocaleString(
    'default',
    { month: 'long' }
  )} ${today.getFullYear()}`;

  return (
    <main className="prose mx-auto max-w-3xl px-4 py-10 dark:prose-invert">
      <h1>Terms of Service</h1>
      <p className="text-muted-foreground">Effective date: {effectiveDate}</p>

      <p>
        Welcome to Verdant Scribe! We're happy you're here to cultivate your
        digital garden. These terms are here to outline the rules of our garden
        and protect both you and us. Think of them as the friendly fence around
        our shared space.
      </p>

      <h2>1. Your Words are Your Own</h2>
      <p>
        This is your garden, and you own the beautiful things you grow in it.
        Any content you create, write, or upload to Verdant Scribe—your posts,
        your ideas, your stories—belongs to you. We do not claim any ownership
        over your intellectual property. We are simply the caretakers of the
        space where it flourishes.
      </p>

      <h2>2. Our Commitment to You (The Service)</h2>
      <p>
        We promise to do our best to keep Verdant Scribe running smoothly,
        providing you with a peaceful and reliable place to think and write.
        However, please understand that the service is provided “as is.” Like any
        garden, it may occasionally have a weed or two (bugs), but we'll be
        diligent about tending to them.
      </p>

      <h2>3. Tending the Garden Responsibly</h2>
      <p>
        We ask that you use Verdant Scribe with respect and responsibility. Please don't use our service for anything illegal, harmful, or that infringes on the rights of others. We trust you to keep the garden a positive and constructive space.
      </p>

      <h2>4. The App's Intellectual Property</h2>
      <p>
        While your content is yours, the Verdant Scribe name, logo, design,
        and the code that powers it are our intellectual property. We've put a
        lot of love into building this tool, so please don't copy or reuse our
        materials without permission.
      </p>

      <h2>5. Changes and Updates</h2>
      <p>
        Gardens evolve, and so will Verdant Scribe. We may update these terms
        from time to time to reflect changes in our service. When we do, we'll
        post the updated terms here. Continuing to use the app after changes
        means you agree to the new terms.
      </p>
      
      <h2>6. Limitation of Liability</h2>
      <p>
        To the fullest extent permitted by law, Verdant Scribe and its creators (Joey and Atharv) will not be liable for any indirect, incidental, or consequential damages arising from your use of the service. We provide the tools, but how you use them and the results of that use are your own.
      </p>

      <h2>7. Questions?</h2>
      <p>
        If you have any questions or concerns about these terms, please don't
        hesitate to reach out. You can email us at{' '}
        <Link href="mailto:legal@verdant-scribe.com">
          legal@verdant-scribe.com
        </Link>
        .
      </p>
    </main>
  );
}
