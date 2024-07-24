// PostHeader.test.jsx
import React from 'react'
import { render, screen } from '@testing-library/react'
import PostHeader from './postHeader'
import styles from './postHeader.module.css'

// Image コンポーネントのモック
jest.mock('next/image', () => ({
  __esModule: true,
  // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
  default: (props) => <img {...props} />,
}))

// ConvertDate コンポーネントのモック
jest.mock('../convert/convertDate', () => ({
  __esModule: true,
  default: ({ dateISO }) => <span>{dateISO}</span>,
}))

describe('PostHeader', () => {
  const defaultProps = {
    icon: { url: '/icons/icon.png', width: 50, height: 50 },
    title: 'Post Title',
    subtitle: 'Post Subtitle',
    publish: '2024-07-23T00:00:00Z',
  }

  it('renders icon image correctly', () => {
    render(<PostHeader {...defaultProps} />)

    const image = screen.getByAltText('')
    expect(image).toHaveAttribute('src', defaultProps.icon.url)
    expect(image).toHaveAttribute('width', defaultProps.icon.width.toString())
    expect(image).toHaveAttribute('height', defaultProps.icon.height.toString())
  })

  it('renders title and subtitle correctly', () => {
    render(<PostHeader {...defaultProps} />)

    expect(screen.getByText(defaultProps.subtitle)).toBeInTheDocument()
    expect(screen.getByText(defaultProps.title)).toBeInTheDocument()
  })

  it('renders publish date when provided', () => {
    render(<PostHeader {...defaultProps} />)

    const publishDate = screen.getByText(defaultProps.publish)
    expect(publishDate).toBeInTheDocument()

    // FontAwesomeIcon の確認
    const clockIcon = screen.getByTestId('clock-icon')
    expect(clockIcon).toBeInTheDocument()
  })

  it('does not render publish date when not provided', () => {
    const { container } = render(
      <PostHeader {...defaultProps} publish={undefined} />,
    )

    expect(container.querySelector(`.${styles.publish}`)).toBeNull()
  })
})
