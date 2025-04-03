import { createContext, useEffect, useState, useContext } from "react"
import { User, onAuthStateChanged, signOut } from "firebase/auth"
import { doc, getDoc, setDoc, Timestamp } from "firebase/firestore"
import { auth, db } from "../Firebase"

// Types pour Firestore
interface FirestoreUserData {
  email: string
  role: string
  createdAt: Timestamp
}

interface AuthContextType {
  user: User | null
  loading: boolean
  role: string | null
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error("useAuth must be used within an AuthProvider")
  return context
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [role, setRole] = useState<string | null>(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser)
      setLoading(false)

      if (currentUser) {
        const userRef = doc(db, "Users", currentUser.uid)
        const docSnap = await getDoc(userRef)

        if (!docSnap.exists()) {
          await setDoc(userRef, {
            email: currentUser.email,
            role: "user",
            createdAt: Timestamp.now()
          })
          setRole("user")
        } else {
          const data = docSnap.data() as FirestoreUserData
          setRole(data.role || null)
        }
      } else {
        setRole(null)
      }
    })

    return () => unsubscribe()
  }, [])

  const logout = async () => {
    try {
      await signOut(auth)
    } catch (err) {
      console.error("Erreur lors de la déconnexion:", err)
    }
  }

  return (
    <AuthContext.Provider value={{ user, loading, role, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext
