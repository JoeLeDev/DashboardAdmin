import { ReactNode } from "react"
import Sidebar from "../components/Sidebar"

type Props = {
  children: ReactNode
}

const AdminLayout = ({ children }: Props) => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 p-6 overflow-y-auto">{children}</main>
    </div>
  )
}

export default AdminLayout
