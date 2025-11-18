import { render, screen } from '@testing-library/react'
import Pagination from './'

describe('Pagination Component', () => {
  test('前と次のリンクが提供されている場合に表示されることを確認', () => {
    render(
      <Pagination
        prevText="Previous"
        prevUrl="/previous"
        nextText="Next"
        nextUrl="/next"
      />,
    )

    const prevLink = screen.getByText('Previous')
    expect(prevLink).toBeInTheDocument()
    expect(prevLink.closest('a')).toHaveAttribute('href', '/previous')

    const nextLink = screen.getByText('Next')
    expect(nextLink).toBeInTheDocument()
    expect(nextLink.closest('a')).toHaveAttribute('href', '/next')
  })

  test('前のリンクが提供されていない場合、表示されないことを確認', () => {
    render(<Pagination nextText="Next" nextUrl="/next" />)

    const prevLink = screen.queryByText('Previous')
    expect(prevLink).toBeNull()

    const nextLink = screen.getByText('Next')
    expect(nextLink).toBeInTheDocument()
    expect(nextLink.closest('a')).toHaveAttribute('href', '/next')
  })

  test('次のリンクが提供されていない場合、表示されないことを確認', () => {
    render(<Pagination prevText="Previous" prevUrl="/previous" />)

    const prevLink = screen.getByText('Previous')
    expect(prevLink).toBeInTheDocument()
    expect(prevLink.closest('a')).toHaveAttribute('href', '/previous')

    const nextLink = screen.queryByText('Next')
    expect(nextLink).toBeNull()
  })

  test('前後のリンクが提供されていない場合は null を返す', () => {
    const { container } = render(<Pagination />)
    expect(container.firstChild).toBeNull()
  })
})
