// microCMSのレスポンス用の型（APIレスポンス型）
export type MicroCMSQuestion = {
  fieldId?: string
  question: string
  choiceA: string
  choiceB: string
  choiceC: string
  correct?: string[]
  explanation: string
}
