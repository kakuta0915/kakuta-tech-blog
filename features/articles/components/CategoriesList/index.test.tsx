import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { mockCategories } from '@/src/__mocks__/categories'
import CategoriesList from '.'

describe('CategoriesList component', () => {
  it('カテゴリ 一覧が正しく表示される', async () => {
    render(<CategoriesList allCategories={mockCategories} />)
    expect(screen.getByText('カテゴリ 一覧')).toBeInTheDocument()
  })

  it('ボタンをクリックするとカテゴリリストがトグル表示される', () => {
    render(<CategoriesList allCategories={mockCategories} />)
    fireEvent.click(screen.getByText('カテゴリ 一覧'))
    expect(screen.getByRole('list')).toBeInTheDocument()
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
      expect(screen.getByTestId(`icon-${category.slug}`)).toBeInTheDocument()
    })
  })
})
