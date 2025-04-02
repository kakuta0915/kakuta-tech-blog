import { render, screen } from '@testing-library/react'
import PortfolioList from '.'
import { portfolioData } from '@/src/__mocks__/portfolioDataMock'

test('portfolioDataが正しく表示される', () => {
  render(<PortfolioList portfolioData={portfolioData} />)

  portfolioData.forEach((portfolio) => {
    // 各ポートフォリオのタイトルが表示されているかを確認
    const titleElement = screen.getByText(portfolio.title)
    expect(titleElement).toBeInTheDocument()

    // 各ポートフォリオの説明が表示されているかを確認
    const descriptionElement = screen.getByText(portfolio.description)
    expect(descriptionElement).toBeInTheDocument()

    // 各ポートフォリオのリンクが正しく機能しているかを確認
    const linkElement = screen.getByText(portfolio.title).closest('a')
    expect(linkElement).toHaveAttribute('href', portfolio.link)

    // 画像が正しく表示されているかを確認
    const imageElement = screen.getByAltText(portfolio.title)
    expect(imageElement).toBeInTheDocument()
  })
})
