import { useAuth } from "../context/AuthContext"
import { useState, useEffect } from "react"
import { updateEmail, EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth"
import { auth, db } from "../Firebase"
import { Input } from "../components/ui/input"
import { Button } from "../components/ui/button"
import { toast } from "sonner"
import { doc, setDoc, getDoc } from "firebase/firestore"

const Settings = () => {
  const { user } = useAuth()
  const [newEmail, setNewEmail] = useState(user?.email || "")
  const [password, setPassword] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [photoURL, setPhotoURL] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user) return
      const docRef = doc(db, "Users", user.uid)
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        const data = docSnap.data()
        setFirstName(data.firstName || "")
        setLastName(data.lastName || "")
        setPhotoURL(data.photoURL || "")
        setNewEmail(data.email || user.email || "")
      }
    }
    fetchUserData()
  }, [user])

  const handleUpdate = async () => {
    if (!auth.currentUser || !user) return

    setLoading(true)

    try {
      const credential = EmailAuthProvider.credential(user.email!, password)
      await reauthenticateWithCredential(auth.currentUser, credential)

      if (newEmail !== user.email) {
        await updateEmail(auth.currentUser, newEmail)
      }

      const userDocRef = doc(db, "Users", user.uid)
      await setDoc(userDocRef, {
        firstName,
        lastName,
        photoURL,
        email: newEmail // 🔥 Mise à jour de l'email dans Firestore aussi
      }, { merge: true })

      toast.success("Profil mis à jour avec succès !")
    } catch (error) {
      console.error("Erreur de mise à jour :", error)
      toast.error("Erreur lors de la mise à jour. Vérifiez votre mot de passe.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-6 max-w-md mx-auto space-y-4">
      <h2 className="text-2xl font-bold">Paramètres du profil</h2>
      <div className="space-y-2">
        <label className="block text-sm font-medium">Nom</label>
        <Input
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          disabled={loading}
        />

        <label className="block text-sm font-medium">Prénom</label>
        <Input
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          disabled={loading}
        />

        <label className="block text-sm font-medium">Photo de profil (URL)</label>
        <Input
          value={photoURL}
          onChange={(e) => setPhotoURL(e.target.value)}
          disabled={loading}
        />

        <label className="block text-sm font-medium">Adresse email</label>
        <Input
          type="email"
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
          disabled={loading}
        />

        <label className="block text-sm font-medium">Mot de passe actuel</label>
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
        />

        <Button onClick={handleUpdate} disabled={loading}>
          {loading ? "Mise à jour..." : "Mettre à jour"}
        </Button>
      </div>
    </div>
  )
}

export default Settings
