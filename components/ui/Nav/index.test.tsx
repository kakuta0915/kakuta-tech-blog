import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Nav from '.'

describe('Nav Component', () => {
  test('ナビタグが正しくレンダリングされる', () => {
    render(<Nav />)

    const nav = screen.getByTestId('nav')
    expect(nav).toBeInTheDocument()

    const links = screen.getAllByRole('link')
    expect(links).toHaveLength(5)

    expect(links[0]).toHaveAttribute('href', '/')
    expect(links[0]).toHaveTextContent('TOP')

    expect(links[1]).toHaveAttribute('href', '/about/')
    expect(links[1]).toHaveTextContent('ABOUT')

    expect(links[3]).toHaveAttribute('href', '/articles/')
    expect(links[3]).toHaveTextContent('ARTICLES')
  })
})
