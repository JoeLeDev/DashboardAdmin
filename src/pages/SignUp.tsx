import { useState, useEffect } from "react"
import { signUp } from "../services/AuthService"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { FirebaseError } from "firebase/app"

const SignUp = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [error, setError] = useState("")
    const navigate = useNavigate()
    const { user } = useAuth()

    useEffect(() => {
        if (user) {
            navigate("/dashboard")
        }
    }, [user, navigate])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (password.length < 6) {
            setError("Le mot de passe doit contenir au moins 6 caractères.")
            return
        }

        if (password !== confirmPassword) {
            setError("Les mots de passe ne correspondent pas.")
            return
        }

        try {
            await signUp(email, password)
            navigate("/dashboard")
        } catch (err) {
            console.error(err)
            if (err instanceof FirebaseError) {
                if (err.code === "auth/email-already-in-use") {
                    setError("Cet email est déjà utilisé.")
                } else {
                    setError("Erreur lors de l'inscription.")
                }
            } else {
                setError("Une erreur inconnue s'est produite.")
            }
        }
    }

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md space-y-4 w-full max-w-sm">
                <h1 className="text-xl font-bold">Créer un compte</h1>

                {error && <p className="text-red-500 text-sm">{error}</p>}

                <input
                    className="border p-2 w-full"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    className="border p-2 w-full"
                    type="password"
                    placeholder="Mot de passe"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <input
                    className="border p-2 w-full"
                    type="password"
                    placeholder="Confirmer le mot de passe"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />

                <button className="bg-blue-600 text-white p-2 w-full rounded hover:bg-blue-700">
                    S’inscrire
                </button>
                <p className="text-sm text-center">
                    Déjà un compte ?{" "}
                    <a href="/login" className="text-blue-600 hover:underline">
                        Se connecter
                    </a>
                </p>
            </form>
        </div>
    )
}

export default SignUp
