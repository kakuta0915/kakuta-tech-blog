import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import StickyHeader from './'

describe('StickyHeaderコンポーネント', () => {
  it('Navコンポーネントがレンダリングされているか', () => {
    render(<StickyHeader />)
    expect(screen.getByRole('navigation')).toBeInTheDocument()
  })
})
