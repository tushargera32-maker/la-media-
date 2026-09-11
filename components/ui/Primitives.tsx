import Link from "next/link";
import Image from "next/image";
import type { ReactNode } from "react";

/* ==================================================================
   UI PRIMITIVES - small, dumb, reused everywhere.
   ================================================================== */

export function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg width="16" height="10" viewBox="0 0 16 10" fill="none" aria-hidden className={className}>
      <path d="M11 1L15 5L11 9M15 5H0" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

/**
 * Labelled media frame.
 *
 * The frame owns the aspect ratio, so dropping real photography in later
 * never shifts the layout. `src` stays undefined until an asset exists.
 */
export function Media({
  label,
  ratio = "4/3",
  src,
  className = "",
  priority = false,
}: {
  label: string;
  ratio?: string;
  src?: string;
  className?: string;
  priority?: boolean;
}) {
  return (
    <div
      className={`relative w-full overflow-hidden bg-navy-2 ring-1 ring-hairline ${className}`}
      style={{ aspectRatio: ratio }}
    >
      {src ? (
        <Image
          src={src}
          alt={label}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          quality={90}
          className="object-cover"
          loading={priority ? undefined : "lazy"}
          priority={priority}
        />
      ) : (
        <>
          <span className="bloom opacity-60" />
          <span className="absolute inset-0 grid place-items-center px-6 text-center text-[10px] font-semibold uppercase tracking-[0.16em] text-slate">
            {label}
          </span>
        </>
      )}
    </div>
  );
}

export function Eyebrow({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <p className={`eyebrow flex items-center gap-4 ${className}`}>
      {children}
      <span aria-hidden className="h-px w-8 bg-copper/50" />
    </p>
  );
}

export function Button({
  href,
  children,
  variant = "line",
  className = "",
  arrow = true,
}: {
  href: string;
  children: ReactNode;
  variant?: "line" | "fill" | "ghost";
  className?: string;
  arrow?: boolean;
}) {
  const styles = { line: "btn-line", fill: "btn-fill", ghost: "btn-ghost" };
  return (
    <Link href={href} className={`btn ${styles[variant]} ${className}`}>
      {children}
      {arrow && <Arrow />}
    </Link>
  );
}

export function ArrowLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link href={href} className={`link-arrow ${className}`}>
      {children}
      <Arrow />
    </Link>
  );
}

/** Circular arrow button, as used on the event card and cap tiles. */
export function ArrowCircle({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      aria-label={label}
      className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-copper/60 text-copper transition-colors duration-300 hover:bg-copper hover:text-white"
    >
      <Arrow />
    </Link>
  );
}
