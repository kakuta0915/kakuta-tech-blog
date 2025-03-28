import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '@/firebaseConfig'
import { render, screen } from '@testing-library/react'
import AuthService from './AuthService1'

jest.mock('react-firebase-hooks/auth', () => ({
  useAuthState: jest.fn(),
}))

jest.mock('@/firebaseConfig', () => ({
  auth: {},
}))

describe('AuthService Component', () => {
  it('ユーザーが認証されていない場合、SignInWithGoogleをレンダリングする', () => {
    // ユーザーが未認証の場合のモック
    useAuthState.mockReturnValue([null])
    render(<AuthService />)

    expect(screen.getByText('Log in')).toBeInTheDocument()
  })

  it('ユーザーが認証されている場合、UserInfoをレンダリングする', () => {
    // ユーザーが認証されている場合のモック
    useAuthState.mockReturnValue([{}])

    render(<AuthService />)

    const userIcon = screen.getByAltText('User Icon')
    expect(userIcon).toBeInTheDocument()
  })
})
