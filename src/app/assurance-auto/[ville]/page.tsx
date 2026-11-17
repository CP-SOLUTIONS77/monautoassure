import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { VILLES, getVille } from "@/lib/villes";

export function generateStaticParams() {
  return VILLES.map((ville) => ({ ville: ville.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ ville: string }>;
}): Promise<Metadata> {
  const { ville: slug } = await params;
  const ville = getVille(slug);
  if (!ville) return {};
  return {
    title: ville.titre,
    description: ville.description,
    alternates: { canonical: `/assurance-auto/${ville.slug}` },
  };
}

export default async function VillePage({
  params,
}: {
  params: Promise<{ ville: string }>;
}) {
  const { ville: slug } = await params;
  const ville = getVille(slug);
  if (!ville) notFound();

  const url = `https://www.monautoassure.fr/assurance-auto/${ville.slug}`;
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      serviceType: "Assurance automobile",
      name: `Assurance auto à ${ville.nom}`,
      url,
      areaServed: { "@type": "City", name: ville.nom },
      provider: {
        "@type": "InsuranceAgency",
        name: "CP Solutions",
        url: "https://cpsolutions77.com",
        telephone: "+33164248345",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: ville.faq.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.reponse },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Accueil", item: "https://www.monautoassure.fr" },
        {
          "@type": "ListItem",
          position: 2,
          name: "Près de chez vous",
          item: "https://www.monautoassure.fr/assurance-auto",
        },
        { "@type": "ListItem", position: 3, name: ville.nom, item: url },
      ],
    },
  ];
  const autres = VILLES.filter((v) => v.slug !== ville.slug);

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav className="text-sm text-neutral-900/60" aria-label="Fil d'Ariane">
        <Link href="/" className="hover:text-navy">
          Accueil
        </Link>{" "}
        /{" "}
        <Link href="/assurance-auto" className="hover:text-navy">
          Près de chez vous
        </Link>{" "}
        / {ville.nom}
      </nav>

      <p className="mt-6 font-heading text-sm font-semibold uppercase tracking-wide text-orange">
        Assurance auto · {ville.nom}
      </p>
      <h1 className="mt-2 font-heading text-3xl font-semibold text-navy sm:text-4xl">
        {ville.h1}
      </h1>
      <p className="mt-4 text-neutral-900/70">{ville.chapeau}</p>

      <div className="mt-6 flex flex-wrap gap-3">
        <Link
          href="/simulateur"
          className="rounded-full bg-orange px-6 py-3 font-heading font-semibold text-white transition hover:brightness-95"
        >
          Comparer mon assurance auto
        </Link>
        <a
          href="tel:+33164248345"
          className="rounded-full border border-navy px-6 py-3 font-heading font-semibold text-navy transition hover:bg-navy hover:text-white"
        >
          01 64 24 83 45
        </a>
      </div>

      {ville.sections.map((section) => (
        <section key={section.titre}>
          <h2 className="mt-10 font-heading text-xl font-semibold text-navy">
            {section.titre}
          </h2>
          {section.paragraphes.map((paragraphe) => (
            <p key={paragraphe} className="mt-3 text-sm text-neutral-900/70">
              {paragraphe}
            </p>
          ))}
          {section.liste && (
            <ul className="mt-3 space-y-2 text-sm text-neutral-900/70">
              {section.liste.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-1 text-orange" aria-hidden>
                    •
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          )}
        </section>
      ))}

      <h2 className="mt-10 font-heading text-xl font-semibold text-navy">
        Un courtier près de chez vous
      </h2>
      <p className="mt-3 text-sm text-neutral-900/70">
        Mon Auto Assuré est porté par{" "}
        <a href="https://cpsolutions77.com" className="text-navy underline">
          CP Solutions
        </a>
        , 35 rue Jean Jaurès, 77130 Montereau-Fault-Yonne. {ville.trajet}
      </p>

      <h2 className="mt-10 font-heading text-xl font-semibold text-navy">
        Questions fréquentes
      </h2>
      <div className="mt-3 divide-y divide-neutral-100 border-y border-neutral-100">
        {ville.faq.map((item) => (
          <details key={item.question} className="py-4">
            <summary className="cursor-pointer font-heading font-semibold text-neutral-900">
              {item.question}
            </summary>
            <p className="mt-2 text-sm text-neutral-900/70">{item.reponse}</p>
          </details>
        ))}
      </div>

      <div className="mt-10 rounded-2xl bg-navy/5 p-6">
        <p className="font-heading font-semibold text-navy">
          Payez-vous le bon prix ?
        </p>
        <p className="mt-2 text-sm text-neutral-900/70">
          Étude gratuite et sans engagement : on compare plusieurs assureurs sur
          votre profil et on vous explique les écarts de garanties, pas seulement de prix.
        </p>
        <Link
          href="/simulateur"
          className="mt-4 inline-block rounded-full bg-orange px-6 py-3 font-heading font-semibold text-white transition hover:brightness-95"
        >
          Lancer ma comparaison
        </Link>
      </div>

      <p className="mt-10 text-sm text-neutral-900/60">
        Nous intervenons aussi à{" "}
        {autres.map((v, i) => (
          <span key={v.slug}>
            <Link href={`/assurance-auto/${v.slug}`} className="text-navy hover:underline">
              {v.nom}
            </Link>
            {i < autres.length - 1 ? " · " : ""}
          </span>
        ))}
        .
      </p>
    </div>
  );
}
