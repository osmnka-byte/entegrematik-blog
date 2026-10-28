import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/config/site';
import { CATEGORIES } from '@/data/categories';
import { getPostsByCategory, getSortedPosts } from '@/lib/posts';

export default function sitemap(): MetadataRoute.Sitemap {
  const allPosts = getSortedPosts();

  const latestPostDate =
    allPosts.length > 0 ? new Date(allPosts[0].updatedAt) : new Date();

  const homeEntry: MetadataRoute.Sitemap[number] = {
    url: `${SITE_URL}/`,
    lastModified: latestPostDate,
    changeFrequency: 'daily',
    priority: 1,
  };

  const categoryEntries: MetadataRoute.Sitemap = CATEGORIES.map((category) => {
    const categoryPosts = getPostsByCategory(category.slug);
    const latestInCategory = categoryPosts[0];

    return {
      url: `${SITE_URL}/${category.slug}`,
      lastModified: latestInCategory
        ? new Date(latestInCategory.updatedAt)
        : latestPostDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    };
  });

  const postEntries: MetadataRoute.Sitemap = allPosts.map((post) => ({
    url: `${SITE_URL}/${post.categorySlug}/${post.slug}`,
    lastModified: new Date(post.updatedAt),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [homeEntry, ...categoryEntries, ...postEntries];
}