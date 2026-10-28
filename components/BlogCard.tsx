import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, CalendarDays, Clock, User } from 'lucide-react';
import { ACCENT_STYLES } from '@/data/categories';
import { formatDateShort } from '@/lib/utils';
import type { PostCardData } from '@/types/blog';

interface BlogCardProps {
  post: PostCardData;
  priority?: boolean;
}

export default function BlogCard({ post, priority = false }: BlogCardProps) {
  const accent = ACCENT_STYLES[post.accent];

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-card-hover">
      {/* Görsel kapsayıcısına relative eklendi */}
      <Link href={post.href} className="relative block aspect-[16/9] w-full overflow-hidden" tabIndex={-1} aria-hidden="true">
        <Image
          src={post.coverImage}
          alt={post.coverImageAlt}
          fill
          priority={priority}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span
          className={`absolute left-4 top-4 inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold shadow-sm ${accent.badge} bg-white/95 backdrop-blur`}
        >
          {post.categoryName}
        </span>
      </Link>

      {/* İçerik */}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-bold leading-snug tracking-tight text-slate-900">
          <Link href={post.href} className="transition-colors group-hover:text-blue-600">
            {post.title}
          </Link>
        </h3>

        <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-slate-600">
          {post.description}
        </p>

        {/* Meta bilgileri */}
        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-slate-100 pt-4 text-xs text-slate-500">
          <span className="inline-flex items-center gap-1.5">
            <CalendarDays className="size-3.5 text-slate-400" aria-hidden="true" />
            <time dateTime={post.publishedAt}>{formatDateShort(post.publishedAt)}</time>
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock className="size-3.5 text-slate-400" aria-hidden="true" />
            {post.readingTime} dk okuma
          </span>
          <span className="inline-flex items-center gap-1.5">
            <User className="size-3.5 text-slate-400" aria-hidden="true" />
            {post.authorName}
          </span>
        </div>

        <Link
          href={post.href}
          className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-blue-600 transition group-hover:gap-2 hover:text-blue-700"
          aria-label={`Yazıyı oku: ${post.title}`}
        >
          Yazıyı Oku
          <ArrowUpRight className="size-4" aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}