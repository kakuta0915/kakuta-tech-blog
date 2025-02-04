import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import CategoriesList from './categoriesList'

describe('CategoriesList component', () => {
  // モックデータ
  const mockCategories = [
    {
      name: 'Tech',
      slug: 'tech',
      icon: { url: '/icons/tech.png', icon: { url: '/tech.png' } },
    },
    {
      name: 'Lifestyle',
      slug: 'lifestyle',
      icon: {
        url: '/icons/lifestyle.png',
        icon: { url: '/lifestyle.png' },
      },
    },
  ]

  it('カテゴリ 一覧が正しく表示される', async () => {
    render(<CategoriesList allCategories={mockCategories} />)

    expect(screen.getByText('カテゴリ 一覧')).toBeInTheDocument()
  })

  it('ボタンをクリックするとカテゴリリストがトグル表示される', () => {
    render(<CategoriesList allCategories={mockCategories} />)

    const button = screen.getByText('カテゴリ 一覧')
    fireEvent.click(button)

    // ボタンをクリック後、カテゴリリストが表示されるか確認
    const categoriesList = screen.getByRole('list')
    expect(categoriesList).toBeInTheDocument()
  })

  it('カテゴリのリンクとアイコンが正しく表示される', () => {
    render(<CategoriesList allCategories={mockCategories} />)

    // 各カテゴリが正しいリンクとアイコンを持っていることを確認
    mockCategories.forEach((category) => {
      const link = screen.getByRole('link', {
        name: `${category.name} icon ${category.name}`,
      })
      expect(link).toHaveAttribute(
        'href',
        `/articles/categories/${category.slug}`,
      )
      expect(screen.getByAltText(`${category.name} icon`)).toHaveAttribute(
        'src',
        category.icon.url,
      )

      // アイコンが表示されていることを確認
      const icon = screen.getByTestId(`icon-${category.slug}`)
      expect(icon).toBeInTheDocument()
    })
  })
})
