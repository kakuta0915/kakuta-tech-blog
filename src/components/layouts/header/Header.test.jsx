import { render, screen } from '@testing-library/react'
import Header from './Header'

describe('Header component', () => {
  // Logoコンポーネントを含んでいるかをテスト
  it('renders the Logo component', () => {
    render(<Header />)
    const logoElement = screen.getByTestId('logo')
    expect(logoElement).toBeInTheDocument()
  })

  // Navコンポーネントを含んでいるかをテスト
  it('renders the Nav component', () => {
    render(<Header />)
    const navElement = screen.getByTestId('nav')
    expect(navElement).toBeInTheDocument()
  })
})
