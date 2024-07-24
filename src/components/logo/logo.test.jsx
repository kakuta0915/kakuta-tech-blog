import { render, screen } from '@testing-library/react'
import Logo from './logo'

// ヘッダーロゴのテスト
test('renders header logo', () => {
  render(<Logo isFooterLogo={false} />)
  const logo = screen.getByTestId('logo')
  expect(logo).toBeInTheDocument()
  expect(logo).toHaveClass('headerLogo')
  expect(logo).not.toHaveClass('footerLogo')
  const image = screen.getByAltText('Logo Image')
  expect(image).toBeInTheDocument()
})

// フッターロゴのテスト
test('renders footer logo', () => {
  render(<Logo isFooterLogo={true} />)
  const logo = screen.getByTestId('logo')
  expect(logo).toBeInTheDocument()
  expect(logo).toHaveClass('footerLogo')
  expect(logo).not.toHaveClass('headerLogo')
  const image = screen.getByAltText('Logo Image')
  expect(image).toBeInTheDocument()
})
