import type { MetadataRoute } from "next";

const ROUTES = [
  "",
  "/comment-ca-marche",
  "/pourquoi-comparer",
  "/simulateur",
  "/a-propos",
  "/contact",
  "/mentions-legales",
  "/confidentialite",
  "/cookies",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://monautoassure.fr";
  return ROUTES.map((route) => ({
    url: `${base}${route}`,
    lastModified: new Date(),
  }));
}
