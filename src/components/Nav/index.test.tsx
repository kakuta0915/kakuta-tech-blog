import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Nav from '.'
import { ReactNode } from 'react'

jest.mock('next/link', () => {
  return function MockLink({
    children,
    href,
  }: {
    children: ReactNode
    href: string
  }) {
    return <a href={href}>{children}</a>
  }
})

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

    expect(links[2]).toHaveAttribute('href', '/portfolio/')
    expect(links[2]).toHaveTextContent('PORTFOLIO')

    expect(links[3]).toHaveAttribute('href', '/articles/')
    expect(links[3]).toHaveTextContent('ARTICLES')

    expect(links[4]).toHaveAttribute('href', '/contact/')
    expect(links[4]).toHaveTextContent('CONTACT')
  })
})
