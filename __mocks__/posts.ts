import { mockCategories } from './categories'
import { PostsProps } from '@/types/posts'

export const mockPosts: PostsProps = {
  posts: [
    {
      title: 'Post Title 1',
      slug: 'post-title-1',
      eyecatch: {
        url: '/images/post1.png',
        width: undefined,
        height: undefined,
      },
      publishDate: '2024-07-23T00:00:00Z',
      categories: [mockCategories[0]!],
      source: 'local',
      content: '記事の内容1',
      category: 'Tech',
    },
    {
      title: 'Post Title 2',
      slug: 'post-title-2',
      eyecatch: {
        url: '/images/post2.png',
        width: undefined,
        height: undefined,
      },
      publishDate: '2024-07-24T00:00:00Z',
      categories: [mockCategories[1]!],
      source: 'qiita',
      content: '記事の内容2',
      category: 'Lifestyle',
    },
  ],
  showMoreButton: false,
  maxPosts: 2,
}
