import { render, screen } from '@testing-library/react'
import PortfolioList from '.'
import { portfolioData } from '@/src/__mocks__/portfolioData'

test('portfolioDataが正しく表示される', () => {
  render(<PortfolioList portfolioData={portfolioData} className={''} />)

  portfolioData.forEach((portfolio) => {
    const titleElement = screen.getByText(portfolio.title)
    expect(titleElement).toBeInTheDocument()

    const descriptionElement = screen.getByText(portfolio.description)
    expect(descriptionElement).toBeInTheDocument()

    const linkElement = screen.getByText(portfolio.title).closest('a')
    expect(linkElement).toHaveAttribute('href', portfolio.link)

    const imageElement = screen.getByAltText(portfolio.title)
    expect(imageElement).toBeInTheDocument()
  })
})
