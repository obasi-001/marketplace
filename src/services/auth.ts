import app from '../firebase'

import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  createUserWithEmailAndPassword,
} from 'firebase/auth'

export const auth = getAuth(app)

const googleProvider = new GoogleAuthProvider()

export const signInWithGoogle = () => {
  return signInWithPopup(auth, googleProvider)
}

export const signOutUser = () => {
  return signOut(auth)
}

export const registerWithEmail = (
  email: string,
  password: string,
) => {
  return createUserWithEmailAndPassword(
    auth,
    email,
    password,
  )
}