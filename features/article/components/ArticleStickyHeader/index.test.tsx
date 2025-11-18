import { render, screen, fireEvent } from '@testing-library/react'
import ArticleStickyHeader, { TocItem } from '.'

beforeAll(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  })
})

jest.mock('@/components/ui/Nav', () => ({
  __esModule: true,
  default: () => <div data-testid="nav">Navモック</div>,
}))

jest.mock('@/features/article/components', () => ({
  __esModule: true,
  TableOfContents: ({ toc }: { toc: TocItem[] }) => (
    <div data-testid="toc">目次コンポーネント {toc.length} 件</div>
  ),
}))

const mockSetTheme = jest.fn()
jest.mock('next-themes', () => ({
  useTheme: () => ({ theme: 'light', setTheme: mockSetTheme }),
}))

describe('ArticleStickyHeader コンポーネント', () => {
  const mockToc: TocItem[] = [
    { id: 'section1', text: 'セクション1' },
    { id: 'section2', text: 'セクション2' },
  ]

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('Nav が表示される', () => {
    render(<ArticleStickyHeader />)
    expect(screen.getByTestId('nav')).toBeInTheDocument()
  })

  test('テーマ切替ボタンを押すと setTheme が呼ばれる', () => {
    render(<ArticleStickyHeader />)
    const button = screen.getByRole('button', { name: /テーマ切り替え/i })
    fireEvent.click(button)
    expect(mockSetTheme).toHaveBeenCalledWith('dark')
  })

  test('目次がない場合は目次ボタンが表示されない', () => {
    render(<ArticleStickyHeader />)
    expect(screen.queryByText('目次')).toBeNull()
  })

  test('目次がある場合、目次ボタンを押すと目次が表示される', () => {
    render(<ArticleStickyHeader toc={mockToc} />)
    const tocButton = screen.getByText('目次')
    expect(screen.queryByTestId('toc')).toBeNull() // 初期状態では非表示

    fireEvent.click(tocButton)
    expect(screen.getByTestId('toc')).toBeInTheDocument()
  })

  test('目次外クリックで目次が閉じる', () => {
    render(<ArticleStickyHeader toc={mockToc} />)
    const tocButton = screen.getByText('目次')
    fireEvent.click(tocButton)
    expect(screen.getByTestId('toc')).toBeInTheDocument()

    fireEvent.mouseDown(document.body)
    expect(screen.queryByTestId('toc')).toBeNull()
  })
})
