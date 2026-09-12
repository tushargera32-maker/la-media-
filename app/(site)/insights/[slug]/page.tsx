import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Reveal } from "@/components/motion/Motion";
import { Media, Eyebrow, Button } from "@/components/ui/Primitives";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  // Must never fail the Vercel build: if DATABASE_URL is missing/invalid
  // at build time (URL_INVALID), fall back to no pre-rendered params and
  // render on demand at request time (force-dynamic above).
  try {
    const posts = await prisma.blogPost.findMany({
      where: { published: true },
      select: { slug: true },
    });

    return posts.map((post) => ({
      slug: post.slug,
    }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  let post = null;
  try {
    post = await prisma.blogPost.findUnique({
      where: { slug },
    });
  } catch {
    return { title: "Insights | LA Media & Communications" };
  }

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  // SEO-optimized metadata for Ludhiana event management
  const isEventPost = post.category === "Events" || post.slug.includes("ludhiana") || post.slug.includes("event");

  return {
    title: `${post.title} | LA Media & Communications`,
    description: post.excerpt,
    keywords: isEventPost
      ? "Ludhiana best event management firm, event management Ludhiana, architecture events Ludhiana, LA Media Communications, event planning Punjab, corporate events Ludhiana, conference management"
      : undefined,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.publishedAt?.toISOString(),
    },
  };
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params;
  let post = null;
  try {
    post = await prisma.blogPost.findUnique({
      where: { slug },
    });
  } catch (error) {
    console.error("BlogPost: failed to fetch post, showing 404:", error);
    notFound();
  }

  if (!post || !post.published) {
    notFound();
  }

  const insightImages = [
    "/blog-cover-1.png",
    "/blog-cover-2.png",
    "/blog-cover-3.png"
  ];

  // Get related posts — never crash the page if DB is down
  let relatedPosts: Awaited<ReturnType<typeof prisma.blogPost.findMany>> = [];
  try {
    relatedPosts = await prisma.blogPost.findMany({
      where: {
        category: post.category,
        published: true,
        NOT: { slug: post.slug },
      },
      take: 3,
      orderBy: { publishedAt: "desc" },
    });
  } catch (error) {
    console.error("BlogPost: failed to fetch related posts:", error);
    relatedPosts = [];
  }

  const publishedDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
    : new Date(post.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden pb-section-sm pt-40">
        <div className="absolute right-0 top-0 hidden h-full w-1/2 lg:block">
          <Media
            label={post.title}
            ratio="4/3"
            src={post.image || insightImages[0]}
            className="h-full border-0 ring-0"
          />
          <span className="absolute inset-0 bg-gradient-to-r from-navy via-navy/70 to-transparent" />
        </div>

        <div className="relative mx-auto max-w-shell px-gutter">
          <Reveal>
            <Link
              href="/insights"
              className="inline-flex items-center gap-2 text-[13px] text-mist transition-colors hover:text-copper"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Insights
            </Link>

            <div className="mt-6 flex items-center gap-4">
              <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-copper">
                {post.category}
              </span>
              <span className="h-1 w-1 rounded-full bg-slate" />
              <span className="text-[13px] text-slate">{publishedDate}</span>
              {post.author && (
                <>
                  <span className="h-1 w-1 rounded-full bg-slate" />
                  <span className="text-[13px] text-slate">By {post.author}</span>
                </>
              )}
            </div>

            <h1 className="h-display mt-6 max-w-[20ch] text-[clamp(1.8rem,6vw,4.6rem)]">
              {post.title}
            </h1>

            <p className="mt-8 max-w-[50ch] text-[18px] leading-relaxed text-mist">
              {post.excerpt}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Article Content */}
      <section className="border-t border-hairline py-section">
        <div className="mx-auto max-w-[65ch] px-gutter">
          <article className="prose-custom">
            <Reveal>
              <div
                className="space-y-6 text-[16px] leading-relaxed text-mist prose prose-headings:text-bone prose-h2:text-[28px] prose-h2:font-bold prose-h2:mt-12 prose-h3:text-[22px] prose-h3:font-bold prose-h3:mt-10 prose-p:text-mist prose-strong:text-copper prose-ul:space-y-3 prose-li:text-mist"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </Reveal>
          </article>
        </div>
      </section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="border-t border-hairline py-section">
          <div className="mx-auto max-w-shell px-gutter">
            <Reveal>
              <Eyebrow>Related Insights</Eyebrow>
              <h2 className="mt-6 text-[28px] font-bold">Continue Reading</h2>
            </Reveal>

            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {relatedPosts.map((relatedPost, i) => {
                const relatedDate = relatedPost.publishedAt
                  ? new Date(relatedPost.publishedAt).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })
                  : new Date(relatedPost.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });

                return (
                  <Link
                    key={relatedPost.slug}
                    href={`/insights/${relatedPost.slug}`}
                    className="panel group flex h-full flex-col overflow-hidden transition-all hover:border-copper"
                  >
                    <div className="relative">
                      <Media
                        label={relatedPost.title}
                        ratio="16/9"
                        src={relatedPost.image || insightImages[i % 3]}
                        className="border-0 ring-0 transition-transform group-hover:scale-105"
                      />
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      <div className="flex items-center justify-between gap-4">
                        <span className="text-[10.5px] font-semibold uppercase tracking-[0.14em] text-cobalt-soft">
                          {relatedPost.category}
                        </span>
                        <span className="text-[12px] text-slate">{relatedDate}</span>
                      </div>
                      <h3 className="mt-3 text-[16px] font-semibold leading-snug transition-colors group-hover:text-copper">
                        {relatedPost.title}
                      </h3>
                      <p className="mt-3 flex-1 text-[13px] leading-relaxed text-mist">
                        {relatedPost.excerpt.slice(0, 120)}...
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
