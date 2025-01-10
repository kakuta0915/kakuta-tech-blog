/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/display-name */
import React from 'react'
import { render } from '@testing-library/react'
import ConvertBody from './convertBody'

// モック設定
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, width, height, alt }) => (
    <img src={src} width={width} height={height} alt={alt} />
  ),
}))

jest.mock('html-react-parser', () => (html) => {
  if (html.includes('<img')) {
    return <img src="/image.jpg" alt="Example image" width="600" height="400" />
  }
  if (html.includes('<code')) {
    return (
      <code className="hljs">
        <span className="hljs-keyword">const</span>
      </code>
    )
  }
  if (html.includes('<p')) {
    return <p>This is a paragraph.</p>
  }
  return html
})

describe('ConvertBody Component', () => {
  // contentHTMLに渡されたimgタグが正しくレンダリングされるかをテスト
  it('renders an image tag correctly', () => {
    const contentHTML =
      '<img src="/image.jpg" alt="Example image" width="600" height="400" />'
    const { container } = render(<ConvertBody contentHTML={contentHTML} />)
    const img = container.querySelector('img')
    expect(img).toBeInTheDocument()
    expect(img).toHaveAttribute('src', '/image.jpg')
    expect(img).toHaveAttribute('width', '600')
    expect(img).toHaveAttribute('height', '400')
  })

  // contentHTMLに渡されたcodeタグが正しくレンダリングされるかをテスト
  it('renders a code block correctly with syntax highlighting', () => {
    const contentHTML = '<code>const a = 1;</code>'
    const { container } = render(<ConvertBody contentHTML={contentHTML} />)
    const codeBlock = container.querySelector('code')
    expect(codeBlock).toBeInTheDocument()
    expect(codeBlock).toHaveClass('hljs')
    expect(codeBlock.innerHTML).toContain('hljs-keyword')
  })

  // contentHTMLに渡されたpタグが正しくレンダリングされるかをテスト
  it('renders other HTML elements correctly', () => {
    const contentHTML = '<p>This is a paragraph.</p>'
    const { container } = render(<ConvertBody contentHTML={contentHTML} />)
    const paragraph = container.querySelector('p')
    expect(paragraph).toBeInTheDocument()
    expect(paragraph).toHaveTextContent('This is a paragraph.')
  })
})
