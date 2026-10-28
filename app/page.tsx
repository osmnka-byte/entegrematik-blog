import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Clock, FileText, Layers, Sparkles, Users } from 'lucide-react';

import BlogExplorer from '@/components/BlogExplorer';
import CtaBanner from '@/components/CtaBanner';
import JsonLd from '@/components/JsonLd';
import { ctaUrl, MAIN_SITE_URL, SITE_URL } from '@/config/site';
import { CATEGORIES } from '@/data/categories';
import {
  getFeaturedPostBundle,
  getSortedPosts,
  toPostCardData,
} from '@/lib/posts';
import { postsItemListSchema } from '@/lib/schema';
import { formatDateShort } from '@/lib/utils';

export const metadata: Metadata = {
  alternates: { canonical: `${SITE_URL}/` },
};

export default function HomePage() {
  const posts = getSortedPosts();
  const { post: featured, category: featuredCategory, author: featuredAuthor } =
    getFeaturedPostBundle();
  const featuredHref = `/${featured.categorySlug}/${featured.slug}`;
  const postCards = posts.map(toPostCardData);

  return (
    <>
      <JsonLd data={postsItemListSchema(posts)} />

      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-slate-900">
        <div
          className="pointer-events-none absolute -top-40 left-1/2 size-[36rem] -translate-x-1/2 rounded-full bg-blue-600/20 blur-3xl"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -bottom-32 -right-24 size-96 rounded-full bg-blue-500/10 blur-3xl"
          aria-hidden="true"
        />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:py-24">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/10 px-4 py-1.5 text-sm font-semibold text-blue-300">
              <Sparkles className="size-4" aria-hidden="true" />
              E-Ticaret Operasyon Rehberi
            </span>

            <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
              E-Ticaretinizi{' '}
              <span className="bg-gradient-to-r from-blue-400 to-blue-300 bg-clip-text text-transparent">
                Büyüten
              </span>{' '}
              Operasyon Rehberi
            </h1>

            <p className="mt-5 max-w-xl text-lg leading-relaxed text-slate-300">
              Pazaryeri entegrasyonlarından e-faturaya, komisyon analizlerinden ürün
              güncellemelerine kadar; Entegrematik uzmanlarından işletmenizi
              ölçeklendirecek güncel rehberler.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={ctaUrl('blog-hero')}
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-base font-semibold text-white shadow-lg shadow-blue-600/30 transition hover:-translate-y-0.5 hover:bg-blue-500"
              >
                14 Gün Ücretsiz Deneyin
                <ArrowRight
                  className="size-5 transition-transform group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </a>
              <a
                href={MAIN_SITE_URL}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 px-6 py-3.5 text-base font-semibold text-white transition hover:border-white/40 hover:bg-white/10"
              >
                entegrematik.com&apos;u Keşfet
              </a>
            </div>

            <dl className="mt-10 grid max-w-md grid-cols-3 gap-6 border-t border-white/10 pt-8">
              <div>
                <dt className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-slate-400">
                  <Layers className="size-3.5 text-blue-400" aria-hidden="true" />
                  Kategori
                </dt>
                <dd className="mt-1 text-2xl font-extrabold text-white">
                  {CATEGORIES.length}
                </dd>
              </div>
              <div>
                <dt className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-slate-400">
                  <FileText className="size-3.5 text-blue-400" aria-hidden="true" />
                  Uzman Rehber
                </dt>
                <dd className="mt-1 text-2xl font-extrabold text-white">25+</dd>
              </div>
              <div>
                <dt className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-slate-400">
                  <Users className="size-3.5 text-blue-400" aria-hidden="true" />
                  Aylık Okuyucu
                </dt>
                <dd className="mt-1 text-2xl font-extrabold text-white">12K+</dd>
              </div>
            </dl>
          </div>

          <Link
            href={featuredHref}
            className="group relative block overflow-hidden rounded-3xl border border-white/10 bg-slate-800 shadow-2xl shadow-blue-950/40 transition hover:border-blue-400/30"
            aria-label={`Öne çıkan yazı: ${featured.title}`}
          >
            {/* relative sınıfı eklendi */}
            <div className="relative aspect-[16/10] w-full">
              <Image
                src={featured.coverImage}
                alt={featured.coverImageAlt}
                fill
                priority
                sizes="(max-width: 1023px) 100vw, 560px"
                className="object-cover opacity-90 transition duration-500 group-hover:scale-105 group-hover:opacity-100"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/50 to-transparent"
                aria-hidden="true"
              />

              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                <span className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white shadow-lg">
                  <Sparkles className="size-3.5" aria-hidden="true" />
                  Öne Çıkan · {featuredCategory.name}
                </span>

                <h2 className="mt-4 text-xl font-extrabold leading-snug text-white transition group-hover:text-blue-200 sm:text-2xl">
                  {featured.title}
                </h2>

                <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-slate-300">
                  {featured.description}
                </p>

                <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-medium text-slate-400">
                  <span>{featuredAuthor.name}</span>
                  <span aria-hidden="true">·</span>
                  <time dateTime={featured.publishedAt}>
                    {formatDateShort(featured.publishedAt)}
                  </time>
                  <span aria-hidden="true">·</span>
                  <span className="inline-flex items-center gap-1">
                    <Clock className="size-3.5" aria-hidden="true" />
                    {featured.readingTime} dk okuma
                  </span>
                  <span className="ml-auto inline-flex items-center gap-1 font-semibold text-blue-300 transition group-hover:gap-2">
                    Okumaya başla
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </span>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* POST GRID */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">
              Son Yazılar
            </h2>
            <p className="mt-2 text-slate-600">
              Kategorilere göre filtreleyin, operasyonunuzu bir adım öne taşıyın.
            </p>
          </div>
        </div>

        <BlogExplorer posts={postCards} categories={CATEGORIES} />
      </section>

      {/* CTA SECTION */}
      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <CtaBanner campaign="blog-home-bottom" />
      </section>
    </>
  );
}