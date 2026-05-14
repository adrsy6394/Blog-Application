import { MetadataRoute } from 'next'
import { postsService } from '@/lib/postsService'
 
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://nextjs-blog-assignment.vercel.app'
  
  // Static routes
  const routes = ['', '/about', '/contact', '/blog', '/login', '/signup'].map(
    (route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
    })
  )
 
  // Dynamic blog routes
  try {
    const data = await postsService.getAllPosts(100, 0)
    const postRoutes = data.posts.map((post) => ({
      url: `${baseUrl}/blog/${post.id}`,
      lastModified: new Date(),
    }))
    
    return [...routes, ...postRoutes]
  } catch (error) {
    return routes
  }
}
