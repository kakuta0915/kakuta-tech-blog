// eslint-disable-next-line import/no-anonymous-default-export
export default {
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js', 'dotenv/config'],
  moduleNameMapper: {
    '^@/src/(.*)$': '<rootDir>/src/$1',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/src/__mocks__/fileMock.js',
    '^next/image$': '<rootDir>/src/__mocks__/next/image.js',
  },
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
}
