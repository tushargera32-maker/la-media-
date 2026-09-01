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

/** Social handles are not in the source material, so the icons are
 *  labelled but unlinked rather than pointed at guessed URLs. */
const SOCIALS = ["LinkedIn", "Instagram", "Facebook", "YouTube"];

export function SiteFooter() {
  return (
    <footer className="border-t border-hairline bg-abyss">
      <div className="mx-auto grid max-w-shell gap-12 px-gutter py-16 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div>
          <div className="flex items-center gap-3">
            <span className="text-[26px] font-bold leading-none tracking-[0.08em]">LA</span>
            <span className="text-[9px] font-semibold uppercase leading-[1.35] tracking-[0.14em]">
              Media &amp;<br />Communications
            </span>
          </div>
          <p className="mt-6 max-w-[34ch] text-[14.5px] text-mist">
            We create platforms for ideas, build meaningful connections and drive conversations
            that shape the future.
          </p>
          <ul className="mt-7 flex gap-3">
            {SOCIALS.map((s) => (
              <li key={s}>
                <span
                  title={`${s} - link to be supplied`}
                  className="grid h-9 w-9 place-items-center rounded-full border border-hairline text-[10px] font-semibold text-slate"
                >
                  {s[0]}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <nav>
          <h2 className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate">Quick links</h2>
          <ul className="mt-5 space-y-2.5">
            {QUICK.map(([href, label]) => (
              <li key={label}>
                <Link href={href} className="text-[14.5px] text-mist transition-colors hover:text-bone">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate">What we do</h2>
          <ul className="mt-5 space-y-2.5">
            {WHAT.map((w) => (
              <li key={w}>
                <Link href="/what-we-do" className="text-[14.5px] text-mist transition-colors hover:text-bone">
                  {w}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate">Stay updated</h2>
          <p className="mt-5 max-w-[30ch] text-[14.5px] text-mist">
            Subscribe to our newsletter for the latest insights and updates.
          </p>
          {/* Posts to the existing newsletter API route. */}
          <form action="/api/newsletter" method="post" className="mt-5 flex">
            <label htmlFor="footer-email" className="sr-only">Your email address</label>
            <input
              id="footer-email"
              name="email"
              type="email"
              required
              placeholder="Your email address"
              className="field-input flex-1 border-r-0"
            />
            <button type="submit" aria-label="Subscribe" className="btn btn-fill px-5">
              <Arrow />
            </button>
          </form>
        </div>
      </div>

      <div className="mx-auto flex max-w-shell flex-wrap justify-between gap-3 border-t border-hairline px-gutter py-6 text-[12.5px] text-slate">
        <span>&copy; {new Date().getFullYear()} {BRAND.name}. All rights reserved.</span>
        <span>{BRAND.promise}</span>
      </div>
    </footer>
  );
}
