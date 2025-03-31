import { render, screen, fireEvent } from "@testing-library/react"
import SignUp from "../SignUp"
import { BrowserRouter } from "react-router-dom"
import { describe, expect, it, vi } from "vitest"
import AuthContext from "../../context/AuthContext"

// Mock du service d’auth
vi.mock("../../services/authService", () => ({
  signUp: vi.fn(() => Promise.resolve()),
}))

const customRender = (ui: React.ReactElement) => {
  return render(
    <AuthContext.Provider value={{ user: null, loading: false }}>
      <BrowserRouter>{ui}</BrowserRouter>
    </AuthContext.Provider>
  )
}

describe("SignUp", () => {
  it("affiche une erreur si les mots de passe ne correspondent pas", async () => {
    customRender(<SignUp />)

    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "test@mail.com" },
    })
    fireEvent.change(screen.getByPlaceholderText("Mot de passe"), {
      target: { value: "azerty123" },
    })
    fireEvent.change(screen.getByPlaceholderText("Confirmer le mot de passe"), {
      target: { value: "different123" },
    })

    fireEvent.click(screen.getByRole("button", { name: /s’inscrire/i }))

    expect(
      await screen.findByText("Les mots de passe ne correspondent pas.")
    ).toBeInTheDocument()
  })

  it("affiche une erreur si le mot de passe est trop court", async () => {
    customRender(<SignUp />)

    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "test@mail.com" },
    })
    fireEvent.change(screen.getByPlaceholderText("Mot de passe"), {
      target: { value: "123" },
    })
    fireEvent.change(screen.getByPlaceholderText("Confirmer le mot de passe"), {
      target: { value: "123" },
    })

    fireEvent.click(screen.getByRole("button", { name: /s’inscrire/i }))

    expect(
      await screen.findByText("Le mot de passe doit contenir au moins 6 caractères.")
    ).toBeInTheDocument()
  })
})
