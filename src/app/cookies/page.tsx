import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookies",
  description: "Utilisation des cookies sur le site.",
};

export default function CookiesPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="font-heading text-3xl font-semibold text-navy sm:text-4xl">
        Cookies
      </h1>
      <p className="mt-4 text-neutral-900/70">
        À ce jour, monautoassure.fr n&apos;utilise aucun cookie de mesure
        d&apos;audience, de publicité ou de traçage. Le site ne dépose aucun
        cookie nécessitant votre consentement au sens de la réglementation
        applicable (CNIL, directive ePrivacy).
      </p>

      <h2 className="mt-10 font-heading text-xl font-semibold text-navy">
        Ce que nous utilisons
      </h2>
      <p className="mt-3 text-sm text-neutral-900/70">
        Le site s&apos;appuie uniquement sur le fonctionnement technique
        standard d&apos;un site web (aucun cookie de session, aucun stockage
        local utilisé pour vous suivre). Les informations que vous
        transmettez via le formulaire de contact ou de comparaison sont
        envoyées directement à notre outil de gestion de contacts, sans
        dépôt de cookie sur votre navigateur.
      </p>

      <h2 className="mt-10 font-heading text-xl font-semibold text-navy">
        Évolution
      </h2>
      <p className="mt-3 text-sm text-neutral-900/70">
        Si des outils de mesure d&apos;audience ou publicitaires venaient à
        être ajoutés à l&apos;avenir, cette page sera mise à jour et un
        bandeau de consentement sera affiché avant tout dépôt de cookie non
        essentiel.
      </p>

      <p className="mt-8 text-sm text-neutral-900/60">
        Pour toute question, contactez-nous à{" "}
        <a href="mailto:contact@cpsolutions77.com" className="text-navy">
          contact@cpsolutions77.com
        </a>
        .
      </p>
    </div>
  );
}
