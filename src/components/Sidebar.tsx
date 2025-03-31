import { Link, useLocation } from 'react-router-dom'
import { LayoutDashboard, Users, Settings, LogOut } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const navItems = [
  { label: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/dashboard' },
  { label: 'Users', icon: <Users size={20} />, path: '/users' },
  { label: 'Settings', icon: <Settings size={20} />, path: '/settings' },
]

const Sidebar = () => {
  const location = useLocation()
  const { toggleTheme, theme } = useTheme()
  const { logout } = useAuth()

  const navigate = useNavigate()
const handleLogout = async () => {
  await logout()
  navigate('/login')
}
  return (
    <aside className="h-screen w-64 bg-white dark:bg-gray-800 shadow-lg flex flex-col justify-between">
      {/* Top : logo + toggle */}
      <div>
        <div className="p-6 text-2xl font-bold text-gray-800 dark:text-white">
          AdminPanel
        </div>
        <button
          onClick={toggleTheme}
          className="ml-6 mb-4 text-sm text-gray-500 dark:text-gray-300 hover:underline"
        >
          {theme === 'dark' ? '☀️ ' : '🌙 '}
        </button>

        <nav className="flex flex-col">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-6 py-3 text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition ${
                location.pathname === item.path
                  ? 'bg-gray-100 dark:bg-gray-700 text-blue-600'
                  : 'text-gray-700 dark:text-gray-300'
              }`}
            >
              {item.icon}
              {item.label}
            </Link>
          ))}
        </nav>
      </div>

      
      <div className="p-6 border-t border-gray-200 dark:border-gray-700">
        <button
          onClick={logout}
          className="flex items-center gap-2 text-sm text-red-500 hover:text-red-600"
        >
          <LogOut size={18}
          onClick={handleLogout} />
          Déconnexion
        </button>
      </div>
    </aside>
  )
}

export default Sidebar
