import { ChevronLeft, ChevronRight, Calendar, Plus } from "lucide-react";
import ModalTaskForm from "./ModalTaskForm";
import { useModal } from "../../context/ModalProvider";

export default function HeaderSection({navigateMonth, currentDate, viewMode, setViewMode}) {
  const { openModal } = useModal();

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return (
    <div className="bg-gray-50/10 dark:bg-white/10 backdrop-blur-xl dark:backdrop-blur-lg  border-t dark:border border-gray-400/10 dark:border-white/20 rounded-2xl p-6 mb-6 shadow-xl">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
            <Calendar className="w-6 h-6 text-gray-600 dark:text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-600 dark:text-white">
              Calendar
            </h1>
            <p className="text-gray-500 dark:text-white/70">
              Manage your tasks efficiently
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => openModal(<ModalTaskForm />)}
            className="cursor-pointer flex items-center space-x-2 bg-gray-600 dark:bg-white/10 hover:bg-gray-500 dark:hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-2 text-white transition-all duration-300"
          >
            <Plus className="w-4 h-4" />
            <span>Add Task</span>
          </button>

          <div className="flex bg-gray-400 dark:bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl overflow-hidden">
            <button
              onClick={() => setViewMode("month")}
              className={`px-4 py-2 text-sm transition-all duration-300 ${
                viewMode === "month"
                  ? "bg-gray-600 dark:bg-white/20 text-white"
                  : "text-white hover:text-white"
              }`}
            >
              Month
            </button>
            <button
              onClick={() => setViewMode("week")}
              className={`px-4 py-2 text-sm transition-all duration-300 ${
                viewMode === "week"
                  ? "bg-gray-600 dark:bg-white/20 text-white"
                  : "text-white/80 hover:text-white"
              }`}
            >
              Week
            </button>
          </div>
        </div>
      </div>

      {/* Month Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigateMonth(-1)}
          className="p-2 text-gray-600 dark:text-white hover:text-white hover:bg-gray-400 dark:hover:bg-white/10 rounded-xl transition-all duration-300 "
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <h2 className="text-2xl font-semibold text-gray-600 dark:text-white">
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h2>

        <button
          onClick={() => navigateMonth(1)}
          className="p-2 text-gray-600 dark:text-white hover:text-white hover:bg-gray-400 dark:hover:bg-white/10 rounded-xl transition-all duration-300 "
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
