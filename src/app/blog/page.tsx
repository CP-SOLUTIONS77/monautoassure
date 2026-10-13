import Link from "next/link";
import type { Metadata } from "next";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog",
  description: "Actualités et conseils sur l'assurance auto.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="font-heading text-3xl font-semibold text-neutral-900">Blog</h1>
      <p className="mt-2 text-neutral-900/70">
        Actualités et conseils sur l&apos;assurance auto.
      </p>

      {posts.length === 0 ? (
        <p className="mt-10 text-sm text-neutral-900/60">
          Aucun article publié pour le moment.
        </p>
      ) : (
        <ul className="mt-10 space-y-8">
          {posts.map((post) => (
            <li key={post.slug} className="border-b border-neutral-100 pb-8">
              <Link href={`/blog/${post.slug}`} className="group">
                <p className="text-xs text-neutral-900/50">
                  {new Date(post.date).toLocaleDateString("fr-FR", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
                <h2 className="mt-1 font-heading text-xl font-semibold text-neutral-900 group-hover:text-navy">
                  {post.titre}
                </h2>
                <p className="mt-2 text-sm text-neutral-900/70">{post.description}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
