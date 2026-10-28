import type { TocItem } from '@/types/blog';

/* ------------------------------- Tarih ------------------------------- */

const longDateFormatter = new Intl.DateTimeFormat('tr-TR', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
});

const shortDateFormatter = new Intl.DateTimeFormat('tr-TR', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
});

/** "20 Ekim 2026" */
export function formatDate(isoDate: string): string {
  return longDateFormatter.format(new Date(isoDate));
}

/** "20 Eki 2026" */
export function formatDateShort(isoDate: string): string {
  return shortDateFormatter.format(new Date(isoDate));
}

/* ------------------------------- Slug -------------------------------- */

const TURKISH_CHAR_MAP: Record<string, string> = {
  ç: 'c', Ç: 'c',
  ğ: 'g', Ğ: 'g',
  ı: 'i', I: 'i', İ: 'i',
  ö: 'o', Ö: 'o',
  ş: 's', Ş: 's',
  ü: 'u', Ü: 'u',
};

/** Türkçe karakterleri dönüştürerek SEO dostu, küçük harfli slug üretir. */
export function slugify(text: string): string {
  return text
    .split('')
    .map((char) => TURKISH_CHAR_MAP[char] ?? char)
    .join('')
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

/* --------------------------- İçerik yardımcıları ---------------------- */

/** HTML içerikten okuma süresini (dakika) hesaplar. Ort. 200 kelime/dk. */
export function getReadingTime(html: string): number {
  const plainText = html.replace(/<[^>]+>/g, ' ');
  const wordCount = plainText.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(wordCount / 200));
}

/**
 * HTML içerikten H2/H3 başlıklarını çıkarır ve TocItem listesi döner.
 * İçerik yazım kuralı: tüm h2/h3 etiketleri `id` attribute'u içermelidir.
 */
export function extractToc(html: string): TocItem[] {
  const headingRegex = /<h([23])\s+id="([^"]+)"[^>]*>([\s\S]*?)<\/h[23]>/gi;
  const items: TocItem[] = [];
  let match: RegExpExecArray | null;

  while ((match = headingRegex.exec(html)) !== null) {
    const level = Number(match[1]) as 2 | 3;
    const id = match[2];
    const text = match[3].replace(/<[^>]+>/g, '').trim();
    if (id && text) {
      items.push({ id, text, level });
    }
  }

  return items;
}