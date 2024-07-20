import { render, screen } from '@testing-library/react'
import Footer from './Footer'
import '@testing-library/jest-dom'

describe('Footer component', () => {
  // Logoコンポーネントがレンダリングされるかをテスト
  it('renders the Logo component', () => {
    render(<Footer />)
    const logoElement = screen.getByRole('img', { name: /logo/i })
    expect(logoElement).toBeInTheDocument()
  })

  // Socialコンポーネントがレンダリングされるかをテスト
  it('renders the Social component', () => {
    render(<Footer />)
    const socialElement = screen.getByTestId('social')
    expect(socialElement).toBeInTheDocument()
  })
})
