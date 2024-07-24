import { render, screen } from '@testing-library/react'
import {
  TwoColum,
  TwoColumMain,
  TwoColumSlugMain,
  TwoColumSidebar,
} from './twoColum'

// モックスタイル
jest.mock('./twoColum.module.css', () => ({
  flexContainer: 'flexContainer',
  main: 'main',
  slug: 'slug',
  sidebar: 'sidebar',
}))

describe('TwoColum layout components', () => {
  // TwoColumコンポーネントが正しくレンダリングされ、子要素を含むかどうかをテスト
  test('renders TwoColum with children', () => {
    render(
      <TwoColum>
        <div>Test Content</div>
      </TwoColum>,
    )
    const container = screen.getByText('Test Content')
    expect(container).toBeInTheDocument()
    expect(container.parentElement).toHaveClass('flexContainer')
  })

  // TwoColumMainコンポーネントが正しくレンダリングされ、子要素を含むかどうかをテスト
  test('renders TwoColumMain with children', () => {
    render(
      <TwoColumMain>
        <div>Main Content</div>
      </TwoColumMain>,
    )
    const main = screen.getByText('Main Content')
    expect(main).toBeInTheDocument()
    expect(main.parentElement).toHaveClass('main')
  })

  // TwoColumSlugMainコンポーネントが正しくレンダリングされ、子要素を含むかどうかをテスト
  test('renders TwoColumSlugMain with children', () => {
    render(
      <TwoColumSlugMain>
        <div>Slug Content</div>
      </TwoColumSlugMain>,
    )
    const slug = screen.getByText('Slug Content')
    expect(slug).toBeInTheDocument()
    expect(slug.parentElement).toHaveClass('slug')
  })

  // TwoColumSidebarコンポーネントが正しくレンダリングされ、子要素を含むかどうかをテスト
  test('renders TwoColumSidebar with children', () => {
    render(
      <TwoColumSidebar>
        <div>Sidebar Content</div>
      </TwoColumSidebar>,
    )
    const sidebar = screen.getByText('Sidebar Content')
    expect(sidebar).toBeInTheDocument()
    expect(sidebar.parentElement).toHaveClass('sidebar')
  })
})
