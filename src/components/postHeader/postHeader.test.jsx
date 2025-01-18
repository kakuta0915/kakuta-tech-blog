import React from 'react'
import { render, screen } from '@testing-library/react'
import PostHeader from './postHeader'
import styles from './postHeader.module.css'

// next/imageのモック
jest.mock('next/image', () => ({
  __esModule: true,
  // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
  default: (props) => <img {...props} />,
}))

// ConvertDateコンポーネントのモック
jest.mock('../convert/convertDate', () => ({
  __esModule: true,
  default: ({ dateISO }) => <span>{dateISO}</span>,
}))

describe('PostHeader Component', () => {
  const defaultProps = {
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

    const publishDate = screen.getByText(defaultProps.publish)
    expect(publishDate).toBeInTheDocument()

    const clockIcon = screen.getByTestId('clock-icon')
    expect(clockIcon).toBeInTheDocument()
  })

  it('公開日が指定されていない場合はレンダリングされない', () => {
    const { container } = render(
      <PostHeader {...defaultProps} publish={undefined} />,
    )

    expect(container.querySelector(`.${styles.publish}`)).toBeNull()
  })
})
