import { collection, getDocs } from "firebase/firestore"
import { db } from "../Firebase"

export const getCollectionCount = async (collectionName: string) => {
  const snapshot = await getDocs(collection(db, collectionName))
  return snapshot.size
}
