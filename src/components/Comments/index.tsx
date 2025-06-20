import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import error from 'next/error'
import { db } from '@/firebaseConfig'
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
  updateDoc,
  deleteDoc,
  doc,
} from 'firebase/firestore'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { toast } from 'react-toastify'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import styles from './index.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import type {
  CommentData,
  NewCommentData,
  ViewState,
  VisibilityState,
  CommentsProps,
  FirebaseUserProps,
} from '@/types'

function timeAgo(date: Date): string {
  const now = new Date()
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)
  const diffInMinutes = Math.floor(diffInSeconds / 60)
  const diffInHours = Math.floor(diffInMinutes / 60)
  const diffInDays = Math.floor(diffInHours / 24)

  if (diffInDays > 0) {
    return `${diffInDays}日前`
  }
  if (diffInHours > 0) {
    return `${diffInHours}時間前`
  }
  if (diffInMinutes > 0) {
    return `${diffInMinutes}分前`
  }
  return `${diffInSeconds}秒前`
}

const Comments: React.FC<CommentsProps> = ({ postId, id }) => {
  const [user, setUser] = useState<FirebaseUserProps | null>(null) // ログインユーザー情報
  const [comment, setComment] = useState<string>('') // 入力されたコメント
  const [comments, setComments] = useState<CommentData[]>([]) // 取得したコメント
  const [replyContent, setReplyContent] = useState<string>('') // 返信内容
  const [activeEdit, setActiveEdit] = useState<string | null>(null) // 編集モードのコメントID
  const [editContent, setEditContent] = useState<string>('') // 編集内容
  const [activeReply, setActiveReply] = useState<string | null>(null) // コメントごとに個別の返信フォームを管理
  const [selectedView, setSelectedView] = useState<ViewState>({}) // 'markdown' または 'preview' を選択
  const [visibilityState, setVisibilityState] = useState<VisibilityState>({}) // 編集・削除ボタンの表示・非表示
  const [replyState, setReplyState] = useState<boolean>(true) // 【返信を追加】の表示・非表示
  const [commentsActionsVisible, setCommentsActionsVisible] =
    useState<boolean>(true)
  const actionsRef = useRef<HTMLDivElement>(null)

  // Firebase Authの状態を監視
  useEffect(() => {
    const auth = getAuth()
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser)
      } else {
        setUser(null)
      }
    })
    return () => unsubscribe()
  }, [])

  // Firestoreからコメントを取得
  useEffect(() => {
    const q = query(collection(db, 'comments'), orderBy('createdAt', 'desc'))
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const updatedComments = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<CommentData, 'id'>),
        }))
        setComments(updatedComments.filter((doc) => doc.postId === postId))
      },
      (error) => {
        console.error('onSnapshotエラー:', error)
      },
    )

    return () => unsubscribe()
  }, [postId])

  // コメントを投稿する関数 (Firestoreへの保存処理)
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!comment.trim()) {
      toast.error('コメントを入力してください。')
      return
    }

    try {
      await addDoc(collection(db, 'comments'), new Comment())

      setComment('')
      toast.success('コメントが投稿されました！')
    } catch (error) {
      console.error('Firestore保存エラー:', error)
      toast.error('コメントの投稿に失敗しました。')
    }
  }

  // 返信を送信する関数
  const handleReplySubmit = async (
    e: React.FormEvent<HTMLElement>,
  ): Promise<void> => {
    e.preventDefault()

    if (!user) {
      return
    }

    if (!replyContent.trim()) {
      toast.error('返信を入力してください。')
      return
    }

    const newReply: NewCommentData = {
      postId,
      text: replyContent,
      parentId: null,
      createdAt: serverTimestamp(),
      userId: user?.uid ?? '',
      displayName: user?.displayName ?? '',
      photoURL: user?.photoURL ?? '',
    }

    try {
      await addDoc(collection(db, 'comments'), newReply)
      setReplyContent('')
      setActiveReply(null)
      setCommentsActionsVisible(true)
      toast.success('返信が投稿されました。')
    } catch {
      console.error('Firestore保存エラー', error)
      toast.error('返信の投稿に失敗しました。')
    }
  }

  // 返信フォームを表示する関数
  const handleReplyClick = (id: React.SetStateAction<string | null>) => {
    setCommentsActionsVisible(false)

    if (!user) {
      toast.error('ログインしてください。')
      return
    }
    setReplyState(false)
    setActiveReply(id)
  }

  // 返信のキャンセルを表示
  const handleCancelReply = (): void => {
    if (!replyContent.trim()) {
      setCommentsActionsVisible(true)
      setReplyState(true)
      setActiveReply(null)
      return
    }
    if (window.confirm('返信をキャンセルしますか？')) {
      setActiveReply(null)
      setReplyContent('')
      setCommentsActionsVisible(true)
      setReplyState(true)
      setSelectedView((prevState) => ({
        ...prevState,
        [id]: {
          ...prevState[id],
          reply: 'markdown',
          edit: prevState[id]?.edit || 'markdown',
        },
      }))
    }
  }

  // 編集・削除ボタンをトグルで表示・非表示にする関数
  const toggleVisibility = (id: string): void => {
    setVisibilityState((prevState: VisibilityState) => {
      return {
        ...prevState,
        [id]: prevState[id] ? false : true,
      }
    })
  }

  // コメントを編集してFirebaseに保存する関数
  const handleEditSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    id: string,
    editContent: string,
    closeEditMode: { (): void; (): void; (): void },
  ) => {
    e.preventDefault()

    try {
      await updateDoc(doc(db, 'comments', id), { text: editContent })
      closeEditMode()
      setCommentsActionsVisible(true)
      setReplyState(true)
      toast.success('コメントを更新しました。')
    } catch (error) {
      console.error('コメント更新エラー:', error)

      toast.error('コメントの更新に失敗しました。')
    }
  }

  // コメントを編集するボタンをクリックしたときの処理
  const handleEditClick = (id: string | null, text: string): void => {
    if (!id) {
      return
    }

    setActiveEdit(id)
    setEditContent(text)
    setCommentsActionsVisible(false)
    setReplyState(false)
    setVisibilityState((prevState) => ({
      ...prevState,
      [id]: false,
    }))
  }

  // コメント取得後は 'markdown' 表示に設定
  useEffect(() => {
    const defaultViews = comments.reduce<ViewState>((views, comment) => {
      views[comment.id] = { edit: 'markdown', reply: 'markdown' }
      return views
    }, {})
    setSelectedView(defaultViews)
  }, [comments])

  // 編集をキャンセルする関数
  const handleCancelEdit = (text: string): void => {
    if (editContent !== text) {
      const confirmCancel: boolean = window.confirm(
        '変更内容が保存されていません。編集をキャンセルしますか?',
      )
      if (!confirmCancel) {
        return
      }
    } else {
      const confirmDiscard = toast.info('編集をキャンセルしました')
      setCommentsActionsVisible(true)
      setReplyState(true)
      if (!confirmDiscard) {
        return
      }
    }

    setActiveEdit(null)
    setEditContent('')
    setSelectedView((prevState) => ({
      ...prevState,
      [id]: {
        ...prevState[id],
        edit: 'markdown',
        reply: 'markdown',
      },
    }))
  }

  // コメントや返信を削除する関数
  const handleDelete = async (id: string): Promise<void> => {
    if (window.confirm('本当に削除しますか？')) {
      try {
        await deleteDoc(doc(db, 'comments', id))
        setCommentsActionsVisible(true)
        toast.success('コメントを削除しました。')
        setVisibilityState((prevState: VisibilityState) => ({
          ...prevState,
          [id]: false,
        }))
      } catch (error) {
        console.log('コメント削除エラー:', error)
        toast.error('コメントの削除に失敗しました。')
      }
    }
  }

  // 各コメントのビュー状態を保持する関数
  const handleViewToggle = (
    commentId: string,
    mode: 'edit' | 'reply',
    view: 'markdown' | 'preview',
  ): void => {
    setSelectedView((prevState: ViewState) => ({
      ...prevState,
      [commentId]: {
        ...(prevState[commentId] || { edit: 'markdown', reply: 'markdown' }),
        [mode]: view,
      },
    }))
  }

  return (
    <div className={styles['commentsContainer']}>
      <h2>コメント</h2>

      {/* コメント投稿 */}
      {user ? (
        <>
          <div className={styles['userInfo']}>
            {user.photoURL && (
              <Image
                src={user.photoURL}
                alt={user.displayName || 'User'}
                width={50}
                height={50}
                className={styles['userIcon']}
              />
            )}
            <span className={styles['userName']}>
              {user.displayName || '匿名ユーザー'}
            </span>
          </div>

          <form onSubmit={handleSubmit} className={styles['form']}>
            <div className={styles['viewToggleButtons']}>
              <button
                type="button"
                onClick={() => handleViewToggle(id, 'edit', 'markdown')}
                className={`${styles['viewButton']} ${
                  selectedView[id]?.edit === 'markdown' ? styles['active'] : ''
                }`}
              >
                Markdown
              </button>
              <button
                type="button"
                onClick={() => handleViewToggle(id, 'edit', 'preview')}
                className={`${styles['viewButton']} ${
                  selectedView[id]?.edit === 'preview' ? styles['active'] : ''
                }`}
              >
                プレビュー
              </button>
            </div>

            <div className={styles['inputAndPreview']}>
              {selectedView[id]?.edit === 'markdown' && (
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="記事についてコメントする (マークダウン記法が使えます)"
                  className={styles['textarea']}
                />
              )}
              {selectedView[id]?.edit === 'preview' && (
                <div className={styles['preview']}>
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {comment}
                  </ReactMarkdown>
                </div>
              )}
            </div>

            <button type="submit" className={styles['commentButton']}>
              投稿
            </button>
          </form>
        </>
      ) : (
        <p>ログインしてコメントしましょう。</p>
      )}

      {/* 親コメント */}
      <ul>
        {comments
          .filter((c) => !c.parentId)
          .map((comment) => (
            <li key={comment.id}>
              <div className={styles['commentHeader']}>
                {comment.photoURL && (
                  <Image
                    src={comment.photoURL}
                    alt={comment.displayName ?? 'ユーザー画像'}
                    width={50}
                    height={50}
                  />
                )}
                <span className={styles['userName']}>
                  {comment.displayName || '匿名ユーザー'}
                </span>
                <small className={styles['time']}>
                  {comment.createdAt?.seconds
                    ? timeAgo(new Date(comment.createdAt.seconds * 1000))
                    : '日時情報なし'}
                </small>

                {user?.uid === comment.userId && (
                  <div
                    className={`${styles['commentsActions']} ${
                      !commentsActionsVisible ? styles['hiddenIcon'] : ''
                    }`}
                    ref={actionsRef}
                  >
                    <button
                      onClick={() => toggleVisibility(id)}
                      className={styles['toggleButton']}
                    >
                      {visibilityState[id] ? (
                        <FontAwesomeIcon
                          icon={faChevronDown}
                          className={styles['icon']}
                        />
                      ) : (
                        <FontAwesomeIcon
                          icon={faChevronDown}
                          className={styles['icon']}
                        />
                      )}
                    </button>

                    <div
                      className={`${styles['actionButtons']} ${
                        visibilityState[id]
                          ? styles['visible']
                          : styles['hidden']
                      }`}
                    >
                      <button
                        onClick={() => handleEditClick(id, comment.text)}
                        className={styles['editButton']}
                      >
                        編集
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {activeEdit !== id && (
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {comment.text}
                </ReactMarkdown>
              )}

              {activeEdit === id && (
                <form
                  onSubmit={(e) =>
                    handleEditSubmit(e, id, editContent, () =>
                      setActiveEdit(null),
                    )
                  }
                  className={styles['editForm']}
                >
                  <div className={styles['viewToggleButtons']}>
                    <button
                      type="button"
                      onClick={() => handleViewToggle(id, 'edit', 'markdown')}
                      className={`${styles['viewButton']} ${
                        selectedView[id]?.edit === 'markdown'
                          ? styles['active']
                          : ''
                      }`}
                    >
                      Markdown
                    </button>
                    <button
                      type="button"
                      onClick={() => handleViewToggle(id, 'edit', 'preview')}
                      className={`${styles['viewButton']} ${
                        selectedView[id]?.edit === 'preview'
                          ? styles['active']
                          : ''
                      }`}
                    >
                      プレビュー
                    </button>
                  </div>

                  <div className={styles['inputAndPreview']}>
                    {selectedView[id]?.edit === 'markdown' && (
                      <textarea
                        value={editContent}
                        onChange={(e) => setEditContent(e.target.value)}
                        placeholder="編集内容を入力してください"
                        className={styles['textarea']}
                      />
                    )}
                    {selectedView[id]?.edit === 'preview' && (
                      <div className={styles['preview']}>
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                          {editContent}
                        </ReactMarkdown>
                      </div>
                    )}
                  </div>

                  <button type="submit" className={styles['savaButton']}>
                    保存
                  </button>
                  <button
                    type="button"
                    onClick={() => handleCancelEdit(comment.text)}
                    className={styles['cancelButton']}
                  >
                    キャンセル
                  </button>
                </form>
              )}

              {activeReply !== id && (
                <button
                  onClick={() => handleReplyClick(id)}
                  className={`${styles['addReplyButton']} ${
                    !replyState ? styles['hiddenReplyButton'] : ''
                  }`}
                >
                  返信を追加
                </button>
              )}

              <div className={styles['replyContainer']}>
                {activeReply === id && (
                  <form
                    onSubmit={(e) => handleReplySubmit(e)}
                    className={styles['replyForm']}
                  >
                    <div className={styles['viewToggleButtons']}>
                      <button
                        type="button"
                        onClick={() =>
                          handleViewToggle(id, 'reply', 'markdown')
                        }
                        className={`${styles['viewButton']} ${
                          selectedView[id]?.reply === 'markdown'
                            ? styles['active']
                            : ''
                        }`}
                      >
                        Markdown
                      </button>
                      <button
                        type="button"
                        onClick={() => handleViewToggle(id, 'reply', 'preview')}
                        className={`${styles['viewButton']} ${
                          selectedView[id]?.reply === 'preview'
                            ? styles['active']
                            : ''
                        }`}
                      >
                        プレビュー
                      </button>
                    </div>

                    <div className={styles['inputAndPreview']}>
                      {selectedView[id]?.reply === 'markdown' && (
                        <textarea
                          value={replyContent}
                          onChange={(e) => setReplyContent(e.target.value)}
                          placeholder="投稿に対してコメントする (マークダウン記法が使えます)"
                          className={styles['textarea']}
                        />
                      )}
                      {selectedView[id]?.reply === 'preview' && (
                        <div className={styles['preview']}>
                          <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {replyContent}
                          </ReactMarkdown>
                        </div>
                      )}
                    </div>
                    <button type="submit" className={styles['replyButton']}>
                      返信する
                    </button>
                    <button
                      type="button"
                      onClick={handleCancelReply}
                      className={styles['cancelButton']}
                    >
                      キャンセル
                    </button>
                  </form>
                )}

                {/* 子コメント */}
                <ul>
                  {comments
                    .filter((c) => c.parentId === id)
                    .map((comment) => (
                      <li key={comment.id} className={styles['reply']}>
                        <div className={styles['replyCommentHeader']}>
                          <Image
                            src={comment.photoURL}
                            alt={comment.displayName || '匿名ユーザー'}
                            width={50}
                            height={50}
                            className={styles['commentIcon']}
                          />
                          <span className={styles['userName']}>
                            {comment.displayName || '匿名ユーザー'}
                          </span>
                          <small className={styles['time']}>
                            {comment.createdAt?.seconds
                              ? timeAgo(
                                  new Date(comment.createdAt.seconds * 1000),
                                )
                              : '日時情報なし'}
                          </small>

                          {user?.uid === comment.userId && (
                            <div
                              className={`${styles['commentsActions']} ${
                                !commentsActionsVisible
                                  ? styles['hiddenIcon']
                                  : ''
                              }`}
                              ref={actionsRef}
                            >
                              <button
                                onClick={() => toggleVisibility(id)}
                                className={styles['toggleButton']}
                              >
                                {visibilityState[id] ? (
                                  <FontAwesomeIcon
                                    icon={faChevronDown}
                                    className={styles['icon']}
                                  />
                                ) : (
                                  <FontAwesomeIcon
                                    icon={faChevronDown}
                                    className={styles['icon']}
                                  />
                                )}
                              </button>

                              <div
                                className={`${styles['actionButtons']} ${
                                  visibilityState[id]
                                    ? styles['visible']
                                    : styles['hidden']
                                }`}
                              >
                                <button
                                  onClick={() =>
                                    handleEditClick(id, comment.text)
                                  }
                                  className={styles['editButton']}
                                >
                                  編集
                                </button>
                                <button
                                  onClick={() => handleDelete(id)}
                                  className={styles['deleteButton']}
                                >
                                  削除
                                </button>
                              </div>
                            </div>
                          )}
                        </div>

                        {activeEdit !== id && (
                          <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {comment.text}
                          </ReactMarkdown>
                        )}

                        {activeEdit === id && (
                          <form
                            onSubmit={(e) =>
                              handleEditSubmit(e, id, editContent, () =>
                                setActiveEdit(null),
                              )
                            }
                            className={styles['editForm']}
                          >
                            <div className={styles['viewToggleButtons']}>
                              <button
                                type="button"
                                onClick={() =>
                                  handleViewToggle(id, 'edit', 'markdown')
                                }
                                className={`${styles['viewButton']} ${
                                  selectedView[id]?.edit === 'markdown'
                                    ? styles['active']
                                    : ''
                                }`}
                              >
                                Markdown
                              </button>
                              <button
                                type="button"
                                onClick={() =>
                                  handleViewToggle(id, 'edit', 'preview')
                                }
                                className={`${styles['viewButton']} ${
                                  selectedView[id]?.edit === 'preview'
                                    ? styles['active']
                                    : ''
                                }`}
                              >
                                プレビュー
                              </button>
                            </div>

                            <div className={styles['inputAndPreview']}>
                              {selectedView[id]?.edit === 'markdown' && (
                                <textarea
                                  value={editContent}
                                  onChange={(e) =>
                                    setEditContent(e.target.value)
                                  }
                                  placeholder="編集内容を入力してください"
                                  className={styles['textarea']}
                                />
                              )}
                              {selectedView[id]?.edit === 'preview' && (
                                <div className={styles['preview']}>
                                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                    {editContent}
                                  </ReactMarkdown>
                                </div>
                              )}
                            </div>

                            <button
                              type="submit"
                              className={styles['savaButton']}
                            >
                              保存
                            </button>
                            <button
                              type="button"
                              onClick={() => handleCancelEdit(comment.text)}
                              className={styles['cancelButton']}
                            >
                              キャンセル
                            </button>
                          </form>
                        )}
                      </li>
                    ))}
                </ul>
              </div>
            </li>
          ))}
      </ul>
    </div>
  )
}

export default Comments
