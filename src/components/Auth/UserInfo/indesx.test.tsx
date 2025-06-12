import { auth } from '@/firebaseConfig'
import type { User } from 'firebase/auth'
import '@testing-library/jest-dom'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import UserInfo from '.'

jest.mock('@/firebaseConfig', () => ({
  auth: {
    signOut: jest.fn(),
  },
}))

describe('UserInfo Component', () => {
  const mockUser = {
    uid: '123',
    email: 'test@example.com',
    emailVerified: true,
    isAnonymous: false,
    metadata: {},
    providerData: [],
    phoneNumber: null,
    displayName: 'テストユーザー',
    photoURL: 'https://example.com/user.jpg',
    // 使っていないけど必要なメソッドのモック
    delete: jest.fn(),
    getIdToken: jest.fn(),
    getIdTokenResult: jest.fn(),
    reload: jest.fn(),
    toJSON: jest.fn(),
  } as unknown as User

  test('ユーザーがログインしていない場合、ログインを促すメッセージが表示されること', () => {
    render(<UserInfo user={null} />)

    expect(screen.getByText('ログインしてください。')).toBeInTheDocument()
  })

  test('ユーザーがログインしている場合、アイコンが表示されること', () => {
    render(<UserInfo user={mockUser} />)

    const userIcon = screen.getByAltText('User Icon')
    expect(userIcon).toBeInTheDocument()
  })

  test('アイコンをクリックするとドロップダウンメニューが表示されること', async () => {
    render(<UserInfo user={mockUser} />)

    const userIcon = screen.getByAltText('User Icon')
    fireEvent.click(userIcon)

    await waitFor(() => {
      expect(screen.getByText('マイページ')).toBeInTheDocument()
      expect(screen.getByText('アカウント設定')).toBeInTheDocument()
      expect(screen.getByText('ログアウト')).toBeInTheDocument()
    })
  })

  test('ドロップダウンメニューのリンクをクリックすると、メニューが閉じること', async () => {
    render(<UserInfo user={mockUser} />)

    const userIcon = screen.getByAltText('User Icon')
    fireEvent.click(userIcon)

    const myPageLink = screen.getByText('マイページ')
    fireEvent.click(myPageLink)

    await waitFor(() => {
      expect(screen.queryByText('マイページ')).not.toBeInTheDocument()
    })
  })

  test('外部クリックでドロップダウンメニューが閉じること', async () => {
    render(<UserInfo user={mockUser} />)

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
    render(<UserInfo user={mockUser} />)

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
