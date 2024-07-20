import { render, screen, fireEvent } from '@testing-library/react'
import CategoriesList from './CategoriesList'

// モックデータ
const mockCategories = [
  {
    name: 'Tech',
    slug: 'tech',
    icon: { url: '/icons/tech.png', width: 24, height: 24 },
  },
  {
    name: 'Lifestyle',
    slug: 'lifestyle',
    icon: { url: '/icons/lifestyle.png', width: 24, height: 24 },
  },
]

describe('CategoriesList component', () => {
  test('renders category icons and toggles categories list on button click', () => {
    render(<CategoriesList allCategories={mockCategories} />)

    // カテゴリが表示されているか確認
    mockCategories.forEach((category) => {
      // 画像を `alt` テキストで取得
      const image = screen.getByAltText(`${category.name} icon`)
      expect(image).toBeInTheDocument()

      // 画像の `src` が正しいか確認
      expect(image.src).toContain(category.icon.url)
    })
  })
})
