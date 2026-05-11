import Link from "next/link";
import { Container } from "./ui";

const links = [
  { href: "/identify", label: "Identify" },
  { href: "/forecast", label: "Sky forecast" },
  { href: "/atlas", label: "Cloud atlas" },
  { href: "/photos", label: "Photos" },
  { href: "/guide", label: "Guide" }
];

export function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-ink-900/10 bg-white/60 backdrop-blur">
      <Container>
        <div className="flex h-14 items-center justify-between">
          <Link href="/" className="font-semibold tracking-tight text-ink-950">
            ireallylikeclouds
          </Link>
          <nav className="flex items-center gap-5 text-sm text-ink-900">
            {links.map((l) => (
              <Link key={l.href} href={l.href} className="hover:text-ink-700">
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
      </Container>
    </header>
  );
}
