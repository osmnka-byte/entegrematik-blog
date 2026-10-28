import { CATEGORIES, getCategoryBySlug } from '@/data/categories';
import { getAuthorById, POSTS } from '@/data/posts';
import type { Author, Category, Post, PostCardData } from '@/types/blog';

/** Tüm yayınlanmış yazılar, yeniler önce (publishedAt desc). */
export function getSortedPosts(): Post[] {
  return [...POSTS].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export function getFeaturedPost(): Post {
  return POSTS.find((post) => post.featured) ?? getSortedPosts()[0];
}

/** Öne çıkan yazı + kategorisi + yazarı (ana sayfa hero'su için tek pakette). */
export function getFeaturedPostBundle(): {
  post: Post;
  category: Category;
  author: Author;
} {
  const post = getFeaturedPost();
  const category = getCategoryBySlug(post.categorySlug);
  return { post, category: category ?? CATEGORIES[0], author: getAuthor(post) };
}

export function getPostsByCategory(categorySlug: string): Post[] {
  return getSortedPosts().filter((post) => post.categorySlug === categorySlug);
}

/** Kategori + slug ikilisiyle tam eşleşen yazı (canonical bütünlüğü korunur). */
export function getPost(categorySlug: string, slug: string): Post | undefined {
  return POSTS.find(
    (post) => post.slug === slug && post.categorySlug === categorySlug
  );
}

export function getAuthor(post: Post): Author {
  return getAuthorById(post.authorId);
}

/** İlgili yazılar: önce aynı kategori, sonra en güncel diğerleri (toplam limit). */
export function getRelatedPosts(post: Post, limit: number = 3): Post[] {
  const sameCategory = getPostsByCategory(post.categorySlug).filter(
    (p) => p.slug !== post.slug
  );
  const others = getSortedPosts().filter(
    (p) => p.slug !== post.slug && p.categorySlug !== post.categorySlug
  );
  return [...sameCategory, ...others].slice(0, limit);
}

/** Post → hafifletilmiş kart verisi (client component'lere güvenli aktarım). */
export function toPostCardData(post: Post): PostCardData {
  const category = getCategoryBySlug(post.categorySlug);
  const author = getAuthor(post);

  return {
    slug: post.slug,
    href: `/${post.categorySlug}/${post.slug}`,
    title: post.title,
    description: post.description,
    coverImage: post.coverImage,
    coverImageAlt: post.coverImageAlt,
    categoryName: category?.name ?? 'Blog',
    categorySlug: post.categorySlug,
    accent: category?.accent ?? 'blue',
    publishedAt: post.publishedAt,
    readingTime: post.readingTime,
    authorName: author.name,
  };
}

/** Tüm benzersiz etiketler (metadata keywords desteği). */
export function getAllTags(): string[] {
  return [...new Set(POSTS.flatMap((post) => post.tags))];
}