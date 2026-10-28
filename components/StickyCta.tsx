'use client';

import { useEffect, useState } from 'react';
import { X, Zap } from 'lucide-react';
import { ctaUrl } from '@/config/site';

/**
 * Kullanıcı sayfada 600px kaydığında beliren, kapatılabilir sticky CTA bandı.
 * Dofollow + UTM parametreli dönüşüm bağlantısı içerir.
 */
export default function StickyCta() {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 600);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (isDismissed) return null;

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 transition-transform duration-300 ease-out ${
        isVisible ? 'translate-y-0' : 'translate-y-full'
      }`}
      role="complementary"
      aria-label="Ücretsiz deneme çağrısı"
      aria-hidden={!isVisible}
    >
      <div className="border-t border-white/10 bg-slate-900/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
          <p className="hidden items-center gap-2 text-sm font-medium text-white sm:flex">
            <Zap className="size-4 shrink-0 text-blue-400" aria-hidden="true" />
            Tüm pazaryerlerini, stok ve fatura süreçlerini tek panelden yönetin.
          </p>
          <p className="text-sm font-medium text-white sm:hidden">
            14 gün ücretsiz deneyin
          </p>

          <div className="flex shrink-0 items-center gap-3">
            <a
              href={ctaUrl('blog-sticky-banner')}
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-blue-600/30 transition hover:bg-blue-500"
            >
              Ücretsiz Deneyin
            </a>
            <button
              type="button"
              onClick={() => setIsDismissed(true)}
              aria-label="Banner'ı kapat"
              className="text-slate-400 transition hover:text-white"
            >
              <X className="size-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}