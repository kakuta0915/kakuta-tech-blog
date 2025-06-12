import { auth } from '@/firebaseConfig'
import '@testing-library/jest-dom'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { user } from '@/src/__mocks__/user'
import userEvent from '@testing-library/user-event'
import UserInfo from '.'

jest.mock('@/firebaseConfig')

describe('UserInfo Component', () => {
  test('ユーザーがログインしていない場合、ログインを促すメッセージが表示されること', () => {
    render(<UserInfo user={null} />)

    expect(screen.getByText('ログインしてください。')).toBeInTheDocument()
  })

  test('ユーザーがログインしている場合、アイコンが表示されること', () => {
    render(<UserInfo user={user} />)

    const userIcon = screen.getByAltText('User Icon')
    expect(userIcon).toBeInTheDocument()
  })

  test('アイコンをクリックするとドロップダウンメニューが表示されること', async () => {
    render(<UserInfo user={user} />)

    const userIcon = screen.getByAltText('User Icon')
    fireEvent.click(userIcon)

    await waitFor(() => {
      expect(screen.getByText('マイページ')).toBeInTheDocument()
      expect(screen.getByText('アカウント設定')).toBeInTheDocument()
      expect(screen.getByText('ログアウト')).toBeInTheDocument()
    })
  })

  test('ドロップダウンメニューのリンクをクリックすると、メニューが閉じること', async () => {
    render(<UserInfo user={user} />)

    const userIcon = screen.getByAltText('User Icon')
    fireEvent.click(userIcon)

    const myPageLink = screen.getByText('マイページ')
    fireEvent.click(myPageLink)

    await waitFor(() => {
      expect(screen.queryByText('マイページ')).not.toBeInTheDocument()
    })
  })

  test('外部クリックでドロップダウンメニューが閉じること', async () => {
    render(<UserInfo user={user} />)

    const userIcon = screen.getByAltText('User Icon')
    userEvent.click(userIcon)

    const outsideElement = document.createElement('div')
    document.body.appendChild(outsideElement)
    userEvent.click(outsideElement)

    await waitFor(() => {
      expect(screen.queryByText('マイページ')).not.toBeInTheDocument()
    })
  })

  test('ログアウトボタンをクリックすると、signOutが呼び出され、メニューが閉じること', async () => {
    render(<UserInfo user={user} />)

    const userIcon = screen.getByAltText('User Icon')
    fireEvent.click(userIcon)

    const signOutButton = screen.getByText('ログアウト')
    fireEvent.click(signOutButton)

    expect(auth.signOut).toHaveBeenCalledTimes(1)
    await waitFor(() => {
      expect(screen.queryByText('ログアウト')).not.toBeInTheDocument()
    })
  })
})
