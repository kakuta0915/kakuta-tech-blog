import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import TopButton from '.'

describe('TopButton コンポーネント', () => {
  beforeEach(() => {
    window.scrollTo = jest.fn()
    document.documentElement.scrollTop = 0
  })

  it('初期表示では非表示クラスのまま', () => {
    const { container } = render(<TopButton threshold={100} />)
    const root = container.firstChild as HTMLElement
    expect(root).toHaveClass('root')
    expect(root).not.toHaveClass('visible')
  })

  it('閾値を超えると表示クラスが付与される', () => {
    const { container } = render(<TopButton threshold={100} />)
    const root = container.firstChild as HTMLElement

    document.documentElement.scrollTop = 200
    window.dispatchEvent(new Event('scroll'))

    expect(root).toHaveClass('visible')
  })

  it('クリックで window.scrollTo が呼ばれる', async () => {
    render(<TopButton threshold={0} />)
    const button = screen.getByRole('button', { name: 'Back to top' })

    await userEvent.click(button)

    expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' })
  })

  it('アイコンとラベルが表示される', () => {
    render(<TopButton threshold={0} />)
    expect(screen.getByText('TOP')).toBeInTheDocument()
    expect(screen.getByTestId('top-icon')).toBeInTheDocument()
  })
})
