import type { User as FirebaseUser } from 'firebase/auth'

// 認証状態の保持・処理
export type FirebaseUserProps = FirebaseUser | null

// DB保存用のユーザー情報
export type SimpleUserProps = {
  uid: string
  displayName: string | null
  photoURL: string | null
}
