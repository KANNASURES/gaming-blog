import Link from "next/link";
import type { SiteSettings } from "@/types/site";

export default function Footer({ settings }: { settings: SiteSettings }) {
  const { siteName, footer, social } = settings;
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24 border-t border-line bg-surface">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 md:grid-cols-4 md:px-8">
        <div className="md:col-span-2">
          <p className="font-display text-2xl font-semibold">{siteName}</p>
          <p className="mt-4 max-w-sm text-sm text-muted">
            {footer.description}
          </p>
          <ul className="mt-6 flex gap-5">
            {social.map((s) => (
              <li key={s.platform}>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted transition-colors hover:text-glow"
                >
                  {s.platform}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {footer.columns.map((col) => (
          <div key={col.title}>
            <p className="text-sm font-medium">{col.title}</p>
            <ul className="mt-4 flex flex-col gap-3">
              {col.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted transition-colors hover:text-ink"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-line">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-6 text-xs text-muted md:flex-row md:justify-between md:px-8">
          <p>
            © {year} {siteName}. All rights reserved.
          </p>
          <p>{footer.disclosure}</p>
        </div>
      </div>
    </footer>
  );
}