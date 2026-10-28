import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowUpRight, FileText } from 'lucide-react';

import BlogCard from '@/components/BlogCard';
import Breadcrumb from '@/components/Breadcrumb';
import CategoryIcon from '@/components/CategoryIcon';
import CtaBanner from '@/components/CtaBanner';
import JsonLd from '@/components/JsonLd';
import { SITE_NAME, SITE_URL } from '@/config/site';
import { ACCENT_STYLES, CATEGORIES, getCategoryBySlug } from '@/data/categories';
import { getPostsByCategory, toPostCardData } from '@/lib/posts';
import { postsItemListSchema } from '@/lib/schema';

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

export function generateStaticParams() {
  return CATEGORIES.map((category) => ({ category: category.slug }));
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { category } = await params;
  const cat = getCategoryBySlug(category);

  if (!cat) {
    return { robots: { index: false, follow: false } };
  }

  const title = `${cat.name} Rehberi`;
  const description = `${cat.description} En güncel ${cat.name.toLowerCase()} yazıları ve uzman rehberleri ${SITE_NAME}'da.`;
  const canonical = `${SITE_URL}/${cat.slug}`;

  return {
    title,
    description,
    keywords: [cat.name, cat.shortName, 'e-ticaret', 'entegrematik'],
    alternates: { canonical },
    openGraph: {
      type: 'website',
      locale: 'tr_TR',
      url: canonical,
      siteName: SITE_NAME,
      title,
      description,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    robots: { index: true, follow: true },
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;
  const cat = getCategoryBySlug(category);

  if (!cat) {
    notFound();
  }

  const posts = getPostsByCategory(cat.slug);
  const postCards = posts.map(toPostCardData);
  const accent = ACCENT_STYLES[cat.accent];
  const otherCategories = CATEGORIES.filter((c) => c.slug !== cat.slug);

  return (
    <>
      <JsonLd data={postsItemListSchema(posts)} />

      <section className="border-b border-slate-200 bg-gradient-to-b from-blue-50/80 to-slate-50">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
          <Breadcrumb items={[{ name: cat.name, href: `/${cat.slug}` }]} />

          <div className="mt-6 flex items-start gap-5">
            <span
              className={`flex size-14 shrink-0 items-center justify-center rounded-2xl ${accent.iconWrap}`}
            >
              <CategoryIcon name={cat.icon} className="size-7" />
            </span>
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                  {cat.name}
                </h1>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-600">
                  <FileText className="size-3.5 text-blue-600" aria-hidden="true" />
                  {posts.length} yazı
                </span>
              </div>
              <p className="mt-3 max-w-3xl leading-relaxed text-slate-600">
                {cat.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {postCards.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {postCards.map((card, index) => (
              <BlogCard key={card.slug} post={card} priority={index < 3} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
            <p className="text-lg font-bold text-slate-900">
              Bu kategoride henüz yazı yok
            </p>
            <p className="mt-2 text-sm text-slate-600">
              Yeni rehberler çok yakında yayında olacak. Diğer kategorilere göz atın.
            </p>
            <Link
              href="/"
              className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-700"
            >
              Tüm yazılara dön
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        )}

        <div className="mt-14">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500">
            Diğer Kategoriler
          </h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            {otherCategories.map((other) => (
              <Link
                key={other.slug}
                href={`/${other.slug}`}
                className="group flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-card"
              >
                <span
                  className={`flex size-11 shrink-0 items-center justify-center rounded-xl ${
                    ACCENT_STYLES[other.accent].iconWrap
                  }`}
                >
                  <CategoryIcon name={other.icon} className="size-5" />
                </span>
                <span>
                  <span className="block text-sm font-bold text-slate-900 transition group-hover:text-blue-600">
                    {other.name}
                  </span>
                  <span className="mt-0.5 block text-xs text-slate-500">
                    {other.shortName} rehberleri
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-14">
          <CtaBanner
            variant="compact"
            campaign={`blog-kategori-${cat.slug}`}
            title={`${cat.name} Süreçlerinizi Otomatikleştirin`}
          />
        </div>
      </section>
    </>
  );
}