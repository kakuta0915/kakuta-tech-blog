import { render, screen } from '@testing-library/react'
import TableOfContents from '.'

const mockToc = [
  { id: 'section1', text: 'Section 1' },
  { id: 'section2', text: 'Section 2' },
]

test('目次が正しく表示されるか確認', () => {
  render(<TableOfContents toc={mockToc} />)

  // 目次のタイトルが表示されているか確認
  expect(screen.getByText('目次')).toBeInTheDocument()

  // 各項目が表示されているか確認
  mockToc.forEach(({ id, text }) => {
    const listItem = screen.getByText(text)
    expect(listItem).toBeInTheDocument()

    // data-testid属性を使ってスクロールリンクを確認する
    const link = screen.getByTestId(`scroll-link-${id}`)
    expect(link).toBeInTheDocument()
    expect(link).toHaveTextContent(text)
  })
})
