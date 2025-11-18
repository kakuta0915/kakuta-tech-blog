import React from 'react'
import { render, screen } from '@testing-library/react'
import { mockCategories } from '@/__mocks__/categories'
import PostCategories from '.'

describe('PostCategories Component', () => {
  it('categoriesプロパティで渡したデータが正しく表示されるかを確認', () => {
    const categories = mockCategories.map((category) => ({
      ...category,
      icon: category.icon ?? { url: '', width: 24, height: 24 },
    }))

    render(<PostCategories categories={categories} />)

    categories.forEach(({ name }) => {
      expect(screen.getByText(name)).toBeInTheDocument()
    })
  })

  it('各カテゴリリンクが正しいパスに設定されているかを確認', () => {
    const categories = mockCategories.map((category) => ({
      ...category,
      icon: category.icon ?? { url: '', width: 24, height: 24 },
    }))

    render(<PostCategories categories={categories} />)

    categories.forEach(({ slug }) => {
      const link = screen.getByRole('link', { name: new RegExp(slug, 'i') })
      expect(link).toHaveAttribute('href', `/articles/categories/${slug}`)
    })
  })

  it('各画像が正しい src、width、height、および alt 属性を持っているかを確認', () => {
    const categories = mockCategories.map((category) => ({
      ...category,
      icon: category.icon ?? { url: '', width: 24, height: 24 },
    }))

    render(<PostCategories categories={categories} />)

    const images = screen.getAllByAltText('画像')

    categories.forEach(({ icon }, index) => {
      const image = images[index]
      expect(image).toHaveAttribute('src', icon?.url)
      expect(image).toHaveAttribute('width', icon?.width.toString())
      expect(image).toHaveAttribute('height', icon?.height.toString())
    })
  })
})
