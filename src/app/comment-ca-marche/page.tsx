import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Comment ça marche",
  description:
    "Les étapes pour comparer ou changer d'assurance auto : profil, étude d'éligibilité, comparaison, résiliation, prise d'effet.",
};

const STEPS = [
  {
    title: "1. Vous décrivez votre profil en ligne",
    text: "Véhicule, usage, conducteur, bonus-malus, antécédents : le formulaire prend quelques minutes. Cet échange ne vous engage à rien.",
  },
  {
    title: "2. Nous confirmons l'éligibilité de votre profil",
    text: "Votre profil est étudié face à nos assureurs partenaires. Vous savez immédiatement si nous avons une solution pour vous.",
  },
  {
    title: "3. La comparaison entre plusieurs assureurs",
    text: "En tant que courtier indépendant, on interroge plusieurs compagnies pour trouver la formule la plus adaptée à votre profil et à vos garanties souhaitées.",
  },
  {
    title: "4. La transmission de l'offre",
    text: "Un conseiller vous contacte avec une offre chiffrée et personnalisée, et répond à vos questions avant toute décision.",
  },
  {
    title: "5. La résiliation de votre ancien contrat",
    text: "Si vous avez déjà un contrat, votre nouvel assureur peut se charger des démarches de résiliation pour vous.",
  },
  {
    title: "6. La prise d'effet",
    text: "Votre nouveau contrat prend effet à la date convenue avec vous.",
  },
];

export default function CommentCaMarchePage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="font-heading text-3xl font-semibold text-navy sm:text-4xl">
        Comment se passe le changement d&apos;assurance auto
      </h1>
      <p className="mt-4 text-neutral-900/70">
        Depuis la loi Hamon, vous pouvez résilier votre assurance auto à tout
        moment après un an de contrat, sans frais. Voici les étapes concrètes.
      </p>

      <div className="mt-10 space-y-8">
        {STEPS.map((step) => (
          <div key={step.title} className="border-l-2 border-orange pl-5">
            <h2 className="font-heading font-semibold text-navy">
              {step.title}
            </h2>
            <p className="mt-1 text-sm text-neutral-900/70">{step.text}</p>
          </div>
        ))}
      </div>

      <p className="mt-10 text-sm text-neutral-900/60">
        Délai moyen entre la première demande et la prise d&apos;effet du
        nouveau contrat : généralement entre 1 et 3 semaines.
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
