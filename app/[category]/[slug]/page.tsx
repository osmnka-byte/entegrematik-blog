import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  CalendarDays,
  ChevronDown,
  Clock,
  Send,
} from 'lucide-react';

import BlogCard from '@/components/BlogCard';
import Breadcrumb from '@/components/Breadcrumb';
import CtaBanner from '@/components/CtaBanner';
import JsonLd from '@/components/JsonLd';
import TableOfContents from '@/components/TableOfContents';
import { SITE_NAME, SITE_URL } from '@/config/site';
import { ACCENT_STYLES, getCategoryBySlug } from '@/data/categories';
import { getAuthor, getPost, getRelatedPosts, toPostCardData } from '@/lib/posts';
import { blogPostingSchema, faqSchema } from '@/lib/schema';
import { extractToc, formatDate } from '@/lib/utils';

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

interface PostPageProps {
  params: Promise<{ category: string; slug: string }>;
}

export function generateStaticParams() {
  return [
    { category: 'pazaryeri-entegrasyonlari', slug: 'trendyol-stok-takibi-nasil-yapilir' },
    { category: 'e-fatura-on-muhasebe', slug: 'e-fatura-kesiminde-sik-yapilan-7-hata' },
    { category: 'e-ticaret-rehberi-seo', slug: 'pazaryeri-komisyon-oranlari-2026' },
    { category: 'urun-guncellemeleri', slug: 'entegrematik-ekim-2026-guncellemesi' },
  ];
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { category, slug } = await params;
  const post = getPost(category, slug);

  if (!post) {
    return { robots: { index: false, follow: false } };
  }

  const cat = getCategoryBySlug(post.categorySlug);
  const author = getAuthor(post);
  const url = `${SITE_URL}/${post.categorySlug}/${post.slug}`;

  return {
    title: post.title,
    description: post.description,
    keywords: post.tags,
    authors: [{ name: author.name, url: author.social.linkedin }],
    category: cat?.name,
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      locale: 'tr_TR',
      url,
      siteName: SITE_NAME,
      title: post.title,
      description: post.description,
      publishedTime: new Date(post.publishedAt).toISOString(),
      modifiedTime: new Date(post.updatedAt).toISOString(),
      authors: [author.name],
      section: cat?.name,
      tags: post.tags,
      images: [
        {
          url: post.coverImage,
          width: 1600,
          height: 900,
          alt: post.coverImageAlt,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: [post.coverImage],
      creator: '@entegrematik',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1,
      },
    },
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { category, slug } = await params;
  const post = getPost(category, slug);

  if (!post) {
    notFound();
  }

  const cat = getCategoryBySlug(post.categorySlug);
  if (!cat) {
    notFound();
  }

  const author = getAuthor(post);
  const toc = extractToc(post.content);
  const relatedPosts = getRelatedPosts(post, 3).map(toPostCardData);
  const postUrl = `${SITE_URL}/${post.categorySlug}/${post.slug}`;
  const accent = ACCENT_STYLES[cat.accent];
  const isUpdated = post.updatedAt !== post.publishedAt;

  const jsonLdData: Record<string, unknown>[] = [
    blogPostingSchema(post, author, cat.name),
  ];
  if (post.faqs.length > 0) {
    jsonLdData.push(faqSchema(post.faqs));
  }

  const breadcrumbItems = [
    { name: cat.name, href: `/${cat.slug}` },
    { name: post.title, href: `/${post.categorySlug}/${post.slug}` },
  ];

  const encodedUrl = encodeURIComponent(postUrl);
  const encodedTitle = encodeURIComponent(post.title);
  const shareLinks = [
    {
      label: "X'te paylaş",
      href: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
      Icon: TwitterIcon,
    },
    {
      label: "LinkedIn'de paylaş",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      Icon: LinkedinIcon,
    },
    {
      label: "Telegram'da paylaş",
      href: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`,
      Icon: Send,
    },
  ];

  return (
    <>
      <JsonLd data={jsonLdData} />

      <article>
        <header className="border-b border-slate-200 bg-gradient-to-b from-slate-100/80 to-slate-50">
          <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
            <Breadcrumb items={breadcrumbItems} />

            <div className="mx-auto mt-6 max-w-4xl text-center">
              <Link
                href={`/${cat.slug}`}
                className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-wider transition hover:opacity-80 ${accent.badge}`}
              >
                {cat.name}
              </Link>

              <h1 className="mt-5 text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl lg:text-[2.75rem]">
                {post.title}
              </h1>

              <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-slate-600">
                {post.description}
              </p>

              <div className="mt-7 flex flex-wrap items-center justify-center gap-x-5 gap-y-3 text-sm text-slate-500">
                <span className="inline-flex items-center gap-2.5">
                  <span className="flex size-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-blue-500 text-sm font-extrabold text-white">
                    {author.initials}
                  </span>
                  <span className="text-left leading-tight">
                    <span className="block font-semibold text-slate-900">
                      {author.name}
                    </span>
                    <span className="block text-xs text-slate-500">{author.title}</span>
                  </span>
                </span>

                <span className="hidden h-8 w-px bg-slate-200 sm:block" aria-hidden="true" />

                <span className="inline-flex items-center gap-1.5">
                  <CalendarDays className="size-4 text-slate-400" aria-hidden="true" />
                  <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
                </span>

                {isUpdated && (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-700">
                    Güncellendi: <time dateTime={post.updatedAt}>{formatDate(post.updatedAt)}</time>
                  </span>
                )}

                <span className="inline-flex items-center gap-1.5">
                  <Clock className="size-4 text-slate-400" aria-hidden="true" />
                  {post.readingTime} dk okuma
                </span>
              </div>
            </div>

            <div className="relative mx-auto mt-10 max-w-4xl overflow-hidden rounded-3xl shadow-xl shadow-slate-900/10">
              <Image
                src={post.coverImage}
                alt={post.coverImageAlt}
                width={1600}
                height={900}
                priority
                sizes="(max-width: 1024px) 100vw, 896px"
                className="aspect-[16/9] w-full object-cover"
              />
            </div>
          </div>
        </header>

        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-14">
            <div className="min-w-0">
              {toc.length > 0 && (
                <details className="group mb-8 rounded-2xl border border-slate-200 bg-white p-4 lg:hidden">
                  <summary className="flex cursor-pointer list-none items-center justify-between font-bold text-slate-900 [&::-webkit-details-marker]:hidden">
                    İçindekiler
                    <ChevronDown
                      className="size-5 text-slate-400 transition group-open:rotate-180"
                      aria-hidden="true"
                    />
                  </summary>
                  <TableOfContents items={toc} className="mt-4" />
                </details>
              )}

              <div
                className="prose prose-slate prose-blog max-w-none"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              {post.tags.length > 0 && (
                <div className="mt-10 flex flex-wrap gap-2 border-t border-slate-200 pt-8">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-600"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <span className="text-sm font-semibold text-slate-700">Paylaş:</span>
                {shareLinks.map(({ label, href, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    title={label}
                    className="flex size-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600"
                  >
                    <Icon className="size-4" aria-hidden="true" />
                  </a>
                ))}
              </div>

              {post.faqs.length > 0 && (
                <section
                  aria-labelledby="sss-baslik"
                  className="mt-12 rounded-3xl border border-slate-200 bg-white p-6 shadow-card sm:p-8"
                >
                  <h2
                    id="sss-baslik"
                    className="text-2xl font-extrabold tracking-tight text-slate-900"
                  >
                    Sıkça Sorulan Sorular
                  </h2>

                  <div className="mt-6 space-y-3">
                    {post.faqs.map((faq) => (
                      <details
                        key={faq.question}
                        className="group rounded-xl border border-slate-200 bg-slate-50/60 transition open:border-blue-200 open:bg-white open:shadow-sm"
                      >
                        <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-4 text-sm font-semibold text-slate-900 sm:text-base [&::-webkit-details-marker]:hidden">
                          {faq.question}
                          <ChevronDown
                            className="size-5 shrink-0 text-slate-400 transition group-open:rotate-180 group-open:text-blue-600"
                            aria-hidden="true"
                          />
                        </summary>
                        <div className="px-4 pb-4 text-sm leading-relaxed text-slate-600">
                          {faq.answer}
                        </div>
                      </details>
                    ))}
                  </div>
                </section>
              )}

              <div className="mt-12">
                <CtaBanner
                  variant="compact"
                  campaign={`blog-makale-${post.slug}`}
                  title="Bu Süreçleri Otomatikleştirmeye Bugün Başlayın"
                  description="Rehberde anlattığımız tüm operasyonları Entegrematik ile tek panelden yönetin. Kredi kartı gerekmez."
                />
              </div>

              <section
                aria-label="Yazar hakkında"
                className="mt-10 rounded-3xl border border-slate-200 bg-white p-6 sm:p-8"
              >
                <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
                  <span className="flex size-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-blue-500 text-xl font-extrabold text-white">
                    {author.initials}
                  </span>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-blue-600">
                      Yazar
                    </p>
                    <h3 className="mt-1 text-lg font-bold text-slate-900">{author.name}</h3>
                    <p className="text-sm font-medium text-slate-500">{author.title}</p>
                    <p className="mt-3 text-sm leading-relaxed text-slate-600">{author.bio}</p>
                    {author.social.linkedin && (
                      <a
                        href={author.social.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 transition hover:text-blue-700"
                      >
                        <LinkedinIcon className="size-4" aria-hidden="true" />
                        LinkedIn Profili
                      </a>
                    )}
                  </div>
                </div>
              </section>
            </div>

            <aside className="hidden lg:block" aria-label="İçindekiler kenar çubuğu">
              <div className="sticky top-24">
                <TableOfContents items={toc} />
              </div>
            </aside>
          </div>

          {relatedPosts.length > 0 && (
            <section className="mt-16 border-t border-slate-200 pt-12" aria-labelledby="ilgili-yazilar">
              <h2
                id="ilgili-yazilar"
                className="text-2xl font-extrabold tracking-tight text-slate-900"
              >
                İlgili Yazılar
              </h2>
              <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {relatedPosts.map((card) => (
                  <BlogCard key={card.slug} post={card} />
                ))}
              </div>
            </section>
          )}
        </div>
      </article>
    </>
  );
}