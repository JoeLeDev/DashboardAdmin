import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth"
import { auth, db } from "../Firebase"
import { doc, setDoc, serverTimestamp } from "firebase/firestore"

export const signUp = async (email: string, password: string) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password)
  const user = userCredential.user

  await setDoc(doc(db, "Users", user.uid), {
    email: user.email,
    role: "user",
    createdAt: serverTimestamp(),
  })

  return user
}

export const logIn = (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password)
}

export const logOut = () => {
  return signOut(auth)
}
