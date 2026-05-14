import { Metadata } from 'next';
import { postsService } from '@/lib/postsService';
import PostDetailClient from '@/components/blog/PostDetail';
import { Suspense } from 'react';
import { PostDetailSkeleton } from '@/components/common/Skeleton';

type PageProps = {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  try {
    const post = await postsService.getPostById(Number(id));
    return {
      title: post.title,
      description: post.body.substring(0, 160) + '...',
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

  return (
    <Suspense fallback={<PostDetailSkeleton />}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": `Blog Post ${postId}`,
            "url": `https://dummyjson.com/posts/${postId}`,
          })
        }}
      />
      <PostDetailClient id={postId} />
    </Suspense>
  );
}
