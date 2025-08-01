import Link from "next/link";

export const metadata = {
  title: "Privacy Policy | Verdant Scribe",
  description: "How and why we collect, use, and protect your data.",
};

export default function PrivacyPolicy() {
  const today = new Date();
  const lastUpdated = `${today.getDate()} ${today.toLocaleString('default', { month: 'long' })} ${today.getFullYear()}`;

  return (
    <main className="prose mx-auto max-w-3xl px-4 py-10">
      <h1>Privacy Policy</h1>

      <p>Last updated: {lastUpdated}</p>

      <h2>1. Information We Collect</h2>
      <p>
        We collect data that you voluntarily provide—
        for example when you subscribe to our newsletter
        or leave a comment. In addition, basic analytics
        data (e.g., IP address, browser type) is captured
        automatically via cookies.
      </p>

      <h2>2. How We Use Your Information</h2>
      <ul>
        <li>To provide and improve the Verdant Scribe service.</li>
        <li>To communicate with you about new content or features.</li>
        <li>For advertising (Google AdSense) and analytics (GA4).</li>
      </ul>

      <h2>3. Third-Party Services</h2>
      <p>
        We rely on Google AdSense for advertising and Google Analytics 4
        for traffic measurement. These providers may set cookies or
        collect usage data in accordance with their own policies.
      </p>

      <h2>4. Your Choices</h2>
      <p>
        You may disable cookies in your browser and opt out of
        personalized ads via{" "}
        <Link href="https://adssettings.google.com/authenticated" target="_blank">
          Google Ad Settings
        </Link>.
      </p>

      <h2>5. Contact</h2>
      <p>
        Questions? Email us at{" "}
        <Link href="mailto:hello@verdant-scribe.com">hello@verdant-scribe.com</Link>.
      </p>
    </main>
  );
}
