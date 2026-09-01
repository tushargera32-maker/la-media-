import Image from 'next/image';

interface Stat {
  label: string;
  value: string;
}

interface FeaturedWorkProps {
  title: string;
  category: string;
  description: string;
  image?: string;
  imageAlt: string;
  stats: Stat[];
  tags?: string[];
  year?: string;
}

export default function FeaturedWork({
  title,
  category,
  description,
  image,
  imageAlt,
  stats,
  tags = [],
  year,
}: FeaturedWorkProps) {
  return (
    <article className="w-full max-w-content mx-auto px-6 md:px-12 py-section-sm">
      {/* Header Section */}
      <div className="mb-12">
        <div className="flex items-center gap-4 mb-4">
          <span className="text-sm font-mono uppercase tracking-wider text-accent">
            {category}
          </span>
          {year && (
            <>
              <span className="w-1 h-1 rounded-full bg-border" />
              <span className="text-sm font-mono text-muted">{year}</span>
            </>
          )}
        </div>
        <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
          {title}
        </h2>
        <p className="text-lg md:text-xl text-muted max-w-3xl leading-relaxed">
          {description}
        </p>
      </div>

      {/* Main Image */}
      <div className="relative w-full aspect-[16/10] md:aspect-[21/9] mb-12 overflow-hidden rounded-lg bg-surface shadow-xl">
        {image ? (
          <Image
            src={image}
            alt={imageAlt}
            fill
            className="object-cover transition-transform duration-700 hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1600px"
            priority
          />
        ) : (
          <div className="absolute inset-0 grid place-items-center">
            <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
              Awaiting photography
            </span>
          </div>
        )}
      </div>

      {/* Stats & Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="border-l-2 border-accent pl-6 py-2"
          >
            <div className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              {stat.value}
            </div>
            <div className="text-sm font-mono uppercase tracking-wider text-muted">
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* Tags Section */}
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-3">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="px-4 py-2 text-sm font-mono border border-border rounded-full text-foreground hover:border-accent hover:text-accent transition-colors"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </article>
  );
}
