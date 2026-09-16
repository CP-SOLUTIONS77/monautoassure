import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Assurance auto à Montereau",
  description:
    "Comparez votre assurance auto avant de souscrire, ou changez d'assureur à tout moment après un an de contrat (loi Hamon). Étude gratuite, sans engagement.",
};

const BENEFITS = [
  {
    title: "Comparaison multi-assureurs",
    text: "Courtier indépendant, nous interrogeons plusieurs compagnies pour trouver la formule la plus adaptée à votre profil et à votre véhicule.",
  },
  {
    title: "Changement possible à tout moment",
    text: "Depuis la loi Hamon, vous pouvez résilier votre assurance auto à tout moment après un an de contrat, sans frais ni justification.",
  },
  {
    title: "Zéro engagement",
    text: "L'étude de votre profil et la comparaison des offres sont gratuites et ne vous engagent à rien.",
  },
];

const STEPS = [
  {
    step: "1",
    title: "Vous décrivez votre profil",
    text: "Véhicule, usage, conducteur, antécédents : quelques minutes suffisent pour un dossier complet.",
  },
  {
    step: "2",
    title: "On confirme si nous avons une solution",
    text: "Votre profil est étudié face à nos assureurs partenaires : réponse immédiate sur son éligibilité.",
  },
  {
    step: "3",
    title: "Un conseiller affine l'étude",
    text: "En tant que courtier indépendant, on interroge plusieurs compagnies et on vous transmet une offre chiffrée.",
  },
  {
    step: "4",
    title: "Vous changez sereinement",
    text: "Si vous avez déjà un contrat, nous pouvons vous accompagner dans les démarches de résiliation.",
  },
];

export default function HomePage() {
  return (
    <>
      <section className="mx-auto max-w-6xl px-6 pb-16 pt-14 sm:pt-20">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="font-heading text-sm font-semibold uppercase tracking-wide text-orange">
              Assurance auto
            </p>
            <h1 className="mt-3 font-heading text-4xl font-semibold leading-tight text-navy sm:text-5xl">
              Une assurance auto vraiment adaptée à votre profil.
            </h1>
            <p className="mt-5 max-w-xl text-lg text-neutral-900/80">
              On compare les assurances auto de plusieurs compagnies pour
              trouver la formule la plus adaptée à votre véhicule et à votre
              profil de conducteur. Étude gratuite, sans engagement.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/simulateur"
                className="rounded-full bg-orange px-6 py-3 font-heading font-semibold text-white shadow-sm transition hover:brightness-95"
              >
                Étudier mon profil
              </Link>
              <a
                href="tel:+33164248345"
                className="rounded-full border border-navy px-6 py-3 font-heading font-semibold text-navy transition hover:bg-navy hover:text-white"
              >
                Appeler le 01 64 24 83 45
              </a>
            </div>

            <div className="mt-8 flex items-center gap-2 text-sm text-neutral-900/70">
              <span className="text-orange" aria-hidden>
                ★★★★★
              </span>
              <span>5,0 / 5 — 84 avis Google</span>
            </div>
          </div>

          <div className="rounded-3xl bg-navy/5 p-8">
            <p className="font-heading font-semibold text-navy">
              Ce que notre étude prend en compte
            </p>
            <ul className="mt-4 space-y-3 text-sm text-neutral-900/80">
              {[
                "Véhicule, usage et kilométrage annuel",
                "Profil du conducteur et bonus-malus",
                "Antécédents et éventuelle résiliation",
                "Formule et franchise souhaitées",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 border-b border-navy/10 pb-3 last:border-0 last:pb-0">
                  <span className="mt-1 text-orange" aria-hidden>
                    •
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs text-neutral-900/50">
              Étude indicative. Le tarif définitif est établi par nos
              partenaires assureurs après étude complète de votre dossier.
            </p>
          </div>
        </div>
      </section>

      <section className="border-y border-neutral-100 bg-neutral-50">
        <div className="mx-auto grid max-w-6xl gap-8 px-6 py-14 sm:grid-cols-3">
          {BENEFITS.map((benefit) => (
            <div key={benefit.title}>
              <h2 className="font-heading font-semibold text-navy">
                {benefit.title}
              </h2>
              <p className="mt-2 text-sm text-neutral-900/70">{benefit.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="font-heading text-2xl font-semibold text-navy sm:text-3xl">
          Comment ça marche
        </h2>
        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((item) => (
            <div key={item.step}>
              <span className="font-heading text-3xl font-semibold text-orange">
                {item.step}
              </span>
              <h3 className="mt-2 font-heading font-semibold text-neutral-900">
                {item.title}
              </h3>
              <p className="mt-2 text-sm text-neutral-900/70">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-neutral-100 bg-navy">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-4 px-6 py-14 text-white sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-heading text-2xl font-semibold">
              Une assurance auto à comparer ?
            </h2>
            <p className="mt-1 text-white/80">
              Réponse sous 48h, sans engagement.
            </p>
          </div>
          <Link
            href="/simulateur"
            className="rounded-full bg-orange px-6 py-3 font-heading font-semibold text-white transition hover:brightness-95"
          >
            Étudier mon profil
          </Link>
        </div>
      </section>
    </>
  );
}
