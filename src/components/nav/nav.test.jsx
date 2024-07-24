import { render, screen, fireEvent } from '@testing-library/react'
import Nav from './nav'

// 最初にナビゲーションが閉じていることを確認
test('renders nav component with closed state initially', () => {
  render(<Nav />)
  const nav = screen.getByTestId('nav')
  expect(nav).toBeInTheDocument()
  expect(nav).toHaveClass('close')
})

// ボタンがクリックされたときにナビゲーションが開くことを確認
test('opens nav menu when button is clicked', () => {
  render(<Nav />)
  const button = screen.getByRole('button')
  fireEvent.click(button)
  const nav = screen.getByTestId('nav')
  expect(nav).toHaveClass('open')
})

// リンクがクリックされたときにナビゲーションが閉じることを確認
test('closes nav menu when a link is clicked', () => {
  render(<Nav />)
  const button = screen.getByRole('button')
  fireEvent.click(button)
  const link = screen.getByText('ABOUT')
  fireEvent.click(link)
  const nav = screen.getByTestId('nav')
  expect(nav).toHaveClass('close')
})
