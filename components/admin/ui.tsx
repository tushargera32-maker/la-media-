import Link from "next/link";
import type { ReactNode } from "react";

/* ==================================================================
   ADMIN UI PRIMITIVES

   Every admin screen composes from these. The point is consistency:
   the same page header, the same table shell, the same empty state
   everywhere, so operating one screen teaches you all of them.
   ================================================================== */

export function PageHeader({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4 border-b border-black/10 pb-6">
      <div>
        <h1 className="font-serif text-[28px] leading-tight">{title}</h1>
        {description && <p className="mt-1.5 text-[14px] text-neutral-500">{description}</p>}
      </div>
      {action}
    </div>
  );
}

export function Shell({ children }: { children: ReactNode }) {
  return <div className="mx-auto max-w-7xl p-5 lg:p-9">{children}</div>;
}

export function Panel({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`rounded-lg border border-black/10 bg-white ${className}`}>{children}</div>
  );
}

/**
 * Metric tile. `href` is optional - when present the whole tile is a link,
 * which is the fastest route from "that number looks wrong" to the data.
 */
export function Stat({
  label,
  value,
  href,
  hint,
}: {
  label: string;
  value: number | string;
  href?: string;
  hint?: string;
}) {
  const body = (
    <div className="rounded-lg border border-black/10 bg-white p-5 transition-colors hover:border-black/25">
      <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-neutral-400">
        {label}
      </p>
      <p className="mt-3 font-serif text-[32px] leading-none">{value}</p>
      {hint && <p className="mt-2 text-[12px] text-neutral-500">{hint}</p>}
    </div>
  );

  return href ? (
    <Link href={href} className="block">
      {body}
    </Link>
  ) : (
    body
  );
}

export function EmptyState({
  title,
  body,
  action,
}: {
  title: string;
  body: string;
  action?: ReactNode;
}) {
  return (
    <div className="rounded-lg border border-dashed border-black/20 bg-white px-8 py-16 text-center">
      <p className="font-medium">{title}</p>
      <p className="mx-auto mt-2 max-w-[46ch] text-[14px] text-neutral-500">{body}</p>
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}

export function Badge({
  children,
  tone = "neutral",
}: {
  children: ReactNode;
  tone?: "neutral" | "accent" | "success" | "warning";
}) {
  const tones = {
    neutral: "bg-neutral-100 text-neutral-700",
    accent: "bg-[#F6EAEC] text-[#8C1D34]",
    success: "bg-emerald-50 text-emerald-800",
    warning: "bg-amber-50 text-amber-800",
  };
  return (
    <span
      className={`inline-block rounded px-2 py-0.5 text-[11px] font-medium ${tones[tone]}`}
    >
      {children}
    </span>
  );
}

export function AdminButton({
  href,
  onClick,
  children,
  variant = "primary",
  type = "button",
}: {
  href?: string;
  onClick?: () => void;
  children: ReactNode;
  variant?: "primary" | "secondary";
  type?: "button" | "submit";
}) {
  const styles =
    variant === "primary"
      ? "bg-[#8C1D34] text-white hover:bg-[#6E1428]"
      : "border border-black/15 bg-white text-neutral-800 hover:bg-neutral-50";

  const className = `inline-flex items-center gap-2 rounded px-4 py-2 text-[13px] font-medium transition-colors ${styles}`;

  if (href) {
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    );
  }
  return (
    <button type={type} onClick={onClick} className={className}>
      {children}
    </button>
  );
}

/** Horizontal-scrolling table shell - wide tables must not break the page. */
export function TableWrap({ children }: { children: ReactNode }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-black/10 bg-white">{children}</div>
  );
}

export function Th({ children }: { children: ReactNode }) {
  return (
    <th className="whitespace-nowrap px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-[0.12em] text-neutral-400">
      {children}
    </th>
  );
}
