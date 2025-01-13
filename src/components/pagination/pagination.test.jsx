import { render, screen } from '@testing-library/react'
import Pagination from './pagination'

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
    expect(screen.getByTestId('icon-left')).toBeInTheDocument()

    const nextLink = screen.getByText('Next')
    expect(nextLink).toBeInTheDocument()
    expect(nextLink.closest('a')).toHaveAttribute('href', '/next')
    expect(screen.getByTestId('icon-right')).toBeInTheDocument()
  })

  test('前のリンクが提供されていない場合に表示されないことを確認', () => {
    render(<Pagination nextText="Next" nextUrl="/next" />)

    const prevLink = screen.queryByText('Previous')
    expect(prevLink).toBeNull()
    expect(screen.queryByTestId('icon-left')).toBeNull()

    const nextLink = screen.getByText('Next')
    expect(nextLink).toBeInTheDocument()
    expect(nextLink.closest('a')).toHaveAttribute('href', '/next')
    expect(screen.getByTestId('icon-right')).toBeInTheDocument()
  })

  test('次のリンクが提供されていない場合に表示されないことを確認', () => {
    render(<Pagination prevText="Previous" prevUrl="/previous" />)

    const prevLink = screen.getByText('Previous')
    expect(prevLink).toBeInTheDocument()
    expect(prevLink.closest('a')).toHaveAttribute('href', '/previous')
    expect(screen.getByTestId('icon-left')).toBeInTheDocument()

    const nextLink = screen.queryByText('Next')
    expect(nextLink).toBeNull()
    expect(screen.queryByTestId('icon-right')).toBeNull()
  })
})
