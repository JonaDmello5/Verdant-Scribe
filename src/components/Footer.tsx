
"use client";

import Link from "next/link";
import { Mail, Github } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24 border-t pt-8 pb-12 text-sm text-foreground/60">
      <div className="mx-auto flex max-w-5xl flex-col gap-6 px-4 md:flex-row md:items-center md:justify-between">
        {/* Left — copyright */}
        <p>
          © {year} Verdant Scribe. All rights reserved.
        </p>

        {/* Middle — useful links */}
        <nav className="flex flex-wrap gap-4">
          <Link href="/" className="hover:underline">
            Home
          </Link>
          <Link href="/garden" className="hover:underline">
            Garden
          </Link>
          <Link href="/about" className="hover:underline">
            About
          </Link>
          <Link href="/privacy" className="hover:underline">
            Privacy
          </Link>
          <Link href="/terms" className="hover:underline">
            Terms
          </Link>
          <Link href="/contact" className="hover:underline">
            Contact
          </Link>
        </nav>

        {/* Right — social icons */}
        <div className="flex gap-4 text-xl">
          <a
            href="mailto:joeysalakha81@gmail.com"
            aria-label="Email"
            target="_blank"
            rel="noopener"
            className="hover:text-primary"
          >
            <Mail className="h-5 w-5" />
          </a>
          <a
            href="https://github.com/JonaDmello5/Verdant-Scribe"
            aria-label="GitHub"
            target="_blank"
            rel="noopener"
            className="hover:text-primary"
          >
            <Github className="h-5 w-5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
