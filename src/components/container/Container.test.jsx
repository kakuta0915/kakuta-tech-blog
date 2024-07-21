import React from 'react'
import { render } from '@testing-library/react'
import Container from './Container'
import styles from './Container.module.css'

describe('Container component', () => {
  it('applies default styles correctly', () => {
    const { container } = render(<Container>Content</Container>)
    const div = container.firstChild

    // クラス名の確認
    expect(div).toHaveClass(styles.container)
  })
})
