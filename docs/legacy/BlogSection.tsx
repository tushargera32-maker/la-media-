'use client';

import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  imageAlt: string;
  category: string;
  date: string;
  author?: string;
  readTime?: string;
}

interface BlogSectionProps {
  posts: BlogPost[];
  sectionTitle?: string;
  sectionSubtitle?: string;
  newsletterTitle?: string;
  newsletterDescription?: string;
}

const newsletterSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  name: z.string().min(2, 'Name must be at least 2 characters').optional(),
});

type NewsletterFormData = z.infer<typeof newsletterSchema>;

export default function BlogSection({
  posts,
  sectionTitle = 'Latest Insights',
  sectionSubtitle = 'Stay updated with our latest thoughts, news, and industry insights',
  newsletterTitle = 'Subscribe to Our Newsletter',
  newsletterDescription = 'Get the latest updates delivered directly to your inbox',
}: BlogSectionProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<NewsletterFormData>({
    resolver: zodResolver(newsletterSchema),
  });

  const onSubmit = async (data: NewsletterFormData) => {
    setIsSubmitting(true);
    try {
      // Add your newsletter subscription logic here
      console.log('Newsletter subscription:', data);
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call
      setSubmitSuccess(true);
      reset();
      setTimeout(() => setSubmitSuccess(false), 5000);
    } catch (error) {
      console.error('Newsletter subscription error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="w-full max-w-content mx-auto px-6 md:px-12 py-section-sm">
      {/* Section Header */}
      <div className="mb-16 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 leading-tight">
          {sectionTitle}
        </h2>
        <p className="text-lg md:text-xl text-muted max-w-2xl mx-auto">
          {sectionSubtitle}
        </p>
      </div>

      {/* Blog Posts Grid */}
      {posts.length === 0 && (
        <p className="text-center text-muted font-mono text-[11px] uppercase tracking-[0.14em] mb-24">
          No posts published yet
        </p>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
        {posts.slice(0, 4).map((post) => (
          <article
            key={post.id}
            className="group cursor-pointer transition-all duration-300"
          >
            {/* Post Image */}
            <div className="relative w-full aspect-[16/10] mb-6 overflow-hidden rounded-lg bg-surface shadow-lg">
              <Image
                src={post.image}
                alt={post.imageAlt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
              />
            </div>

            {/* Post Meta */}
            <div className="flex items-center gap-3 mb-3">
              <span className="text-xs font-mono uppercase tracking-wider text-accent">
                {post.category}
              </span>
              <span className="w-1 h-1 rounded-full bg-border" />
              <span className="text-xs font-mono text-muted">{post.date}</span>
              {post.readTime && (
                <>
                  <span className="w-1 h-1 rounded-full bg-border" />
                  <span className="text-xs font-mono text-muted">
                    {post.readTime}
                  </span>
                </>
              )}
            </div>

            {/* Post Title */}
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-3 leading-tight group-hover:text-accent transition-colors">
              {post.title}
            </h3>

            {/* Post Excerpt */}
            <p className="text-base text-muted leading-relaxed mb-4">
              {post.excerpt}
            </p>

            {/* Read More Link */}
            <div className="flex items-center gap-2 text-sm font-mono uppercase tracking-wider text-foreground group-hover:text-accent transition-colors">
              <span>Read More</span>
              <svg
                className="w-4 h-4 transition-transform group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>

            {/* Author */}
            {post.author && (
              <div className="mt-4 pt-4 border-t border-border">
                <span className="text-sm text-muted">By {post.author}</span>
              </div>
            )}
          </article>
        ))}
      </div>

      {/* Newsletter Section */}
      <div className="relative overflow-hidden rounded-lg bg-surface border border-border p-8 md:p-12 shadow-xl">
        <div className="max-w-2xl mx-auto text-center">
          <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {newsletterTitle}
          </h3>
          <p className="text-lg text-muted mb-8">{newsletterDescription}</p>

          {submitSuccess && (
            <div className="mb-6 p-4 rounded-lg bg-accent/10 border border-accent text-accent">
              Thanks for subscribing! Check your inbox to confirm.
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Your name (optional)"
                  {...register('name')}
                  className="w-full px-6 py-4 rounded-lg border border-border bg-background text-foreground placeholder:text-muted focus:outline-none focus:border-accent transition-colors"
                  disabled={isSubmitting}
                />
                {errors.name && (
                  <p className="text-sm text-red-500 mt-2 text-left">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div className="flex-1">
                <input
                  type="email"
                  placeholder="Your email address"
                  {...register('email')}
                  className="w-full px-6 py-4 rounded-lg border border-border bg-background text-foreground placeholder:text-muted focus:outline-none focus:border-accent transition-colors"
                  disabled={isSubmitting}
                />
                {errors.email && (
                  <p className="text-sm text-red-500 mt-2 text-left">
                    {errors.email.message}
                  </p>
                )}
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full md:w-auto px-8 py-4 rounded-lg bg-foreground text-background font-mono uppercase tracking-wider text-sm hover:bg-accent hover:text-foreground transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Subscribing...' : 'Subscribe Now'}
            </button>
          </form>

          <p className="text-xs text-muted mt-6">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </section>
  );
}
