import { useState, useEffect } from "react"
import { useAuth } from "../context/AuthContext"
import { logIn } from "../services/AuthService"
import { useNavigate } from "react-router-dom"

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { user } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (user) {
      navigate("/dashboard")
    }
  }, [user, navigate])
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await logIn(email, password)
      navigate("/dashboard")
    } catch (err) {
      console.error("Erreur de login:", err)
    }
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md space-y-4 w-full max-w-sm">
        <h1 className="text-xl font-bold">Connexion</h1>
        <input
          className="border p-2 w-full"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="border p-2 w-full"
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="bg-blue-600 text-white p-2 w-full rounded hover:bg-blue-700">
          Se connecter
        </button>
        <p className="text-sm mt-4 text-center">
          Pas encore de compte ?{" "}
          <a href="/signup" className="text-blue-600 hover:underline">Créer un compte</a>
        </p>

      </form>
    </div>
  )
}

export default Login
