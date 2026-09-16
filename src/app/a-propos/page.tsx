import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Le cabinet",
  description:
    "CP Solutions, courtier indépendant en assurances et en crédits à Montereau-Fault-Yonne.",
};

export default function AProposPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="font-heading text-3xl font-semibold text-navy sm:text-4xl">
        Le cabinet
      </h1>
      <p className="mt-4 text-neutral-900/70">
        Mon Auto Assuré est le service de comparaison d&apos;assurance
        auto porté par <strong>CP Solutions</strong>, cabinet de
        courtage en assurances et en crédits basé au 35 rue Jean Jaurès, à
        Montereau-Fault-Yonne. Contrairement à un agent lié à une seule
        compagnie, nous comparons plusieurs assureurs pour défendre votre
        dossier.
      </p>

      <div className="mt-10 grid gap-8 sm:grid-cols-2">
        <div className="overflow-hidden rounded-2xl bg-neutral-50">
          <Image
            src="/photos/paul.avif"
            alt="Paul Poirier à son bureau dans l'agence de Montereau-Fault-Yonne"
            width={640}
            height={480}
            className="h-48 w-full object-cover"
          />
          <div className="p-6">
            <p className="font-heading font-semibold text-navy">
              Paul Poirier
            </p>
            <p className="text-sm text-neutral-900/60">Associé, assurances</p>
            <p className="mt-3 text-sm text-neutral-900/70">
              En charge des dossiers d&apos;assurance du cabinet, dont
              l&apos;assurance auto.
            </p>
          </div>
        </div>
        <div className="overflow-hidden rounded-2xl bg-neutral-50">
          <Image
            src="/photos/calvin.avif"
            alt="Calvin Riffault dans son bureau à l'agence de Montereau-Fault-Yonne"
            width={640}
            height={480}
            className="h-48 w-full object-cover"
          />
          <div className="p-6">
            <p className="font-heading font-semibold text-navy">
              Calvin Riffault
            </p>
            <p className="text-sm text-neutral-900/60">Associé, crédits</p>
            <p className="mt-3 text-sm text-neutral-900/70">
              En charge des dossiers de crédit du cabinet, en lien avec votre
              projet de prêt.
            </p>
          </div>
        </div>
      </div>

      <h2 className="mt-10 font-heading text-xl font-semibold text-navy">
        L&apos;agence
      </h2>
      <div className="mt-4 overflow-hidden rounded-2xl">
        <Image
          src="/photos/devanture.avif"
          alt="La devanture de CP Solutions au 35 rue Jean Jaurès à Montereau-Fault-Yonne"
          width={640}
          height={500}
          className="w-full object-cover"
        />
      </div>
      <p className="mt-4 text-sm text-neutral-900/70">
        35 rue Jean Jaurès, 77130 Montereau-Fault-Yonne — ouverte six jours
        sur sept, avec ou sans rendez-vous.
      </p>
    </div>
  );
}
