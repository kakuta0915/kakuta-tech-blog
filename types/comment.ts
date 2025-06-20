import { FieldValue, Timestamp } from 'firebase/firestore'

export type CommentsProps = {
  postId: string
  id: string
}

export type CommentData = {
  id: string
  postId: string
  text: string
  createdAt: Timestamp
  userId: string
  displayName: string
  photoURL: string
  parentId: string | null
}

export type NewCommentData = Omit<CommentData, 'id' | 'createdAt'> & {
  createdAt: Timestamp | FieldValue
}

export type ViewState = {
  [commentId: string]: {
    edit: 'markdown' | 'preview'
    reply: 'markdown' | 'preview'
  }
}

export type VisibilityState = {
  [commentId: string]: boolean
}
