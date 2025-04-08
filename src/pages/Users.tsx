import { useEffect, useState } from "react"
import { Timestamp, doc, deleteDoc, updateDoc } from "firebase/firestore"
import { getAllUsers, promoteToAdmin, demoteToUser } from "../services/UsersService"
import { useAuth } from "../context/AuthContext"
import { db } from "../Firebase"
import { Card, CardContent } from "../components/ui/card"
import { Button } from "../components/ui/button"
import  Loader  from "../components/ui/Loader"
import { toast } from "sonner"
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "../components/ui/dialog"
import { Input } from "../components/ui/input"
import { uploadUserAvatar } from "../services/UsersService"

type AppUser = {
  id: string
  lastName: string
  firstName: string
  email: string
  role: string
  createdAt?: Timestamp
  photoURL?: string
}

const Users = () => {
  const [users, setUsers] = useState<AppUser[]>([])
  const [usersLoading, setUsersLoading] = useState(true)
  const { role: currentUserRole, loading: authLoading } = useAuth()

  // States pour l'édition
  const [editUserId, setEditUserId] = useState<string | null>(null)
  const [editFirstName, setEditFirstName] = useState("")
  const [editLastName, setEditLastName] = useState("")
  const [editEmail, setEditEmail] = useState("")
  const [editPhoto, setSelectedFile] = useState<File | string>("")
  const [previewURL, setPreviewURL] = useState<string | null>(null)
  const [modalOpen, setModalOpen] = useState(false)



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
      toast.success("Utilisateur promu administrateur.")
    } catch (err) {
      toast.error("Erreur lors de la promotion.")
    }
  }

  const handleDemote = async (uid: string) => {
    try {
      await demoteToUser(uid)
      const updated = await getAllUsers()
      setUsers(updated as AppUser[])
      toast.success("Utilisateur rétrogradé.")
    } catch (err) {
      toast.error("Erreur lors de la rétrogradation.")
    }
  }

  const handleDelete = async (uid: string) => {
    const confirm = window.confirm("Supprimer cet utilisateur ?")
    if (!confirm) return

    try {
      await deleteDoc(doc(db, "Users", uid))
      const updated = await getAllUsers()
      setUsers(updated as AppUser[])
      toast.success("Utilisateur supprimé.")
    } catch (err) {
      toast.error("Erreur lors de la suppression.")
    }
  }

  const handleUpdateUser = async () => {
    if (!editUserId) return
  
    try {
      let photoURL = typeof editPhoto === "string" ? editPhoto : ""
  
      if (editPhoto instanceof File) {
        try {
          photoURL = await uploadUserAvatar(editPhoto, editUserId)
        } catch (uploadErr) {
          console.error("Erreur lors de l'upload :", uploadErr)
          toast.error("🚫 Vous n'avez pas les droits pour modifier cette image.")
          return
        }
      }
  
      await updateDoc(doc(db, "Users", editUserId), {
        firstName: editFirstName,
        lastName: editLastName,
        email: editEmail,
        ...(photoURL && { photoURL })
      })
  
      const updated = await getAllUsers()
      setUsers(updated as AppUser[])
  
      toast.success("✅ Utilisateur modifié.")
      setModalOpen(false)
  
      setEditUserId(null)
      setEditFirstName("")
      setEditLastName("")
      setEditEmail("")
      setSelectedFile("")
      setPreviewURL(null)
  
    } catch (err) {
      console.error("Erreur lors de la mise à jour :", err)
      toast.error("❌ Erreur lors de la mise à jour.")
    }
  }


  if (authLoading || usersLoading) return <Loader />
  if (currentUserRole !== "admin") return <p>Accès refusé</p>

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-2xl font-bold">Liste des utilisateurs</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {users.map((user) => (
          <Card key={user.id}>
            <CardContent className="p-4 space-y-2">
              <h3 className="text-lg font-semibold">
                {user.firstName} {user.lastName}
              </h3>
              <p><strong>Email :</strong> {user.email}</p>
              <p><strong>Rôle :</strong> {user.role}</p>
              {user.photoURL && (<img src={user.photoURL} alt="Avatar"
                className="w-16 h-16 rounded-full object-cover mb-2 border shadow" />)}
              {user.createdAt && (
                <p><strong>Inscrit le :</strong> {user.createdAt.toDate().toLocaleDateString()}</p>
              )}

              <div className="flex flex-wrap gap-2">
                {user.role !== "admin" ? (
                  <Button size="sm" variant="outline" onClick={() => handlePromote(user.id)}>
                    Promouvoir
                  </Button>
                ) : (
                  <Button size="sm" variant="secondary" onClick={() => handleDemote(user.id)}>
                    Rétrograder
                  </Button>
                )}
                <Button size="sm" variant="destructive" onClick={() => handleDelete(user.id)}>
                  Supprimer
                </Button>

                <Dialog open={modalOpen} onOpenChange={setModalOpen}>
                  <DialogTrigger asChild>
                    <Button
                      size="sm"
                      variant="destructive"
                      className="bg-blue-800 hover:bg-blue-900 text-white"
                      onClick={() => {
                        setModalOpen(true)
                        setEditUserId(user.id)
                        setEditFirstName(user.firstName)
                        setEditLastName(user.lastName)
                        setEditEmail(user.email)
                        setSelectedFile(user.photoURL || "")
                        setPreviewURL(user.photoURL || null)
                      }}
                    >
                      Modifier
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Modifier l'utilisateur</DialogTitle>
                      <p className="text-sm text-muted-foreground">
                        Modifie les informations et la photo de l'utilisateur.
                      </p>
                    </DialogHeader>
                    <div className="space-y-2">
                      <label className="block text-sm">Nom</label>
                      <Input value={editLastName} onChange={(e) => setEditLastName(e.target.value)} />
                      <label className="block text-sm">Prénom</label>
                      <Input value={editFirstName} onChange={(e) => setEditFirstName(e.target.value)} />
                      <label className="block text-sm">Email</label>
                      <Input value={editEmail} onChange={(e) => setEditEmail(e.target.value)} />
                      <label className="block text-sm">Photo de profil</label>
                      <Input type="file" accept="image/*" onChange={(e) => { const file = e.target.files?.[0] 
                        if (file) { setSelectedFile(file)
                         setPreviewURL(URL.createObjectURL(file)) } }} />

                    </div>
                    <DialogFooter>
                      <Button onClick={handleUpdateUser}>Enregistrer</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default Users
