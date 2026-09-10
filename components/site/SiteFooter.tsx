'use client';

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { BRAND } from "@/lib/content";
import { Arrow } from "@/components/ui/Primitives";

const QUICK = [
  ["/", "Home"], ["/about", "About"], ["/work", "Work"],
  ["/contact", "Contact"], ["/what-we-do", "What We Do"],
  ["/privacy", "Privacy Policy"], ["/insights", "Insights"], ["/terms", "Terms of Use"],
];

const WHAT = [
  "Events & Experiences", "Media & Content", "Community & Networks", "Brand & Partnerships",
];

const SOCIALS = [
  { name: "Instagram", url: "https://www.instagram.com/designdialect.india/", icon: "I" },
  { name: "Facebook", url: "https://www.facebook.com/people/Design-Dialect/61594233031244/", icon: "F" },
];

function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      setMessage("Please enter your email");
      setStatus("error");
      return;
    }

    setStatus("sending");
    setMessage("");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to subscribe");
      }

      setStatus("success");
      setMessage("Thanks for subscribing! Check your email.");
      setEmail("");

      // Reset after 5 seconds
      setTimeout(() => {
        setStatus("idle");
        setMessage("");
      }, 5000);
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Something went wrong");

      // Reset error after 5 seconds
      setTimeout(() => {
        setStatus("idle");
        setMessage("");
      }, 5000);
    }
  };

  if (status === "success") {
    return (
      <div className="mt-4 sm:mt-5">
        <div className="flex items-center gap-2 rounded-lg border border-green-500/30 bg-green-500/10 px-4 py-3">
          <svg className="h-5 w-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <p className="text-[13px] text-green-400">{message}</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="mt-4 flex sm:mt-5">
        <label htmlFor="footer-email" className="sr-only">Your email address</label>
        <input
          id="footer-email"
          name="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email"
          className="field-input flex-1 border-r-0 text-[14px]"
          disabled={status === "sending"}
        />
        <button
          type="submit"
          aria-label="Subscribe"
          className="btn btn-fill px-4 sm:px-5"
          disabled={status === "sending"}
        >
          {status === "sending" ? "..." : <Arrow />}
        </button>
      </form>
      {status === "error" && message && (
        <p className="mt-2 text-[13px] text-red-400">{message}</p>
      )}
    </>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-hairline bg-abyss">
      <div className="mx-auto grid max-w-shell gap-10 px-gutter py-12 sm:gap-12 sm:py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div>
          <div className="flex items-center gap-3">
            <span className="text-[22px] font-bold leading-none tracking-[0.08em] sm:text-[26px]">LA</span>
            <span className="text-[9px] font-semibold uppercase leading-[1.35] tracking-[0.14em]">
              Media &amp;<br />Communications
            </span>
          </div>
          <p className="mt-5 max-w-[34ch] text-[13.5px] text-mist sm:mt-6 sm:text-[14.5px]">
            We create platforms for ideas, build meaningful connections and drive conversations
            that shape the future.
          </p>
          <ul className="mt-6 flex gap-3 sm:mt-7">
            {SOCIALS.map((s) => (
              <li key={s.name}>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={s.name}
                  className="grid h-10 w-10 place-items-center rounded-full border border-hairline text-[10px] font-semibold text-slate transition-colors hover:border-copper hover:text-copper sm:h-9 sm:w-9"
                >
                  {s.icon}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <nav>
          <h2 className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate">Quick links</h2>
          <ul className="mt-4 space-y-2 sm:mt-5 sm:space-y-2.5">
            {QUICK.map(([href, label]) => (
              <li key={label}>
                <Link href={href} className="inline-block py-1 text-[13.5px] text-mist transition-colors hover:text-bone sm:text-[14.5px]">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate">What we do</h2>
          <ul className="mt-4 space-y-2 sm:mt-5 sm:space-y-2.5">
            {WHAT.map((w) => (
              <li key={w}>
                <Link href="/what-we-do" className="inline-block py-1 text-[13.5px] text-mist transition-colors hover:text-bone sm:text-[14.5px]">
                  {w}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate">Stay updated</h2>
          <p className="mt-4 max-w-[30ch] text-[13.5px] text-mist sm:mt-5 sm:text-[14.5px]">
            Subscribe to our newsletter for the latest insights and updates.
          </p>
          <NewsletterForm />
        </div>
      </div>

      <div className="mx-auto flex max-w-shell flex-wrap justify-between gap-3 border-t border-hairline px-gutter py-5 text-[11.5px] text-slate sm:py-6 sm:text-[12.5px]">
        <span>&copy; {new Date().getFullYear()} {BRAND.name}. All rights reserved.</span>
        <span className="hidden sm:inline">{BRAND.promise}</span>
      </div>
    </footer>
  );
}

