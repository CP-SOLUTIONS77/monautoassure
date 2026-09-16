import Link from "next/link";

const NAV_LINKS = [
  { href: "/comment-ca-marche", label: "Comment ça marche" },
  { href: "/pourquoi-comparer", label: "Pourquoi comparer" },
  { href: "/a-propos", label: "Le cabinet" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  return (
    <header className="border-b border-neutral-100">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-4">
        <Link href="/" className="font-heading text-lg font-semibold text-navy">
          Mon Auto Assuré
        </Link>

        <nav className="hidden items-center gap-6 text-sm lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-neutral-900/80 transition hover:text-navy"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="tel:+33164248345"
            className="hidden rounded-full bg-neutral-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-navy sm:inline-block"
          >
            01 64 24 83 45
          </a>
          <Link
            href="/simulateur"
            className="rounded-full border border-navy px-4 py-2 text-sm font-medium text-navy transition hover:bg-navy hover:text-white"
          >
            Ma simulation
          </Link>
        </div>
      </div>
    </header>
  );
}
