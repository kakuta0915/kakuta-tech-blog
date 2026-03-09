import { Category } from '@/types/category'
import { MicroCMSQuestion } from '@/types/microcms-question'

export type Posts = {
  questions: MicroCMSQuestion[]
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
