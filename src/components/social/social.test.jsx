import { render, screen } from '@testing-library/react'
import Social from './social'

describe('Social Component', () => {
  // ソーシャルリンクが正しくレンダリングされるか確認
  test('renders social links correctly', () => {
    render(<Social isFooterSocial={false} />)

    expect(screen.getByAltText('Twitter')).toBeInTheDocument()
    expect(screen.getByAltText('GitHub')).toBeInTheDocument()
    expect(screen.getByAltText('Qiita')).toBeInTheDocument()
    expect(screen.getByAltText('Zenn')).toBeInTheDocument()
  })

  // isFooterSocial プロパティに基づくクラスの適用確認
  test('applies correct class based on isFooterSocial prop', () => {
    const { rerender } = render(<Social isFooterSocial={true} />)
    expect(screen.getByTestId('social')).toHaveClass('socialListFooter')

    rerender(<Social isFooterSocial={false} />)
    expect(screen.getByTestId('social')).toHaveClass('socialList')
  })
})
