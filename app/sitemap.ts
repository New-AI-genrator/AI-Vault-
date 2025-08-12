import { MetadataRoute } from 'next';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://aitoolsdirectory.com';

// This is a basic sitemap generator
// In a real app, you would fetch dynamic routes from your database
export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ['', '/about', '/contact', '/privacy', '/terms'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // Add dynamic routes here when you have them
  // Example for dynamic routes:
  // const tools = await getTools();
  // const toolRoutes = tools.map((tool) => ({
  //   url: `${baseUrl}/tools/${tool.slug}`,
  //   lastModified: tool.updatedAt,
  //   changeFrequency: 'weekly',
  //   priority: 0.7,
  // }));

  return [...routes]; // Combine with dynamic routes: ...routes, ...toolRoutes
}
