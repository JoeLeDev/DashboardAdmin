import { Link } from "react-router-dom"

const Sidebar = () => {
  return (
    <aside className="w-64 bg-gray-800 text-white p-4 space-y-4">
      <h2 className="text-lg font-bold">Dashify</h2>
      <nav className="flex flex-col gap-2">
        <Link to="/dashboard" className="hover:text-blue-300">Dashboard</Link>
        <Link to="/users" className="hover:text-blue-300">Utilisateurs</Link>
        <Link to="/settings" className="hover:text-blue-300">Paramètres</Link>
      </nav>
    </aside>
  )
}

export default Sidebar
