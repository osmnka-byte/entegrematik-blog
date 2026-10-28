import type { Metadata } from 'next';
import Link from 'next/link';
import { FileQuestion, Home } from 'lucide-react';
import { CATEGORIES } from '@/data/categories';
import { ctaUrl } from '@/config/site';

export const metadata: Metadata = {
  title: 'Sayfa Bulunamadı (404)',
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center px-4 py-24 text-center sm:px-6">
      <span className="flex size-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
        <FileQuestion className="size-8" aria-hidden="true" />
      </span>

      <h1 className="mt-6 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
        Aradığınız sayfa bulunamadı
      </h1>
      <p className="mt-3 leading-relaxed text-slate-600">
        Bağlantı taşınmış veya yazı yayından kaldırılmış olabilir. Aşağıdaki
        kategorilerden ilginizi çekecek rehberlere göz atabilirsiniz.
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-2">
        {CATEGORIES.map((category) => (
          <Link
            key={category.slug}
            href={`/${category.slug}`}
            className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-blue-300 hover:text-blue-600"
          >
            {category.name}
          </Link>
        ))}
      </div>

      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          <Home className="size-4" aria-hidden="true" />
          Blog Ana Sayfası
        </Link>
        <a
          href={ctaUrl('blog-404')}
          className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-md shadow-blue-600/25 transition hover:bg-blue-700"
        >
          14 Gün Ücretsiz Deneyin
        </a>
      </div>
    </div>
  );
}