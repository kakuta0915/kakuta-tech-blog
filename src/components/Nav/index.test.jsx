import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Nav from '.'

// eslint-disable-next-line react/display-name
jest.mock('next/link', () => ({ children, ...props }) => (
  <a {...props}>{children}</a>
))

describe('Nav Component', () => {
  test('ナビタグが正しくレンダリングされる', () => {
    render(<Nav />)

    // ナビタグが存在するか確認
    const nav = screen.getByTestId('nav')
    expect(nav).toBeInTheDocument()

    // 各リンクが正しく表示されているか確認
    const links = screen.getAllByRole('link')
    expect(links).toHaveLength(5)

    // リンクのURLとテキストが正しいか確認
    expect(links[0]).toHaveAttribute('href', '/')
    expect(links[0]).toHaveTextContent('TOP')

    expect(links[1]).toHaveAttribute('href', '/about/')
    expect(links[1]).toHaveTextContent('ABOUT')

    expect(links[2]).toHaveAttribute('href', '/portfolio/')
    expect(links[2]).toHaveTextContent('PORTFOLIO')

    expect(links[3]).toHaveAttribute('href', '/articles/')
    expect(links[3]).toHaveTextContent('ARTICLES')

    expect(links[4]).toHaveAttribute('href', '/contact/')
    expect(links[4]).toHaveTextContent('CONTACT')
  })
})
