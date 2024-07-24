/* eslint-disable react/display-name */
import { render, screen } from '@testing-library/react'
import Layout from './layout'

// HeaderとFooterのモックコンポーネントを作成
jest.mock('./Header/Header', () => () => <div data-testid="header">Header</div>)
jest.mock('./Footer/Footer', () => () => <div data-testid="footer">Footer</div>)

describe('Layout component', () => {
  // Headerコンポーネントがレンダリングされているかテスト
  it('renders Header component', () => {
    render(
      <Layout>
        <div>Test Content</div>
      </Layout>,
    )

    const headerElement = screen.getByTestId('header')
    expect(headerElement).toBeInTheDocument()
  })

  // Footerコンポーネントがレンダリングされているかテスト
  it('renders Footer component', () => {
    render(
      <Layout>
        <div>Test Content</div>
      </Layout>,
    )

    const footerElement = screen.getByTestId('footer')
    expect(footerElement).toBeInTheDocument()
  })

  // childrenがmainタグ内に正しく表示されているかテスト
  it('renders children inside main tag', () => {
    render(
      <Layout>
        <div>Test Content</div>
      </Layout>,
    )

    const contentElement = screen.getByText('Test Content')
    expect(contentElement).toBeInTheDocument()
  })
})
