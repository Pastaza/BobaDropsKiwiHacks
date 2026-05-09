import Link from "next/link";
import { ReactNode } from "react";

export function Container({ children }: { children: ReactNode }) {
  return <div className="mx-auto w-full max-w-6xl px-5">{children}</div>;
}

export function Pill({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full bg-white/70 px-3 py-1 text-xs font-medium text-ink-900 ring-1 ring-ink-900/10 backdrop-blur">
      {children}
    </span>
  );
}

export function Button({
  children,
  href,
  kind = "primary",
  className = ""
}: {
  children: ReactNode;
  href?: string;
  kind?: "primary" | "secondary";
  className?: string;
}) {
  const base =
    "inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-ink-500 focus-visible:ring-offset-2";
  const styles =
    kind === "primary"
      ? "bg-ink-950 text-white shadow-glow hover:bg-ink-900"
      : "bg-white/80 text-ink-950 ring-1 ring-ink-900/10 hover:bg-white";

  const cls = `${base} ${styles} ${className}`;

  if (href) return <Link className={cls} href={href}>{children}</Link>;
  return <button className={cls}>{children}</button>;
}

export function Card({
  children,
  className = ""
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`rounded-2xl bg-white/75 p-5 shadow-cloud ring-1 ring-ink-900/10 backdrop-blur ${className}`}>
      {children}
    </div>
  );
}
