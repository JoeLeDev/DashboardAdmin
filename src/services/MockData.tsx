import { addDoc, collection, serverTimestamp } from "firebase/firestore"
import { db } from "../Firebase"

export const insertMockData = async () => {
  try {
    
    const users = [
      { email: "alice@test.com", role: "admin" },
      { email: "bob@test.com", role: "user" },
      { email: "carla@test.com", role: "user" }
    ]

    for (const user of users) {
      await addDoc(collection(db, "users"), {
        ...user,
        createdAt: serverTimestamp()
      })
    }


    for (let i = 0; i < 5; i++) {
      await addDoc(collection(db, "sessions"), {
        userID: `uid${i}`,
        active: i % 2 === 0,
        startedAt: serverTimestamp()
      })
    }
    const messages = [
      "Super interface",
      "Marche bien",
      "Très rapide",
      "Dark mode au top",
      "Pas mal du tout !"
    ]

    for (const message of messages) {
      await addDoc(collection(db, "feedbacks"), {
        userID: "uid123",
        message,
        createdAt: serverTimestamp()
      })
    }

    console.log(" Mock data insérée avec succès")
  } catch (err) {
    console.error(" Erreur d'insertion des mocks :", err)
  }
}
