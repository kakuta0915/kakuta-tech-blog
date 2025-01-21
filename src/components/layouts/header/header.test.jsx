import { render, screen } from '@testing-library/react'
import Header from './header'

describe('Header Component', () => {
  it('Logoコンポーネントを含んでいるか', () => {
    render(<Header />)
    const logoElement = screen.getByTestId('logo')
    expect(logoElement).toBeInTheDocument()
  })

  it('Navコンポーネントを含んでいるか', () => {
    render(<Header />)
    const navElement = screen.getByTestId('nav')
    expect(navElement).toBeInTheDocument()
  })
})
