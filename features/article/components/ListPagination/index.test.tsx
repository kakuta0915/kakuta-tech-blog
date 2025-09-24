import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import ListPagination from './index'

const createPageLink = (page: number) => `/articles?page=${page}`

describe('ListPagination', () => {
  it('ページ数が1以下の場合はレンダリングされない', () => {
    const { container } = render(
      <ListPagination
        pageCount={1}
        currentPage={1}
        createPageLink={createPageLink}
      />,
    )
    expect(container.firstChild).toBeNull()
  })

  it('複数ページがある場合、すべてのページ番号が表示される', () => {
    render(
      <ListPagination
        pageCount={3}
        currentPage={1}
        createPageLink={createPageLink}
      />,
    )

    // ページ番号が表示される
    expect(screen.getByText('1')).toBeInTheDocument()
    expect(screen.getByText('2')).toBeInTheDocument()
    expect(screen.getByText('3')).toBeInTheDocument()
  })

  it('現在のページは <span> として表示される', () => {
    render(
      <ListPagination
        pageCount={3}
        currentPage={2}
        createPageLink={createPageLink}
      />,
    )

    const current = screen.getByText('2')
    expect(current.tagName).toBe('SPAN')
    expect(current).toHaveClass('current')
  })

  it('現在のページ以外は Link として表示される', () => {
    render(
      <ListPagination
        pageCount={3}
        currentPage={2}
        createPageLink={createPageLink}
      />,
    )

    const link1 = screen.getByText('1').closest('a')
    const link3 = screen.getByText('3').closest('a')

    expect(link1).toHaveAttribute('href', '/articles?page=1')
    expect(link3).toHaveAttribute('href', '/articles?page=3')
  })
})
