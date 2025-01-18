import { render, screen } from '@testing-library/react'
import Social from './social'

describe('Social Component', () => {
  test('ソーシャルリンクが正しくレンダリングされるか確認', () => {
    render(<Social isFooterSocial={false} />)

    expect(screen.getByAltText('Twitter')).toBeInTheDocument()
    expect(screen.getByAltText('GitHub')).toBeInTheDocument()
    expect(screen.getByAltText('Qiita')).toBeInTheDocument()
    expect(screen.getByAltText('Zenn')).toBeInTheDocument()
  })

  test('isFooterSocialプロパティに基づくクラスの適用確認', () => {
    const { rerender } = render(<Social isFooterSocial={true} />)
    expect(screen.getByTestId('social')).toHaveClass('socialListFooter')

    rerender(<Social isFooterSocial={false} />)
    expect(screen.getByTestId('social')).toHaveClass('socialList')
  })
})
