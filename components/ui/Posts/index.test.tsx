import { render, screen } from '@testing-library/react'
import { mockCategories } from '@/__mocks__/categories'
import Posts from '.'
import { PostsProps } from '@/types'

const mockPosts: PostsProps = {
  posts: [
    {
      title: 'Post Title 1',
      slug: 'post-title-1',
      eyecatch: {
        url: '/images/post1.png',
        width: undefined,
        height: undefined,
      },
      publishDate: '2024-07-23T00:00:00Z',
      categories: [mockCategories[0]!],
      source: 'local',
      content: '記事の内容1',
      category: 'Tech',
    },
    {
      title: 'Post Title 2',
      slug: 'post-title-2',
      eyecatch: {
        url: '/images/post2.png',
        width: undefined,
        height: undefined,
      },
      publishDate: '2024-07-24T00:00:00Z',
      categories: [mockCategories[1]!],
      source: 'qiita',
      content: '記事の内容2',
      category: 'Lifestyle',
    },
  ],
  showMoreButton: false,
  maxPosts: 2,
}

describe('Posts Component', () => {
  test('投稿のタイトル、公開日、カテゴリーを確認', () => {
    render(<Posts {...mockPosts} />)

    // タイトル確認
    expect(screen.getByText('Post Title 1')).toBeInTheDocument()
    expect(screen.getByText('Post Title 2')).toBeInTheDocument()

    // カテゴリ名を mockCategories に合わせて確認
    expect(screen.getByText(mockCategories[0]!.name)).toBeInTheDocument() // Tech
    expect(screen.getByText(mockCategories[1]!.name)).toBeInTheDocument() // Lifestyle

    // btn=falseのためMOREボタンは表示されない
    expect(screen.queryByText('MORE')).toBeNull()
  })

  test('showMoreButton プロパティが true のときに「MORE」ボタンが表示されるか確認', () => {
    render(<Posts {...mockPosts} showMoreButton={true} />)
    expect(screen.getByText('MORE')).toBeInTheDocument()
  })

  test('外部リンクのURLを正しく設定しているか確認', () => {
    render(<Posts {...mockPosts} />)

    const link = screen.getByText('Post Title 2').closest('a')
    expect(link).toHaveAttribute(
      'href',
      'https://qiita.com/kakuta0915/items/post-title-2',
    )
  })
})
