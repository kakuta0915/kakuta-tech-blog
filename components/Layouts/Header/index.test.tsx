import { render, screen } from '@testing-library/react'
import Header from './'

jest.mock('@/features/auth/UserAuth')

describe('Headerコンポーネント', () => {
  it('Navコンポーネントがレンダリングされているか', () => {
    render(<Header />)
    expect(screen.getByRole('navigation')).toBeInTheDocument()
  })
})
