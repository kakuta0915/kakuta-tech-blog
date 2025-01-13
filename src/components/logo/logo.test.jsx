import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Logo from './logo'

// next/linkをモック
jest.mock('next/link', () => ({ children, ...props }) => (
  <a {...props}>{children}</a>
))

// next/imageをモック
jest.mock('next/image', () => (props) => <img {...props} />)

describe('Logo Component', () => {
  test('デフォルトでヘッダーロゴが表示される', () => {
    render(<Logo />)

    // Link要素が正しいhref属性を持つことを確認
    const logo = screen.getByTestId('logo')
    expect(logo).toHaveAttribute('href', '/')

    // headerLogoが表示されていることを確認
    const logoImage = screen.getByAltText('Logo Image')
    expect(logoImage).toHaveAttribute('src', 'test-file-stub')
  })

  test('isFooterLogoがtrueの場合、フッターロゴが表示される', () => {
    render(<Logo isFooterLogo={true} />)

    // Link要素が正しいhref属性を持つことを確認
    const logo = screen.getByTestId('logo')
    expect(logo).toHaveAttribute('href', '/')

    // footerLogoが表示されていることを確認
    const logoImage = screen.getByAltText('Logo Image')
    expect(logoImage).toHaveAttribute('src', 'test-file-stub')
  })
})
