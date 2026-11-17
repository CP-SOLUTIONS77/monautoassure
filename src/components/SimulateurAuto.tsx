"use client";

import { useActionState, useEffect, useState, type ReactNode } from "react";
import { useFormStatus } from "react-dom";
import {
  submitCallback,
  submitProfileLead,
  type CallbackState,
  type ProfileLeadState,
} from "@/app/actions";
import { track } from "@/lib/track";

type Step = "besoin" | "coordonnees";

/**
 * Aucune réponse n'est pré-remplie : une valeur par défaut que le visiteur ne
 * modifie pas fausse la demande transmise au conseiller.
 */
type AutoProfile = {
  vehicle: string;
  age: string;
  license: string;
  bonusMalus: string;
  cancellation: string;
  cancellationType: string;
  coverage: string;
  hasContract: string;
  // Précisions facultatives
  year: string;
  usage: string;
  mileage: string;
  claims: string;
  parking: string;
};

const EMPTY_PROFILE: AutoProfile = {
  vehicle: "",
  age: "",
  license: "",
  bonusMalus: "",
  cancellation: "",
  cancellationType: "",
  coverage: "",
  hasContract: "",
  year: "",
  usage: "",
  mileage: "",
  claims: "",
  parking: "",
};

const STEPS: { key: Step; label: string }[] = [
  { key: "besoin", label: "Votre besoin" },
  { key: "coordonnees", label: "Vos coordonnées" },
];

const INPUT_CLASS =
  "mt-1 w-full rounded-lg border border-neutral-100 px-3 py-2 text-sm outline-none focus:border-navy";

