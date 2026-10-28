'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowUpRight, Menu, X, Zap } from 'lucide-react';
import { CATEGORIES } from '@/data/categories';
import { ctaUrl, MAIN_SITE_URL } from '@/config/site';

function navLinkClasses(isActive: boolean): string {
  return [
    'rounded-lg px-3 py-2 text-sm font-medium transition-colors',
    isActive
      ? 'bg-blue-50 text-blue-700 font-semibold'
      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900',
  ].join(' ');
}

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const isCategoryActive = (slug: string): boolean =>
    pathname === `/${slug}` || pathname.startsWith(`/${slug}/`);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {/* Logo — Ana Site ve Blog Bütünlüğü */}
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2.5"
          aria-label="Entegrematik Blog — Ana Sayfa"
          title="Entegrematik Blog Ana Sayfası"
        >
          <span className="flex size-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-blue-500 shadow-md shadow-blue-600/25">
            <Zap className="size-5 text-white" aria-hidden="true" />
          </span>
          <span className="flex flex-col leading-none">
            <span className="text-lg font-extrabold tracking-tight text-slate-900">
              Entegrematik
            </span>
            <span className="mt-0.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-blue-600">
              Blog
            </span>
          </span>
        </Link>

        {/* Desktop Menü */}
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Ana Navigasyon">
          <Link href="/" className={navLinkClasses(pathname === '/')}>
            Ana Sayfa
          </Link>
          {CATEGORIES.map((category) => (
            <Link
              key={category.slug}
              href={`/${category.slug}`}
              className={navLinkClasses(isCategoryActive(category.slug))}
              title={`${category.name} Rehberleri ve İçerikleri`}
            >
              {category.shortName}
            </Link>
          ))}
        </nav>

        {/* Sağ Aksiyonlar & Ana Siteden Bloga Bağlantı */}
        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href={MAIN_SITE_URL}
            target="_blank"
            rel="noopener"
            className="hidden items-center gap-1 text-sm font-semibold text-slate-600 transition hover:text-blue-600 xl:flex"
            title="Entegrematik E-Ticaret Otomasyonu Ana Sayfası"
          >
            entegrematik.com
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </a>

          <a
            href={ctaUrl('blog-header')}
            className="hidden rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-blue-600/25 transition hover:bg-blue-700 sm:block"
          >
            14 Gün Ücretsiz Deneyin
          </a>

          <button
            type="button"
            onClick={() => setIsMenuOpen((open) => !open)}
            className="inline-flex size-10 items-center justify-center rounded-lg text-slate-700 transition hover:bg-slate-100 lg:hidden"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMenuOpen ? 'Menüyü kapat' : 'Menüyü aç'}
          >
            {isMenuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </div>

      {/* Mobil Menü */}
      {isMenuOpen && (
        <div id="mobile-menu" className="border-t border-slate-200 bg-white lg:hidden">
          <nav
            className="mx-auto max-w-7xl space-y-1 px-4 py-4 sm:px-6"
            aria-label="Mobil Navigasyon"
          >
            <Link
              href="/"
              className={`block rounded-lg px-3 py-2.5 text-sm font-medium ${
                pathname === '/'
                  ? 'bg-blue-50 text-blue-700 font-semibold'
                  : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              Ana Sayfa
            </Link>

            {CATEGORIES.map((category) => (
              <Link
                key={category.slug}
                href={`/${category.slug}`}
                className={`block rounded-lg px-3 py-2.5 text-sm font-medium ${
                  isCategoryActive(category.slug)
                    ? 'bg-blue-50 text-blue-700 font-semibold'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                {category.name}
              </Link>
            ))}

            <div className="!mt-4 flex flex-col gap-2 border-t border-slate-100 pt-4">
              <a
                href={MAIN_SITE_URL}
                target="_blank"
                rel="noopener"
                className="inline-flex items-center justify-center gap-1 rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-blue-300 hover:text-blue-600"
              >
                entegrematik.com
                <ArrowUpRight className="size-4" aria-hidden="true" />
              </a>
              <a
                href={ctaUrl('blog-header-mobile')}
                className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-md shadow-blue-600/25 transition hover:bg-blue-700"
              >
                14 Gün Ücretsiz Deneyin
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}