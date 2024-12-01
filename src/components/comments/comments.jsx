import { useEffect, useState } from 'react'
import Image from 'next/image'
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
import styles from './comments.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'

// 「何日前」「何時間前」などの形式に変換
function timeAgo(date) {
  const now = new Date()
  const diffInSeconds = Math.floor((now - date) / 1000)
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

export default function Comments({ postId, id }) {
  const [user, setUser] = useState(null) // ログインユーザー情報
  const [comment, setComment] = useState('') // 入力されたコメント
  const [comments, setComments] = useState([]) // 取得したコメント
  const [replyContent, setReplyContent] = useState('') // 返信内容
  const [activeEdit, setActiveEdit] = useState(null) // 編集モードのコメントID
  const [editContent, setEditContent] = useState('') // 編集内容
  const [activeReply, setActiveReply] = useState(null) // コメントごとに個別の返信フォームを管理
  const [selectedView, setSelectedView] = useState({}) // 'markdown' または 'preview' を選択
  const [isVisible, setIsVisible] = useState(false) // 編集・削除ボタン

  // Firebase Authの状態を監視
  useEffect(() => {
    const auth = getAuth()
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser({
          uid: currentUser.uid,
          displayName: currentUser.displayName,
          photoURL: currentUser.photoURL,
        })
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
          ...doc.data(),
        }))
        setComments(updatedComments.filter((doc) => doc.postId === postId))
      },
      (error) => {
        console.error('onSnapshotエラー:', error)
      },
    )

    return () => unsubscribe()
  }, [postId])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!comment.trim()) {
      toast.error('コメントを入力してください。')
      return
    }

    // Firestoreへの保存処理
    try {
      await addDoc(collection(db, 'comments'), {
        postId,
        text: comment,
        createdAt: serverTimestamp(),
        userId: user.uid,
        displayName: user.displayName,
        photoURL: user.photoURL,
        parentId: null,
      })

      setComment('')
      toast.success('コメントが投稿されました！')
    } catch (error) {
      console.error('Firestore保存エラー:', error)
      toast.error('コメントの投稿に失敗しました。')
    }
  }

  // 返信を送信する関数
  const handleReplySubmit = async (e, parentId) => {
    e.preventDefault()
    if (!replyContent.trim()) {
      toast.error('返信を入力してください。')
      return
    }
    try {
      await addDoc(collection(db, 'comments'), {
        postId,
        text: replyContent,
        createdAt: serverTimestamp(),
        userId: user.uid,
        displayName: user.displayName,
        photoURL: user.photoURL,
        parentId,
      })
      setReplyContent('')
      setActiveReply(null)
      toast.success('返信が投稿されました。')
    } catch {
      console.error('Firestore保存エラー', error)
      toast.error('返信の投稿に失敗しました。')
    }
  }

  // 返信フォームを表示する関数
  const handleReplyClick = (id) => {
    if (!user) {
      toast.error('ログインしてください。')
      return
    }
    setActiveReply(id)
  }

  // 返信のキャンセルを表示
  const handleCancelReply = () => {
    if (!replyContent.trim()) {
      setActiveReply(null)
      return
    }
    if (window.confirm('返信をキャンセルしますか？')) {
      setActiveReply(null)
      setReplyContent('')
      setSelectedView((prevState) => ({
        ...prevState,
        [id]: { ...prevState[id], reply: 'markdown' },
      }))
    }
  }

  // 編集・削除ボタンをトグルで表示・非表示にする関数
  const toggleVisibility = () => {
    setIsVisible((prevState) => !prevState)
  }

  // コメントを編集してFirebaseに保存する関数
  const handleEditSubmit = async (e, id, editContent, closeEditMode) => {
    e.preventDefault()

    try {
      await updateDoc(doc(db, 'comments', id), { text: editContent })
      closeEditMode()
      toast.success('コメントを更新しました。')
    } catch (error) {
      console.error('コメント更新エラー:', error)

      toast.error('コメントの更新に失敗しました。')
    }
  }

  // コメントを編集するボタンをクリックしたときの処理
  const handleEditClick = (id, text) => {
    setActiveEdit(id)
    setEditContent(text)
  }

  // コメント取得後は 'markdown' 表示に設定
  useEffect(() => {
    const defaultViews = comments.reduce((views, comment) => {
      views[comment.id] = { edit: 'markdown', reply: 'markdown' }
      return views
    }, {})
    setSelectedView(defaultViews)
  }, [comments])

  // 編集をキャンセルする関数
  const handleCancelEdit = (text) => {
    if (editContent !== text) {
      const confirmCancel = window.confirm(
        '変更内容が保存されていません。編集をキャンセルしますか?',
      )
      if (!confirmCancel) {
        return
      }
    } else {
      const confirmDiscard = toast.info('編集をキャンセルしました')
      if (!confirmDiscard) {
        return
      }
    }

    setActiveEdit(null)
    setEditContent('')
    setSelectedView((prevState) => ({
      ...prevState,
      [id]: { ...prevState[id], edit: 'markdown' },
    }))
  }

  // コメントや返信を削除する関数
  const handleDelete = async (id) => {
    if (window.confirm('本当に削除しますか？')) {
      try {
        await deleteDoc(doc(db, 'comments', id))
        toast.success('コメントを削除しました。')
      } catch (error) {
        console.log('コメント削除エラー:', error)
        toast.error('コメントの削除に失敗しました。')
      }
    }
  }

  // 各コメントのビュー状態を保持する関数
  const handleViewToggle = (commentId, mode, view) => {
    setSelectedView((prevState) => ({
      ...prevState,
      [commentId]: {
        ...(prevState[commentId] || {}),
        [mode]: view,
      },
    }))
  }

  return (
    <div className={styles.commentsContainer}>
      <h2>コメント</h2>
      {user ? (
        <>
          <div className={styles.userInfo}>
            <Image
              src={user.photoURL}
              alt={user.displayName || 'User'}
              width={50}
              height={50}
              className={styles.userIcon}
            />
            <span className={styles.userName}>
              {user.displayName || '匿名ユーザー'}
            </span>
          </div>
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.viewToggleButtons}>
              <button
                type="button"
                onClick={() => handleViewToggle(id, 'edit', 'markdown')}
                className={`${styles.viewButton} ${
                  selectedView[id]?.edit === 'markdown' ? styles.active : ''
                }`}
              >
                Markdown
              </button>
              <button
                type="button"
                onClick={() => handleViewToggle(id, 'edit', 'preview')}
                className={`${styles.viewButton} ${
                  selectedView[id]?.edit === 'preview' ? styles.active : ''
                }`}
              >
                プレビュー
              </button>
            </div>
            <div className={styles.inputAndPreview}>
              {selectedView[id]?.edit === 'markdown' && (
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="記事についてコメントする (マークダウン記法が使えます)"
                  className={styles.textarea}
                />
              )}
              {selectedView[id]?.edit === 'preview' && (
                <div className={styles.preview}>
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {comment}
                  </ReactMarkdown>
                </div>
              )}
            </div>
            <button type="submit" className={styles.commentButton}>
              投稿
            </button>
          </form>
        </>
      ) : (
        <p>ログインしてコメントしましょう。</p>
      )}
      <ul>
        {comments
          .filter((c) => !c.parentId)
          .map(({ id, text, createdAt, displayName, photoURL, userId }) => (
            <li key={id}>
              <div className={styles.commentHeader}>
                <Image
                  src={photoURL}
                  alt={displayName || '匿名ユーザー'}
                  width={50}
                  height={50}
                  className={styles.commentIcon}
                />
                <span className={styles.userName}>
                  {displayName || '匿名ユーザー'}
                </span>
                <small className={styles.time}>
                  {createdAt?.seconds
                    ? timeAgo(new Date(createdAt.seconds * 1000))
                    : '日時情報なし'}
                </small>

                {user?.uid === userId && (
                  <div className={styles.commentsActions}>
                    <button
                      onClick={toggleVisibility}
                      className={styles.toggleButton}
                    >
                      {isVisible ? (
                        <FontAwesomeIcon
                          icon={faChevronDown}
                          className={styles.icon}
                        />
                      ) : (
                        <FontAwesomeIcon
                          icon={faChevronDown}
                          className={styles.icon}
                        />
                      )}
                    </button>

                    <div
                      className={`${styles.actionButtons} ${
                        isVisible ? styles.visible : styles.hidden
                      }`}
                    >
                      <button
                        onClick={() => handleEditClick(id, text)}
                        className={styles.editButton}
                      >
                        編集
                      </button>
                      <button
                        onClick={() => handleDelete(id)}
                        className={styles.deleteButton}
                      >
                        削除
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* =================================================== */}

              {/* 編集中でない場合は元のコメントを表示 */}
              {activeEdit !== id && (
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {text}
                </ReactMarkdown>
              )}

              {/* 編集フォームの表示 */}
              {activeEdit === id && (
                <form
                  onSubmit={(e) =>
                    handleEditSubmit(e, id, editContent, () =>
                      setActiveEdit(null),
                    )
                  }
                  className={styles.editForm}
                >
                  <div className={styles.viewToggleButtons}>
                    <button
                      type="button"
                      onClick={() => handleViewToggle(id, 'edit', 'markdown')}
                      className={`${styles.viewButton} ${
                        selectedView[id]?.edit === 'markdown'
                          ? styles.active
                          : ''
                      }`}
                    >
                      Markdown
                    </button>
                    <button
                      type="button"
                      onClick={() => handleViewToggle(id, 'edit', 'preview')}
                      className={`${styles.viewButton} ${
                        selectedView[id]?.edit === 'preview'
                          ? styles.active
                          : ''
                      }`}
                    >
                      プレビュー
                    </button>
                  </div>

                  <div className={styles.inputAndPreview}>
                    {selectedView[id]?.edit === 'markdown' && (
                      <textarea
                        value={editContent}
                        onChange={(e) => setEditContent(e.target.value)}
                        placeholder="編集内容を入力してください"
                        className={styles.textarea}
                      />
                    )}
                    {selectedView[id]?.edit === 'preview' && (
                      <div className={styles.preview}>
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                          {editContent}
                        </ReactMarkdown>
                      </div>
                    )}
                  </div>

                  <button type="submit" className={styles.savaButton}>
                    保存
                  </button>
                  <button
                    type="button"
                    onClick={() => handleCancelEdit(text)}
                    className={styles.cancelButton}
                  >
                    キャンセル
                  </button>
                </form>
              )}
              {/* =================================================== */}

              {activeReply !== id && (
                <button
                  onClick={() => handleReplyClick(id)}
                  className={styles.addReplyButton}
                >
                  返信を追加
                </button>
              )}
              <div className={styles.replyContainer}>
                {activeReply === id && (
                  <form
                    onSubmit={(e) => handleReplySubmit(e, id)}
                    className={styles.replyForm}
                  >
                    <div className={styles.viewToggleButtons}>
                      <button
                        type="button"
                        onClick={() =>
                          handleViewToggle(id, 'reply', 'markdown')
                        }
                        className={`${styles.viewButton} ${
                          selectedView[id]?.reply === 'markdown'
                            ? styles.active
                            : ''
                        }`}
                      >
                        Markdown
                      </button>
                      <button
                        type="button"
                        onClick={() => handleViewToggle(id, 'reply', 'preview')}
                        className={`${styles.viewButton} ${
                          selectedView[id]?.reply === 'preview'
                            ? styles.active
                            : ''
                        }`}
                      >
                        プレビュー
                      </button>
                    </div>
                    <div className={styles.inputAndPreview}>
                      {selectedView[id]?.reply === 'markdown' && (
                        <textarea
                          value={replyContent}
                          onChange={(e) => setReplyContent(e.target.value)}
                          placeholder="投稿に対してコメントする (マークダウン記法が使えます)"
                          className={styles.textarea}
                        />
                      )}
                      {selectedView[id]?.reply === 'preview' && (
                        <div className={styles.preview}>
                          <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {replyContent}
                          </ReactMarkdown>
                        </div>
                      )}
                    </div>
                    <button type="submit" className={styles.replyButton}>
                      返信する
                    </button>
                    <button
                      type="button"
                      onClick={handleCancelReply}
                      className={styles.cancelButton}
                    >
                      キャンセル
                    </button>
                  </form>
                )}
                <ul>
                  {comments
                    .filter((c) => c.parentId === id)
                    .map(({ id, text, displayName, photoURL, createdAt }) => (
                      <li key={id} className={styles.reply}>
                        <div className={styles.replyCommentHeader}>
                          <Image
                            src={photoURL}
                            alt={displayName || '匿名ユーザー'}
                            width={50}
                            height={50}
                            className={styles.commentIcon}
                          />
                          <span className={styles.userName}>
                            {displayName || '匿名ユーザー'}
                          </span>
                          <small className={styles.time}>
                            {createdAt?.seconds
                              ? timeAgo(new Date(createdAt.seconds * 1000))
                              : '日時情報なし'}
                          </small>
                        </div>
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                          {text}
                        </ReactMarkdown>
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
