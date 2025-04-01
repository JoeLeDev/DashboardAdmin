import { useEffect, useState } from "react"
import { getCollectionCount } from "../services/FirestoreService"

const Dashboard = () => {
  const [stats, setStats] = useState({
    Users: 0,
    sessions: 0,
    feedbacks: 0,
  })

  useEffect(() => {
    const fetchStats = async () => {
      const [Users, sessions, feedbacks] = await Promise.all([
        getCollectionCount("Users"),
        getCollectionCount("sessions"),
        getCollectionCount("feedbacks"),
      ])
      setStats({ Users, sessions, feedbacks })
    }

    fetchStats()
  }, [])

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Bienvenue sur le Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard title="Utilisateurs" value={stats.Users} />
        <StatCard title="Sessions actives" value={stats.sessions} />
        <StatCard title="Feedbacks" value={stats.feedbacks} />
      </div>
    </div>
  )
}

const StatCard = ({ title, value }: { title: string; value: number }) => (
  <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
    <h2 className="text-sm text-gray-500 dark:text-gray-400">{title}</h2>
    <p className="text-2xl font-semibold text-gray-800 dark:text-white">{value}</p>
  </div>
)

export default Dashboard
