import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import CategoriesList from '.'

describe('CategoriesList component', () => {
  const mockCategories = [
    {
      name: 'Tech',
      slug: 'tech',
      icon: { url: '/icons/tech.png', width: 30, height: 30 },
    },
    {
      name: 'Lifestyle',
      slug: 'lifestyle',
      icon: {
        url: '/icons/lifestyle.png',
        width: 30,
        height: 30,
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

    const categoriesList = screen.getByRole('list')
    expect(categoriesList).toBeInTheDocument()
  })

  it('カテゴリのリンクとアイコンが正しく表示される', () => {
    render(<CategoriesList allCategories={mockCategories} />)

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

      const icon = screen.getByTestId(`icon-${category.slug}`)
      expect(icon).toBeInTheDocument()
    })
  })
})
