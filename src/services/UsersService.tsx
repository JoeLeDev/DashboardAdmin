import { db } from "../Firebase"
import { collection, getDocs, updateDoc, doc, Timestamp } from "firebase/firestore"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { storage } from "../Firebase"


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

export const uploadUserAvatar = async (file: File, uid: string): Promise<string> => {
    const avatarRef = ref(storage, `users/${uid}/avatar.jpg`)
    await uploadBytes(avatarRef, file)
    const downloadURL = await getDownloadURL(avatarRef)
    return downloadURL
  }