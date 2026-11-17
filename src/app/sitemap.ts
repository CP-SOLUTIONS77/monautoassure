import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";
import { VILLES } from "@/lib/villes";

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
  const base = "https://www.monautoassure.fr";
  const pages = [...ROUTES, "/blog"].map((route) => ({
    url: `${base}${route}`,
    lastModified: new Date(),
  }));
  const villes = ["/assurance-auto", ...VILLES.map((v) => `/assurance-auto/${v.slug}`)].map(
    (route) => ({ url: `${base}${route}`, lastModified: new Date() }),
  );
  const articles = getAllPosts().map((post) => ({
    url: `${base}/blog/${post.slug}`,
    lastModified: new Date(post.date),
  }));
  return [...pages, ...villes, ...articles];
}
