"use client";

import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";
import { submitProfileLead, type ProfileLeadState } from "@/app/actions";

type Step = "profil" | "solution" | "dossier";

type AutoProfile = {
  vehicle: string;
  year: number;
  mileage: number;
  fuel: string;
  usage: string;
  age: number;
  licenseYears: number;
  bonusMalus: number;
  claims: string;
  noFaultClaims: string;
  cancellation: string;
  cancellationType: string;
  parking: string;
  coverage: string;
  deductible: string;
  hasContract: string;
};

const DEFAULT_PROFILE: AutoProfile = {
  vehicle: "",
  year: 2019,
  mileage: 12000,
  fuel: "Essence",
  usage: "Trajets domicile-travail",
  age: 32,
  licenseYears: 10,
  bonusMalus: 0.85,
  claims: "0",
  noFaultClaims: "0",
  cancellation: "Non",
  cancellationType: "Non-paiement",
  parking: "Parking privé",
  coverage: "Tous risques",
  deductible: "Moyenne",
  hasContract: "Non",
};

const STEPS: { key: Step; label: string }[] = [
  { key: "profil", label: "Profil" },
  { key: "solution", label: "Votre solution" },
  { key: "dossier", label: "Ma demande" },
];

function Tracker({ step }: { step: Step }) {
  const index = STEPS.findIndex((s) => s.key === step);
  return (
    <div className="border-b border-neutral-100 bg-navy">
      <div className="relative mx-auto flex max-w-md items-start justify-between px-6 py-6">
        <div className="absolute left-[12%] right-[12%] top-[26px] h-px bg-white/20" />
        {STEPS.map((s, i) => {
          const done = i < index;
          const active = i === index;
          return (
            <div key={s.key} className="relative z-10 flex w-24 flex-col items-center gap-2">
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

function Pill({
  label,
  active,
  onClick,
  square = false,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
  square?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border text-sm font-medium transition ${
        square ? "h-10 w-10 text-center" : "px-4 py-2"
      } ${active ? "border-navy bg-navy text-white" : "border-neutral-100 bg-white text-neutral-900 hover:border-navy/40"}`}
    >
      {label}
    </button>
  );
}

function PillGroup<T extends string>({
  options,
  value,
  onChange,
  square = false,
}: {
  options: T[];
  value: T;
  onChange: (v: T) => void;
  square?: boolean;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => (
        <Pill key={opt} label={opt} active={value === opt} onClick={() => onChange(opt)} square={square} />
      ))}
    </div>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full rounded-full bg-orange px-6 py-3 font-heading font-semibold text-white transition hover:brightness-95 disabled:opacity-60"
    >
      {pending ? "Envoi en cours..." : "Envoyer ma demande à un conseiller"}
    </button>
  );
}

const initialState: ProfileLeadState = { status: "idle", message: "" };

export function SimulateurAuto() {
  const [step, setStep] = useState<Step>("profil");
  const [p, setP] = useState<AutoProfile>(DEFAULT_PROFILE);
  const [state, formAction] = useActionState(submitProfileLead, initialState);

  const set = <K extends keyof AutoProfile>(key: K) => (value: AutoProfile[K]) =>
    setP((prev) => ({ ...prev, [key]: value }));

  const chips = [
    p.vehicle || "Véhicule non précisé",
    String(p.year),
    p.fuel,
    p.usage,
    `${p.age} ans`,
    `${p.claims} sinistre(s) resp.`,
    `${p.noFaultClaims} sinistre(s) non resp.`,
    p.coverage,
    `${p.deductible} franchise`,
    ...(p.cancellation === "Oui" ? [`Résiliation : ${p.cancellationType}`] : []),
  ];

  const profileText = chips.join("\n");

  return (
    <div>
      <Tracker step={step} />

      {step === "profil" && (
        <div className="mx-auto max-w-2xl px-6 py-14">
          <h1 className="font-heading text-3xl font-semibold text-navy">Votre profil</h1>
          <p className="mt-2 text-neutral-900/70">
            Complétez le formulaire — plus il est précis, plus notre étude sera fiable.
          </p>

          <div className="mt-8 rounded-2xl border border-neutral-100 bg-white p-8">
            <p className="text-xs font-semibold uppercase tracking-wide text-orange">Le véhicule</p>

            <label className="mt-4 block text-sm font-medium text-neutral-900">Véhicule</label>
            <input
              type="text"
              value={p.vehicle}
              onChange={(e) => set("vehicle")(e.target.value)}
              placeholder="Marque et modèle"
              className="mt-1 w-full rounded-lg border border-neutral-100 px-3 py-2 text-sm outline-none focus:border-navy"
            />

            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              <div>
                <div className="flex justify-between text-sm font-medium text-neutral-900">
                  <span>Année du véhicule</span>
                  <span className="text-orange">{p.year}</span>
                </div>
                <input
                  type="range"
                  min={2005}
                  max={2026}
                  step={1}
                  value={p.year}
                  onChange={(e) => set("year")(Number(e.target.value))}
                  className="mt-2 w-full accent-navy"
                />
              </div>
              <div>
                <div className="flex justify-between text-sm font-medium text-neutral-900">
                  <span>Kilométrage annuel</span>
                  <span className="text-orange">{p.mileage.toLocaleString("fr-FR")} km/an</span>
                </div>
                <input
                  type="range"
                  min={5000}
                  max={40000}
                  step={1000}
                  value={p.mileage}
                  onChange={(e) => set("mileage")(Number(e.target.value))}
                  className="mt-2 w-full accent-navy"
                />
              </div>
            </div>

            <p className="mt-5 text-sm font-medium text-neutral-900">Carburant</p>
            <div className="mt-2">
              <PillGroup options={["Essence", "Diesel", "Hybride", "Électrique"]} value={p.fuel} onChange={set("fuel")} />
            </div>

            <p className="mt-5 text-sm font-medium text-neutral-900">Usage principal</p>
            <div className="mt-2">
              <PillGroup
                options={["Trajets domicile-travail", "Usage professionnel", "Loisirs uniquement"]}
                value={p.usage}
                onChange={set("usage")}
              />
            </div>

            <hr className="my-6 border-neutral-100" />
            <p className="text-xs font-semibold uppercase tracking-wide text-orange">Le conducteur</p>

            <div className="mt-4 grid gap-5 sm:grid-cols-2">
              <div>
                <div className="flex justify-between text-sm font-medium text-neutral-900">
                  <span>Âge du conducteur principal</span>
                  <span className="text-orange">{p.age} ans</span>
                </div>
                <input
                  type="range"
                  min={18}
                  max={75}
                  step={1}
                  value={p.age}
                  onChange={(e) => set("age")(Number(e.target.value))}
                  className="mt-2 w-full accent-navy"
                />
              </div>
              <div>
                <div className="flex justify-between text-sm font-medium text-neutral-900">
                  <span>Ancienneté du permis</span>
                  <span className="text-orange">{p.licenseYears} ans</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={50}
                  step={1}
                  value={p.licenseYears}
                  onChange={(e) => set("licenseYears")(Number(e.target.value))}
                  className="mt-2 w-full accent-navy"
                />
              </div>
            </div>

            <div className="mt-5">
              <div className="flex justify-between text-sm font-medium text-neutral-900">
                <span>Coefficient bonus-malus</span>
                <span className="text-orange">{p.bonusMalus.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min={0.5}
                max={2}
                step={0.05}
                value={p.bonusMalus}
                onChange={(e) => set("bonusMalus")(Number(e.target.value))}
                className="mt-2 w-full accent-navy"
              />
            </div>

            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              <div>
                <p className="text-sm font-medium text-neutral-900">Sinistres responsables (3 ans)</p>
                <div className="mt-2">
                  <PillGroup options={["0", "1", "2+"]} value={p.claims} onChange={set("claims")} />
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-neutral-900">Sinistres non responsables (3 ans)</p>
                <div className="mt-2">
                  <PillGroup options={["0", "1", "2+"]} value={p.noFaultClaims} onChange={set("noFaultClaims")} />
                </div>
              </div>
            </div>

            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              <div>
                <p className="text-sm font-medium text-neutral-900">Résilié par un assureur ?</p>
                <div className="mt-2">
                  <PillGroup options={["Non", "Oui"]} value={p.cancellation} onChange={set("cancellation")} />
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-neutral-900">Stationnement la nuit</p>
                <div className="mt-2">
                  <PillGroup options={["Garage fermé", "Parking privé", "Rue"]} value={p.parking} onChange={set("parking")} />
                </div>
              </div>
            </div>

            {p.cancellation === "Oui" && (
              <div className="mt-5">
                <p className="text-sm font-medium text-neutral-900">Quel type de résiliation ?</p>
                <p className="mt-1 text-xs text-neutral-900/60">Le motif de résiliation influe sur les offres disponibles.</p>
                <div className="mt-2">
                  <PillGroup
                    options={["Non-paiement", "Sinistralité", "Fausse déclaration", "Autre"]}
                    value={p.cancellationType}
                    onChange={set("cancellationType")}
                  />
                </div>
              </div>
            )}

            <hr className="my-6 border-neutral-100" />
            <p className="text-xs font-semibold uppercase tracking-wide text-orange">Le contrat souhaité</p>

            <div className="mt-4 grid gap-5 sm:grid-cols-2">
              <div>
                <p className="text-sm font-medium text-neutral-900">Formule</p>
                <div className="mt-2">
                  <PillGroup options={["Au tiers", "Tiers étendu", "Tous risques"]} value={p.coverage} onChange={set("coverage")} />
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-neutral-900">Franchise souhaitée</p>
                <div className="mt-2">
                  <PillGroup options={["Basse", "Moyenne", "Élevée"]} value={p.deductible} onChange={set("deductible")} />
                </div>
              </div>
            </div>

            <hr className="my-6 border-neutral-100" />
            <p className="text-sm font-medium text-neutral-900">Avez-vous déjà un contrat en cours ?</p>
            <div className="mt-2">
              <PillGroup options={["Oui", "Non"]} value={p.hasContract} onChange={set("hasContract")} />
            </div>

            <button
              type="button"
              onClick={() => setStep("solution")}
              className="mt-8 w-full rounded-full bg-orange px-6 py-3 font-heading font-semibold text-white transition hover:brightness-95"
            >
              Voir si nous avons une solution
            </button>
          </div>
        </div>
      )}

      {step === "solution" && (
        <div className="mx-auto max-w-2xl px-6 py-14">
          <button type="button" onClick={() => setStep("profil")} className="text-sm text-neutral-900/60 hover:text-navy">
            ← Modifier mon profil
          </button>

          <div className="mt-5 rounded-2xl bg-navy p-8 text-center text-white">
            <p className="text-xs font-semibold uppercase tracking-wide text-white/70">Bonne nouvelle</p>
            <h1 className="mt-2 font-heading text-2xl font-semibold">Nous avons une solution pour vous</h1>
            <p className="mx-auto mt-2 max-w-md text-sm text-white/80">
              Votre profil auto est éligible à nos offres partenaires. Un conseiller CP Solutions peut vous
              transmettre une offre chiffrée et personnalisée.
            </p>
          </div>

          <div className="mt-6 rounded-2xl border border-neutral-100 bg-white p-6">
            <p className="text-sm font-semibold text-neutral-900">Ce que notre étude a pris en compte</p>
            <ul className="mt-3 space-y-2 text-sm text-neutral-900/80">
              <li>{p.vehicle || "Votre véhicule"} ({p.year}), {p.fuel.toLowerCase()}</li>
              <li>Conducteur de {p.age} ans, permis depuis {p.licenseYears} ans</li>
              <li>Coefficient bonus-malus {p.bonusMalus.toFixed(2)}</li>
              <li>Usage : {p.usage.toLowerCase()}</li>
              <li>Formule souhaitée : {p.coverage.toLowerCase()}</li>
            </ul>
          </div>

          <div className="mt-4 rounded-2xl border border-neutral-100 bg-white p-6">
            <p className="text-sm font-semibold text-neutral-900">Garanties étudiées par nos partenaires</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {["Responsabilité civile", "Dommages tous accidents", "Vol & incendie", "Bris de glace", "Assistance 0 km", "Protection juridique"].map(
                (g) => (
                  <span key={g} className="rounded-full border border-neutral-100 bg-neutral-50 px-3 py-1 text-xs font-medium text-neutral-900">
                    {g}
                  </span>
                ),
              )}
            </div>
          </div>

          <div className="mt-4 rounded-2xl bg-navy/5 p-5 text-sm text-neutral-900">
            {p.hasContract === "Oui"
              ? "Vous avez indiqué avoir un contrat en cours : votre conseiller le comparera à nos offres partenaires pour identifier des économies possibles."
              : "Vous n'avez pas de contrat en cours : votre conseiller vous accompagne pour votre première souscription."}
          </div>

          <button
            type="button"
            onClick={() => setStep("dossier")}
            className="mt-6 rounded-full bg-orange px-6 py-3 font-heading font-semibold text-white transition hover:brightness-95"
          >
            Recevoir mon offre personnalisée
          </button>
          <p className="mt-3 text-xs text-neutral-900/50">
            Éligibilité indicative. Le tarif définitif est déterminé par nos partenaires assureurs après étude
            complète de votre dossier par un conseiller CP Solutions — n° ORIAS 21009019, sous le contrôle de
            l&apos;ACPR.
          </p>
        </div>
      )}

      {step === "dossier" && (
        <div className="mx-auto max-w-2xl px-6 py-14">
          {state.status === "success" ? (
            <div className="rounded-2xl bg-navy/5 p-8 text-center">
              <p className="font-heading text-xl font-semibold text-navy">Demande envoyée !</p>
              <p className="mt-2 text-sm text-neutral-900/70">{state.message}</p>
            </div>
          ) : (
            <>
              <h1 className="font-heading text-3xl font-semibold text-navy">Votre demande est prête</h1>
              <p className="mt-2 text-neutral-900/70">
                Vérifiez le récapitulatif, puis indiquez vos coordonnées pour qu&apos;un conseiller vous recontacte.
              </p>

              <div className="mt-6 flex items-center gap-3 rounded-2xl bg-navy/5 px-5 py-4">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-navy text-sm text-white">✓</span>
                <p className="text-sm font-medium text-navy">Profil qualifié — éligible à nos offres partenaires</p>
              </div>

              <div className="mt-4 rounded-2xl border border-neutral-100 bg-white p-6">
                <p className="text-sm font-semibold text-neutral-900">Votre profil</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {chips.map((c) => (
                    <span key={c} className="rounded-full border border-neutral-100 bg-neutral-50 px-3 py-1 text-xs font-medium text-neutral-900">
                      {c}
                    </span>
                  ))}
                </div>
              </div>

              <form action={formAction} className="mt-6 space-y-5">
                <input type="hidden" name="source" value="simulateur-auto" />
                <input type="hidden" name="profile" value={profileText} />

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="firstname" className="text-sm font-medium text-neutral-900">Prénom</label>
                    <input
                      id="firstname"
                      name="firstname"
                      type="text"
                      required
                      className="mt-1 w-full rounded-lg border border-neutral-100 px-3 py-2 text-sm outline-none focus:border-navy"
                    />
                    {state.fieldErrors?.firstname && <p className="mt-1 text-sm text-red-600">{state.fieldErrors.firstname}</p>}
                  </div>
                  <div>
                    <label htmlFor="lastname" className="text-sm font-medium text-neutral-900">Nom</label>
                    <input
                      id="lastname"
                      name="lastname"
                      type="text"
                      required
                      className="mt-1 w-full rounded-lg border border-neutral-100 px-3 py-2 text-sm outline-none focus:border-navy"
                    />
                    {state.fieldErrors?.lastname && <p className="mt-1 text-sm text-red-600">{state.fieldErrors.lastname}</p>}
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="email" className="text-sm font-medium text-neutral-900">E-mail</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      className="mt-1 w-full rounded-lg border border-neutral-100 px-3 py-2 text-sm outline-none focus:border-navy"
                    />
                    {state.fieldErrors?.email && <p className="mt-1 text-sm text-red-600">{state.fieldErrors.email}</p>}
                  </div>
                  <div>
                    <label htmlFor="phone" className="text-sm font-medium text-neutral-900">Téléphone</label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      className="mt-1 w-full rounded-lg border border-neutral-100 px-3 py-2 text-sm outline-none focus:border-navy"
                    />
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

                <SubmitButton />
              </form>
            </>
          )}
        </div>
      )}
    </div>
  );
}
