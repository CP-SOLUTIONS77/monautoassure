import Image from "next/image";
import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-neutral-100 bg-neutral-50">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-12 sm:grid-cols-3">
        <div>
          <p className="font-heading font-semibold text-navy">Mon Auto Assuré</p>
          <p className="mt-2 text-sm text-neutral-900/70">
            Un service de courtage porté par CP Solutions, cabinet de courtage en
            assurances et en crédits à Montereau-Fault-Yonne.
          </p>
          <Image
            src="/photos/logo.png"
            alt="CP Solutions"
            width={608}
            height={220}
            className="mt-4 h-8 w-auto"
          />
        </div>

        <div className="text-sm text-neutral-900/70">
          <p className="font-heading font-semibold text-neutral-900">Le cabinet</p>
          <p className="mt-2">35 rue Jean Jaurès</p>
          <p>77130 Montereau-Fault-Yonne</p>
          <a href="tel:+33164248345" className="mt-2 block text-navy">
            01 64 24 83 45
          </a>
          <a href="mailto:contact@cpsolutions77.com" className="text-navy">
            contact@cpsolutions77.com
          </a>
        </div>

        <div className="text-sm text-neutral-900/70">
          <p className="font-heading font-semibold text-neutral-900">Informations</p>
          <ul className="mt-2 space-y-1">
            <li>
              <Link href="/mentions-legales" className="hover:text-navy">
                Mentions légales
              </Link>
            </li>
            <li>
              <Link href="/confidentialite" className="hover:text-navy">
                Confidentialité
              </Link>
            </li>
            <li>
              <Link href="/cookies" className="hover:text-navy">
                Cookies
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-neutral-100 px-6 py-4 text-center text-xs text-neutral-900/50">
        © {new Date().getFullYear()} CP Solutions — Courtier d&apos;assurance
        (COA), immatriculé ORIAS.
      </div>
    </footer>
  );
}
