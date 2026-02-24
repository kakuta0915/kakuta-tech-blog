// UI用の型
export type ChoiceKey = 'A' | 'B' | 'C'

export type Question = {
  id: string
  question: string
  choices: Record<ChoiceKey, string>
  correct: ChoiceKey
  explanation: string
}

export type QuestionsProps = {
  questions?: Question[]
}
