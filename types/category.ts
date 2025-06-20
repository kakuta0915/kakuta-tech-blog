export type Category = {
  name: string
  slug: string
  icon: {
    url: string
    width: number
    height: number
  }
}

export type CategoriesListProps = {
  allCategories: Category[]
}
