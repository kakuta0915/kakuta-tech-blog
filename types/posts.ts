import { Category } from '@/types/category'

export type Posts = {
  content: string
  category: string
  title: string
  slug: string
  eyecatch: {
    height: number | undefined
    width: number | undefined
    url: string
  }
  publishDate: string
  categories: Category[]
  source: string
}

export type PostsProps = {
  className?: string
  showMoreButton?: boolean
  posts: Posts[]
  maxPosts?: number
}
