import { useCallback, useEffect, useMemo, useState } from "react";
import { Clock, ChevronDown, ChevronRight } from "lucide-react";
import TaskForm from "./TaskForm";
import TaskItem from "./TaskItem";
import API from "../../api/axios";
import { useAuth } from "../../context/AuthContext";
import completeTask from "../../assets/illustrations/complete-task.svg";

export default function TaskSection() {
  const { token } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const fetchTasks = useCallback(async () => {
    if (!token) return;

    try {
      setError(null);
      const res = await API.get("/api/tasks", {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(res.data);
      setTasks(res.data.data);
    } catch (err) {
      console.error("❌ Error fetching tasks", err);
      setError("Failed to load tasks. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  // Memisahkan completed dan incomplete tasks
  const { incompleteTasks, completedTasks } = useMemo(() => {
    const incomplete = tasks.filter((task) => !task.is_completed);
    const completed = tasks.filter((task) => task.is_completed);
    return { incompleteTasks: incomplete, completedTasks: completed };
  }, [tasks]);

  const handleTaskChange = useCallback(() => {
    fetchTasks();
  }, [fetchTasks]);

  const toggleAccordion = useCallback(() => {
    setIsExpanded((prev) => !prev);
  }, []);

  // Loading state
  if (loading) {
    return (
      <div className="max-w-2xl mx-auto p-6 bg-white min-h-screen">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-20 bg-gray-200 rounded mb-4"></div>
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-16 bg-gray-200 rounded mb-2"></div>
          ))}
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="max-w-2xl mx-auto p-6 bg-white min-h-screen">
        <h2 className="text-xl font-semibold mb-2">📝 Your Tasks</h2>
        <div className="text-center py-8">
          <p className="text-red-500 mb-4">{error}</p>
          <button
            onClick={fetchTasks}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const hasNoTasks =
    incompleteTasks.length === 0 && completedTasks.length === 0;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white min-h-screen">
      <TaskForm onAdded={handleTaskChange} />

      {incompleteTasks.length === 0 && (
        <div className="text-center py-8">
          {/* <Clock className="w-12 h-12 mx-auto mb-3 text-gray-400" /> */}
          <img
            src={completeTask}
            alt="Task Completed"
            className="w-56 h-auto mx-auto mb-3 mt-14"
          />
          <p className="text-gray-500 mt-8">All tasks are done!</p>
        </div>
      )}
        <div className="space-y-4">
          {/* Incomplete Tasks */}
          {incompleteTasks.length > 0 && (
            <section aria-labelledby="incomplete-tasks">
              <h3 id="incomplete-tasks" className="sr-only">
                Incomplete Tasks
              </h3>
              <ul className="space-y-1" role="list">
                {incompleteTasks.map((task) => (
                  <TaskItem
                    key={task.id}
                    task={task}
                    onChange={handleTaskChange}
                  />
                ))}
              </ul>
            </section>
          )}

          {/* Completed Tasks Accordion */}
          {completedTasks.length > 0 && (
            <section
              className="border-t border-gray-300 pt-4"
              aria-labelledby="completed-tasks"
            >
              <button
                onClick={toggleAccordion}
                className="flex items-center justify-between w-full text-left hover:bg-gray-50 rounded px-3 py-2 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-expanded={isExpanded}
                aria-controls="completed-tasks-list"
              >
                <h3
                  id="completed-tasks"
                  className="text-sm font-medium text-gray-500"
                >
                  Completed ({completedTasks.length})
                </h3>
                {isExpanded ? (
                  <ChevronDown
                    className="w-4 h-4 text-gray-500"
                    aria-hidden="true"
                  />
                ) : (
                  <ChevronRight
                    className="w-4 h-4 text-gray-500"
                    aria-hidden="true"
                  />
                )}
              </button>

              {/* Accordion Content */}
              <div
                id="completed-tasks-list"
                className={`overflow-hidden transition-all duration-200 ease-in-out ${
                  isExpanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`}
                aria-hidden={!isExpanded}
              >
                <ul className="space-y-1 mt-2" role="list">
                  {completedTasks.map((task) => (
                    <TaskItem
                      key={task.id}
                      task={task}
                      onChange={handleTaskChange}
                    />
                  ))}
                </ul>
              </div>
            </section>
          )}
        </div>

    </div>
  );
}
