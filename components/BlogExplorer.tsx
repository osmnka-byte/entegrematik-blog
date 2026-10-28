'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import BlogCard from '@/components/BlogCard';
import type { Category, PostCardData } from '@/types/blog';

interface BlogExplorerProps {
  posts: PostCardData[];
  categories: Category[];
}

type FilterValue = 'all' | string;

/**
 * Ana sayfa yazı grid'i + anlık kategori filtreleme tabları.
 * Ana sayfa tamamen SSG kalır; filtreleme client-side yapılır.
 * SEO açısından kanonik liste görünümleri /[category] sayfalarıdır.
 */
export default function BlogExplorer({ posts, categories }: BlogExplorerProps) {
  const [activeFilter, setActiveFilter] = useState<FilterValue>('all');

  const filteredPosts = useMemo(
    () =>
      activeFilter === 'all'
        ? posts
        : posts.filter((post) => post.categorySlug === activeFilter),
    [posts, activeFilter]
  );

  const countByFilter = useMemo(() => {
    const counts: Record<string, number> = { all: posts.length };
    for (const post of posts) {
      counts[post.categorySlug] = (counts[post.categorySlug] ?? 0) + 1;
    }
    return counts;
  }, [posts]);

  const activeCategory = categories.find((c) => c.slug === activeFilter);

  return (
    <div>
      {/* Filtre tabları */}
      <div
        className="-mx-4 flex snap-x gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:flex-wrap sm:px-0"
        role="tablist"
        aria-label="Yazıları kategoriye göre filtrele"
      >
        <FilterTab
          label="Tümü"
          count={countByFilter.all ?? 0}
          isActive={activeFilter === 'all'}
          onClick={() => setActiveFilter('all')}
        />
        {categories.map((category) => (
          <FilterTab
            key={category.slug}
            label={category.name}
            count={countByFilter[category.slug] ?? 0}
            isActive={activeFilter === category.slug}
            onClick={() => setActiveFilter(category.slug)}
          />
        ))}
      </div>

      {/* Yazı grid'i */}
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredPosts.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>

      {/* Seçili kategorinin kanonik sayfasına iç link (SEO köprüsü) */}
      {activeCategory && (
        <div className="mt-8 text-center">
          <Link
            href={`/${activeCategory.slug}`}
            className="group inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 transition hover:text-blue-700"
          >
            Tüm {activeCategory.name} yazılarını gör
            <ArrowRight
              className="size-4 transition-transform group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </Link>
        </div>
      )}
    </div>
  );
}

/* ---------------------------------- Tab --------------------------------- */

interface FilterTabProps {
  label: string;
  count: number;
  isActive: boolean;
  onClick: () => void;
}

function FilterTab({ label, count, isActive, onClick }: FilterTabProps) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={isActive}
      onClick={onClick}
      className={[
        'inline-flex shrink-0 snap-start items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-all',
        isActive
          ? 'border-blue-600 bg-blue-600 text-white shadow-md shadow-blue-600/25'
          : 'border-slate-200 bg-white text-slate-600 hover:border-blue-300 hover:text-blue-600',
      ].join(' ')}
    >
      {label}
      <span
        className={[
          'rounded-full px-1.5 py-0.5 text-[11px] font-bold tabular-nums',
          isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500',
        ].join(' ')}
      >
        {count}
      </span>
    </button>
  );
}