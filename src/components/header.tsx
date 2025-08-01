"use client";

import { ThemeToggle } from "./theme-toggle";

export default function Header() {
  return (
    <header className="absolute top-0 left-0 right-0 p-4 z-20 flex justify-between items-center">
      <h1 className="text-4xl font-headline font-bold">Verdant Scribe</h1>
      <ThemeToggle />
    </header>
  );
}
