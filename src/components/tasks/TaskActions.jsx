import { Edit3, Trash2 } from "lucide-react";

export default function TaskActions({ isVisible, onEdit, onDelete }) {
  return (
    <div className={`flex items-center gap-1 ml-2 transition-all ${isVisible ? "opacity-100" : "opacity-0"}`}>
      <button onClick={onEdit} className="p-1 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded">
        <Edit3 className="w-4 h-4" />
      </button>
      <button onClick={onDelete} className="p-1 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded">
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );
}
