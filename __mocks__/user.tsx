import type { User } from 'firebase/auth'

export const user = {
  uid: '123',
  email: 'test@example.com',
  emailVerified: true,
  isAnonymous: false,
  metadata: {},
  providerData: [],
  phoneNumber: null,
  displayName: 'テストユーザー',
  photoURL: 'https://example.com/user.jpg',
  delete: jest.fn(),
  getIdToken: jest.fn(),
  getIdTokenResult: jest.fn(),
  reload: jest.fn(),
  toJSON: jest.fn(),
} as unknown as User
