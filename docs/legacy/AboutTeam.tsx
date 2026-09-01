import React from 'react';
import Image from 'next/image';

interface TeamMember {
  id: number;
  name: string;
  role: string;
  expertise: string[];
  image: string | null;
  bio: string;
}

/**
 * The three people previously listed here (Sarah Mitchell, Marcus Chen,
 * Elena Rodriguez) were invented, with Unsplash stock portraits. Removed.
 * Add real team members here, or leave empty — the section will not render.
 */
const teamMembers: TeamMember[] = [];

export default function AboutTeam() {
  if (teamMembers.length === 0) return null;

  return (
    <section className="py-section">
      <div className="max-w-content mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
            Meet Our Team
          </h2>
          <p className="text-lg md:text-xl text-muted max-w-3xl mx-auto">
            A collective of creative minds dedicated to bringing your vision to life through innovative design and strategic thinking.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member) => (
            <div
              key={member.id}
              className="group relative bg-surface border border-border rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-accent/10 hover:-translate-y-2"
            >
              {/* Image Container */}
              <div className="relative h-80 overflow-hidden bg-muted">
                {member.image && (
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                )}
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                {/* Name & Role */}
                <div>
                  <h3 className="text-2xl font-bold mb-1 tracking-tight">
                    {member.name}
                  </h3>
                  <p className="text-accent font-medium">
                    {member.role}
                  </p>
                </div>

                {/* Bio */}
                <p className="text-muted text-sm leading-relaxed">
                  {member.bio}
                </p>

                {/* Expertise Tags */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {member.expertise.map((skill, index) => (
                    <span
                      key={index}
                      className="inline-block px-3 py-1.5 text-xs font-medium bg-accent/10 text-accent rounded-full border border-accent/20 transition-colors duration-300 hover:bg-accent/20"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Premium Accent Line */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-accent via-accent-light to-accent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <p className="text-muted mb-6">
            Want to work with us or join our team?
          </p>
          <button className="px-8 py-4 bg-accent text-white font-semibold rounded-full hover:bg-accent-dark transition-all duration-300 hover:shadow-lg hover:shadow-accent/30 hover:scale-105">
            Get In Touch
          </button>
        </div>
      </div>
    </section>
  );
}
