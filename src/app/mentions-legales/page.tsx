import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: "Informations réglementaires relatives à l'activité de courtier d'assurance.",
};

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1 border-b border-neutral-100 py-3 sm:flex-row sm:justify-between">
      <dt className="text-sm text-neutral-900/60">{label}</dt>
      <dd className="text-sm font-medium text-neutral-900">{value}</dd>
    </div>
  );
}

export default function MentionsLegalesPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="font-heading text-3xl font-semibold text-navy">
        Mentions légales
      </h1>
      <p className="mt-3 text-neutral-900/70">
        Informations réglementaires relatives à l&apos;activité de courtier
        d&apos;assurance (COA).
      </p>

      <h2 className="mt-10 font-heading text-xl font-semibold text-navy">
        Éditeur du site
      </h2>
      <dl className="mt-4">
        <Row label="Raison sociale" value="CP SOLUTIONS" />
        <Row label="Forme juridique" value="SARL" />
        <Row label="Capital social" value="5 000 €" />
        <Row
          label="Siège social"
          value="35 rue Jean Jaurès, 77130 Montereau-Fault-Yonne"
        />
        <Row label="SIREN" value="903 877 066" />
        <Row label="SIRET" value="903 877 066 00022" />
        <Row label="Code APE" value="6622Z" />
        <Row label="Immatriculation" value="RCS Melun" />
        <Row label="TVA intracommunautaire" value="FR90903877066" />
        <Row label="Directeur de la publication" value="Paul Poirier" />
        <Row label="Téléphone" value="01 64 24 83 45" />
        <Row label="E-mail" value="contact@cpsolutions77.com" />
      </dl>

      <h2 className="mt-10 font-heading text-xl font-semibold text-navy">
        Immatriculation ORIAS
      </h2>
      <p className="mt-3 text-sm text-neutral-900/70">
        Conformément à l&apos;article L.512-1 du Code des assurances, CP
        SOLUTIONS est immatriculé au registre unique des intermédiaires en
        assurance, banque et finance tenu par l&apos;ORIAS.
      </p>
      <dl className="mt-4">
        <Row label="Numéro ORIAS" value="21009019" />
        <Row
          label="Catégories d'immatriculation"
          value="Courtier d'assurance (COA), Courtier en opérations de banque et services de paiement (COBSP), Mandataire intermédiaire en opérations de banque et services de paiement (MIOBSP)"
        />
        <Row label="Vérification" value="orias.fr" />
      </dl>

      <h2 className="mt-10 font-heading text-xl font-semibold text-navy">
        Autorité de contrôle
      </h2>
      <p className="mt-3 text-sm text-neutral-900/70">
        L&apos;activité d&apos;intermédiation en assurance est soumise au
        contrôle de l&apos;Autorité de Contrôle Prudentiel et de Résolution
        (ACPR), 4 place de Budapest, CS 92459, 75436 Paris Cedex 09.
      </p>

      <h2 className="mt-10 font-heading text-xl font-semibold text-navy">
        Responsabilité civile professionnelle et garantie financière
      </h2>
      <dl className="mt-4">
        <Row
          label="Assureur RC professionnelle"
          value="Liberty Mutual Insurance Europe SE (via Liberty Specialty Markets Europe), gestion Matrisk Assurance"
        />
        <Row
          label="Numéro de contrat"
          value="MRCSBRO202210FR00000000045473A00"
        />
        <Row
          label="Garantie financière"
          value="115 000 € par sinistre et par période (Liberty Mutual Insurance Europe SE)"
        />
      </dl>

      <h2 className="mt-10 font-heading text-xl font-semibold text-navy">
        Association professionnelle
      </h2>
      <p className="mt-3 text-sm text-neutral-900/70">
        L&apos;adhésion à une association professionnelle agréée par
        l&apos;ACPR est obligatoire pour les courtiers d&apos;assurance.
      </p>
      <dl className="mt-4">
        <Row
          label="Association"
          value="ENDYA — 10 rue Auber, 75009 Paris (agréée ACPR)"
        />
        <Row label="Validité de l'adhésion" value="Du 01/01/2026 au 31/12/2026" />
      </dl>

      <h2 className="mt-10 font-heading text-xl font-semibold text-navy">
        Réclamations et médiation
      </h2>
      <p className="mt-3 text-sm text-neutral-900/70">
        Toute réclamation peut être adressée par e-mail à
        contact@cpsolutions77.com ou par courrier au siège social. Accusé de
        réception sous 10 jours ouvrables, réponse sous 2 mois. En
        l&apos;absence de réponse satisfaisante, le médiateur compétent est
        celui désigné par ENDYA, association professionnelle à laquelle le
        cabinet adhère :
      </p>
      <dl className="mt-4">
        <Row
          label="Médiateur — assurance"
          value="La Médiation de l'Assurance, TSA 50110, 75441 Paris Cedex 09"
        />
        <Row
          label="Médiateur — opérations de banque et crédit"
          value="ANM Conso, 2 rue de Colmar, 94300 Vincennes"
        />
      </dl>

      <h2 className="mt-10 font-heading text-xl font-semibold text-navy">
        Hébergement
      </h2>
      <p className="mt-3 text-sm text-neutral-900/70">
        Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis.
      </p>

      <p className="mt-10 text-xs text-neutral-900/50">
        Le présent site et les relations qui en découlent sont régis par le
        droit français.
      </p>
    </div>
  );
}