function Tracker({ step }: { step: Step }) {
  const index = STEPS.findIndex((s) => s.key === step);
  return (
    <div className="border-b border-neutral-100 bg-navy">
      <div className="relative mx-auto flex max-w-xs items-start justify-between px-6 py-6">
        <div className="absolute left-[20%] right-[20%] top-[26px] h-px bg-white/20" />
        {STEPS.map((s, i) => {
          const done = i < index;
          const active = i === index;
          return (
            <div key={s.key} className="relative z-10 flex w-28 flex-col items-center gap-2">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full border-2 font-heading text-sm font-bold ${
                  done
                    ? "border-orange bg-orange text-white"
                    : active
                      ? "border-white bg-white text-navy"
                      : "border-white/40 bg-transparent text-white/60"
                }`}
              >
                {done ? "✓" : i + 1}
              </div>
              <span className={`text-center text-xs ${done || active ? "font-semibold text-white" : "text-white/60"}`}>
                {s.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function PillGroup({
  options,
  value,
  onChange,
}: {
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => (
        <button
          key={opt}
          type="button"
          aria-pressed={value === opt}
          onClick={() => onChange(opt)}
          className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
            value === opt
              ? "border-navy bg-navy text-white"
              : "border-neutral-100 bg-white text-neutral-900 hover:border-navy/40"
          }`}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}

function Question({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="mt-5">
      <p className="text-sm font-medium text-neutral-900">{label}</p>
      <div className="mt-2">{children}</div>
    </div>
  );
}

function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full rounded-full bg-orange px-6 py-3 font-heading font-semibold text-white transition hover:brightness-95 disabled:opacity-60"
    >
      {pending ? "Envoi en cours..." : label}
    </button>
  );
}

const initialProfileState: ProfileLeadState = { status: "idle", message: "" };
const initialCallbackState: CallbackState = { status: "idle", message: "" };

function RappelRapide() {
  const [open, setOpen] = useState(false);
  const [state, formAction] = useActionState(submitCallback, initialCallbackState);

  useEffect(() => {
    if (state.status === "success") track("generate_lead", { lead_source: "rappel_rapide" });
  }, [state.status]);

  if (state.status === "success") {
    return (
      <div className="mt-6 rounded-2xl bg-navy/5 p-5 text-sm font-medium text-navy">{state.message}</div>
    );
  }

  return (
    <div className="mt-6 rounded-2xl border border-navy/15 bg-navy/5 p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-neutral-900">
          <span className="font-semibold">Pressé ?</span> Un conseiller vous rappelle, ou appelez le{" "}
          <a href="tel:+33164248345" className="font-semibold text-navy underline">
            01 64 24 83 45
          </a>
          .
        </p>
        {!open && (
          <button
            type="button"
            onClick={() => {
              setOpen(true);
              track("rappel_rapide_ouvert");
            }}
            className="rounded-full border border-navy px-4 py-2 text-sm font-semibold text-navy transition hover:bg-navy hover:text-white"
          >
            Être rappelé
          </button>
        )}
      </div>

      {open && (
        <form action={formAction} className="mt-4 space-y-4">
          <input type="hidden" name="source" value="rappel-rapide-auto" />
          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <label htmlFor="rr-firstname" className="text-sm font-medium text-neutral-900">Prénom</label>
              <input id="rr-firstname" name="firstname" type="text" required autoComplete="given-name" className={INPUT_CLASS} />
              {state.fieldErrors?.firstname && <p className="mt-1 text-sm text-red-600">{state.fieldErrors.firstname}</p>}
            </div>
            <div>
              <label htmlFor="rr-phone" className="text-sm font-medium text-neutral-900">Téléphone</label>
              <input id="rr-phone" name="phone" type="tel" required autoComplete="tel" className={INPUT_CLASS} />
              {state.fieldErrors?.phone && <p className="mt-1 text-sm text-red-600">{state.fieldErrors.phone}</p>}
            </div>
            <div>
              <label htmlFor="rr-email" className="text-sm font-medium text-neutral-900">E-mail</label>
              <input id="rr-email" name="email" type="email" required autoComplete="email" className={INPUT_CLASS} />
              {state.fieldErrors?.email && <p className="mt-1 text-sm text-red-600">{state.fieldErrors.email}</p>}
            </div>
          </div>
          {state.status === "error" && (
            <p className="text-sm text-red-600" role="alert" aria-live="polite">
              {state.message}
            </p>
          )}
          <p className="text-xs text-neutral-900/50">
            Vos coordonnées sont utilisées par CP Solutions uniquement pour vous rappeler, conformément à notre
            politique de confidentialité.
          </p>
          <SubmitButton label="Me faire rappeler" />
        </form>
      )}
    </div>
  );
}

export function SimulateurAuto() {
  const [step, setStep] = useState<Step>("besoin");
  const [p, setP] = useState<AutoProfile>(EMPTY_PROFILE);
  const [state, formAction] = useActionState(submitProfileLead, initialProfileState);

  useEffect(() => {
    if (state.status === "success") track("generate_lead", { lead_source: "simulateur" });
  }, [state.status]);

  const set = (key: keyof AutoProfile) => (value: string) => setP((prev) => ({ ...prev, [key]: value }));

  const required: (keyof AutoProfile)[] = [
    "age",
    "license",
    "bonusMalus",
    "cancellation",
    "coverage",
    "hasContract",
    ...(p.cancellation === "Oui" ? (["cancellationType"] as const) : []),
  ];
  const missing = required.filter((key) => !p[key]).length;

  const recap = [
    p.vehicle && `Véhicule : ${p.vehicle}`,
    `Conducteur : ${p.age}, permis ${p.license.toLowerCase()}`,
    `Bonus-malus : ${p.bonusMalus}`,
    p.cancellation === "Oui" ? `Résilié par un assureur : oui (${p.cancellationType})` : "Résilié par un assureur : non",
    `Formule : ${p.coverage}`,
    `Contrat en cours : ${p.hasContract}`,
    p.year && `Année du véhicule : ${p.year}`,
    p.usage && `Usage : ${p.usage}`,
    p.mileage && `Kilométrage annuel : ${p.mileage}`,
    p.claims && `Sinistres responsables (3 ans) : ${p.claims}`,
    p.parking && `Stationnement la nuit : ${p.parking}`,
  ].filter(Boolean) as string[];

  return (
    <div>
      <Tracker step={step} />

      {step === "besoin" && (
        <div className="mx-auto max-w-2xl px-6 py-14">
          <h1 className="font-heading text-3xl font-semibold text-navy">Votre devis assurance auto</h1>
          <p className="mt-2 text-neutral-900/70">
            Six questions, moins d&apos;une minute. Un conseiller compare ensuite plusieurs assureurs pour vous.
          </p>

          <RappelRapide />

          <div className="mt-6 rounded-2xl border border-neutral-100 bg-white p-6 sm:p-8">
            <label htmlFor="vehicle" className="block text-sm font-medium text-neutral-900">
              Votre véhicule <span className="font-normal text-neutral-900/50">(facultatif)</span>
            </label>
            <input
              id="vehicle"
              type="text"
              value={p.vehicle}
              onChange={(e) => set("vehicle")(e.target.value)}
              placeholder="Marque et modèle, par exemple Peugeot 208"
              className={INPUT_CLASS}
            />

            <Question label="Âge du conducteur principal">
              <PillGroup options={["18-24 ans", "25-34 ans", "35-54 ans", "55 ans et plus"]} value={p.age} onChange={set("age")} />
            </Question>

            <Question label="Ancienneté du permis">
              <PillGroup options={["Moins de 3 ans", "3 à 10 ans", "Plus de 10 ans"]} value={p.license} onChange={set("license")} />
            </Question>

            <Question label="Votre bonus-malus">
              <PillGroup
                options={["Bonus maximum (0,50)", "Entre 0,51 et 0,99", "1,00 ou malus", "Je ne sais pas"]}
                value={p.bonusMalus}
                onChange={set("bonusMalus")}
              />
            </Question>

            <Question label="Avez-vous été résilié par un assureur ces 3 dernières années ?">
              <PillGroup options={["Non", "Oui"]} value={p.cancellation} onChange={set("cancellation")} />
            </Question>

            {p.cancellation === "Oui" && (
              <Question label="Pour quel motif ?">
                <PillGroup
                  options={["Non-paiement", "Sinistralité", "Retrait de permis", "Fausse déclaration", "Autre"]}
                  value={p.cancellationType}
                  onChange={set("cancellationType")}
                />
              </Question>
            )}

            <Question label="Formule souhaitée">
              <PillGroup
                options={["Au tiers", "Tiers étendu", "Tous risques", "Je veux être conseillé"]}
                value={p.coverage}
                onChange={set("coverage")}
              />
            </Question>

            <Question label="Avez-vous déjà un contrat en cours ?">
              <PillGroup options={["Oui", "Non"]} value={p.hasContract} onChange={set("hasContract")} />
            </Question>

            <details className="mt-6 rounded-xl border border-neutral-100 p-4">
              <summary className="cursor-pointer text-sm font-medium text-navy">
                Ajouter des précisions (facultatif, pour une offre plus juste)
              </summary>
              <label htmlFor="year" className="mt-4 block text-sm font-medium text-neutral-900">
                Année de mise en circulation
              </label>
              <input
                id="year"
                type="number"
                inputMode="numeric"
                min={1980}
                max={2027}
                value={p.year}
                onChange={(e) => set("year")(e.target.value)}
                placeholder="Par exemple 2019"
                className={`${INPUT_CLASS} sm:w-48`}
              />
              <Question label="Usage principal">
                <PillGroup
                  options={["Trajets domicile-travail", "Usage professionnel", "Loisirs uniquement"]}
                  value={p.usage}
                  onChange={set("usage")}
                />
              </Question>
              <Question label="Kilométrage annuel">
                <PillGroup
                  options={["Moins de 8 000 km", "8 000 à 15 000 km", "15 000 à 25 000 km", "Plus de 25 000 km"]}
                  value={p.mileage}
                  onChange={set("mileage")}
                />
              </Question>
              <Question label="Sinistres responsables (3 ans)">
                <PillGroup options={["0", "1", "2 ou plus"]} value={p.claims} onChange={set("claims")} />
              </Question>
              <Question label="Stationnement la nuit">
                <PillGroup options={["Garage fermé", "Parking privé", "Rue"]} value={p.parking} onChange={set("parking")} />
              </Question>
            </details>

            <button
              type="button"
              disabled={missing > 0}
              onClick={() => {
                setStep("coordonnees");
                track("simulateur_etape", { etape: "besoin_complete" });
                window.scrollTo({ top: 0 });
              }}
              className="mt-8 w-full rounded-full bg-orange px-6 py-3 font-heading font-semibold text-white transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Recevoir mon devis
            </button>
            {missing > 0 && (
              <p className="mt-2 text-center text-xs text-neutral-900/60">
                Encore {missing} réponse{missing > 1 ? "s" : ""} pour continuer.
              </p>
            )}
          </div>
        </div>
      )}

      {step === "coordonnees" && (
        <div className="mx-auto max-w-2xl px-6 py-14">
          {state.status === "success" ? (
            <div className="rounded-2xl bg-navy/5 p-8 text-center">
              <p className="font-heading text-xl font-semibold text-navy">Demande envoyée !</p>
              <p className="mt-2 text-sm text-neutral-900/70">{state.message}</p>
              <p className="mt-4 text-sm text-neutral-900/70">
                Une question d&apos;ici là ? Appelez le{" "}
                <a href="tel:+33164248345" className="font-semibold text-navy underline">
                  01 64 24 83 45
                </a>
                .
              </p>
            </div>
          ) : (
            <>
              <button type="button" onClick={() => setStep("besoin")} className="text-sm text-neutral-900/60 hover:text-navy">
                ← Modifier mes réponses
              </button>
              <h1 className="mt-4 font-heading text-3xl font-semibold text-navy">Où vous envoyer votre devis ?</h1>
              <p className="mt-2 text-neutral-900/70">
                Votre demande est complète. Un conseiller CP Solutions compare les offres de plusieurs assureurs pour
                votre profil, puis vous recontacte avec une proposition chiffrée. Gratuit et sans engagement.
              </p>

              <div className="mt-6 rounded-2xl border border-neutral-100 bg-white p-6">
                <p className="text-sm font-semibold text-neutral-900">Votre demande</p>
                <ul className="mt-3 space-y-1 text-sm text-neutral-900/80">
                  {recap.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
              </div>

              <form action={formAction} className="mt-6 space-y-5">
                <input type="hidden" name="source" value="simulateur-auto" />
                <input type="hidden" name="profile" value={recap.join("\n")} />

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="firstname" className="text-sm font-medium text-neutral-900">Prénom</label>
                    <input id="firstname" name="firstname" type="text" required autoComplete="given-name" className={INPUT_CLASS} />
                    {state.fieldErrors?.firstname && <p className="mt-1 text-sm text-red-600">{state.fieldErrors.firstname}</p>}
                  </div>
                  <div>
                    <label htmlFor="lastname" className="text-sm font-medium text-neutral-900">Nom</label>
                    <input id="lastname" name="lastname" type="text" required autoComplete="family-name" className={INPUT_CLASS} />
                    {state.fieldErrors?.lastname && <p className="mt-1 text-sm text-red-600">{state.fieldErrors.lastname}</p>}
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="email" className="text-sm font-medium text-neutral-900">E-mail</label>
                    <input id="email" name="email" type="email" required autoComplete="email" className={INPUT_CLASS} />
                    {state.fieldErrors?.email && <p className="mt-1 text-sm text-red-600">{state.fieldErrors.email}</p>}
                  </div>
                  <div>
                    <label htmlFor="phone" className="text-sm font-medium text-neutral-900">Téléphone</label>
                    <input id="phone" name="phone" type="tel" required autoComplete="tel" className={INPUT_CLASS} />
                    {state.fieldErrors?.phone && <p className="mt-1 text-sm text-red-600">{state.fieldErrors.phone}</p>}
                  </div>
                </div>

                {state.status === "error" && (
                  <p className="text-sm text-red-600" role="alert" aria-live="polite">
                    {state.message}
                  </p>
                )}

                <p className="text-xs text-neutral-900/50">
                  En envoyant ce formulaire, vous acceptez que vos données soient utilisées par CP Solutions pour
                  traiter votre demande, conformément à notre politique de confidentialité.
                </p>

                <SubmitButton label="Recevoir mon devis" />
              </form>

              <p className="mt-4 text-xs text-neutral-900/50">
                Le tarif est établi par nos partenaires assureurs après étude de votre dossier par un conseiller CP
                Solutions, courtier immatriculé à l&apos;ORIAS sous le n° 21009019, sous le contrôle de l&apos;ACPR.
              </p>
            </>
          )}
        </div>
      )}
    </div>
  );
}
