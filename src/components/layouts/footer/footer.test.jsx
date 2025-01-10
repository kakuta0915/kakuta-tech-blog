import { render, screen } from '@testing-library/react'
import Footer from './footer'
import '@testing-library/jest-dom'

describe('Footer component', () => {
  it('Logoコンポーネントがレンダリングされるか', () => {
    render(<Footer />)

    const logoElement = screen.getByRole('img', { name: /logo/i })
    expect(logoElement).toBeInTheDocument()
  })

  it('Socialコンポーネントがレンダリングされるか', () => {
    render(<Footer />)

    const socialElement = screen.getByTestId('social')
    expect(socialElement).toBeInTheDocument()
  })
})
