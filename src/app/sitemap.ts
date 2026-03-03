import { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
   const baseUrl = 'https://www.deveditor.io';

   return [
      {
         url: baseUrl,
         lastModified: new Date(),
         changeFrequency: 'weekly',
         priority: 1,
      },
      {
         url: `${baseUrl}/json-editor`,
         lastModified: new Date(),
         changeFrequency: 'monthly',
         priority: 0.8,
      },
      {
         url: `${baseUrl}/about`,
         lastModified: new Date(),
         changeFrequency: 'monthly',
         priority: 0.5,
      },
   ];
}
