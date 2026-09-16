import type { Metadata } from "next";
import { SimulateurAuto } from "@/components/SimulateurAuto";

export const metadata: Metadata = {
  title: "Étudier mon profil auto",
  description:
    "Décrivez votre profil auto pour savoir si nous avons une solution adaptée, sans engagement et sans donnée médicale.",
};

export default function SimulateurPage() {
  return <SimulateurAuto />;
}
