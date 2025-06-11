import React from 'react'
import { useAuthState as useAuthStateOriginal } from 'react-firebase-hooks/auth'
import { render, screen } from '@testing-library/react'
import AuthService from './AuthService'

jest.mock('react-firebase-hooks/auth', () => ({
  useAuthState: jest.fn(),
}))

jest.mock('@/firebaseConfig', () => ({
  auth: {},
}))

// 型アサーションしてモック関数として扱う
const useAuthState = useAuthStateOriginal as jest.Mock

describe('AuthService Component', () => {
  it('ユーザーが認証されていない場合、SignInWithGoogleをレンダリングする', () => {
    useAuthState.mockReturnValue([null])
    render(<AuthService />)

    expect(screen.getByText('Log in')).toBeInTheDocument()
  })

  it('ユーザーが認証されている場合、UserInfoをレンダリングする', () => {
    useAuthState.mockReturnValue([
      {
        uid: '123',
        displayName: 'Test User',
        photoURL: 'https://example.com/user-icon.png',
      },
    ])

    render(<AuthService />)

    const userIcon = screen.getByAltText('User Icon')
    expect(userIcon).toBeInTheDocument()
  })
})
