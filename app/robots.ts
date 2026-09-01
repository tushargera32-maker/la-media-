import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // The admin panel is auth-gated, but there is no reason to advertise it.
      disallow: ["/admin", "/api"],
    },
    sitemap: "https://lamedia.in/sitemap.xml",
  };
}
