// PostCategories.test.jsx
import React from 'react'
import { render, screen } from '@testing-library/react'
import PostCategories from './postCategories'

// Image コンポーネントのモック
jest.mock('next/image', () => ({
  __esModule: true,
  // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
  default: (props) => <img {...props} />,
}))

describe('PostCategories', () => {
  const categories = [
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

  // categoriesプロパティで渡したデータが正しく表示されるかを確認
  it('renders categories list correctly', () => {
    render(<PostCategories categories={categories} />)

    expect(screen.getByText('カテゴリ')).toBeInTheDocument()

    categories.forEach(({ name }) => {
      expect(screen.getByText(name)).toBeInTheDocument()
    })
  })

  // 各カテゴリリンクが正しいパスに設定されているかを確認
  it('renders links with correct hrefs', () => {
    render(<PostCategories categories={categories} />)

    categories.forEach(({ slug }) => {
      const link = screen.getByRole('link', { name: new RegExp(slug, 'i') })
      expect(link).toHaveAttribute('href', `/articles/categories/${slug}`)
    })
  })

  // 各画像が正しい src、width、height、および alt 属性を持っているかを確認
  it('renders images with correct src and alt attributes', () => {
    render(<PostCategories categories={categories} />)

    const images = screen.getAllByAltText('画像')

    categories.forEach(({ icon }, index) => {
      const image = images[index]
      expect(image).toHaveAttribute('src', icon.url)
      expect(image).toHaveAttribute('width', icon.width.toString())
      expect(image).toHaveAttribute('height', icon.height.toString())
    })
  })
})
