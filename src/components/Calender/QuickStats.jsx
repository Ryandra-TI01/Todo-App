export default function QuickStats({ stats }) {
  return (
    <div className="bg-gray-50/10 dark:bg-white/10 backdrop-blur-2xl dark:backdrop-blur-lg border border-white/20 rounded-2xl p-6 shadow-xl">
      <h3 className="text-lg font-semibold text-gray-600 dark:text-white mb-4">Quick Stats</h3>
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500 dark:text-white/70">Total Tasks</span>
          <span className="text-gray-500 dark:text-white font-semibold">{stats.total}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500 dark:text-white/70">Completed</span>
          <span className="text-green-400 font-semibold">
            {stats.completed}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500 dark:text-white/70">Incomplete</span>
          <span className="text-red-400 font-semibold">{stats.active}</span>
        </div>
      </div>
    </div>
  );
}
