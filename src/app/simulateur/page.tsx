import type { Metadata } from "next";
import { SimulateurAuto } from "@/components/SimulateurAuto";

export const metadata: Metadata = {
  title: "Devis assurance auto",
  description:
    "Obtenez un devis d'assurance auto en six questions : un courtier indépendant compare plusieurs assureurs pour votre profil. Gratuit et sans engagement.",
  alternates: { canonical: "/simulateur" },
};

export default function SimulateurPage() {
  return <SimulateurAuto />;
}
