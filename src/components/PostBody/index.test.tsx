import React from 'react'
import { render } from '@testing-library/react'
import PostBody from '.'
import styles from './index.module.css'

// CSSモジュールのスタイルをモック
jest.mock('./postBody.module.css', () => ({
  stack: 'stack',
}))

describe('PostBody', () => {
  it('子要素を正しくレンダリングするか確認', () => {
    const { getByText } = render(<PostBody>Test content</PostBody>)
    expect(getByText('Test content')).toBeInTheDocument()
  })

  it('正しいクラス名が適応されているか確認', () => {
    const { container } = render(<PostBody>Test content</PostBody>)
    expect(container.firstChild).toHaveClass(styles['stack'])
  })
})
