import { render, screen } from '@testing-library/react'
import Header from './'

describe('Headerコンポーネント', () => {
  it('Logoコンポーネントがレンダリングされているか', () => {
    render(<Header />)
    expect(screen.getByAltText('Logo Image')).toBeInTheDocument()
  })

  it('Navコンポーネントがレンダリングされているか', () => {
    render(<Header />)
    expect(screen.getByRole('navigation')).toBeInTheDocument()
  })
})
