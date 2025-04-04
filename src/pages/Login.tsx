import { useState, useEffect } from "react"
import { logIn } from "../services/AuthService"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { useTheme } from "../context/ThemeContext"

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()
  const { user } = useAuth()
  const { theme, toggleTheme } = useTheme()

  useEffect(() => {
    if (user) navigate("/dashboard")
  }, [user, navigate])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await logIn(email, password)
      navigate("/dashboard")
    } catch {
      setError("Email ou mot de passe incorrect.")
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 shadow-xl rounded-xl p-8 space-y-6 w-full max-w-md transition-all"
      >
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Connexion</h1>
          <button
            type="button"
            onClick={toggleTheme}
            className="text-sm text-gray-500 dark:text-gray-300 hover:underline"
          >
            {theme === "dark" ? "☀️" : "🌙"}
          </button>
        </div>
  

        {error && (
          <p className="text-red-500 text-sm bg-red-100 dark:bg-red-900 p-2 rounded">
            {error}
          </p>
        )}
  
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
  
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
  

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition-colors"
        >
          Se connecter
        </button>
  

        <p className="text-sm text-center text-gray-600 dark:text-gray-400">
          Pas encore de compte ?{" "}
          <a href="/signup" className="text-blue-500 hover:underline">
            Créer un compte
          </a>
        </p>
      </form>
    </div>
  )  
}

export default Login
