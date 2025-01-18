import React from 'react'
import { render } from '@testing-library/react'
import Container from './container'
import styles from './container.module.css'

describe('Container Component', () => {
  it('デフォルトのスタイルが適応されている', () => {
    const { container } = render(<Container>Content</Container>)
    const div = container.firstChild

    // クラス名の確認
    expect(div).toHaveClass(styles.container)
  })
})
