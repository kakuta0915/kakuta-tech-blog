// eslint-disable-next-line import/no-anonymous-default-export
module.exports = {
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js', 'dotenv/config'],
  moduleNameMapper: {
    '^@/src/(.*)$': '<rootDir>/src/$1',
    '^@/(.*)$': '<rootDir>/$1',
    '\\.module\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/src/__mocks__/fileMock.js',
    '^next/image$': '<rootDir>/src/__mocks__/next/image.js',
  },
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest', // Babel を使って変換
  },
  transformIgnorePatterns: [
    '/node_modules/(?!(@react|react-dom)/)', // 必要に応じて追加
  ],
}
