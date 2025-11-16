import { render, screen } from '@testing-library/react'
import Header from './index'

describe('Headerコンポーネント', () => {
  it('ヘッダーのテキストが表示される', () => {
    render(<Header />)
    const heading = screen.getByRole('heading', { name: /KAKUTA TECH BLOG/i })
    expect(heading).toBeInTheDocument()
  })

  it('正しいCSSクラスが適用されている', () => {
    render(<Header />)
    const headerElement = screen.getByRole('banner')
    expect(headerElement).toHaveClass('header')
  })
})
