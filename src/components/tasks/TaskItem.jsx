import { useState, useEffect, useRef } from "react";
import TaskCheckbox from "./TaskCheckbox";
import TaskDisplay from "./TaskDisplay";
import TaskActions from "./TaskActions";
import TaskEditForm from "./TaskEditForm";
import { toast } from "react-toastify";
import { useTaskEdit } from "../../context/TaskEditContext";
import { motion, AnimatePresence } from "framer-motion";

export default function TaskItem({ task, onUpdate, onDelete }) {
  // Context for editing tasks
  const { editingId, setEditingId } = useTaskEdit();
  const [isHovered, setIsHovered] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // State for editing
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDescription, setEditDescription] = useState(
    task.description || ""
  );
  const [editDueDate, setEditDueDate] = useState({ date: "", time: "" });

  // Check if the current task is being edited
  const isEditing = editingId === task.id;

  // Set initial due date if available
  useEffect(() => {
    if (task.due_date) {
      const date = new Date(task.due_date);
      setEditDueDate({
        date: date.toISOString().split("T")[0],
        time: date.toTimeString().slice(0, 5),
      });
    }
  }, [task.due_date]);

  // Handlers for task actions
  const handleEdit = () => setEditingId(task.id);
  const handleCancel = () => setEditingId(null);

  // Toggle completion status
  const handleToggle = () => {
    if (isEditing || isSaving) return;
    setIsAnimating(true);
    setTimeout(() => {
      onUpdate({ ...task, is_completed: !task.is_completed });
      setIsAnimating(false);
    }, 400);
  };
  // Delete task confirmation
  const handleDelete = () => {
    if (window.confirm("Are you sure?")) {
      onDelete(task.id);
    }
  };

  // Save edited task
  const saveEdit = () => {
    if (!editTitle.trim()) return toast.error("Title cannot be empty");
    const dueDate =
      editDueDate.date && editDueDate.time
        ? `${editDueDate.date}T${editDueDate.time}:00`
        : editDueDate.date
        ? `${editDueDate.date}T00:00:00`
        : null;

    const updatedTask = {
      ...task,
      title: editTitle.trim(),
      description: editDescription,
      due_date: dueDate,
    };
    setIsSaving(true);
    onUpdate(updatedTask);
    setIsSaving(false);
    setEditingId(null);
  };

  return (
    <li
      className={`group flex items-start gap-3 p-3 rounded-lg transition-[box-shadow] duration-300 dark:bg-white/10 backdrop-blur-xl border border-white/20 ${
        isEditing ? "shadow border border-gray-100" : "dark:hover:bg-white/5"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <TaskCheckbox
        completed={task.is_completed}
        onToggle={handleToggle}
        isHovered={isHovered}
        isAnimating={isAnimating}
        isSaving={isSaving}
      />
      <div className="flex-1 min-w-0">
          {!isEditing ? (
            <div
              key="view"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <div className="flex items-start justify-between">
                <TaskDisplay
                  title={task.title}
                  description={task.description}
                  dueDate={task.due_date}
                  completed={task.is_completed}
                  onEdit={handleEdit}
                />
                <TaskActions
                  isVisible={isHovered}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              </div>
            </div>
          ) : (
            <motion.div
              key="edit"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <TaskEditForm
                title={editTitle}
                description={editDescription}
                dueDate={editDueDate}
                onTitleChange={(e) => setEditTitle(e.target.value)}
                onDescChange={(e) => setEditDescription(e.target.value)}
                onDueDateChange={setEditDueDate}
                onCancel={handleCancel}
                onSave={saveEdit}
                isSaving={isSaving}
              />
            </motion.div>
          )}
      </div>
    </li>
  );
}
