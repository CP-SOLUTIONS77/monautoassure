import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Pourquoi comparer son assurance auto",
  description:
    "Vous pouvez changer d'assurance auto à tout moment après un an de contrat (loi Hamon). Un courtier indépendant compare plusieurs assureurs pour votre profil.",
};

export default function PourquoiComparerPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <p className="font-heading text-sm font-semibold uppercase tracking-wide text-orange">
        Loi Hamon
      </p>
      <h1 className="mt-2 font-heading text-3xl font-semibold text-navy sm:text-4xl">
        Pourquoi comparer son assurance auto
      </h1>
      <p className="mt-4 text-neutral-900/70">
        L&apos;assurance auto est obligatoire, mais vous n&apos;êtes pas obligé
        de rester chez le même assureur. La loi vous autorise à changer de
        compagnie à tout moment, une fois la première année de contrat
        passée.
      </p>

      <h2 className="mt-10 font-heading text-xl font-semibold text-navy">
        Ce que dit la loi
      </h2>
      <ul className="mt-3 space-y-2 text-sm text-neutral-900/70">
        {[
          "L'assurance responsabilité civile (« au tiers ») est obligatoire pour tout véhicule",
          "Loi Chatel : votre assureur doit vous informer de la date limite de résiliation avant chaque échéance",
          "Loi Hamon (2014) : après un an de contrat, vous pouvez résilier à tout moment, sans frais ni justification",
        ].map((item) => (
          <li key={item} className="flex items-start gap-2">
            <span className="mt-1 text-orange" aria-hidden>
              •
            </span>
            {item}
          </li>
        ))}
      </ul>

      <h2 className="mt-10 font-heading text-xl font-semibold text-navy">
        Pourquoi les tarifs varient autant
      </h2>
      <p className="mt-3 text-sm text-neutral-900/70">
        Chaque assureur évalue le risque à sa façon : âge et ancienneté du
        permis, bonus-malus, usage du véhicule, lieu de stationnement,
        antécédents de sinistres. Un même profil peut recevoir des
        propositions très différentes d&apos;une compagnie à l&apos;autre.
      </p>

      <h2 className="mt-10 font-heading text-xl font-semibold text-navy">
        L&apos;intérêt d&apos;un courtier indépendant
      </h2>
      <p className="mt-3 text-sm text-neutral-900/70">
        Contrairement à un agent lié à une seule compagnie, un courtier
        indépendant interroge plusieurs assureurs pour votre profil et
        défend votre dossier, sans frais de dossier caché.
      </p>

      <Link
        href="/simulateur"
        className="mt-8 inline-block rounded-full bg-orange px-6 py-3 font-heading font-semibold text-white transition hover:brightness-95"
      >
        Étudier mon profil
      </Link>
    </div>
  );
}
