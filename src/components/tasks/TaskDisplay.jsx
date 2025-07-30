import { Calendar } from "lucide-react";

export default function TaskDisplay({ title, description, dueDate, completed, onEdit }) {
  const formatDate = (dateString) =>
    new Date(dateString).toLocaleString("en-US", {
      weekday: "short", year: "numeric", month: "short", day: "numeric",
      hour: "2-digit", minute: "2-digit", hour12: false,
    });

  return (
    <div className="flex-1 cursor-pointer" onClick={onEdit}>
      <h3 className={`text-sm text-start font-medium break-words ${completed ? "line-through text-gray-500" : "text-gray-900"}`}>
        {title}
      </h3>
      {description && (
        <p className={`text-xs mt-1 break-words ${completed ? "line-through text-gray-400" : "text-gray-600"}`}>
          {description}
        </p>
      )}
      {dueDate && (
        <div className={`flex items-center gap-1 mt-2 text-xs ${completed ? "text-gray-400" : "text-gray-500"}`}>
          <Calendar className="w-3 h-3" />
          <span>{formatDate(dueDate)}</span>
        </div>
      )}
    </div>
  );
}
