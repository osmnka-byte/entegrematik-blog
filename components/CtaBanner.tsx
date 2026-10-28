import { ArrowRight, Check, Sparkles } from 'lucide-react';
import { ctaUrl, MAIN_SITE_URL } from '@/config/site';

interface CtaBannerProps {
  /** default: tam bant (ana sayfa), compact: makale sonu */
  variant?: 'default' | 'compact';
  /** UTM/kampanya etiketi */
  campaign?: string;
  title?: string;
  description?: string;
}

const DEFAULT_FEATURES = [
  'Tüm pazaryerleri tek ekranda',
  'Otomatik e-fatura & e-arşiv',
  'Gerçek zamanlı stok senkronizasyonu',
];

/**
 * Kurumsal lacivert gradyan üzerinde, ana siteye ve iletişim mailine
 * yönlendiren CTA kartı.
 */
export default function CtaBanner({
  variant = 'default',
  campaign = 'blog-cta-banner',
  title = 'Tüm Satış Kanallarınızı Tek Panelden Yönetin',
  description = 'Sipariş, stok, fatura ve kargo süreçlerinizi otomatikleştirin; siz büyümeye odaklanın. Kurulum ve bilgi için hemen iletişime geçin.',
}: CtaBannerProps) {
  const isCompact = variant === 'compact';
  const features = isCompact ? DEFAULT_FEATURES.slice(0, 2) : DEFAULT_FEATURES;

  return (
    <section
      aria-label="Entegrematik bilgi ve iletişim çağrısı"
      className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#1E3A8A]"
    >
      {/* Dekoratif ışık efektleri */}
      <div
        className="pointer-events-none absolute -right-24 -top-24 size-96 rounded-full bg-blue-500/20 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-32 -left-16 size-80 rounded-full bg-blue-600/15 blur-3xl"
        aria-hidden="true"
      />

      <div
        className={`relative flex flex-col items-start justify-between gap-8 ${
          isCompact ? 'p-6 sm:p-8' : 'p-8 sm:p-12'
        } lg:flex-row lg:items-center`}
      >
        {/* Sol: mesaj */}
        <div className="max-w-xl">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-400/30 bg-blue-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-blue-300">
            <Sparkles className="size-3.5" aria-hidden="true" />
            Entegrematik
          </span>

          <h2
            className={`mt-4 font-extrabold tracking-tight text-white ${
              isCompact ? 'text-2xl' : 'text-3xl sm:text-4xl'
            }`}
          >
            {title}
          </h2>

          <p className="mt-3 leading-relaxed text-slate-300">{description}</p>

          <ul className="mt-5 space-y-2">
            {features.map((feature) => (
              <li key={feature} className="flex items-center gap-2.5 text-sm text-slate-200">
                <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/20">
                  <Check className="size-3 text-emerald-400" aria-hidden="true" />
                </span>
                {feature}
              </li>
            ))}
          </ul>
        </div>

        {/* Sağ: aksiyonlar */}
        <div className="flex w-full shrink-0 flex-col gap-3 sm:w-auto sm:flex-row lg:flex-col">
          <a
            href={ctaUrl(campaign)}
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
      </div>
    </section>
  );
}