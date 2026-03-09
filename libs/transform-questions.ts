import type {
  Question,
  ChoiceKey,
} from '@/features/article/components/Questions/types'
import type { MicroCMSQuestion } from '@/types'

export function transformQuestions(
  questions?: MicroCMSQuestion[],
): Question[] | undefined {
  if (!questions) return undefined

  return questions
    .map((q, index): Question | null => {
      if (!q.question || !q.choiceA || !q.choiceB || !q.choiceC) {
        return null
      }

      const rawCorrect = q.correct?.[0]?.toUpperCase()

      const isValid =
        rawCorrect === 'A' || rawCorrect === 'B' || rawCorrect === 'C'

      const correct: ChoiceKey = isValid ? (rawCorrect as ChoiceKey) : 'A'

      return {
        id: `${q.fieldId ?? 'q'}-${index + 1}`,
        question: q.question,
        choices: {
          A: q.choiceA,
          B: q.choiceB,
          C: q.choiceC,
        },
        correct,
        explanation: q.explanation ?? '',
      }
    })
    .filter((q): q is Question => q !== null)
}
