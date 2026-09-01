import FeaturedWork from './FeaturedWork';

// Example usage of FeaturedWork component
export default function FeaturedWorkExample() {
  return (
    <FeaturedWork
      category="Design Dialect"
      year="2024"
      title="Transforming Brand Identity Through Strategic Design"
      description="A comprehensive brand evolution project that redefined the visual language and market positioning for a leading technology company. We crafted a cohesive design system that bridges tradition with innovation."
      image="/images/featured-work-design-dialect.jpg"
      imageAlt="Design Dialect project showcase featuring brand identity materials"
      stats={[
        { label: "Project Duration", value: "6 Months" },
        { label: "Team Members", value: "12" },
        { label: "Deliverables", value: "150+" },
        { label: "Market Growth", value: "+340%" },
      ]}
      tags={[
        "Brand Identity",
        "Design System",
        "Visual Language",
        "Art Direction",
        "Typography",
        "Digital Strategy",
      ]}
    />
  );
}
