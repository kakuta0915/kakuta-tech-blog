import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Logo from '.'

describe('Logo Component', () => {
  test('デフォルトでヘッダーロゴが表示される', () => {
    render(<Logo />)

    const logoImage = screen.getByAltText('Logo Image')
    expect(logoImage).toHaveAttribute('src', 'test-file-stub')
  })

  test('isFooterLogoがtrueの場合、フッターロゴが表示される', () => {
    render(<Logo isFooterLogo={true} />)

    const logoImage = screen.getByAltText('Logo Image')
    expect(logoImage).toHaveAttribute('src', 'test-file-stub')
  })
})
