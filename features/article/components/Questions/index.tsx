'use client'

import React, { useId, useState } from 'react'
import parse, { DOMNode } from 'html-react-parser'
import styles from './index.module.scss'
import type { ChoiceKey, QuestionsProps } from './types'

function isChoiceKey(x: string): x is ChoiceKey {
  return x === 'A' || x === 'B' || x === 'C'
}

function isElementNode(node: DOMNode): node is DOMNode & {
  name: string
  attribs: { [key: string]: string }
  children: DOMNode[]
} {
  return node.type === 'tag' && !!(node as any).name
}

// HTML文字列をReactで表示できる形に変換
function renderExplanationHtml(html: string) {
  const trimmed = (html ?? '').trim()
  if (!trimmed) return null

  return parse(trimmed, {
    replace: (node) => {
      if (isElementNode(node)) {
        // 記事作者が入力する前提だが、念のため危険度の高い要素は除外
        if (
          node.name === 'script' ||
          node.name === 'style' ||
          node.name === 'iframe'
        ) {
          return null
        }
      }
      return undefined
    },
  })
}

const Questions: React.FC<QuestionsProps> = ({ questions }) => {
  const baseId = useId()
  const qList = questions ?? []
  const [answers, setAnswers] = useState<Record<string, ChoiceKey>>({}) // 回答を保存

  // 回答をstateに保存
  const onSelect = (qid: string, key: ChoiceKey) => {
    setAnswers((prev) => ({ ...prev, [qid]: key }))
  }

  // 練習問題がない場合は何も表示しない
  if (!qList || qList.length === 0) {
    return null
  }

  return (
    <section className={styles['questions']}>
      <span className={styles['label']}>チャレンジ問題</span>
      <h2 className={styles['title']}>理解度チェック</h2>
      <p className={styles['description']}>
        学んだ内容を確認してみましょう。各問題の選択肢から正しい答えを選んでください。
      </p>

      <div className={styles['list']}>
        {qList.map((q, idx) => {
          const selected = answers[q.id] // 問題に対してユーザーが選んだ回答 (A・B・C)を取得
          const answered = !!selected // 未回答の場合、undefinedを返す
          const correctAnswer = q.correct?.[0]

          const correct = answered && selected === correctAnswer
          const statusId = `${baseId}-${q.id}-status`

          return (
            <div key={q.id} className={styles['item']}>
              <div className={styles['questionHeader']}>
                <div className={styles['badge']} aria-hidden="true">
                  Q{idx + 1}
                </div>
                <p className={styles['questionText']}>{q.question}</p>
              </div>

              <div
                className={styles['choices']}
                role="group"
                aria-describedby={statusId}
              >
                {/* オブジェクトを配列に変換し、ループ処理（mapは配列にしか使えない為） */}
                {/* k: A・B・C / label: 選択肢のテキスト */}
                {Object.entries(q.choices).map(([k, label]) => {
                  // kがA・B・C以外なら無視
                  if (!isChoiceKey(k)) return null

                  const isSelected = selected === k
                  const isCorrectChoice = correctAnswer === k
                  const isWrongSelection = isSelected && !isCorrectChoice
                  const isCorrectSelection = isSelected && isCorrectChoice

                  return (
                    <button
                      key={k}
                      type="button"
                      className={styles['choice']}
                      data-correct={isCorrectSelection ? 'true' : undefined}
                      data-wrong={isWrongSelection ? 'true' : undefined}
                      onClick={() => onSelect(q.id, k)}
                      aria-pressed={isSelected}
                    >
                      <span className={styles['choiceKey']}>{k}.</span>
                      <span>{label}</span>
                    </button>
                  )
                })}
              </div>

              <div
                id={statusId}
                className={styles['result']}
                data-visible={answered ? 'true' : 'false'}
                data-kind={correct ? 'correct' : 'wrong'}
              >
                {answered && (
                  <>
                    <p
                      className={styles['resultLine']}
                      data-kind={correct ? 'correct' : 'wrong'}
                    >
                      <span className={styles['resultIcon']}>
                        {correct ? '🎉' : '💭'}
                      </span>

                      <div className={styles['resultTextBox']}>
                        <span className={styles['resultText']}>
                          {correct
                            ? '正解です！'
                            : '不正解です。もう一度考えてみましょう。'}
                        </span>
                        {correct && q.explanation?.trim() && (
                          <div className={styles['explanation']}>
                            <div className={styles['explanationContent']}>
                              {renderExplanationHtml(q.explanation)}
                            </div>
                          </div>
                        )}
                      </div>
                    </p>
                  </>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default Questions
