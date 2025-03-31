import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth"
import { auth } from "../Firebase"

export const signUp = (email: string, password: string) => {
  return createUserWithEmailAndPassword(auth, email, password)
}

export const logIn = (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password)
}

export const logOut = () => {
  return signOut(auth)
}
