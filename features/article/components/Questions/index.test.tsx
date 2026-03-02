import { fireEvent, render, screen } from '@testing-library/react'
import Questions from '.'
import type { Question } from './types'

const mockQuestions: Question[] = [
  {
    id: 'q1',
    question: 'Reactで状態を持つために一般的に使うHookはどれ？',
    choices: {
      A: 'useState',
      B: 'useFetch',
      C: 'useRoute',
    },
    correct: 'A',
    explanation:
      'コンポーネントに状態（state）を持たせたいときは、基本的に `useState` を使います。',
  },
]

describe('Questions', () => {
  test('選択で正解/不正解が表示され、正解時のみ解説が表示される', () => {
    render(<Questions questions={mockQuestions} />)

    // 不正解を選ぶ（B）
    fireEvent.click(screen.getByRole('button', { name: /useFetch/i }))

    expect(
      screen.getByText('不正解です。もう一度考えてみましょう。'),
    ).toBeInTheDocument()

    expect(screen.queryByText(/`useState` を使います/)).toBeNull()

    // 正解を選ぶ（A）
    fireEvent.click(screen.getByRole('button', { name: /useState/i }))

    expect(screen.getByText('正解です！')).toBeInTheDocument()

    expect(screen.getByText(/`useState` を使います/)).toBeInTheDocument()
  })
})
