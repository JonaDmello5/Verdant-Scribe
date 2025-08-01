export const metadata = {
  title: "Terms of Service | Verdant Scribe",
};

export default function Terms() {
  const today = new Date();
  const effectiveDate = `${today.getDate()} ${today.toLocaleString('default', { month: 'long' })} ${today.getFullYear()}`;

  return (
    <main className="prose mx-auto max-w-3xl px-4 py-10">
      <h1>Terms of Service</h1>
      <p>Effective date: {effectiveDate}</p>

      <h2>1. Acceptance of Terms</h2>
      <p>
        By accessing Verdant Scribe you agree to be bound by these Terms
        and any applicable laws.
      </p>

      <h2>2. Intellectual Property</h2>
      <p>
        All articles remain © Verdant Scribe unless noted otherwise.
        You may quote up to 100 words with attribution.
      </p>

      <h2>3. Disclaimer</h2>
      <p>
        Content is provided “as is”. We make no warranties of accuracy
        or fitness for a particular purpose.
      </p>

      <h2>4. Limitation of Liability</h2>
      <p>
        In no event shall Verdant Scribe be liable for indirect or
        consequential damages arising from site use.
      </p>

      <h2>5. Changes</h2>
      <p>
        Updated terms will be posted here. Continued use after
        changes indicates acceptance.
      </p>

      <h2>6. Contact</h2>
      <p>Email legal@verdant-scribe.com for any concerns.</p>
    </main>
  );
}
