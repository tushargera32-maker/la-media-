import type { MetadataRoute } from "next";

const BASE = "https://lamedia.co.in";

/** Public routes only. /admin is excluded and disallowed in robots.txt. */
export default function sitemap(): MetadataRoute.Sitemap {
       const routes = ["", "/about", "/what-we-do", "/work", "/insights", "/media", "/build-right", "/design-dialects", "/partner", "/contact", "/register"];
  const now = new Date();

  return routes.map((route) => ({
    url: `${BASE}${route}`,
    lastModified: now,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.8,
  }));
}
