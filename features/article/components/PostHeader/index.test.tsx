import React from 'react'
import { render, screen } from '@testing-library/react'
import PostHeader from '.'
import { mockPostHeader } from '@/__mocks__/post-header'
import styles from './index.module.css'

describe('PostHeader Component', () => {
  it('アイコン画像を正しくレンダリングできるか', () => {
    render(<PostHeader {...mockPostHeader} />)

    const image = screen.getByAltText('')
    expect(image).toHaveAttribute('src', mockPostHeader.icon.url)
    expect(image).toHaveAttribute('width', mockPostHeader.icon.width.toString())
    expect(image).toHaveAttribute(
      'height',
      mockPostHeader.icon.height.toString(),
    )
  })

  it('タイトルとサブタイトルが正しく表示されるか', () => {
    render(<PostHeader {...mockPostHeader} />)

    expect(screen.getByText(mockPostHeader.subtitle)).toBeInTheDocument()
    expect(screen.getByText(mockPostHeader.title)).toBeInTheDocument()
  })

  it('公開日が正しく表示されるか', () => {
    render(<PostHeader {...mockPostHeader} />)

    const publishDate = screen.getByText('2024年07月23日')
    expect(publishDate).toBeInTheDocument()

    const clockIcon = screen.getByTestId('clock-icon')
    expect(clockIcon).toBeInTheDocument()
  })

  it('公開日が指定されていない場合はレンダリングされない', () => {
    const { container } = render(
      <PostHeader {...mockPostHeader} publish={undefined} />,
    )

    expect(container.querySelector(`.${styles['publish']}`)).toBeNull()
  })
})
