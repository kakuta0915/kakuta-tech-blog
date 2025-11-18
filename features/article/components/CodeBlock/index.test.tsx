import React from 'react'
import { render, screen } from '@testing-library/react'
import CodeBlock from './index'

jest.mock('@fortawesome/react-fontawesome', () => ({
  FontAwesomeIcon: (props: any) => <i data-testid="fa-icon" {...props} />,
}))

describe('CodeBlock コンポーネント', () => {
  it('コードを言語クラス付きで表示し、コピー用ボタンも表示される', () => {
    render(
      <CodeBlock
        code={'<span>hello</span>'}
        rawCode={undefined}
        language="ts"
      />,
    )

    const codeElement = screen.getByText(
      (_content, element) => element?.tagName.toLowerCase() === 'code',
    )
    expect(codeElement).toHaveClass('language-ts')

    const button = screen.getByRole('button', { name: 'コピー' })
    expect(button).toBeInTheDocument()
    expect(screen.getByTestId('fa-icon')).toBeInTheDocument()
  })
})
