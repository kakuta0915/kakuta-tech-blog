import { render, screen } from '@testing-library/react'
import Layout from '.'

jest.mock('./Header', () => {
  const MockHeader = () => <div data-testid="header">Header</div>
  MockHeader.displayName = 'MockHeader'
  return MockHeader
})

jest.mock('./Footer', () => {
  const MockFooter = () => <div data-testid="footer">Footer</div>
  MockFooter.displayName = 'MockFooter'
  return MockFooter
})

describe('Layout Component', () => {
  it('Headerコンポーネントがレンダリングされているか', () => {
    render(
      <Layout>
        <div>Test Content</div>
      </Layout>,
    )
    expect(screen.getByTestId('header')).toBeInTheDocument()
  })

  it('Footerコンポーネントがレンダリングされているか', () => {
    render(
      <Layout>
        <div>Test Content</div>
      </Layout>,
    )
    expect(screen.getByTestId('footer')).toBeInTheDocument()
  })

  it('childrenがmainタグ内に正しく表示されているか', () => {
    render(
      <Layout>
        <div>Test Content</div>
      </Layout>,
    )
    expect(screen.getByText('Test Content')).toBeInTheDocument()
  })
})
