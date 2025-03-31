import { Link, useNavigate } from "react-router-dom"
import { logOut } from "../services/AuthService"
import { useAuth } from "../context/AuthContext"

const Sidebar = () => {
  const navigate = useNavigate()
  const { user } = useAuth()

  const handleLogout = async () => {
    try {
      await logOut()
      navigate("/login")
    } catch (err) {
      console.error("Erreur lors du logout :", err)
    }
  }

  return (
    <aside className="w-64 bg-gray-800 text-white p-4 flex flex-col justify-between h-full">
      <div>
        <h2 className="text-lg font-bold mb-4">Dashify</h2>
        <nav className="flex flex-col gap-2">
          <Link to="/dashboard" className="hover:text-blue-300">Dashboard</Link>
          <Link to="/users" className="hover:text-blue-300">Utilisateurs</Link>
          <Link to="/settings" className="hover:text-blue-300">Paramètres</Link>
        </nav>
      </div>

      {user && (
        <button
          onClick={handleLogout}
          className="mt-8 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
        >
          Se déconnecter
        </button>
      )}
    </aside>
  )
}

export default Sidebar
