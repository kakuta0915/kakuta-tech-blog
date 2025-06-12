import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import SignInWithGoogle from '.'
import { signInWithPopup } from 'firebase/auth'
import { toast } from 'react-toastify'

jest.mock('firebase/auth', () => require('@/src/__mocks__/firebase-auth'))
jest.mock('react-toastify', () => require('@/src/__mocks__/react-toastify'))

describe('SignInWithGoogle', () => {
  it('ログインボタンが表示される', () => {
    render(<SignInWithGoogle />)
    expect(screen.getByText('Log in')).toBeInTheDocument()
  })

  it('ポップアップが開閉する', () => {
    render(<SignInWithGoogle />)

    fireEvent.click(screen.getByText('Log in'))
    expect(screen.getByText('KAKUTA TECH BLOG')).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: /close/i }))
    expect(screen.queryByText('KAKUTA TECH BLOG')).not.toBeInTheDocument()
  })

  it('Googleでログインボタンがクリックされたときに `signInWithPopup` が呼び出される', async () => {
    render(<SignInWithGoogle />)

    fireEvent.click(screen.getByText('Log in'))
    fireEvent.click(screen.getByText('Googleでログイン'))

    expect(signInWithPopup).toHaveBeenCalled()

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith('ログインしました')
    })
  })

  it('ログインエラー時にエラーメッセージが表示される', async () => {
    ;(signInWithPopup as jest.Mock).mockRejectedValue(new Error('テストエラー'))

    render(<SignInWithGoogle />)

    fireEvent.click(screen.getByText('Log in'))
    fireEvent.click(screen.getByText('Googleでログイン'))

    await waitFor(() => {
      expect(
        screen.getByText(/エラーが発生しました。もう一度やり直してください。/),
      ).toBeInTheDocument()
    })

    expect(toast.error).toHaveBeenCalledWith('ログインに失敗しました')
  })
})
