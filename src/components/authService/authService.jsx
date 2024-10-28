/* eslint-disable @next/next/no-img-element */
import { auth, provider } from '@/firebaseConfig'
import { signInWithPopup } from 'firebase/auth'
import { useAuthState } from 'react-firebase-hooks/auth'
import React from 'react'

function AuthService() {
  const [user] = useAuthState(auth)

  return (
    <div>
      {user ? (
        <>
          <UserInfo user={user} />
          <SignOutButton />
        </>
      ) : (
        <SignInWithGoogle />
      )}
    </div>
  )
}

export default AuthService

// Googleアカウントでサインイン
function SignInWithGoogle() {
  const handleSignIn = () => {
    signInWithPopup(auth, provider).catch((error) => {
      console.error('Error signing in: ', error)
    })
  }

  return <button onClick={handleSignIn}>サインイン</button>
}

// Googleアカウントでサインアウト
function SignOutButton() {
  return <button onClick={() => auth.signOut()}>サインアウト</button>
}

// ユーザー情報
function UserInfo() {
  return (
    <div>
      <img src={auth.currentUser.photoURL} alt="" />
      <p>ユーザー名: {auth.currentUser.displayName}</p>
    </div>
  )
}
