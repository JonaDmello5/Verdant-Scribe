import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Verdant Scribe",
  description: "How we collect, use, and protect your data with care.",
  alternates: {
    canonical: '/privacy',
  },
};

export default function PrivacyPolicy() {
  const today = new Date();
  const lastUpdated = `${today.toLocaleString('default', { month: 'long' })} ${today.getDate()}, ${today.getFullYear()}`;

  return (
    <main className="prose dark:prose-invert mx-auto max-w-3xl px-4 py-16">
      <h1 className="font-headline text-4xl">Privacy Policy</h1>
      <p className="text-muted-foreground">Last updated: {lastUpdated}</p>

      <p>
        Welcome to Verdant Scribe. Your privacy and trust are as important to us as the ideas you nurture in your digital garden. This policy is written to be as clear and straightforward as possible, outlining what data we collect and how we handle it with the utmost care.
      </p>

      <h2 className="font-headline">The Information We Collect</h2>
      <p>
        We believe in collecting only what is necessary to provide and improve your experience.
      </p>
      <ul>
        <li>
          <strong>Information You Provide:</strong> When you use our contact form, you voluntarily share your name and email address with us so we can respond to your message. That's it.
        </li>
        <li>
          <strong>Technical Information:</strong> Like most websites, our server may automatically log anonymous technical information, such as your browser type or IP address. We do not use this to identify you personally; it helps us understand how the app is used and how to make it better.
        </li>
      </ul>

      <h2 className="font-headline">How We Use Your Information</h2>
      <p>
        We are committed to being responsible stewards of your data.
      </p>
      <ul>
        <li>
          To provide, maintain, and improve Verdant Scribe.
        </li>
        <li>
          To respond to your questions and comments when you reach out to us.
        </li>
        <li>
          We will <strong>never</strong> sell your personal information. Your garden is your sanctuary, not a product.
        </li>
      </ul>

      <h2 className="font-headline">Data Security</h2>
      <p>
        We take reasonable measures to protect your information from unauthorized access or disclosure. However, no internet transmission is 100% secure, so we cannot guarantee absolute security.
      </p>

      <h2 className="font-headline">Your Choices</h2>
      <p>
        You are in control. You are never required to provide personal information to use the core features of Verdant Scribe. If you have provided information via the contact form, you can request its deletion at any time.
      </p>

      <h2 className="font-headline">Changes to This Policy</h2>
      <p>
        As our garden grows, we may need to update this policy. If we do, we will post the changes here. By continuing to use Verdant Scribe, you agree to the new terms.
      </p>
      
      <h2 className="font-headline">Contact Us</h2>
      <p>
        If you have any questions about this Privacy Policy, please feel free to{" "}
        <Link href="/contact">get in touch</Link>. We're always happy to chat.
      </p>
    </main>
  );
}
