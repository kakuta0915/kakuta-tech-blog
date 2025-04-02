import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import {
  ThreeColum,
  ThreeColumMain,
  ThreeColumSidebar,
  ThreeColumSocialActions,
} from './threeColum'

// CSSモジュールをモック
jest.mock('./threeColum.module.css', () => ({
  flexContainer: 'flexContainer',
  main: 'main',
  sidebar: 'sidebar',
  socialActions: 'socialActions',
}))

describe('ThreeColum Components', () => {
  test('ThreeColumと子要素がレンダリングされているか', () => {
    render(
      <ThreeColum>
        <div>Test</div>
      </ThreeColum>,
    )

    // childrenがレンダリングされているか確認
    expect(screen.getByText('Test')).toBeInTheDocument()

    // クラス名が適用されていることを確認
    expect(screen.getByText('Test').parentElement).toHaveClass('flexContainer')
  })

  test('ThreeColumMainと子要素がレンダリングされているか', () => {
    render(
      <ThreeColumMain>
        <div>Test Main</div>
      </ThreeColumMain>,
    )

    // childrenがレンダリングされているか確認
    expect(screen.getByText('Test Main')).toBeInTheDocument()

    // クラス名が適用されていることを確認
    expect(screen.getByText('Test Main').parentElement).toHaveClass('main')
  })

  test('ThreeColumSidebarと子要素がレンダリングされているか', () => {
    render(
      <ThreeColumSidebar>
        <div>Test Sidebar</div>
      </ThreeColumSidebar>,
    )

    // childrenがレンダリングされているか確認
    expect(screen.getByText('Test Sidebar')).toBeInTheDocument()

    // クラス名が適用されていることを確認
    expect(screen.getByText('Test Sidebar').parentElement).toHaveClass(
      'sidebar',
    )
  })

  test('ThreeColumSocialActionsと子要素がレンダリングされているか', () => {
    render(
      <ThreeColumSocialActions>
        <div>Test Social Actions</div>
      </ThreeColumSocialActions>,
    )

    // childrenがレンダリングされているか確認
    expect(screen.getByText('Test Social Actions')).toBeInTheDocument()

    // クラス名が適用されていることを確認
    expect(screen.getByText('Test Social Actions').parentElement).toHaveClass(
      'socialActions',
    )
  })
})
