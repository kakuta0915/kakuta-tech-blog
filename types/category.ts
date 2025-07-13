export type Category = {
  id(id: any): import('./post').Posts[] | PromiseLike<import('./post').Posts[]>
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
