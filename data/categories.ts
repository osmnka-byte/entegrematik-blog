import type { AccentName, Category } from '@/types/blog';

/**
 * Tailwind JIT'in class'ları derleyebilmesi için tüm accent sınıfları
 * statik string olarak haritalanmıştır (dinamik string birleştirme YOK).
 */
export const ACCENT_STYLES: Record<
  AccentName,
  { badge: string; iconWrap: string; solid: string }
> = {
  blue: {
    badge: 'bg-blue-50 text-blue-700 border-blue-200',
    iconWrap: 'bg-blue-100 text-blue-600',
    solid: 'bg-blue-600',
  },
  emerald: {
    badge: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    iconWrap: 'bg-emerald-100 text-emerald-600',
    solid: 'bg-emerald-600',
  },
  amber: {
    badge: 'bg-amber-50 text-amber-700 border-amber-200',
    iconWrap: 'bg-amber-100 text-amber-600',
    solid: 'bg-amber-500',
  },
  violet: {
    badge: 'bg-violet-50 text-violet-700 border-violet-200',
    iconWrap: 'bg-violet-100 text-violet-600',
    solid: 'bg-violet-600',
  },
};

export const CATEGORIES: Category[] = [
  {
    slug: 'pazaryeri-entegrasyonlari',
    name: 'Pazaryeri Entegrasyonları',
    shortName: 'Pazaryeri',
    description:
      'Trendyol, Hepsiburada, N11 ve Amazon TR entegrasyonları; stok, sipariş ve kargo süreçlerini otomatikleştiren adım adım teknik rehberler.',
    icon: 'store',
    accent: 'blue',
  },
  {
    slug: 'e-fatura-on-muhasebe',
    name: 'E-Fatura & Ön Muhasebe',
    shortName: 'E-Fatura',
    description:
      'E-fatura, e-arşiv ve ön muhasebe süreçlerinde mevzuata tam uyum; cezalardan koruyan pratik rehberler ve otomasyon ipuçları.',
    icon: 'receipt',
    accent: 'emerald',
  },
  {
    slug: 'e-ticaret-rehberi-seo',
    name: 'E-Ticaret Rehberi & SEO',
    shortName: 'E-Ticaret & SEO',
    description:
      'Komisyon analizlerinden fiyatlandırma stratejilerine, e-ticaret SEO’sundan dönüşüm optimizasyonuna kadar büyümeye odaklanan uzman içerikler.',
    icon: 'book',
    accent: 'amber',
  },
  {
    slug: 'urun-guncellemeleri',
    name: 'Ürün Güncellemeleri',
    shortName: 'Güncellemeler',
    description:
      'Entegrematik sürüm notları, yeni özellik duyuruları, performans iyileştirmeleri ve ürün yol haritası.',
    icon: 'rocket',
    accent: 'violet',
  },
];

export function getCategoryBySlug(slug: string): Category | undefined {
  return CATEGORIES.find((category) => category.slug === slug);
}