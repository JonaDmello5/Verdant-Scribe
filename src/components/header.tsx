"use client";

import { ThemeToggle } from "./theme-toggle";
import { Logo } from "./logo";

export default function Header() {
  return (
    <header className="absolute top-0 left-0 right-0 p-4 z-20 flex justify-between items-center">
      <Logo />
      <ThemeToggle />
    </header>
  );
}
