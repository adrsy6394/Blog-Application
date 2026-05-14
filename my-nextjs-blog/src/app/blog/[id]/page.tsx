import { Metadata } from 'next';
import { postsService } from '@/lib/postsService';
import PostDetailClient from '@/components/blog/PostDetail';
import { Suspense } from 'react';
import { PostDetailSkeleton } from '@/components/common/Skeleton';

type PageProps = {
  params: Promise<{ id: string }>
}

// ISR: Revalidate every hour
export const revalidate = 3600;

// SSG: Pre-render top 30 posts
export async function generateStaticParams() {
  try {
    const data = await postsService.getAllPosts(30, 0);
    return data.posts.map((post) => ({
      id: post.id.toString(),
    }));
  } catch (error) {
    console.error("Failed to generate static params for posts:", error);
    return [];
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  try {
    const post = await postsService.getPostById(Number(id));
    return {
      title: post.title,
      description: post.body.substring(0, 160) + '...',
      openGraph: {
        title: post.title,
        description: post.body.substring(0, 160) + '...',
        type: 'article',
        tags: post.tags,
      }
    };
  } catch (error) {
    return {
      title: 'Post Not Found',
    };
  }
}

export default async function PostDetailPage({ params }: PageProps) {
  const { id } = await params;
  const postId = Number(id);

  // Fetch post data for JSON-LD structured data (Server Component)
  let post = null;
  try {
    post = await postsService.getPostById(postId);
  } catch (e) {}

  return (
    <Suspense fallback={<PostDetailSkeleton />}>
      {post && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BlogPosting",
              "headline": post.title,
              "description": post.body.substring(0, 200),
              "author": { "@type": "Person", "name": `User ${post.userId}` },
              "url": `https://dummyjson.com/posts/${postId}`,
            })
          }}
        />
      )}
      <PostDetailClient id={postId} />
    </Suspense>
  );
}
