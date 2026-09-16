import type { Metadata } from "next";
import { Poppins, Questrial } from "next/font/google";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const questrial = Questrial({
  variable: "--font-questrial",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://monautoassure.fr"),
  title: {
    default: "Assurance auto | Mon Auto Assuré",
    template: "%s | Mon Auto Assuré",
  },
  description:
    "Courtier indépendant en assurance auto. On compare les compagnies et on négocie les meilleures conditions pour votre contrat, sans engagement.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "Mon Auto Assuré",
  },
};

const OPENING_HOURS = [
  { "@type": "OpeningHoursSpecification", dayOfWeek: "Monday", opens: "09:30", closes: "12:30" },
  { "@type": "OpeningHoursSpecification", dayOfWeek: "Monday", opens: "14:30", closes: "16:30" },
  {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "09:30",
    closes: "12:30",
  },
  {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "14:00",
    closes: "18:00",
  },
  { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "09:30", closes: "12:30" },
  { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "13:30", closes: "16:30" },
];

const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Assurance auto",
  url: "https://monautoassure.fr",
  areaServed: "FR",
  provider: {
    "@type": "InsuranceAgency",
    name: "CP Solutions",
    image: "https://monautoassure.fr/photos/logo.png",
    telephone: "+33164248345",
    url: "https://cpsolutions77.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "35 rue Jean Jaurès",
      postalCode: "77130",
      addressLocality: "Montereau-Fault-Yonne",
      addressCountry: "FR",
    },
    openingHoursSpecification: OPENING_HOURS,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5.0",
      reviewCount: "84",
    },
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="fr"
      className={`${poppins.variable} ${questrial.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-neutral-0 text-neutral-900 font-body">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
        />
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
