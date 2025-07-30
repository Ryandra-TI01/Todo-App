import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import TaskList from "./TaskList";

export default function CompleteAccordian({
  tasks,
  hasMore,
  onLoadMore,
  onUpdate,
  onDelete,
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section className="border-t border-gray-300 pt-4">
      <button
        onClick={() => setIsExpanded((prev) => !prev)}
        className="flex items-center justify-between w-full text-left hover:bg-gray-50 rounded px-3 py-2"
      >
        <h3 className="text-sm font-medium text-gray-500">
          Completed ({tasks.length})
        </h3>
        {isExpanded ? (
          <ChevronDown className="w-4 h-4" />
        ) : (
          <ChevronRight className="w-4 h-4" />
        )}
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
              className="text-xs text-blue-600 hover:underline"
            >
              Load More
            </button>
          )}
        </div>
      )}
    </section>
  );
}
