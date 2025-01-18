import React from 'react'
import { render, screen } from '@testing-library/react'
import Posts from './posts'

// ConvertDateコンポーネントをモック
jest.mock('../convert/convertDate', () => ({
  __esModule: true,
  default: ({ dateISO }) => <span>{dateISO}</span>,
}))

// next/imageコンポーネントをモック
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ fill, ...props }) => (
    // eslint-disable-next-line jsx-a11y/alt-text, @next/next/no-img-element
    <img {...props} style={{ objectFit: fill ? 'cover' : undefined }} />
  ),
}))

describe('Posts Component', () => {
  const defaultProps = {
    btn: false,
    posts: [
      {
        title: 'Post Title 1',
        slug: 'post-title-1',
        eyecatch: { url: '/images/post1.png' },
        publishDate: '2024-07-23T00:00:00Z',
        categories: [{ name: 'Category 1', slug: 'category-1' }],
        source: 'local',
      },
      {
        title: 'Post Title 2',
        slug: 'post-title-2',
        eyecatch: { url: '/images/post2.png' },
        publishDate: '2024-07-24T00:00:00Z',
        categories: [{ name: 'Category 2', slug: 'category-2' }],
        source: 'qiita',
      },
    ],
    maxPosts: 2,
  }

  test('投稿のタイトル、公開日、カテゴリーを確認', () => {
    render(<Posts {...defaultProps} />)

    expect(screen.getByText('Post Title 1')).toBeInTheDocument()
    expect(screen.getByText('Post Title 2')).toBeInTheDocument()

    expect(screen.getByText('2024-07-23T00:00:00Z')).toBeInTheDocument()
    expect(screen.getByText('2024-07-24T00:00:00Z')).toBeInTheDocument()

    expect(screen.getByText('Category 1')).toBeInTheDocument()
    expect(screen.getByText('Category 2')).toBeInTheDocument()

    expect(screen.queryByText('MORE')).toBeNull()
  })

  test('btnプロパティがtrueのときに「MORE」ボタンが表示されるか確認', () => {
    render(<Posts {...defaultProps} btn={true} />)

    expect(screen.getByText('MORE')).toBeInTheDocument()
  })

  test('外部リンクのURLを正しく設定しているか確認', () => {
    render(<Posts {...defaultProps} />)

    const link = screen.getByText('Post Title 2').closest('a')
    expect(link).toHaveAttribute(
      'href',
      'https://qiita.com/kakuta0915/items/post-title-2',
    )
  })
})
