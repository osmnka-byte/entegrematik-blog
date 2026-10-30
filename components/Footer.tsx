import Link from 'next/link';
import { ArrowRight, Zap } from 'lucide-react';
import { CATEGORIES } from '@/data/categories';
import { ctaUrl, MAIN_SITE_URL, SOCIAL_LINKS } from '@/config/site';

function LinkedinIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
    </svg>
  );
}

function TwitterIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

function YoutubeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

// Hatalı/olmayan linkler temizlendi, ana site yapılarına (anchor ve doğru route) bağlandı
const CORPORATE_LINKS: { label: string; href: string }[] = [
  { label: 'Ana Sayfa', href: MAIN_SITE_URL },
  { label: 'Özellikler', href: `${MAIN_SITE_URL}/#ozellikler` },
  { label: 'Entegrasyonlar', href: `${MAIN_SITE_URL}/#entegrasyonlar` },
  { label: 'Fiyatlandırma', href: `${MAIN_SITE_URL}/#fiyatlandirma` },
];

const LEGAL_LINKS: { label: string; href: string }[] = [
  { label: 'Sıkça Sorulan Sorular', href: `${MAIN_SITE_URL}/#sss` },
  { label: 'Gizlilik Politikası', href: `${MAIN_SITE_URL}/gizlilik` },
  { label: 'Kullanım Koşulları', href: `${MAIN_SITE_URL}/kullanim-kosullari` },
  { label: 'KVKK Aydınlatma Metni', href: `${MAIN_SITE_URL}/kvkk` },
];

const SOCIAL_ICONS = [
  { label: 'LinkedIn', href: SOCIAL_LINKS.linkedin, Icon: LinkedinIcon },
  { label: 'X (Twitter)', href: SOCIAL_LINKS.x, Icon: TwitterIcon },
  { label: 'Instagram', href: SOCIAL_LINKS.instagram, Icon: InstagramIcon },
  { label: 'YouTube', href: SOCIAL_LINKS.youtube, Icon: YoutubeIcon },
];

export default function Footer() {
  const currentYear = 2026;

  return (
    <footer className="bg-slate-900 text-slate-300">
      {/* Banner CTA */}
      <div className="border-b border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-8 sm:px-6 md:flex-row lg:px-8">
          <div>
            <p className="text-lg font-bold text-white">
              E-ticaret operasyonunuzu otomatikleştirmeye hazır mısınız?
            </p>
            <p className="mt-1 text-sm text-slate-400">
              Kredi kartı gerekmeden 14 gün ücretsiz deneyin, dakikalar içinde kurulum yapın.
            </p>
          </div>
          <a
            href={ctaUrl('blog-footer')}
            className="group inline-flex shrink-0 items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/25 transition hover:bg-blue-500"
          >
            14 Gün Ücretsiz Deneyin
            <ArrowRight
              className="size-4 transition-transform group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </a>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4 lg:grid-cols-5">
          {/* Logo & Tanım */}
          <div className="col-span-2 md:col-span-4 lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-2.5" aria-label="Entegrematik Blog">
              <span className="flex size-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-blue-500">
                <Zap className="size-5 text-white" aria-hidden="true" />
              </span>
              <span className="flex flex-col leading-none">
                <span className="text-lg font-extrabold tracking-tight text-white">
                  Entegrematik
                </span>
                <span className="mt-0.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-blue-400">
                  Blog
                </span>
              </span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-400">
              Pazaryerleri, e-fatura ve ön muhasebeyi tek panelde birleştiren e-ticaret
              otomasyon platformu. Uzman ekibimizden operasyon rehberleri, mevzuat
              güncellemeleri ve e-ticaret ipuçları.
            </p>
            <div className="mt-6 flex items-center gap-3">
              {SOCIAL_ICONS.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex size-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-slate-300 transition hover:border-blue-500 hover:bg-blue-600 hover:text-white"
                >
                  <Icon className="size-4" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {/* SEO İletim Odaklı Blog Kategorileri */}
          <nav aria-label="E-Ticaret Blog Kategorileri">
            <h2 className="text-sm font-bold uppercase tracking-wider text-white">
              Blog Rehberleri
            </h2>
            <ul className="mt-4 space-y-2.5">
              {CATEGORIES.map((category) => (
                <li key={category.slug}>
                  <Link
                    href={`/${category.slug}`}
                    className="text-sm text-slate-400 transition hover:text-blue-400"
                    title={`${category.name} rehberleri ve makaleleri`}
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Kurumsal Linkler */}
          <nav aria-label="Kurumsal bağlantılar">
            <h2 className="text-sm font-bold uppercase tracking-wider text-white">
              Kurumsal
            </h2>
            <ul className="mt-4 space-y-2.5">
              {CORPORATE_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-slate-400 transition hover:text-blue-400"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Destek ve Yasal */}
          <nav aria-label="Destek ve Yasal Bağlantılar">
            <h2 className="text-sm font-bold uppercase tracking-wider text-white">
              Destek & Yasal
            </h2>
            <ul className="mt-4 space-y-2.5">
              {LEGAL_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-slate-400 transition hover:text-blue-400"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      {/* Telif & Ek Bağlantı */}
      <div className="border-t border-white/10 pb-20 sm:pb-16">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-6 text-xs text-slate-500 sm:flex-row sm:px-6 lg:px-8">
          <p>
            © {currentYear}{' '}
            <a
              href={MAIN_SITE_URL}
              className="font-semibold text-slate-400 transition hover:text-blue-400"
            >
              Entegrematik E-Ticaret Otomasyonu
            </a>{' '}
            — Tüm hakları saklıdır.
          </p>
          <p>
            Bu platform bir{' '}
            <a
              href={MAIN_SITE_URL}
              className="font-medium text-slate-400 underline decoration-slate-600 underline-offset-2 transition hover:text-blue-400"
            >
              entegrematik.com
            </a>{' '}
            yayınıdır.
          </p>
        </div>
      </div>
    </footer>
  );
}