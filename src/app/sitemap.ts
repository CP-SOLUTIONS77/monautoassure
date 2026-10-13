import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";

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
  const pages = [...ROUTES, "/blog"].map((route) => ({
    url: `${base}${route}`,
    lastModified: new Date(),
  }));
  const articles = getAllPosts().map((post) => ({
    url: `${base}/blog/${post.slug}`,
    lastModified: new Date(post.date),
  }));
  return [...pages, ...articles];
}
