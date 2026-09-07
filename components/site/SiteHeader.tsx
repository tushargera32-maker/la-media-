"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Arrow } from "@/components/ui/Primitives";

const LINKS = [
  { href: "/work", label: "Work" },
  { href: "/what-we-do", label: "What We Do" },
  { href: "/media", label: "Media" },
  { href: "/insights", label: "Insights" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);

  useEffect(() => setOpen(false), [pathname]);

  // The header sits over the hero image, so it only takes a background
  // once the page has scrolled past it.
  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/*
        The blur/background lives on this inner div, not <header> itself.
        backdrop-filter creates a containing block for `position: fixed`
        descendants - if it sat on <header>, the mobile nav panel (fixed,
        rendered inside this component) would anchor to the header's own
        box instead of the viewport once scrolled, breaking it.
      */}
      <div
        className={`transition-colors duration-500 ${
          solid ? "bg-navy/90 backdrop-blur-xl border-b border-hairline" : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-shell items-center justify-between gap-6 px-gutter py-5">
          <Link href="/" className="flex items-center gap-3" aria-label="LA Media and Communications, home">
            <div className="relative h-16 w-48">
              <Image
                src="/firm-la-media.png"
                alt="LA Media & Communications"
                fill
                className="object-contain"
                style={{ mixBlendMode: 'screen' }}
                priority
              />
            </div>
          </Link>

          <nav className="hidden items-center gap-9 lg:flex">
            {LINKS.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={`relative py-1 text-[11px] font-semibold uppercase tracking-[0.14em] transition-colors duration-300 hover:text-bone ${
                    active ? "text-copper" : "text-mist"
                  }`}
                >
                  {link.label}
                  {active && <span className="absolute -bottom-1 left-0 h-px w-full bg-copper" />}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-4">
            <Link href="/register" className="btn btn-line hidden md:inline-flex">
              Let&rsquo;s connect <Arrow />
            </Link>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? "Close menu" : "Open menu"}
              className="grid h-10 w-10 place-items-center rounded-full border border-hairline transition-colors duration-300 hover:border-mist"
            >
              <span className="grid gap-[5px]">
                <span className={`block h-px w-4 bg-bone transition-transform duration-300 ${open ? "translate-y-[6px] rotate-45" : ""}`} />
                <span className={`block h-px w-4 bg-bone transition-opacity duration-300 ${open ? "opacity-0" : ""}`} />
                <span className={`block h-px w-4 bg-bone transition-transform duration-300 ${open ? "-translate-y-[6px] -rotate-45" : ""}`} />
              </span>
            </button>
          </div>
        </div>
      </div>

      <>
        {/* Backdrop */}
        <div
          className={`fixed inset-0 z-40 bg-navy/80 transition-opacity duration-300 ${
            open ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
          onClick={() => setOpen(false)}
          aria-hidden={!open}
        />

        {/* Sliding Menu */}
        <nav
          id="mobile-nav"
          inert={!open}
          className={`fixed right-0 top-0 z-50 h-full w-[85%] max-w-sm transform bg-gradient-to-br from-navy via-navy-2 to-abyss shadow-2xl transition-transform duration-300 ease-out will-change-transform ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-hairline p-6">
              <div className="flex items-center gap-3">
                <Image
                  src="/logo.png"
                  alt="LA Media"
                  width={40}
                  height={40}
                  className="h-10 w-10"
                />
                <span className="text-[9px] font-semibold uppercase leading-[1.35] tracking-[0.14em] text-bone">
                  Media &amp;<br />Communications
                </span>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="grid h-10 w-10 place-items-center rounded-full border border-hairline transition-all hover:border-copper hover:bg-copper/10"
                aria-label="Close menu"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Menu Items */}
            <div className="overflow-y-auto p-4" style={{ height: 'calc(100vh - 180px)' }}>
              {LINKS.map((link, i) => {
                const active = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`group relative flex items-center gap-4 overflow-hidden rounded-lg px-5 py-4 transition-all duration-300 ${
                      active
                        ? 'bg-copper text-white shadow-lg shadow-copper/20'
                        : 'text-mist hover:bg-navy-2 hover:text-bone'
                    }`}
                  >
                    <span className={`text-[10px] font-bold ${active ? 'text-white' : 'text-copper'}`}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="text-[14px] font-semibold uppercase tracking-[0.08em]">
                      {link.label}
                    </span>
                    <svg
                      className={`ml-auto h-4 w-4 transition-transform duration-300 ${active ? 'translate-x-0' : '-translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100'}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                );
              })}
            </div>

            {/* Footer CTA */}
            <div className="absolute bottom-0 left-0 right-0 border-t border-hairline bg-navy-2/50 p-4 backdrop-blur-sm">
              <Link
                href="/register"
                className="btn btn-fill w-full justify-center text-center"
                onClick={() => setOpen(false)}
              >
                Register Now
              </Link>
              <p className="mt-3 text-center text-[11px] text-slate">
                Join Design Dialects 2.0
              </p>
            </div>
        </nav>
      </>
    </header>
  );
}
