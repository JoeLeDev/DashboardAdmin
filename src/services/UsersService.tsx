import { db } from "../Firebase"
import { collection, getDocs, updateDoc, doc, Timestamp } from "firebase/firestore"

type User = {
  id: string
  email: string
  role: string
  createdAt?: Timestamp
}

export const getAllUsers = async (): Promise<User[]> => {
  const snapshot = await getDocs(collection(db, "Users"))
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...(doc.data() as {
      email: string
      role: string
      createdAt?: Timestamp
    })
  }))
}

export const promoteToAdmin = async (uid: string) => {
  const ref = doc(db, "Users", uid)
  await updateDoc(ref, { role: "admin" })
}

export const demoteToUser = async (uid: string) => {
  const ref = doc(db, "Users", uid)
  await updateDoc(ref, { role: "user" })
}
