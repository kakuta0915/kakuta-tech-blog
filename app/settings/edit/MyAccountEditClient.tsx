'use client'

import React, { useEffect, useState, ChangeEvent } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useAuthState } from 'react-firebase-hooks/auth'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { updateProfile } from 'firebase/auth'
import { auth, storage } from '@/firebaseConfig'
import { toast } from 'react-toastify'
import styles from './page.module.css'

type MyAccountEditClientProps = {}

const MyAccountEditClient: React.FC<MyAccountEditClientProps> = () => {
  const [user, loading] = useAuthState(auth)
  const router = useRouter()

  const [displayName, setDisplayName] = useState<string>('')
  const [photoURL, setPhotoURL] = useState<string>('')
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  useEffect(() => {
    if (!loading && !user) {
      router.push('/')
    }
    if (user) {
      setDisplayName(user.displayName || '')
      setPhotoURL(user.photoURL || '')
    }
  }, [loading, user, router])

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      const reader = new FileReader()
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setPhotoURL(reader.result)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const handleUpdateProfile = async () => {
    if (!user) return

    let updatePhotoURL = photoURL

    if (selectedFile) {
      try {
        const storageRef = ref(
          storage,
          `profile_images/${user.uid}/${selectedFile.name}`,
        )
        await uploadBytes(storageRef, selectedFile)
        updatePhotoURL = await getDownloadURL(storageRef)
      } catch (err) {
        toast.error('画像のアップロードに失敗しました。')
        return
      }
    }

    if (!displayName.trim()) {
      toast.error('表示名を入力してください。')
      return
    }

    try {
      await updateProfile(user, {
        displayName,
        photoURL: updatePhotoURL,
      })
      toast.success('プロフィールを更新しました！')
    } catch (error) {
      toast.error('プロフィールの更新に失敗しました。')
    }
  }

  if (loading) {
    return <p>Loading...</p>
  }

  return (
    <>
      <h1 className={styles['pageTitle']}>Settings</h1>
      <div className={styles['profileContainer']}>
        <div className={styles['preview']}>
          <Image src={photoURL} alt="User Icon" width={80} height={80} />
          <p>{displayName}</p>
        </div>
        <div className={styles['formSection']}>
          <h3 className={styles['sectionTitle']}>プロフィール設定</h3>
          <div className={styles['formGroup']}>
            <label>表示名</label>
            <input
              className={styles['inputText']}
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="新しい名前を入力"
            />
          </div>
          <div className={styles['formGroup']}>
            <label>アイコンURL</label>
            <input type="file" accept="image/*" onChange={handleFileChange} />
          </div>
          <button
            onClick={handleUpdateProfile}
            className={styles['updateButton']}
          >
            更新する
          </button>
        </div>
      </div>
      <div className={styles['deleteSection']}>
        <h3 className={styles['sectionTitle']}>アカウント削除</h3>
        <p>一度アカウントを削除すると、二度ともとに戻すことが出来ません。</p>
        <Link href="/settings/delete" className={styles['deleteButton']}>
          アカウントを削除する
        </Link>
      </div>
    </>
  )
}

export default MyAccountEditClient
