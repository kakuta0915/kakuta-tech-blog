import { render, screen, fireEvent } from '@testing-library/react'
import StickyHeader, { TocItem } from '.'
import '@testing-library/jest-dom'

// matchMedia モック
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

// コンポーネントモック
jest.mock('@/components/ui/Nav', () => ({
  __esModule: true,
  default: () => <div>Navコンポーネント</div>,
}))

jest.mock('@/features/article/components', () => ({
  __esModule: true,
  TableOfContents: ({ toc }: { toc: TocItem[] }) => (
    <div>{`目次コンポーネント ${toc.length} 件`}</div>
  ),
}))

const mockSetTheme = jest.fn()
jest.mock('next-themes', () => ({
  useTheme: () => ({
    theme: 'light',
    setTheme: mockSetTheme,
  }),
}))

describe('StickyHeader コンポーネント', () => {
  const mockToc: TocItem[] = [
    { id: 'section1', text: 'セクション1' },
    { id: 'section2', text: 'セクション2' },
  ]

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('Nav が表示される', () => {
    render(<StickyHeader />)
    expect(screen.getByText('Navコンポーネント')).toBeInTheDocument()
  })

  test('テーマ切替ボタンを押すと setTheme が呼ばれる', () => {
    render(<StickyHeader />)
    const btn = screen.getByRole('button', { name: /テーマ切り替え/i })
    fireEvent.click(btn)
    expect(mockSetTheme).toHaveBeenCalledWith('dark')
  })

  test('目次がない場合、目次ボタンは表示されない', () => {
    render(<StickyHeader />)
    expect(screen.queryByText('目次')).toBeNull()
  })

  test('目次がある場合、目次ボタンをクリックすると目次が表示される', () => {
    render(<StickyHeader toc={mockToc} />)

    const tocButton = screen.getByText('目次')
    expect(screen.queryByText(/目次コンポーネント/)).toBeNull()

    fireEvent.click(tocButton)
    expect(screen.getByText('目次コンポーネント 2 件')).toBeInTheDocument()
  })

  test('目次外クリックで目次が閉じる', () => {
    render(<StickyHeader toc={mockToc} />)

    const tocButton = screen.getByText('目次')
    fireEvent.click(tocButton)
    expect(screen.getByText('目次コンポーネント 2 件')).toBeInTheDocument()

    fireEvent.mouseDown(document.body)
    expect(screen.queryByText(/目次コンポーネント/)).toBeNull()
  })
})
