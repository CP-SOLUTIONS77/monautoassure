"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import Link from "next/link";
import { submitLead, type LeadFormState } from "@/app/actions";

const initialState: LeadFormState = { status: "idle", message: "" };

function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-full bg-orange px-6 py-3 font-heading font-semibold text-white transition hover:brightness-95 disabled:opacity-60"
    >
      {pending ? "Envoi en cours..." : label}
    </button>
  );
}

function FieldError({ error }: { error?: string }) {
  if (!error) return null;
  return <p className="mt-1 text-sm text-red-600">{error}</p>;
}

export function LeadForm({
  source,
  withProjectFields = false,
  submitLabel = "Envoyer ma demande",
}: {
  source: string;
  withProjectFields?: boolean;
  submitLabel?: string;
}) {
  const [state, formAction] = useActionState(submitLead, initialState);

  if (state.status === "success") {
    return (
      <div className="rounded-2xl bg-navy/5 p-6 text-navy">
        <p className="font-heading font-semibold">{state.message}</p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-5">
      <input type="hidden" name="source" value={source} />

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="firstname" className="text-sm font-medium text-neutral-900">
            Prénom
          </label>
          <input
            id="firstname"
            name="firstname"
            type="text"
            required
            className="mt-1 w-full rounded-lg border border-neutral-100 px-3 py-2 text-sm outline-none focus:border-navy"
          />
          <FieldError error={state.fieldErrors?.firstname} />
        </div>
        <div>
          <label htmlFor="lastname" className="text-sm font-medium text-neutral-900">
            Nom
          </label>
          <input
            id="lastname"
            name="lastname"
            type="text"
            required
            className="mt-1 w-full rounded-lg border border-neutral-100 px-3 py-2 text-sm outline-none focus:border-navy"
          />
          <FieldError error={state.fieldErrors?.lastname} />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="email" className="text-sm font-medium text-neutral-900">
            E-mail
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="mt-1 w-full rounded-lg border border-neutral-100 px-3 py-2 text-sm outline-none focus:border-navy"
          />
          <FieldError error={state.fieldErrors?.email} />
        </div>
        <div>
          <label htmlFor="phone" className="text-sm font-medium text-neutral-900">
            Téléphone
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            className="mt-1 w-full rounded-lg border border-neutral-100 px-3 py-2 text-sm outline-none focus:border-navy"
          />
          <FieldError error={state.fieldErrors?.phone} />
        </div>
      </div>

      {withProjectFields && (
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="montant" className="text-sm font-medium text-neutral-900">
              Capital emprunté (ou envisagé)
            </label>
            <input
              id="montant"
              name="montant"
              type="text"
              placeholder="ex: 220 000 €"
              className="mt-1 w-full rounded-lg border border-neutral-100 px-3 py-2 text-sm outline-none focus:border-navy"
            />
          </div>
          <div>
            <label htmlFor="banque" className="text-sm font-medium text-neutral-900">
              Banque prêteuse
            </label>
            <input
              id="banque"
              name="banque"
              type="text"
              placeholder="ex: Crédit Agricole"
              className="mt-1 w-full rounded-lg border border-neutral-100 px-3 py-2 text-sm outline-none focus:border-navy"
            />
          </div>
        </div>
      )}

      {withProjectFields && (
        <div>
          <label htmlFor="situation" className="text-sm font-medium text-neutral-900">
            Votre situation
          </label>
          <select
            id="situation"
            name="situation"
            className="mt-1 w-full rounded-lg border border-neutral-100 px-3 py-2 text-sm outline-none focus:border-navy"
          >
            <option value="Prêt déjà en cours">Prêt déjà en cours</option>
            <option value="Projet d'achat">Projet d&apos;achat</option>
            <option value="Autre">Autre</option>
          </select>
        </div>
      )}

      <div>
        <label htmlFor="message" className="text-sm font-medium text-neutral-900">
          Message {withProjectFields ? "(optionnel)" : ""}
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          className="mt-1 w-full rounded-lg border border-neutral-100 px-3 py-2 text-sm outline-none focus:border-navy"
        />
      </div>

      {state.status === "error" && (
        <p className="text-sm text-red-600" role="alert" aria-live="polite">
          {state.message}
        </p>
      )}

      <p className="text-xs text-neutral-900/50">
        En envoyant ce formulaire, vous acceptez que vos données soient
        utilisées par CP Solutions pour traiter votre demande, conformément à
        notre{" "}
        <Link href="/confidentialite" className="underline hover:text-navy">
          politique de confidentialité
        </Link>
        .
      </p>

      <SubmitButton label={submitLabel} />
    </form>
  );
}
