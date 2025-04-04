import { useEffect, useState } from "react"
import { Timestamp } from "firebase/firestore"
import { getAllUsers,promoteToAdmin,demoteToUser } from "../services/UsersService"
import { useAuth } from "../context/AuthContext"
import { Card, CardContent } from "../components/ui/card"
import { Button } from "../components/ui/button"
import Loader from "../components/ui/loader"
import { toast } from "../hooks/use-toast"

type AppUser = {
  id: string
  email: string
  role: string
  createdAt?: Timestamp
}

const Users = () => {
  const [users, setUsers] = useState<AppUser[]>([])
  const [usersLoading, setUsersLoading] = useState(true)

  const { role: currentUserRole, loading: authLoading } = useAuth()

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getAllUsers()
        setUsers(data as AppUser[])
      } catch (err) {
        console.error("Erreur lors de la récupération des utilisateurs", err)
      } finally {
        setUsersLoading(false)
      }
    }

    fetchUsers()
  }, [])

  const handlePromote = async (uid: string) => {
    try {
      await promoteToAdmin(uid)
      const updated = await getAllUsers()
      setUsers(updated as AppUser[])
  
      toast({
        title: "✅ Promotion réussie",
        description: "L'utilisateur est maintenant admin.",
      })
    } catch (err) {
      console.error("Erreur lors de la promotion :", err)
      toast({
        title: "❌ Erreur",
        description: "Impossible de promouvoir l'utilisateur.",
        variant: "destructive"
      })
    }
  }
  

  const handleDemote = async (uid: string) => {
    try {
      await demoteToUser(uid)
      const updated = await getAllUsers()
      setUsers(updated as AppUser[])
  
      toast({
        title: "👤 Rétrogradé",
        description: "L'utilisateur est maintenant simple utilisateur.",
      })
    } catch (err) {
      console.error("Erreur lors de la rétrogradation :", err)
      toast({
        title: "❌ Erreur",
        description: "Impossible de rétrograder l'utilisateur.",
        variant: "destructive"
      })
    }
  }
  

  console.log("authLoading:", authLoading)
  console.log("currentUserRole:", currentUserRole)
  
  if (authLoading || usersLoading) {
    return <Loader />
  }
  

  if (currentUserRole !== "admin") {
    return <p>Accès refusé. Réservé aux administrateurs.</p>
  }

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-2xl font-bold">Liste des utilisateurs</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {users.map((user) => (
          <Card key={user.id}>
            <CardContent className="p-4 space-y-2">
              <p><strong>Email :</strong> {user.email}</p>
              <p><strong>Rôle :</strong> {user.role}</p>
              {user.createdAt && (
                <p><strong>Inscrit le :</strong> {user.createdAt.toDate().toLocaleDateString()}</p>
              )}

              {user.role !== "admin" ? (
                <Button size="sm" variant="outline" onClick={() => handlePromote(user.id)}>
                  Promouvoir
                </Button>
              ) : (
                <Button size="sm" variant="destructive" onClick={() => handleDemote(user.id)}>
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
