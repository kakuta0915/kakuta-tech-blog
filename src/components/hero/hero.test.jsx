import { render, screen } from '@testing-library/react'
import Hero from './hero'
import '@testing-library/jest-dom'

describe('Hero Component', () => {
  const defaultProps = {
    title: 'Test Title',
    description: 'Test Description',
    imageSrc: '/path/to/image.jpg',
  }

  it('タイトルと説明がレンダリングされるか', () => {
    render(<Hero {...defaultProps} />)

    expect(screen.getByText('Test Title')).toBeInTheDocument()
    expect(screen.getByText('Test Description')).toBeInTheDocument()
  })

  it('title2プロパティが渡されると、2つ目のタイトルが表示されるか', () => {
    render(<Hero {...defaultProps} title2="Second Title" />)

    expect(screen.getByText('Second Title')).toBeInTheDocument()
  })

  it('title2プロパティが渡されないと、2つ目のタイトルは表示されないとこを確認', () => {
    render(<Hero {...defaultProps} />)

    expect(screen.queryByText('Second Title')).toBeNull()
  })

  it('contactプロパティがfalseの場合、Contactリンクは表示されないことを確認', () => {
    render(<Hero {...defaultProps} contact={false} />)

    expect(screen.queryByText('Contact')).toBeNull()
  })

  it('背景画像が正しく適用されるか確認', () => {
    const { container } = render(<Hero {...defaultProps} />)

    const heroContainer = container.querySelector('.heroContainer')
    expect(heroContainer).toHaveStyle(
      'background-image: url(/path/to/image.jpg)',
    )
  })
})
