import { render, screen } from '@testing-library/react'
import Footer from '.'
import '@testing-library/jest-dom'

describe('Footer Component', () => {
  it('Socialコンポーネントがレンダリングされるか', () => {
    render(<Footer />)

    const socialElement = screen.getByTestId('social')
    expect(socialElement).toBeInTheDocument()
  })
})
