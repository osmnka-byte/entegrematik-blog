import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import JsonLd from '@/components/JsonLd';
import { breadcrumbSchema } from '@/lib/schema';
import type { BreadcrumbItem } from '@/types/blog';

interface BreadcrumbProps {
  /** "Ana Sayfa" bileşen tarafından otomatik eklenir */
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  const fullTrail: BreadcrumbItem[] = [{ name: 'Ana Sayfa', href: '/' }, ...items];

  return (
    <>
      <JsonLd data={breadcrumbSchema(fullTrail)} />

      <nav aria-label="Breadcrumb">
        <ol className="flex flex-wrap items-center gap-1.5 text-sm text-slate-500">
          <li className="flex items-center">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 font-medium transition hover:text-blue-600"
            >
              <Home className="size-3.5" aria-hidden="true" />
              Ana Sayfa
            </Link>
          </li>

          {fullTrail.slice(1).map((item, index, array) => {
            const isLast = index === array.length - 1;
            return (
              <li key={item.href} className="flex items-center gap-1.5">
                <ChevronRight className="size-3.5 shrink-0 text-slate-400" aria-hidden="true" />
                {isLast ? (
                  <span
                    aria-current="page"
                    className="line-clamp-1 max-w-[240px] font-medium text-slate-900 sm:max-w-[480px]"
                  >
                    {item.name}
                  </span>
                ) : (
                  <Link href={item.href} className="font-medium transition hover:text-blue-600">
                    {item.name}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}