import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🔄 Updating blog post images...\n");

  const posts = await prisma.blogPost.findMany({
    orderBy: { createdAt: "asc" },
  });

  const imageMap: { [key: string]: string } = {
    // Events category
    "design-dialects-20-unveiled": "/blog-cover-1.jpg",
    "design-dialects-conference-ludhiana": "/blog-cover-2.jpg",
    "architecture-conference-punjab-2027": "/blog-cover-3.jpg",

    // Industry category
    "sustainable-architecture-future": "/blog-cover-4.jpg",
    "modern-office-spaces-design": "/blog-cover-5.jpg",
    "landscape-architecture-trends": "/blog-cover-6.jpg",
    "commercial-interior-design": "/blog-cover-8.jpg",
    "residential-architecture-ludhiana": "/blog-cover-9.jpg",

    // News category
    "la-media-expands-operations": "/blog-cover-1.jpg",
    "build-right-advisory-launch": "/blog-cover-2.jpg",

    // Insights category
    "event-management-best-practices": "/blog-cover-3.jpg",
    "conference-planning-guide": "/blog-cover-4.jpg",
    "architecture-networking-events": "/blog-cover-5.jpg",

    // Updates category
    "design-dialects-sponsors": "/blog-cover-6.jpg",
    "venue-announcement-2027": "/blog-cover-8.jpg",
    "early-bird-registrations": "/blog-cover-9.jpg",
    "speaker-lineup-2027": "/blog-cover-1.jpg",
    "partnership-announcements": "/blog-cover-2.jpg",
    "event-highlights-2026": "/blog-cover-3.jpg",
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
