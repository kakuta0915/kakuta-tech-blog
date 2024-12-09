import { render, screen } from '@testing-library/react'
import {
  ThreeColum,
  ThreeColumMain,
  ThreeColumSlugMain,
  ThreeColumSidebar,
} from './threeColum'

// モックスタイル
jest.mock('./ThreeColum.module.css', () => ({
  flexContainer: 'flexContainer',
  main: 'main',
  slug: 'slug',
  sidebar: 'sidebar',
}))

describe('ThreeColum layout components', () => {
  // ThreeColumコンポーネントが正しくレンダリングされ、子要素を含むかどうかをテスト
  test('renders ThreeColum with children', () => {
    render(
      <ThreeColum>
        <div>Test Content</div>
      </ThreeColum>,
    )
    const container = screen.getByText('Test Content')
    expect(container).toBeInTheDocument()
    expect(container.parentElement).toHaveClass('flexContainer')
  })

  // ThreeColumMainコンポーネントが正しくレンダリングされ、子要素を含むかどうかをテスト
  test('renders ThreeColumMain with children', () => {
    render(
      <ThreeColumMain>
        <div>Main Content</div>
      </ThreeColumMain>,
    )
    const main = screen.getByText('Main Content')
    expect(main).toBeInTheDocument()
    expect(main.parentElement).toHaveClass('main')
  })

  // ThreeColumSlugMainコンポーネントが正しくレンダリングされ、子要素を含むかどうかをテスト
  test('renders ThreeColumSlugMain with children', () => {
    render(
      <ThreeColumSlugMain>
        <div>Slug Content</div>
      </ThreeColumSlugMain>,
    )
    const slug = screen.getByText('Slug Content')
    expect(slug).toBeInTheDocument()
    expect(slug.parentElement).toHaveClass('slug')
  })

  // ThreeColumSidebarコンポーネントが正しくレンダリングされ、子要素を含むかどうかをテスト
  test('renders ThreeColumSidebar with children', () => {
    render(
      <ThreeColumSidebar>
        <div>Sidebar Content</div>
      </ThreeColumSidebar>,
    )
    const sidebar = screen.getByText('Sidebar Content')
    expect(sidebar).toBeInTheDocument()
    expect(sidebar.parentElement).toHaveClass('sidebar')
  })
})
