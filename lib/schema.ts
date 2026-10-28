import { MAIN_SITE_URL, SITE_NAME, SITE_URL } from '@/config/site';
import type { Author, BreadcrumbItem, FaqItem, Post } from '@/types/blog';

/** Ana sitede ve blog genelinde yayımlanan Organization kimliği. */
export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${MAIN_SITE_URL}/#organization`,
    name: 'Entegrematik',
    alternateName: 'Entegrematik E-Ticaret Entegrasyon Platformu',
    url: MAIN_SITE_URL,
    logo: {
      '@type': 'ImageObject',
      url: `${MAIN_SITE_URL}/logo.png`,
    },
    sameAs: [
      'https://www.linkedin.com/company/entegrematik',
      'https://x.com/entegrematik',
      'https://www.instagram.com/entegrematik',
      'https://www.youtube.com/@entegrematik',
    ],
  };
}

/** Blog'un WebSite şeması — publisher: Entegrematik (ana site köprüsü). */
export function webSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    name: SITE_NAME,
    url: SITE_URL,
    inLanguage: 'tr-TR',
    description:
      'Pazaryeri entegrasyonları, e-fatura ve e-ticaret üzerine uzman rehberler.',
    publisher: {
      '@type': 'Organization',
      '@id': `${MAIN_SITE_URL}/#organization`,
      name: 'Entegrematik',
      url: MAIN_SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${MAIN_SITE_URL}/logo.png`,
      },
    },
  };
}

/** Makale detayı: BlogPosting şeması (yazar, tarihler, görsel, publisher). */
export function blogPostingSchema(post: Post, author: Author, categoryName: string) {
  const url = `${SITE_URL}/${post.categorySlug}/${post.slug}`;

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': url,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    headline: post.title,
    description: post.description,
    image: [post.coverImage],
    inLanguage: 'tr-TR',
    keywords: post.tags.join(', '),
    articleSection: categoryName,
    wordCount: post.content.replace(/<[^>]+>/g, ' ').trim().split(/\s+/).length,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    author: {
      '@type': 'Person',
      name: author.name,
      jobTitle: author.title,
      url: author.social.linkedin ?? MAIN_SITE_URL,
    },
    publisher: {
      '@type': 'Organization',
      '@id': `${MAIN_SITE_URL}/#organization`,
      name: 'Entegrematik',
      url: MAIN_SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${MAIN_SITE_URL}/logo.png`,
      },
    },
  };
}

/** BreadcrumbList şeması — href'ler relative kabul edilir, mutlak URL'e çevrilir. */
export function breadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.href.startsWith('http') ? item.href : `${SITE_URL}${item.href}`,
    })),
  };
}

/** FAQPage şeması — rehber yazıların SSS bölümüyle birebir eşleşir. */
export function faqSchema(faqs: FaqItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

/** Ana sayfa / kategori sayfaları için yazı listesi (ItemList). */
export function postsItemListSchema(posts: Post[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: posts.slice(0, 20).map((post, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: post.title,
      url: `${SITE_URL}/${post.categorySlug}/${post.slug}`,
    })),
  };
}