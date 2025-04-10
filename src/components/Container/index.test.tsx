import React from 'react'
import { render } from '@testing-library/react'
import Container from '.'

describe('Container Component', () => {
  it('デフォルトのスタイルが適応されている', () => {
    const { container } = render(<Container>Content</Container>)
    const div = container.firstChild

    expect(div).toHaveClass('container')
  })
})
