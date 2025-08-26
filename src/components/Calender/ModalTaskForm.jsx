import { useState } from "react";
import { useTasks } from "../../hooks/useTasks";
import { useModal } from "../../context/ModalProvider";
import Button from "../common/Button";
export default function ModalTaskForm() {
  const { addTask } = useTasks();
  const { closeModal } = useModal();

  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    priority: "",
  });

  const handleAddTask = () => {
    if (!newTask.title || !newTask.date) return;

    addTask.mutate({
      title: newTask.title,
      description: newTask.description,
      due_date: `${newTask.date}T${newTask.time || "00:00:00"}`,
      priority: newTask.priority || "low",
    });

    setNewTask({
      title: "",
      description: "",
      date: "",
      time: "",
      priority: "",
    });
    closeModal();
  };

  return (
    <div className="max-w-2xl mx-auto">
      <form>
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Add New Task
        </h3>

        <div className="space-y-4">
          {/* Title Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Task Title
            </label>
            <input
              type="text"
              placeholder="Enter task title..."
              value={newTask.title}
              onChange={(e) =>
                setNewTask({ ...newTask, title: e.target.value })
              }
              required
              autoFocus
              className="w-full p-3 bg-white border border-gray-300 dark:border-gray-600 text-gray-800 rounded-xl placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200hover:border-gray-400"
            />
          </div>

          {/* Description Textarea */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              value={newTask.description}
              onChange={(e) =>
                setNewTask({ ...newTask, description: e.target.value })
              }
              placeholder="Enter task description..."
              rows={4}
              className="w-full p-3 bg-white border border-gray-300 dark:border-gray-600 text-gray-800 rounded-xl placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200hover:border-gray-400 resize-none"
            />
          </div>

          {/* Date and Time Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date
              </label>
              <input
                type="date"
                value={newTask.date}
                required
                onChange={(e) =>
                  setNewTask({ ...newTask, date: e.target.value })
                }
                className="w-full p-3 bg-white border border-gray-300 dark:border-gray-600 text-gray-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200hover:border-gray-400 [color-scheme:light] dark:[color-scheme:dark]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Time
              </label>
              <input
                type="time"
                value={newTask.time}
                onChange={(e) =>
                  setNewTask({ ...newTask, time: e.target.value })
                }
                className="w-full p-3 bg-white border border-gray-300 dark:border-gray-600 text-gray-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200hover:border-gray-400 [color-scheme:light] dark:[color-scheme:dark]"
              />
            </div>
          </div>

          {/* Priority Select */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Priority Level
            </label>
            <select
              value={newTask.priority}
              onChange={(e) =>
                setNewTask({ ...newTask, priority: e.target.value })
              }
              className="w-full p-3 bg-white border border-gray-300 dark:border-gray-600 text-gray-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
            >
              <option value="low" className="bg-whitetext-gray-800">
                🟢 Low Priority
              </option>
              <option value="medium" className="bg-whitetext-gray-800">
                🟡 Medium Priority
              </option>
              <option value="high" className="bg-whitetext-gray-800">
                🔴 High Priority
              </option>
            </select>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 mt-6">
          <Button onClick={closeModal} variant="cancel">
            Cancel
          </Button>
          <Button
            type="submit"
            onClick={handleAddTask}
            disabled={!newTask.title.trim()}
          >
            Add Task
          </Button>
        </div>
      </form>
    </div>
  );
}
