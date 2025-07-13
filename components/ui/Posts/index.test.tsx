import { render, screen } from '@testing-library/react'
import { mockConvertDate } from '@/__mocks__/convert-date'
import { mockPosts } from '@/__mocks__/posts'
import { mockCategories } from '@/__mocks__/categories'
import Posts from '.'

mockConvertDate()

describe('Posts Component', () => {
  test('投稿のタイトル、公開日、カテゴリーを確認', () => {
    render(<Posts {...mockPosts} />)

    // タイトル確認
    expect(screen.getByText('Post Title 1')).toBeInTheDocument()
    expect(screen.getByText('Post Title 2')).toBeInTheDocument()

    // 公開日（mockConvertDateでモックしているためISO文字列をそのまま確認）
    expect(screen.getByText('2024年07月23日')).toBeInTheDocument()

    // カテゴリ名を mockCategories に合わせて確認
    expect(screen.getByText(mockCategories[0]!.name)).toBeInTheDocument() // Tech
    expect(screen.getByText(mockCategories[1]!.name)).toBeInTheDocument() // Lifestyle

    // btn=falseのためMOREボタンは表示されない
    expect(screen.queryByText('MORE')).toBeNull()
  })

  test('btnプロパティがtrueのときに「MORE」ボタンが表示されるか確認', () => {
    render(<Posts {...mockPosts} btn={true} />)
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
