import type { Metadata } from "next";
import Link from "next/link";
import { Reveal, RevealGroup } from "@/components/motion/Motion";
import { Media, Eyebrow, ArrowLink, Arrow } from "@/components/ui/Primitives";
import { INSIGHT_CATEGORIES } from "@/lib/content";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Insights - Architecture Events & Event Management | LA Media Ludhiana",
  description:
    "Thoughts and perspectives from architects, designers, industry leaders and changemakers shaping the future of the built environment. Discover insights from Ludhiana's best event management firm specializing in architecture conferences.",
  keywords: "Ludhiana best event management firm, event management Ludhiana, architecture events, LA Media Communications, conference planning Punjab, Design Dialect, architecture insights",
};

export const dynamic = "force-dynamic";

/*
  SERVER COMPONENT - Fetches blog posts from database.

  The filter is a URL search param rather than React state, so this page
  - the one whose entire job is SEO - still renders on the server. Every
  filtered view gets a crawlable, shareable URL, and the articles ship in
  the initial HTML.
*/
export default async function InsightsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const params = await searchParams;
  const active =
    INSIGHT_CATEGORIES.find(
      (c) => c.toLowerCase() === (params.category ?? "").toLowerCase(),
    ) ?? "All";

  // Fetch posts from database
  const posts = await prisma.blogPost.findMany({
    where: {
      published: true,
      ...(active !== "All" && { category: active }),
    },
    orderBy: {
      publishedAt: "desc",
    },
  });

  const insightImages = [
    "/blog-cover-1.png",
    "/blog-cover-2.png",
    "/blog-cover-3.png",
    "/blog-cover-4.png",
    "/blog-cover-5.png",
    "/blog-cover-6.png",
    "/blog-cover-7.png",
    "/blog-cover-8.png",
    "/blog-cover-9.png",
  ];

  return (
    <>
      {/* 01 - LEAD -------------------------------------------------- */}
      <section className="relative overflow-hidden pb-section-sm pt-40">
        <div className="absolute right-0 top-0 hidden h-full w-1/2 lg:block">
          <Media label="INSIGHTS - ANGULAR FORM, BLUE LIGHT - 4:3" ratio="4/3" src="/insights-header.jpg" className="h-full border-0 ring-0" />
          <span className="absolute inset-0 bg-gradient-to-r from-navy via-navy/55 to-transparent" />
        </div>

        <div className="relative mx-auto max-w-shell px-gutter">
          <Reveal>
            <Eyebrow>Insights</Eyebrow>
            <h1 className="h-display mt-7 max-w-[14ch] text-[clamp(2.2rem,6vw,4.6rem)]">
              Ideas.<br />Perspectives.<br /><span className="text-copper">Knowledge.</span>
            </h1>
            <p className="mt-8 max-w-[42ch] text-[17px] leading-relaxed text-mist">
              Thoughts and perspectives from architects, designers, industry leaders and
              changemakers shaping the future of the built environment.
            </p>
          </Reveal>
        </div>
      </section>

      {/* 02 - FILTER (links, not state) ----------------------------- */}
      <section className="mx-auto max-w-shell px-gutter">
        <Reveal>
          <div className="panel flex flex-wrap items-center justify-between gap-6 px-6 py-4">
            <nav aria-label="Filter insights" className="flex flex-wrap gap-x-7 gap-y-2">
              {INSIGHT_CATEGORIES.map((cat) => {
                const on = cat === active;
                return (
                  <Link
                    key={cat}
                    href={cat === "All" ? "/insights" : `/insights?category=${encodeURIComponent(cat.toLowerCase())}`}
                    scroll={false}
                    aria-current={on ? "page" : undefined}
                    className={`border-b-2 pb-1 text-[11px] font-semibold uppercase tracking-[0.14em] transition-colors duration-300 ${
                      on ? "border-copper text-copper" : "border-transparent text-mist hover:text-bone"
                    }`}
                  >
                    {cat}
                  </Link>
                );
              })}
            </nav>

            {/* Search posts to the same route, so it works without JS. */}
            <form action="/insights" className="flex items-center gap-2">
              <label htmlFor="q" className="sr-only">Search insights</label>
              <input
                id="q"
                name="q"
                type="search"
                placeholder="Search insights…"
                className="field-input w-56 py-2 text-[13px]"
              />
              <button type="submit" aria-label="Search" className="text-copper"><Arrow /></button>
            </form>
          </div>
        </Reveal>
      </section>

      {/* 03 - ARTICLES ---------------------------------------------- */}
      <section className="py-section">
        <div className="mx-auto max-w-shell px-gutter">
          {posts.length === 0 ? (
            <div className="panel px-8 py-20 text-center">
              <p className="h-tight text-[1.4rem]">Nothing in this category yet.</p>
              <p className="mx-auto mt-4 max-w-[44ch] text-[15px] text-mist">
                Articles published through the admin panel will appear here.
              </p>
              <ArrowLink href="/insights" className="mt-7">See all insights</ArrowLink>
            </div>
          ) : (
            <RevealGroup className="grid gap-6 md:grid-cols-3">
              {posts.map((post, i) => {
                const publishedDate = post.publishedAt
                  ? new Date(post.publishedAt).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })
                  : new Date(post.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });

                return (
                  <article key={post.slug} className="panel flex h-full flex-col overflow-hidden">
                  <div className="relative">
                    <Media label={`${post.category.toUpperCase()} - 16:9`} ratio="16/9" src={post.image || insightImages[i % insightImages.length]} className="border-0 ring-0" />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-[10.5px] font-semibold uppercase tracking-[0.14em] text-cobalt-soft">
                        {post.category}
                      </span>
                      <span className="text-[12px] text-slate">{publishedDate}</span>
                    </div>
                    <h2 className="mt-4 text-[17px] font-semibold leading-snug">{post.title}</h2>
                    <span className="mt-4 block h-px w-8 bg-copper" />
                    <p className="mt-4 flex-1 text-[14px] leading-relaxed text-mist">{post.excerpt}</p>
                    <ArrowLink href={`/insights/${post.slug}`} className="mt-6">Read more</ArrowLink>
                  </div>
                </article>
              );
            })}
          </RevealGroup>
          )}
        </div>
      </section>

      {/* 04 - NEWSLETTER --------------------------------------------- */}
      <section className="border-t border-hairline py-section-sm">
        <div className="mx-auto max-w-shell px-gutter">
          <div className="panel flex flex-wrap items-center justify-between gap-8 p-8">
            <div className="flex items-center gap-5">
              <span className="grid h-12 w-12 place-items-center rounded-full border border-copper/50 text-copper">
                <Arrow />
              </span>
              <div>
                <p className="text-[13px] font-semibold uppercase tracking-[0.1em]">Stay inspired</p>
                <p className="mt-1 text-[14px] text-mist">
                  Subscribe to our newsletter for the latest insights and updates.
                </p>
              </div>
            </div>
            <form action="/api/newsletter" method="post" className="flex min-w-[280px] flex-1 justify-end">
              <label htmlFor="news-email" className="sr-only">Your email address</label>
              <input
                id="news-email"
                name="email"
                type="email"
                required
                placeholder="Your email address"
                className="field-input max-w-sm border-r-0"
              />
              <button type="submit" className="btn btn-fill">Subscribe</button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
