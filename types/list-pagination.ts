export type ListPaginationProps = {
  pageCount: number
  currentPage: number
  createPageLink: (page: number) => string
}
