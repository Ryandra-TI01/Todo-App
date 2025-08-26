import { Calendar, Clock } from "lucide-react";
import Loading from "../common/Loading";
import QuickStats from "./QuickStats";

export default function CalendarSection({
  loading,
  days,
  getTasksForDate,
  isToday,
  isSelected,
  setSelectedDate,
  selectedDate,
  selectedDateTasks,
  taskStatsQuery,
}) {
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "bg-red-500/20 border-red-400/50 text-red-800 dark:text-red-300";
      case "medium":
        return "bg-yellow-500/20 border-yellow-400/50 text-yellow-800 dark:text-yellow-300";
      case "low":
        return "bg-green-500/20  border-green-400/50 text-green-800 dark:text-green-300";
      default:
        return "bg-blue-500/20 border-blue-400/50 text-blue-300";
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Calendar Grid */}
      <div className="lg:col-span-2">
        <div className="bg-gray-50/10 dark:bg-white/10 backdrop-blur-xl dark:backdrop-blur-lg border border-white/20 rounded-2xl p-6 shadow-xl">
          {loading ? (
            <Loading />
          ) : (
            <>
              {/* Day Headers */}
              <div className="grid grid-cols-7 gap-2 mb-4">
                {dayNames.map((day) => (
                  <div
                    key={day}
                    className="text-center text-gray-800 dark:text-white/70 font-medium py-3"
                  >
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar Days */}
              <div className="grid grid-cols-7 gap-2">
                {days.map((day, index) => {
                  const dayTasks = getTasksForDate(day.date);
                  const isCurrentMonth = day.isCurrentMonth;
                  const isTodayDate = isToday(day.date);
                  const isSelectedDate = isSelected(day.date);

                  return (
                    <div
                      key={index}
                      onClick={() => setSelectedDate(day.date)}
                      className={`
                            relative p-3 min-h-[80px] rounded-xl cursor-pointer transition-all duration-300 border
                            ${
                              isCurrentMonth
                                ? "dark:bg-white/5 hover:bg-gray-400/10 dark:hover:bg-white/10 border-gray-500/10 dark:border-white/10"
                                : "dark:bg-white/5 border-gray-500/10 dark:border-white/5 dark:text-white"
                            }
                            ${
                              isTodayDate
                                ? "ring-2 ring-purple-400/50 bg-blue-500/10"
                                : ""
                            }
                            ${
                              isSelectedDate
                                ? "ring-2 ring-gray-500/20 dark:ring-white/50 bg-white/10"
                                : ""
                            }
                          `}
                    >
                      <div
                        className={`text-sm font-medium ${
                          isCurrentMonth
                            ? "text-gray-500 dark:text-white"
                            : "text-gray-400 dark:text-white/40"
                        }`}
                      >
                        {day.date.getDate()}
                      </div>

                      {/* Task indicators */}
                      <div className="mt-2 space-y-1">
                        {dayTasks.slice(0, 2).map((task) => (
                          <div
                            key={task.id}
                            className={`text-xs px-2 py-1 rounded border text-center ${getPriorityColor(
                              `${task.priority}`
                              // `high`
                            )} ${
                              task.is_completed ? "opacity-50 line-through" : ""
                            }`}
                          >
                            {task.title.length > 8
                              ? task.title.substring(0, 8) + "..."
                              : task.title}
                          </div>
                        ))}
                        {dayTasks.length > 2 && (
                          <div className="text-xs text-gray-400 dark:text-white/60 text-center">
                            +{dayTasks.length - 2} more
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Tasks Sidebar */}
      <div className="space-y-6">
        {/* Selected Date Tasks */}
        <div className="bg-white/10 backdrop-blur-xl dark:backdrop-blur-lg border border-white/20 rounded-2xl p-6 shadow-xl">
          <div className="flex items-center space-x-3 mb-4">
            <Clock className="w-5 h-5 text-gray-500 dark:text-white" />
            <h3 className="text-xl font-semibold text-gray-500 dark:text-white">
              {selectedDate.toLocaleDateString("id-ID", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </h3>
          </div>

          <div className="space-y-3">
            {selectedDateTasks.length === 0 ? (
              <div className="text-center text-gray-500 dark:text-white/60 py-8">
                <Calendar className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>No tasks for this day</p>
              </div>
            ) : (
              selectedDateTasks.map((task) => (
                <div
                  key={task.id}
                  className={`p-4 rounded-xl border backdrop-blur-sm ${getPriorityColor(
                    task.priority
                  )} ${task.is_completed ? "opacity-60" : ""}`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4
                        className={`font-medium ${
                          task.is_completed ? "line-through" : ""
                        }`}
                      >
                        {task.title}
                      </h4>
                      {task.due_date && (
                        <p className="text-sm opacity-75 mt-1">
                          {task.due_date}
                        </p>
                      )}
                    </div>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        task.priority === "high"
                          ? "bg-red-500/30"
                          : task.priority === "medium"
                          ? "bg-yellow-500/30"
                          : "bg-green-500/30"
                      }`}
                    >
                      {task.priority}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Quick Stats */}
        <QuickStats stats={taskStatsQuery.data || {}} />
      </div>
    </div>
  );
}
