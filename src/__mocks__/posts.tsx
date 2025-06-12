import type { PostsProps } from '@/src/components/Posts'
import { mockCategories } from './categories'

export const mockPosts: PostsProps = {
  btn: false,
  posts: [
    {
      title: 'Post Title 1',
      slug: 'post-title-1',
      eyecatch: { url: '/images/post1.png' },
      publishDate: '2024-07-23T00:00:00Z',
      categories: [mockCategories[0]!],
      source: 'local',
      likesCount: 10,
      bookmarksCount: 5,
    },
    {
      title: 'Post Title 2',
      slug: 'post-title-2',
      eyecatch: { url: '/images/post2.png' },
      publishDate: '2024-07-24T00:00:00Z',
      categories: [mockCategories[1]!],
      source: 'qiita',
      likesCount: 20,
      bookmarksCount: 15,
    },
  ],
  maxPosts: 2,
}
