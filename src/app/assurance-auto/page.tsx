import type { Metadata } from "next";
import Link from "next/link";
import { VILLES } from "@/lib/villes";

export const metadata: Metadata = {
  title: "Assurance auto en Seine-et-Marne et dans l'Yonne",
  description:
    "Courtier en assurance auto installé à Montereau-Fault-Yonne : Fontainebleau, Melun, Nemours, Sens, Provins et partout en France, en ligne.",
  alternates: { canonical: "/assurance-auto" },
};

export default function AssuranceAutoLocalePage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <p className="font-heading text-sm font-semibold uppercase tracking-wide text-orange">
        Près de chez vous
      </p>
      <h1 className="mt-2 font-heading text-3xl font-semibold text-navy sm:text-4xl">
        Assurance auto en Seine-et-Marne et dans l&apos;Yonne
      </h1>
      <p className="mt-4 text-neutral-900/70">
        Mon Auto Assuré est porté par CP Solutions, cabinet de courtage installé
        à Montereau-Fault-Yonne. Nous accompagnons les conducteurs partout en
        France, en ligne, et recevons à l&apos;agence ceux qui habitent le sud
        Seine-et-Marne et le nord de l&apos;Yonne.
      </p>

      <ul className="mt-10 divide-y divide-neutral-100 border-y border-neutral-100">
        {VILLES.map((ville) => (
          <li key={ville.slug} className="py-4">
            <Link
              href={`/assurance-auto/${ville.slug}`}
              className="font-heading font-semibold text-navy hover:underline"
            >
              Assurance auto à {ville.nom}
            </Link>
            <p className="mt-1 text-sm text-neutral-900/70">{ville.description}</p>
          </li>
        ))}
      </ul>

      <h2 className="mt-10 font-heading text-xl font-semibold text-navy">
        Vous habitez ailleurs ?
      </h2>
      <p className="mt-3 text-sm text-neutral-900/70">
        Une assurance auto se souscrit entièrement à distance : devis,
        comparaison des assureurs et souscription, sans vous déplacer. Lancez une simulation ou appelez le 01 64 24 83 45.
      </p>
      <Link
        href="/simulateur"
        className="mt-6 inline-block rounded-full bg-orange px-6 py-3 font-heading font-semibold text-white transition hover:brightness-95"
      >
        Comparer mon assurance auto
      </Link>
    </div>
  );
}
