import BlogSection from './BlogSection';

export default function BlogSectionExample() {
  const samplePosts = [
    {
      id: '1',
      title: 'The Future of Digital Marketing in 2026',
      excerpt:
        'Explore emerging trends and technologies shaping the digital marketing landscape, from AI-powered campaigns to immersive brand experiences.',
      image: '/blog/digital-marketing.jpg',
      imageAlt: 'Digital marketing visualization',
      category: 'Marketing',
      date: 'Aug 15, 2026',
      author: 'Sarah Johnson',
      readTime: '5 min read',
    },
    {
      id: '2',
      title: 'Building Brands That Resonate',
      excerpt:
        'Learn the key principles of creating authentic brand identities that connect with audiences and stand the test of time.',
      image: '/blog/brand-building.jpg',
      imageAlt: 'Brand strategy workshop',
      category: 'Branding',
      date: 'Aug 12, 2026',
      author: 'Michael Chen',
      readTime: '7 min read',
    },
    {
      id: '3',
      title: 'Creative Strategies for Social Media Success',
      excerpt:
        'Discover innovative approaches to social media content that drive engagement and build lasting relationships with your audience.',
      image: '/blog/social-media.jpg',
      imageAlt: 'Social media content creation',
      category: 'Social Media',
      date: 'Aug 8, 2026',
      author: 'Emma Williams',
      readTime: '6 min read',
    },
    {
      id: '4',
      title: 'Data-Driven Design: Making Better Decisions',
      excerpt:
        'How analytics and user research can inform design decisions and create experiences that truly meet user needs.',
      image: '/blog/data-design.jpg',
      imageAlt: 'Data visualization and design',
      category: 'Design',
      date: 'Aug 5, 2026',
      author: 'David Martinez',
      readTime: '8 min read',
    },
  ];

  return (
    <BlogSection
      posts={samplePosts}
      sectionTitle="Latest Insights"
      sectionSubtitle="Stay updated with our latest thoughts, news, and industry insights"
      newsletterTitle="Subscribe to Our Newsletter"
      newsletterDescription="Get the latest updates delivered directly to your inbox"
    />
  );
}
