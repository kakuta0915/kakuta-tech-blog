// PostBody.test.js
import React from 'react'
import { render } from '@testing-library/react'
import PostBody from './postBody'
import styles from './postBody.module.css'

// モックスタイルの適用を確認するために、CSSモジュールのスタイルをモック
jest.mock('./postBody.module.css', () => ({
  stack: 'stack',
}))

// PostBodyコンポーネントが正しく子要素をレンダリングすることを確認
describe('PostBody', () => {
  it('renders children correctly', () => {
    const { getByText } = render(<PostBody>Test content</PostBody>)
    expect(getByText('Test content')).toBeInTheDocument()
  })

  // PostBodyコンポーネントに正しいクラス名が適用されていることを確認
  it('applies the correct className', () => {
    const { container } = render(<PostBody>Test content</PostBody>)
    expect(container.firstChild).toHaveClass(styles.stack)
  })
})
