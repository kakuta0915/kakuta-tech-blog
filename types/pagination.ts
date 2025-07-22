export type PaginationProps = {
  prevText?: string
  prevUrl?: string
  nextText?: string
  nextUrl?: string
  totalPages?: number
  currentPage?: number
  createPageLink?: (page: number) => string
}
