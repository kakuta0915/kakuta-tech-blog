import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import CodeBlock from './index'

jest.mock('react-toastify', () => require('@/__mocks__/react-toastify'))

jest.mock('@fortawesome/react-fontawesome', () => ({
  FontAwesomeIcon: (props: any) => <i data-testid="fa-icon" {...props} />,
}))

// Utility to setup navigaor.clipboard mock
const mockClipboard = (impl?: (text: string) => Promise<void>) => {
  Object.assign(navigator, {
    clipboard: {
      writeText: impl || jest.fn().mockResolvedValue(undefined),
    },
  })
}

describe('CodeBlock', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders code with language class and copy button', () => {
    render(
      <CodeBlock
        code={'<span>hello</span>'}
        rawCode={undefined}
        language="ts"
      />,
    )

    const pre = screen.getByText((_content, element) => {
      return element?.tagName.toLowerCase() === 'code'
    })
    expect(pre).toHaveClass('language-ts')

    const button = screen.getByRole('button', { name: 'コピー' })
    expect(button).toBeInTheDocument()
    expect(screen.getByTestId('fa-icon')).toBeInTheDocument()
  })

  it('copies rawCode when provided and shows success toast (navigator.clipboard)', async () => {
    const { toast } = require('react-toastify')
    const writeText = jest.fn().mockResolvedValue(undefined)
    mockClipboard(writeText)

    render(
      <CodeBlock code={'<span>ignored</span>'} rawCode={'RAW'} language="js" />,
    )

    const button = screen.getByRole('button', { name: 'コピー' })
    fireEvent.click(button)

    expect(writeText).toHaveBeenCalledWith('RAW')
    expect(toast.success).toHaveBeenCalledWith('コピーしました')
  })

  it('falls back to textarea copy when navigator.clipboard throws', async () => {
    const { toast } = require('react-toastify')
    // clipboard throws
    mockClipboard(jest.fn().mockRejectedValue(new Error('no perm')))

    const execSpy = jest
      .spyOn(document, 'execCommand')
      .mockImplementation(() => true)

    render(
      <CodeBlock
        code={'<span>CODE</span>'}
        rawCode={undefined}
        language={undefined}
      />,
    )

    const button = screen.getByRole('button', { name: 'コピー' })
    fireEvent.click(button)

    expect(execSpy).toHaveBeenCalledWith('copy')
    expect(toast.success).toHaveBeenCalledWith('コピーしました')

    execSpy.mockRestore()
  })
})
