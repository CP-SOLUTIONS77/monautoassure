import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description: "Traitement des données personnelles collectées sur le site.",
};

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1 border-b border-neutral-100 py-3 sm:flex-row sm:justify-between">
      <dt className="text-sm text-neutral-900/60">{label}</dt>
      <dd className="text-sm font-medium text-neutral-900">{value}</dd>
    </div>
  );
}

export default function ConfidentialitePage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="font-heading text-3xl font-semibold text-navy sm:text-4xl">
        Politique de confidentialité
      </h1>
      <p className="mt-4 text-neutral-900/70">
        CP Solutions attache une attention particulière à la protection de
        vos données personnelles. Cette page décrit ce qui est collecté sur
        monautoassure.fr, pourquoi, et comment exercer vos droits.
      </p>

      <h2 className="mt-10 font-heading text-xl font-semibold text-navy">
        Responsable du traitement
      </h2>
      <dl className="mt-4">
        <Row label="Raison sociale" value="CP SOLUTIONS" />
        <Row
          label="Adresse"
          value="35 rue Jean Jaurès, 77130 Montereau-Fault-Yonne"
        />
        <Row label="E-mail" value="contact@cpsolutions77.com" />
      </dl>

      <h2 className="mt-10 font-heading text-xl font-semibold text-navy">
        Données collectées
      </h2>
      <p className="mt-3 text-sm text-neutral-900/70">
        Les seules données personnelles collectées sur ce site sont celles
        que vous saisissez volontairement dans le formulaire de contact ou de
        comparaison :
      </p>
      <ul className="mt-3 space-y-2 text-sm text-neutral-900/70">
        {[
          "Prénom et nom",
          "Adresse e-mail",
          "Numéro de téléphone",
          "Éléments de votre profil auto (véhicule, usage, conducteur, antécédents, formule souhaitée) et de votre demande",
        ].map((item) => (
          <li key={item} className="flex items-start gap-2">
            <span className="mt-1 text-orange" aria-hidden>
              •
            </span>
            {item}
          </li>
        ))}
      </ul>
      <p className="mt-3 text-sm text-neutral-900/70">
        Le site ne collecte aucune donnée de santé. Le tarif définitif de
        votre contrat est établi ultérieurement par nos partenaires
        assureurs, sur la base des informations que vous leur transmettez
        directement.
      </p>

      <h2 className="mt-10 font-heading text-xl font-semibold text-navy">
        Finalité et base légale
      </h2>
      <p className="mt-3 text-sm text-neutral-900/70">
        Ces données sont utilisées uniquement pour répondre à votre demande
        de contact ou d&apos;étude d&apos;assurance auto, sur la base de
        votre consentement exprimé en soumettant le formulaire.
      </p>

      <h2 className="mt-10 font-heading text-xl font-semibold text-navy">
        Destinataire et hébergement
      </h2>
      <p className="mt-3 text-sm text-neutral-900/70">
        Les données transmises via le formulaire sont enregistrées dans
        l&apos;outil de gestion de contacts <strong>Brevo</strong> (Sendinblue
        SAS, société française), utilisé par CP Solutions pour le suivi de
        ses demandes clients. Elles ne sont ni vendues, ni cédées à des tiers
        à des fins commerciales.
      </p>

      <h2 className="mt-10 font-heading text-xl font-semibold text-navy">
        Durée de conservation
      </h2>
      <p className="mt-3 text-sm text-neutral-900/70">
        Vos données sont conservées le temps nécessaire au traitement de
        votre demande, puis jusqu&apos;à 3 ans à compter du dernier contact à
        des fins de suivi commercial, sauf demande de suppression de votre
        part.
      </p>

      <h2 className="mt-10 font-heading text-xl font-semibold text-navy">
        Vos droits
      </h2>
      <p className="mt-3 text-sm text-neutral-900/70">
        Conformément au RGPD et à la loi Informatique et Libertés, vous
        disposez d&apos;un droit d&apos;accès, de rectification,
        d&apos;effacement, de limitation et d&apos;opposition sur vos données.
        Pour exercer ces droits, contactez-nous à{" "}
        <a href="mailto:contact@cpsolutions77.com" className="text-navy">
          contact@cpsolutions77.com
        </a>{" "}
        ou par courrier au siège social. Vous pouvez également introduire une
        réclamation auprès de la CNIL (cnil.fr).
      </p>

      <h2 className="mt-10 font-heading text-xl font-semibold text-navy">
        Sécurité
      </h2>
      <p className="mt-3 text-sm text-neutral-900/70">
        Les formulaires sont transmis de manière chiffrée (HTTPS). L&apos;accès
        aux données collectées est réservé aux personnes habilitées du
        cabinet.
      </p>
    </div>
  );
}
