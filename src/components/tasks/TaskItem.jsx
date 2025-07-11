import { useAuth } from "../../context/AuthContext";
import API from "../../api/axios";
import { useCallback, useState } from "react";
import { Calendar, Check, Trash2 } from "lucide-react";
import { toast } from "react-toastify";

export default function TaskItem({ task, onChange }) {
  const { token } = useAuth();
  const [isHovered, setIsHovered] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const toggleTask = async () => {
    if (isUpdating) return;

    setIsUpdating(true);
    try {
      await API.put(
        `/api/tasks/${task.id}`,
        { is_completed: !task.is_completed },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Task updated successfully!");
      onChange();
    } catch (err) {
      console.error("❌ Gagal update", err);
    } finally {
      setIsUpdating(false);
    }
  };

  const deleteTask = async () => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        await API.delete(`/api/tasks/${task.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        onChange();
      } catch (err) {
        console.error("❌ Gagal delete", err);
      }
    }
  };

  const formatDate = useCallback((dateString) => {
    if (!dateString) return "";
      return new Date(dateString).toLocaleString("en-US", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false
  });

  }, []);

  return (
    <li
      className="group flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors duration-150 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Custom Radio/Checkbox Button - Google Tasks Style */}
      <button
        onClick={toggleTask}
        disabled={isUpdating}
        className={`
          relative w-5 h-5 rounded-full border-2 transition-all duration-200 flex-shrink-0 mt-0.5 cursor-pointer
          ${
            task.is_completed
              ? "bg-blue-500 border-blue-500 hover:bg-blue-600 hover:border-blue-600"
              : "border-gray-300 hover:border-blue-400 bg-white"
          }
          ${isHovered && !task.is_completed ? "border-blue-400" : ""}
          ${isUpdating ? "opacity-50 cursor-not-allowed" : ""}
        `}
      >
        {task.is_completed ? (
          <Check className="w-3 h-3 text-white absolute top-0.5 left-0.5" />
        ): null}
        {/* Hover effect for incomplete tasks */}
        {isHovered && !task.is_completed && (
          <div className="absolute inset-0 bg-blue-100 rounded-full opacity-30" />
        )}
      </button>

      {/* Task Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3
              className={`
                text-sm font-medium leading-relaxed break-words text-start
                ${
                  task.is_completed
                    ? "line-through text-gray-500"
                    : "text-gray-900"
                }
              `}
            >
              {task.title}
            </h3>

            {task.description && (
              <p
                className={`
                  text-xs mt-1 leading-relaxed break-words text-start
                  ${
                    task.is_completed
                      ? "line-through text-gray-400"
                      : "text-gray-600"
                  }
                `}
              >
                {task.description}
              </p>
            )}

            {task.due_date && (
              <div
                className={`
                flex items-center gap-1 mt-2 text-xs
                ${task.is_completed ? "text-gray-400" : "text-gray-500"}
              `}
              >
                <Calendar className="w-3 h-3" />
                <span>{formatDate(task.due_date)}</span>
              </div>
            )}
          </div>

          {/* Action Buttons - Only show on hover */}
          <div
            className={`
            flex items-center gap-1 ml-2 transition-opacity duration-150
            ${isHovered ? "opacity-100" : "opacity-0"}
          `}
          >
            <button
              onClick={deleteTask}
              className="p-1 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
              title="Delete task"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </li>
  );
}
