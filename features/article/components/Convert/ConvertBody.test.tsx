/* eslint-disable @next/next/no-img-element */
import { render } from '@testing-library/react'
import ConvertBody from './ConvertBody'

jest.mock('html-react-parser')

describe('ConvertBody Component', () => {
  it('画像タグが正しく描画されること', () => {
    const contentHTML =
      '<img src="/image.jpg" alt="Example image" width="600" height="400" />'
    const { container } = render(<ConvertBody contentHTML={contentHTML} />)
    const img = container.querySelector('img')
    expect(img).toBeInTheDocument()
    expect(img).toHaveAttribute('src', '/image.jpg')
    expect(img).toHaveAttribute('width', '600')
    expect(img).toHaveAttribute('height', '400')
  })

  it('シンタックスハイライト付きのコードブロックが正しく描画されること', () => {
    const contentHTML = '<code>const a = 1;</code>'
    const { container } = render(<ConvertBody contentHTML={contentHTML} />)
    const codeBlock = container.querySelector('code')
    expect(codeBlock).toBeInTheDocument()
    if (codeBlock) {
      expect(codeBlock).toHaveClass('hljs')
      expect(codeBlock.innerHTML).toContain('hljs-keyword')
    }
  })

  it('段落が正しく描画されること', () => {
    const contentHTML = '<p>This is a paragraph.</p>'
    const { container } = render(<ConvertBody contentHTML={contentHTML} />)
    const paragraph = container.querySelector('p')
    expect(paragraph).toBeInTheDocument()
    expect(paragraph).toHaveTextContent('This is a paragraph.')
  })
})
