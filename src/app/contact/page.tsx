import type { Metadata } from "next";
import { LeadForm } from "@/components/LeadForm";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contactez le cabinet pour votre assurance auto.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="font-heading text-3xl font-semibold text-navy sm:text-4xl">
        Contact
      </h1>
      <div className="mt-6 space-y-1 text-neutral-900/80">
        <p>35 rue Jean Jaurès, 77130 Montereau-Fault-Yonne</p>
        <p>
          <a href="tel:+33164248345" className="text-navy">
            01 64 24 83 45
          </a>
        </p>
        <p>
          <a href="mailto:contact@cpsolutions77.com" className="text-navy">
            contact@cpsolutions77.com
          </a>
        </p>
      </div>

      <div className="mt-10">
        <LeadForm source="contact" submitLabel="Envoyer mon message" />
      </div>
    </div>
  );
}
