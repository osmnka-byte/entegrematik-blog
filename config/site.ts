/**
 * Tüm URL'ler ve UTM parametreleri tek noktadan yönetilir.
 * Dofollow dönüşüm bağlantıları buradan üretilir.
 */

export const SITE_URL = 'https://blog.entegrematik.com';
export const SITE_NAME = 'Entegrematik Blog';
export const MAIN_SITE_URL = 'https://entegrematik.com';

export const SITE_DESCRIPTION =
  'Pazaryeri entegrasyonları, e-fatura, ön muhasebe ve e-ticaret SEO rehberleri. Trendyol, Hepsiburada ve N11 satışlarınızı büyütecek uzman içerikler Entegrematik Blog’da.';

export const DEFAULT_OG_IMAGE = '/og/default.png'; // 1200x630 — public/og/default.png olarak ekleyin

/** UTM parametreli dönüşüm URL'i yerine doğrudan mail yönlendirmesi */
export function ctaUrl(_campaign: string = 'blog'): string {
  return 'mailto:destek@entegrematik.com?subject=Blog%20Üzerinden%20Bilgi%20Talebi';
}

/** Header/Footer/Banner varsayılan CTA: İletişim / Bilgi Talebi Maili */
export const CTA_TRIAL_URL = ctaUrl('blog-cta');

export const SOCIAL_LINKS = {
  linkedin: 'https://www.linkedin.com/company/entegrematik',
  x: 'https://x.com/entegrematik',
  instagram: 'https://www.instagram.com/entegrematik',
  youtube: 'https://www.youtube.com/@entegrematik',
} as const;