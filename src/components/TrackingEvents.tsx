"use client";

import { useEffect } from "react";
import { track } from "@/lib/track";

const OWN_SITES = [
  "cpsolutions77.com",
  "monpretassure.fr",
  "monrachatcredit.fr",
  "monautoassure.fr",
  "monhabitationassure.fr",
];

function parseUrl(value: string): URL | null {
  try {
    return new URL(value, window.location.href);
  } catch {
    return null;
  }
}

export function TrackingEvents() {
  useEffect(() => {
    function onClick(event: MouseEvent) {
      const link = (event.target as Element | null)?.closest("a");
      if (!link) return;

      const href = link.getAttribute("href") ?? "";
      const page = window.location.pathname;

      if (href.startsWith("tel:")) return track("click_telephone", { page });
      if (href.startsWith("mailto:")) return track("click_email", { page });

      const url = parseUrl(link.href);
      if (!url) return;

      if (url.hostname.includes("calendly.com")) return track("click_rendez_vous", { page });
      if (url.hostname.includes("assurdistribution.fr")) {
        return track("click_devis_en_ligne", { page, produit: "emprunteur" });
      }

      const target = url.hostname.replace(/^www\./, "");
      const current = window.location.hostname.replace(/^www\./, "");
      if (target !== current && OWN_SITES.includes(target)) {
        track("click_site_interne", { page, destination: target });
      }
    }

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}

export function TrackOnView({ event }: { event: string }) {
  useEffect(() => {
    track(event, { page: window.location.pathname });
  }, [event]);

  return null;
}
