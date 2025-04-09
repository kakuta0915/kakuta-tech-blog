import React from 'react'
import { render, screen } from '@testing-library/react'
import PostCategories from '.'

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <img {...props} />
  ),
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

  it(' categoriesプロパティで渡したデータが正しく表示されるかを確認', () => {
    render(<PostCategories categories={categories} />)

    expect(screen.getByText('カテゴリ')).toBeInTheDocument()

    categories.forEach(({ name }) => {
      expect(screen.getByText(name)).toBeInTheDocument()
    })
  })

  it('各カテゴリリンクが正しいパスに設定されているかを確認', () => {
    render(<PostCategories categories={categories} />)

    categories.forEach(({ slug }) => {
      const link = screen.getByRole('link', { name: new RegExp(slug, 'i') })
      expect(link).toHaveAttribute('href', `/articles/categories/${slug}`)
    })
  })

  it('各画像が正しい src、width、height、および alt 属性を持っているかを確認', () => {
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
