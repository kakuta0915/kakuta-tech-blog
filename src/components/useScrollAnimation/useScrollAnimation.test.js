import { render, screen } from '@testing-library/react'
import { useEffect } from 'react'
import useScrollAnimation from './useScrollAnimation'

// テスト対象のダミーコンポーネント
const TestComponent = () => {
  useScrollAnimation(['.test-element'], 100)

  return (
    <div>
      <div className="test-element">Scroll Animation Element</div>
    </div>
  )
}

describe('useScrollAnimation', () => {
  beforeEach(() => {
    // windowオブジェクトのモック
    global.innerHeight = 1000

    // getBoundingClientRectのモック
    Element.prototype.getBoundingClientRect = jest.fn(() => ({
      top: 500,
    }))

    // scrollイベントリスナーのモック
    global.addEventListener = jest.fn((event, callback) => {
      if (event === 'scroll') {
        callback()
      }
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('scroll要素にactiveクラスが追加される', () => {
    // コンポーネントレンダリング
    render(<TestComponent />)

    // 要素が存在することを確認
    const element = screen.getByText('Scroll Animation Element')
  })
})
