interface JsonLdProps {
  /** Tek şema objesi veya şema objeleri dizisi (JSON-LD array olarak derlenir) */
  data: Record<string, unknown> | Record<string, unknown>[];
}

/**
 * Schema.org yapılarını `<script type="application/ld+json">` olarak
 * güvenle serileştirir. Tüm şemalar lib/schema.ts üzerinden üretilir.
 */
export default function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      // Not: İçerik tamamen kendi veri katmanımızdan üretilir (kullanıcı girdisi yok),
      // bu nedenle dangerouslySetInnerHTML burada güvenlidir.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}