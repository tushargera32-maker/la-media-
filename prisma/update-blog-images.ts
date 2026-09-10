import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🔄 Updating blog post images...\n");

  const posts = await prisma.blogPost.findMany({
    orderBy: { createdAt: "asc" },
  });

  const imageMap: { [key: string]: string } = {
    // Events category
    "design-dialects-20-unveiled": "/blog-cover-1.png",
    "design-dialects-conference-ludhiana": "/blog-cover-2.png",
    "architecture-conference-punjab-2027": "/blog-cover-3.png",

    // Industry category
    "sustainable-architecture-future": "/blog-cover-4.png",
    "modern-office-spaces-design": "/blog-cover-5.png",
    "landscape-architecture-trends": "/blog-cover-6.png",
    "commercial-interior-design": "/blog-cover-8.png",
    "residential-architecture-ludhiana": "/blog-cover-9.png",

    // News category
    "la-media-expands-operations": "/blog-cover-1.png",
    "build-right-advisory-launch": "/blog-cover-2.png",

    // Insights category
    "event-management-best-practices": "/blog-cover-3.png",
    "conference-planning-guide": "/blog-cover-4.png",
    "architecture-networking-events": "/blog-cover-5.png",

    // Updates category
    "design-dialects-sponsors": "/blog-cover-6.png",
    "venue-announcement-2027": "/blog-cover-8.png",
    "early-bird-registrations": "/blog-cover-9.png",
    "speaker-lineup-2027": "/blog-cover-1.png",
    "partnership-announcements": "/blog-cover-2.png",
    "event-highlights-2026": "/blog-cover-3.png",
  };

  let updated = 0;

  for (const post of posts) {
    const imageUrl = imageMap[post.slug] || `/blog-cover-${(updated % 8) + 1}.png`;

    await prisma.blogPost.update({
      where: { id: post.id },
      data: { image: imageUrl },
    });

    console.log(`✅ Updated: ${post.title}`);
    console.log(`   Image: ${imageUrl}\n`);
    updated++;
  }

  console.log(`\n🎉 Updated ${updated} blog posts with images!`);
}

main()
  .catch((e) => {
    console.error("❌ Error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
