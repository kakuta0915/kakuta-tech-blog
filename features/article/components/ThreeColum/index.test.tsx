import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import {
  ThreeColum,
  ThreeColumMain,
  ThreeColumSidebar,
  ThreeColumPostActions,
} from '.'

describe('ThreeColum Components', () => {
  test('ThreeColumと子要素がレンダリングされているか', () => {
    render(
      <ThreeColum>
        <div>Test</div>
      </ThreeColum>,
    )

    expect(screen.getByText('Test')).toBeInTheDocument()
    expect(screen.getByText('Test').parentElement).toHaveClass('flexContainer')
  })

  test('ThreeColumMainと子要素がレンダリングされているか', () => {
    render(
      <ThreeColumMain>
        <div>Test Main</div>
      </ThreeColumMain>,
    )

    expect(screen.getByText('Test Main')).toBeInTheDocument()
    expect(screen.getByText('Test Main').parentElement).toHaveClass('main')
  })

  test('ThreeColumSidebarと子要素がレンダリングされているか', () => {
    render(
      <ThreeColumSidebar>
        <div>Test Sidebar</div>
      </ThreeColumSidebar>,
    )

    expect(screen.getByText('Test Sidebar')).toBeInTheDocument()
    expect(screen.getByText('Test Sidebar').parentElement).toHaveClass(
      'sidebar',
    )
  })

  test('ThreeColumSocialActionsと子要素がレンダリングされているか', () => {
    render(
      <ThreeColumPostActions>
        <div>Test Post Actions</div>
      </ThreeColumPostActions>,
    )

    expect(screen.getByText('Test Post Actions')).toBeInTheDocument()
    expect(screen.getByText('Test Post Actions').parentElement).toHaveClass(
      'socialActions',
    )
  })
})
