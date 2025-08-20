import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import TaskList from "./TaskList";

export default function CompleteAccordian({
  tasks,
  hasMore,
  onLoadMore,
  onUpdate,
  onDelete,
  tasksLength = tasks.length,
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section className="border-t border-gray-300 pt-4">
      <button
        onClick={() => setIsExpanded((prev) => !prev)}
        className="flex items-center justify-between w-full text-left rounded-lg px-3 py-2 hover:bg-gray-100 dark:hover:bg-white/10 backdrop-blur-xl  transition-colors duration-200"
      >
        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-200">
          Completed ({tasksLength})
        </h3>
        <ChevronRight className={`w-4 h-4 text-gray-800 dark:text-gray-200 ${isExpanded && "rotate-90"} duration-200 ease-in-out`} />
      </button>

      {isExpanded && (
        <div className="mt-2 space-y-2">
          <TaskList
            tasks={tasks}
            onUpdate={onUpdate}
            onDelete={onDelete}
          />
          {hasMore && (
            <button
              onClick={onLoadMore}
              className="text-xs text-purple-500 dark:text-white hover:underline"
            >
              Load More
            </button>
          )}
        </div>
      )}
    </section>
  );
}
