import { prisma } from "@/lib/prisma";
import { INSIGHTS } from "@/lib/content";

async function seedBlogPosts() {
  console.log("🌱 Seeding blog posts from content.ts...");

  try {
    // Check if posts already exist
    const existingCount = await prisma.blogPost.count();
    if (existingCount > 0) {
      console.log(`⚠️  Database already has ${existingCount} posts. Skipping seed.`);
      console.log("   To re-seed, delete all posts first or run with --force flag");
      return;
    }

    // Seed all posts from INSIGHTS
    for (const post of INSIGHTS) {
      await prisma.blogPost.create({
        data: {
          title: post.title,
          slug: post.slug,
          excerpt: post.excerpt,
          content: generateFullContent(post),
          category: post.category,
          author: "LA Media Team",
          published: true,
          publishedAt: new Date(post.date),
        },
      });
      console.log(`✅ Created: ${post.title}`);
    }

    console.log(`\n🎉 Successfully seeded ${INSIGHTS.length} blog posts!`);
    console.log(`\n📍 You can now manage them at: /admin/blog`);
    console.log(`📖 View them at: /insights`);
  } catch (error) {
    console.error("❌ Error seeding blog posts:", error);
    throw error;
  }
}

// Generate full content for each post based on category
function generateFullContent(post: any): string {
  const isEventPost = post.category === "Events" || post.slug.includes("ludhiana") || post.slug.includes("event");

  if (isEventPost) {
    return `
<h2>Why LA Media is Ludhiana's Leading Event Management Firm</h2>
<p>LA Media & Communications has established itself as <strong>Ludhiana's best event management firm</strong>, specializing in architecture and design conferences that bring together industry leaders, innovators, and professionals from across Punjab and beyond.</p>

<p>With over 25 years of experience and 50+ successful events, we understand what it takes to create memorable experiences that drive meaningful conversations and lasting connections in the architecture and built environment community.</p>

<h3>Our Event Management Expertise</h3>
<p>As a premier event management company in Ludhiana, we offer comprehensive services including:</p>

<ul>
  <li><strong>Conference Planning & Execution</strong> - From concept to completion, we handle every detail of your architecture conference</li>
  <li><strong>Venue Selection & Management</strong> - Expert knowledge of Ludhiana's best event venues</li>
  <li><strong>Speaker & Content Curation</strong> - Bringing together industry thought leaders</li>
  <li><strong>Brand Partnerships & Sponsorships</strong> - Creating value for all stakeholders</li>
  <li><strong>Registration & Attendee Management</strong> - Seamless experience from sign-up to event day</li>
  <li><strong>Post-Event Analytics</strong> - Measuring success and impact</li>
</ul>

<h3>Design Dialects: Setting the Standard</h3>
<p>Our flagship event, <strong>Design Dialects</strong>, has become Punjab's premier architecture conference, attracting 200+ professionals and establishing Ludhiana as a hub for architectural discourse.</p>

<p>The success of Design Dialects demonstrates our ability to create events that are not just gatherings, but platforms for meaningful dialogue, innovation, and industry advancement.</p>

<h3>Why Choose Professional Event Management in Ludhiana?</h3>
<p>Working with Ludhiana's top event management firm ensures your conference or corporate event achieves maximum impact through professional planning, seamless execution, and strategic networking opportunities.</p>

<p>From intimate workshops to large-scale conferences, LA Media brings expertise, attention to detail, and a deep understanding of the architecture and design community to every event we manage.</p>

<h3>Get Started with Your Next Event</h3>
<p>Ready to create an unforgettable event experience? Contact LA Media & Communications today to discuss how we can bring your vision to life with professional event management services in Ludhiana.</p>

<p><strong>Contact us:</strong> lamediacommunications@gmail.com | +91 98151 00385</p>
    `.trim();
  } else if (post.category === "Professional Development") {
    return `
<h2>Professional Growth Through Industry Events</h2>
<p>In today's competitive architecture and design landscape, continuous professional development is essential. Industry events provide unique opportunities to learn from peers, discover new trends, and build meaningful professional relationships.</p>

<p>LA Media & Communications, as Ludhiana's leading event management firm, creates platforms specifically designed to support your professional growth and industry advancement.</p>

<h3>The Value of Architecture Events</h3>
<p>Professional events offer benefits that extend far beyond the event day itself:</p>

<ul>
  <li><strong>Knowledge Exchange</strong> - Learn from industry leaders and peers</li>
  <li><strong>Networking Opportunities</strong> - Build lasting professional relationships</li>
  <li><strong>Stay Current</strong> - Discover latest trends and technologies</li>
  <li><strong>Business Development</strong> - Connect with potential clients and collaborators</li>
  <li><strong>Community Building</strong> - Be part of a vibrant professional ecosystem</li>
</ul>

<h3>Making the Most of Events</h3>
<p>To maximize the value of professional events, come prepared with clear goals, be open to conversations, and follow up with new connections after the event.</p>

<p>At LA Media events like Design Dialects, we create structured networking opportunities alongside formal sessions to ensure you make meaningful connections.</p>
    `.trim();
  } else {
    return `
<h2>${post.title}</h2>
<p>${post.excerpt}</p>

<p>This article explores key insights and perspectives relevant to ${post.category.toLowerCase()} in the architecture and built environment industry.</p>

<h3>Industry Perspective</h3>
<p>The architecture and design community continues to evolve, driven by innovation, sustainability concerns, and changing client needs. Understanding these dynamics is crucial for professionals looking to stay ahead in the industry.</p>

<h3>Key Takeaways</h3>
<ul>
  <li>Stay informed about industry trends and developments</li>
  <li>Engage with the professional community through events and platforms</li>
  <li>Continuously develop skills and knowledge</li>
  <li>Build meaningful professional relationships</li>
</ul>

<h3>Join the Conversation</h3>
<p>LA Media & Communications creates platforms for professionals to engage, learn, and grow. From Design Dialects conferences to our insights platform, we're committed to advancing the architecture and design community in Punjab and beyond.</p>

<p><strong>Stay Connected:</strong> Follow us for more insights and join us at our next event.</p>
    `.trim();
  }
}

// Run the seed
seedBlogPosts()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
