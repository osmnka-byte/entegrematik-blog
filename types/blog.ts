/**
 * Entegrematik Blog - Çekirdek Veri Modelleri
 * Tüm veri katmanı bu tipler üzerinden strict mode'da çalışır.
 */

/** Kategori ikonları (lucide-react ikon anahtarları) */
export type CategoryIconName = 'store' | 'receipt' | 'book' | 'rocket';

/** Kurumsal vurgu renkleri (Tailwind class haritalarıyla eşleşir) */
export type AccentName = 'blue' | 'emerald' | 'amber' | 'violet';

export interface Author {
  id: string;
  name: string;
  title: string;
  bio: string;
  /** Avatar görseli yerine kurumsal initials yaklaşımı (harici bağımlılık yok) */
  initials: string;
  social: {
    linkedin?: string;
    x?: string;
  };
}

export interface FaqItem {
  question: string;
  answer: string;
}

/** İçindekiler tablosu girdisi (H2/H3) */
export interface TocItem {
  id: string;
  text: string;
  level: 2 | 3;
}

export interface Category {
  /** SEO dostu, küçük harfli, Türkçe karaktersiz slug */
  slug: string;
  name: string;
  /** Header/tab gibi dar alanlar için kısa isim */
  shortName: string;
  description: string;
  icon: CategoryIconName;
  accent: AccentName;
}

export interface Post {
  slug: string;
  categorySlug: string;
  /** 50-60 karakter, anahtar kelime odaklı */
  title: string;
  /** 150-160 karakter, harekete geçirici mesaj içeren */
  description: string;
  /** Zengin HTML içerik (h2/h3 başlıkları id attribute'u barındırmalıdır) */
  content: string;
  coverImage: string;
  coverImageAlt: string;
  /** AUTHORS kaydı referansı (normalize veri) */
  authorId: string;
  /** ISO 8601 format: YYYY-MM-DD */
  publishedAt: string;
  updatedAt: string;
  tags: string[];
  featured: boolean;
  /** Otomatik hesaplanır: getReadingTime(content) */
  readingTime: number;
  /** FAQPage Schema + akordeon bölümü için */
  faqs: FaqItem[];
}

/**
 * Client component'lere geçirilen hafifletilmiş kart verisi.
 * (RSC payload'ına dev HTML content'in sızmasını engeller — performans kritiktir.)
 */
export interface PostCardData {
  slug: string;
  href: string;
  title: string;
  description: string;
  coverImage: string;
  coverImageAlt: string;
  categoryName: string;
  categorySlug: string;
  accent: AccentName;
  publishedAt: string;
  readingTime: number;
  authorName: string;
}

/** Breadcrumb bileşeninin kullandığı öğe */
export interface BreadcrumbItem {
  name: string;
  href: string;
}