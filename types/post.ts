type Category = {
  name: string
  slug: string
  icon?: {
    url: string
    width: number
    height: number
  }
}

export type Posts = {
  title: string
  slug: string
  eyecatch: { url: string }
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
