import { useEffect, useState } from "react"
import { getAllUsers, promoteToAdmin, demoteToUser } from "../services/UsersService"
import { useAuth } from "../context/AuthContext"
import { Timestamp } from "firebase/firestore"
import { Card, CardContent } from "../components/ui/card"
import { Button } from "../components/ui/button"

type User = {
  id: string
  email: string
  role: string
  createdAt?: Timestamp
}

const Users = () => {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const { role: currentUserRole } = useAuth()

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getAllUsers()
        setUsers(data)
      } catch (err) {
        console.error("Erreur lors de la récupération des utilisateurs", err)
      } finally {
        setLoading(false)
      }
    }
    fetchUsers()
  }, [])

  const handlePromote = async (uid: string) => {
    try {
      await promoteToAdmin(uid)
      const updated = await getAllUsers()
      setUsers(updated as User[]) // cast ici
    } catch (err) {
      console.error("Erreur lors de la promotion :", err)
    }
  }

  const handleDemote = async (uid: string) => {
    try {
      await demoteToUser(uid)
      const updated = await getAllUsers()
      setUsers(updated as User[]) // cast ici
    } catch (err) {
      console.error("Erreur lors de la rétrogradation :", err)
    }
  }

  if (loading) return <p>Chargement des utilisateurs...</p>

  if (currentUserRole !== "admin") {
    return <p>Vous n’avez pas accès à cette page.</p>
  }

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-2xl font-bold">Liste des utilisateurs</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {users.map(user => (
          <Card key={user.id}>
            <CardContent className="p-4 space-y-2">
              <p><strong>Email :</strong> {user.email}</p>
              <p><strong>Rôle :</strong> {user.role}</p>
              {user.createdAt && (
                <p><strong>Inscrit le :</strong> {user.createdAt.toDate().toLocaleString()}</p>
              )}
              {user.role !== "admin" ? (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handlePromote(user.id)}
                >
                  Promouvoir admin
                </Button>
              ) : (
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleDemote(user.id)}
                >
                  Rétrograder
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default Users
