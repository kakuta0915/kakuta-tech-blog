import { render, screen } from '@testing-library/react'
import TableOfContents from '.'

const mockToc = [
  { id: 'section1', text: 'Section 1' },
  { id: 'section2', text: 'Section 2' },
]

test('目次が正しく表示されるか確認', () => {
  render(<TableOfContents toc={mockToc} />)

  mockToc.forEach(({ id, text }) => {
    const listItem = screen.getByText(text)
    expect(listItem).toBeInTheDocument()

    const link = screen.getByTestId(`scroll-link-${id}`)
    expect(link).toBeInTheDocument()
    expect(link).toHaveTextContent(text)
  })
})
