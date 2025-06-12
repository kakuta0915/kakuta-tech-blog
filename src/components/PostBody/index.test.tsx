import { render } from '@testing-library/react'
import PostBody from '.'

describe('PostBody', () => {
  it('子要素を正しくレンダリングするか確認', () => {
    const { getByText } = render(<PostBody>Test content</PostBody>)
    expect(getByText('Test content')).toBeInTheDocument()
  })
})
