const Dashboard = () => {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Bienvenue sur le Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <h2 className="text-sm text-gray-500 dark:text-gray-400">Utilisateurs</h2>
          <p className="text-2xl font-semibold text-gray-800 dark:text-white">1 024</p>
        </div>

        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <h2 className="text-sm text-gray-500 dark:text-gray-400">Sessions actives</h2>
          <p className="text-2xl font-semibold text-gray-800 dark:text-white">128</p>
        </div>

        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <h2 className="text-sm text-gray-500 dark:text-gray-400">Feedbacks</h2>
          <p className="text-2xl font-semibold text-gray-800 dark:text-white">37</p>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
