'use client';

import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { PartnersShowcase } from "@/components/site/PartnersShowcase";
import { PressSection } from "@/components/site/PressSection";
import { SmoothScroll, ScrollProgress } from "@/components/motion/Motion";
import { EventPopup } from "@/components/site/EventPopup";
import { VisitorTracker } from "@/components/analytics/VisitorTracker";
import { usePathname } from "next/navigation";

/** Public chrome. /register and /admin sit outside this group. */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isBuildRight = pathname?.startsWith('/build-right');

  return (
    <SmoothScroll>
      <VisitorTracker />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:bg-copper focus:px-5 focus:py-3 focus:text-[11px] focus:font-semibold focus:uppercase focus:tracking-[0.14em] focus:text-white"
      >
        Skip to content
      </a>
      <ScrollProgress />
      <SiteHeader />
      <main id="main">{children}</main>
      {!isBuildRight && (
        <>
          <PartnersShowcase />
          <PressSection />
        </>
      )}
      <SiteFooter />
      <EventPopup />
    </SmoothScroll>
  );
}
