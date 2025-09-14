import { render, screen } from '@testing-library/react'
import Header from './'

describe('Headerコンポーネント', () => {
  it('Navコンポーネントがレンダリングされているか', () => {
    render(<Header />)
    expect(screen.getByRole('navigation')).toBeInTheDocument()
  })
})
