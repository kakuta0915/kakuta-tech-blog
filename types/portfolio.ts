type PortfolioItem = {
  id: number
  title: string
  link: string
  imageUrl: string
  description: string
}

export type PortfolioListProps = {
  className: string
  portfolioData: PortfolioItem[]
}
