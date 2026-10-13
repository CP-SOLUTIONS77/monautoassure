import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import { renderMarkdown } from "@/lib/markdown";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.titre,
    description: post.description,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post || post.brouillon) notFound();

  return (
    <article className="mx-auto max-w-3xl px-6 py-16">
      <Link href="/blog" className="text-sm text-navy hover:underline">
        ← Retour au blog
      </Link>
      <p className="mt-6 text-xs text-neutral-900/50">
        {new Date(post.date).toLocaleDateString("fr-FR", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })}
      </p>
      <h1 className="mt-1 font-heading text-3xl font-semibold text-neutral-900">
        {post.titre}
      </h1>
      <div
        className="article-contenu mt-8"
        dangerouslySetInnerHTML={{ __html: renderMarkdown(post.contenu) }}
      />
      {post.liens.length > 0 && (
        <div className="mt-10 flex flex-wrap gap-3 border-t border-neutral-100 pt-6">
          {post.liens.map((lien) => (
            <Link
              key={lien.href}
              href={lien.href}
              className="rounded-full border border-neutral-200 px-4 py-2 text-sm text-navy hover:bg-neutral-50"
            >
              {lien.label}
            </Link>
          ))}
        </div>
      )}
    </article>
  );
}
