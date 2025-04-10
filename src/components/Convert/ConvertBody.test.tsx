import { render } from '@testing-library/react'
import ConvertBody from './ConvertBody'

jest.mock('next/image', () => ({
  __esModule: true,
  default: ({
    src,
    width,
    height,
    alt,
  }: {
    src: string
    width: number
    height: number
    alt: string
  }) => <img src={src} width={width} height={height} alt={alt} />,
}))

jest.mock('html-react-parser', () => {
  return (html: string) => {
    if (html.includes('<img')) {
      return (
        <img src="/image.jpg" alt="Example image" width={600} height={400} />
      )
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
  }
})

describe('ConvertBody Component', () => {
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

  it('renders a code block correctly with syntax highlighting', () => {
    const contentHTML = '<code>const a = 1;</code>'
    const { container } = render(<ConvertBody contentHTML={contentHTML} />)
    const codeBlock = container.querySelector('code')
    expect(codeBlock).toBeInTheDocument()
    if (codeBlock) {
      expect(codeBlock).toHaveClass('hljs')
      expect(codeBlock.innerHTML).toContain('hljs-keyword')
    }
  })

  it('renders other HTML elements correctly', () => {
    const contentHTML = '<p>This is a paragraph.</p>'
    const { container } = render(<ConvertBody contentHTML={contentHTML} />)
    const paragraph = container.querySelector('p')
    expect(paragraph).toBeInTheDocument()
    expect(paragraph).toHaveTextContent('This is a paragraph.')
  })
})
