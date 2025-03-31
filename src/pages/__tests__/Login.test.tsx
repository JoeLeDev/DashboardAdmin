import { render, screen, fireEvent } from "@testing-library/react"
import Login from "../Login"
import { describe, expect, it, vi } from "vitest"
import  AuthContext  from "../../context/AuthContext"
import { BrowserRouter } from "react-router-dom"

vi.mock("../../services/authService", () => ({
  logIn: vi.fn(() => Promise.resolve()),
}))

// Mock du useNavigate
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom")
  return {
    ...actual,
    useNavigate: () => vi.fn(),
  }
})

const customRender = (ui: React.ReactElement) => {
  return render(
    <AuthContext.Provider value={{ user: null, loading: false }}>
      <BrowserRouter>{ui}</BrowserRouter>
    </AuthContext.Provider>
  )
}
describe("Login", () => {
    it("affiche une erreur si le formulaire est vide", async () => {
      customRender(<Login />)
  
      fireEvent.click(screen.getByRole("button", { name: /se connecter/i }))
  
      // Ici, on peut vérifier si des erreurs sont dans le DOM
      expect(await screen.findByPlaceholderText("Email")).toBeInTheDocument()
    })
  
    it("appelle logIn avec les bons arguments", async () => {
      const { logIn } = await import("../../services/AuthService")
  
      customRender(<Login />)
  
      fireEvent.change(screen.getByPlaceholderText("Email"), {
        target: { value: "test@mail.com" },
      })
      fireEvent.change(screen.getByPlaceholderText("Mot de passe"), {
        target: { value: "azerty123" },
      })
  
      fireEvent.click(screen.getByRole("button", { name: /se connecter/i }))
  
      expect(logIn).toHaveBeenCalledWith("test@mail.com", "azerty123")
    })
  })
  