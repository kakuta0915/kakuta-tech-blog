// 設定ページ
import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '@/firebaseConfig'
import { updateProfile } from 'firebase/auth'
import { toast } from 'react-toastify'
import Meta from '@/src/components/meta/meta'
import styles from './index.module.css'
import eyecatch from '@/public/images/index.jpg'

export default function Settings() {
  const [user, loading] = useAuthState(auth) // ログイン状態
  const router = useRouter()

  // フォーム用のローカルステート
  const [displayName, setDisplayName] = useState('')
  const [photoURL, setPhotoURL] = useState('')
  const [selectedFile, setSelectedFile] = useState(null)

  // ユーザー情報の初期化
  useEffect(() => {
    if (!loading && !user) {
      router.push('/')
    }
    if (user) {
      setDisplayName(user.displayName || '')
      setPhotoURL(user.photoURL || '')
    }
  }, [loading, user, router])

  // ファイルが選択されたときの処理
  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setSelectedFile(file)
      const reader = new FileReader()
      reader.onload = () => {
        setPhotoURL(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  // 更新ボタンの処理
  const handleUpdateProfile = async () => {
    if (!user) return

    let updatePhotoURL = photoURL

    if (selectedFile) {
      // Firebase Storageに画像をアップロード
      const storageRef = ref(
        storage,
        `profile_images/${user.uid}/${selectedFile.name}`,
      )
      await uploadBytes(storageRef, selectedFile)

      // アップロードした画像のURLを取得
      updatePhotoURL = await getDownloadURL(storageRef)
    }

    if (!displayName.trim()) {
      toast.error('表示名を入力してください。')
      return
    }

    try {
      await updateProfile(user, {
        displayName,
        photoURL,
      })
      toast.success('プロフィールを更新しました！')
    } catch (error) {
      console.error('プロフィールの更新に失敗しました。:', error)
      toast.error('プロフィールの更新に失敗しました。')
    }
  }

  if (loading) {
    return <p>Loading...</p>
  }

  return (
    <>
      <Meta
        pageTitle="SETTING"
        pageDesc="アイコンやアカウント名の設定を行うページです。"
        pageImg={eyecatch.src}
        pageImgW={eyecatch.width}
        pageImgH={eyecatch.height}
      />
      <h1 className={styles.pageTitle}>Settings</h1>
      <div className={styles.profileContainer}>
        <div className={styles.preview}>
          <Image src={photoURL} alt="User Icon" width={80} height={80} />
          <p>{displayName}</p>
        </div>
        <div className={styles.formSection}>
          <h3 className={styles.sectionTitle}>プロフィール設定</h3>
          <div className={styles.formGroup}>
            <label>表示名</label>
            <input
              className={styles.inputText}
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="新しい名前を入力"
            />
          </div>
          <div className={styles.formGroup}>
            <label>アイコンURL</label>
            <input type="file" accept="image/*" onChange={handleFileChange} />
          </div>
          <button onClick={handleUpdateProfile} className={styles.updateButton}>
            更新する
          </button>
        </div>
      </div>
      <div className={styles.deleteSection}>
        <h3 className={styles.sectionTitle}>プロフィール設定</h3>
        <p>一度アカウントを削除すると、二度ともとに戻すことが出来ません。</p>
        <Link href="/setting/delete" className={styles.deleteButton}>
          アカウントを削除する
        </Link>
      </div>
    </>
  )
}
