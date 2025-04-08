import { Navigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import Loader from "./ui/Loader"

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const { user, loading } = useAuth()

  if (loading) {
    return <Loader/>
  }

  return user ? children : <Navigate to="/login" />
}

export default PrivateRoute
