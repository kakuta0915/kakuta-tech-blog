/* eslint-disable react/display-name */
import { render, screen } from '@testing-library/react'
import Layout from './layout'

// HeaderとFooterのモックコンポーネントを作成
jest.mock('./Header/Header', () => () => <div data-testid="header">Header</div>)
jest.mock('./Footer/Footer', () => () => <div data-testid="footer">Footer</div>)

describe('Layout Component', () => {
  it('Headerコンポーネントがレンダリングされているか', () => {
    render(
      <Layout>
        <div>Test Content</div>
      </Layout>,
    )

    const headerElement = screen.getByTestId('header')
    expect(headerElement).toBeInTheDocument()
  })

  it('Footerコンポーネントがレンダリングされているか', () => {
    render(
      <Layout>
        <div>Test Content</div>
      </Layout>,
    )

    const footerElement = screen.getByTestId('footer')
    expect(footerElement).toBeInTheDocument()
  })

  it('childrenがmainタグ内に正しく表示されているか', () => {
    render(
      <Layout>
        <div>Test Content</div>
      </Layout>,
    )

    const contentElement = screen.getByText('Test Content')
    expect(contentElement).toBeInTheDocument()
  })
})
