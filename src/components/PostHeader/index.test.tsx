import React from 'react'
import { render, screen } from '@testing-library/react'
import PostHeader from '.'
import type { PostHeaderProps } from '.'
import styles from './index.module.css'

jest.mock('../convert/convertDate', () => ({
  __esModule: true,
  default: ({ dateISO }: { dateISO: string }) => <span>{dateISO}</span>,
}))

describe('PostHeader Component', () => {
  const defaultProps: PostHeaderProps = {
    icon: { url: '/icons/icon.png', width: 50, height: 50 },
    title: 'Post Title',
    subtitle: 'Post Subtitle',
    publish: '2024-07-23T00:00:00Z',
  }

  it('アイコン画像をが正しくレンダリングされているか', () => {
    render(<PostHeader {...defaultProps} />)

    const image = screen.getByAltText('')
    expect(image).toHaveAttribute('src', defaultProps.icon.url)
    expect(image).toHaveAttribute('width', defaultProps.icon.width.toString())
    expect(image).toHaveAttribute('height', defaultProps.icon.height.toString())
  })

  it('タイトルとサブタイトルが正しく表示されるか', () => {
    render(<PostHeader {...defaultProps} />)

    expect(screen.getByText(defaultProps.subtitle)).toBeInTheDocument()
    expect(screen.getByText(defaultProps.title)).toBeInTheDocument()
  })

  it('公開日が正しく表示されるか', () => {
    render(<PostHeader {...defaultProps} />)

    if (defaultProps.publish) {
      const publishDate = screen.getByText(defaultProps.publish)
      expect(publishDate).toBeInTheDocument()
    }

    const clockIcon = screen.getByTestId('clock-icon')
    expect(clockIcon).toBeInTheDocument()
  })

  it('公開日が指定されていない場合はレンダリングされない', () => {
    const { container } = render(
      <PostHeader {...defaultProps} publish={undefined} />,
    )

    expect(container.querySelector(`.${styles['publish']}`)).toBeNull()
  })
})
