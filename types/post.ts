type Category = {
  name: string
  slug: string
}

export type Posts = {
  title: string
  slug: string
  eyecatch: { url: string }
  publishDate: string
  categories: Category[]
  source: string
  likesCount: number
  bookmarksCount: number
}

export type PostsProps = {
  className?: string
  btn?: boolean
  posts: Posts[]
  maxPosts?: number
}
