'use client';

import { useEffect, useState, type MouseEvent } from 'react';
import { List } from 'lucide-react';
import type { TocItem } from '@/types/blog';

interface TableOfContentsProps {
  items: TocItem[];
  className?: string;
}

/**
 * Makale içeriğindeki H2/H3 başlıklarını dinamik listeler.
 * IntersectionObserver ile aktif bölümü takip eder (scroll-spy),
 * tıklamada sticky header yüksekliğini hesaba katarak yumuşak kaydırma yapar.
 */
export default function TableOfContents({ items, className }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    if (items.length === 0) return;

    const headingElements = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);

    if (headingElements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
            break;
          }
        }
      },
      { rootMargin: '-96px 0px -70% 0px', threshold: 0 }
    );

    headingElements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [items]);

  const handleClick = (event: MouseEvent<HTMLAnchorElement>, id: string) => {
    event.preventDefault();
    const target = document.getElementById(id);
    if (!target) return;

    // scroll-margin-top (globals.css) sticky header ofsetini zaten hesaba katar
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    history.replaceState(null, '', `#${id}`);
    setActiveId(id);
  };

  if (items.length === 0) return null;

  return (
    <nav aria-label="İçindekiler" className={className}>
      <p className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-slate-900">
        <List className="size-4 text-blue-600" aria-hidden="true" />
        İçindekiler
      </p>
      <ul className="mt-4 space-y-0.5 border-l border-slate-200">
        {items.map((item) => {
          const isActive = activeId === item.id;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={(event) => handleClick(event, item.id)}
                aria-current={isActive ? 'true' : undefined}
                className={[
                  '-ml-px block border-l-2 py-1.5 text-[13px] leading-snug transition-colors',
                  item.level === 3 ? 'pl-7' : 'pl-3.5',
                  isActive
                    ? 'border-blue-600 font-semibold text-blue-600'
                    : 'border-transparent text-slate-600 hover:border-slate-300 hover:text-slate-900',
                ].join(' ')}
              >
                {item.text}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}