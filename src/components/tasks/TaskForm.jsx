import { Plus } from "lucide-react";
import { toast } from "react-toastify";
import Button from "../common/Button";
import { useTaskForm } from "../../hooks/useTaskForm";
import {
  getFormStyles,
  getPlusIconStyles,
  getInputStyles,
} from "../../utils/formStyles";

export default function TaskForm({ onAdded }) {
  const {
    state: {
      title,
      setTitle,
      description,
      setDescription,
      dueDate,
      setDueDate,
      isExpanded,
      setIsExpanded,
      isHovered,
      setIsHovered,
      isFocused,
      setIsFocused,
      loading,
      titleInputRef,
      formRef,
    },
    handlers: { handleKeyDown, onSubmit, resetForm },
  } = useTaskForm({ onAdded });

  return (
    <div
      ref={formRef}
      className={getFormStyles({ isExpanded, isFocused, isHovered })}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="p-4">
        <div className="flex items-start gap-3">
          <div className="w-5 h-5 flex-shrink-0 mt-0.5">
            <Plus
              className={`cursor-pointer ${getPlusIconStyles({
                isExpanded,
                isFocused,
                isHovered,
              })}`}
              onClick={() => setIsExpanded(!isExpanded)}
              aria-label={
                isExpanded ? "Collapse task form" : "Expand task form"
              }
            />
          </div>
          <div className="flex-1">
            <input
              ref={titleInputRef}
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onFocus={() => {
                setIsExpanded(true);
                setIsFocused(true);
              }}
              onBlur={() => setIsFocused(false)}
              onKeyDown={handleKeyDown}
              placeholder="Add new task"
              className={getInputStyles({ isExpanded, isFocused })}
              disabled={loading}
            />

            <div
              className={`overflow-hidden transition-all duration-300 ${
                isExpanded ? "max-h-96 opacity-100 mt-4" : "max-h-0 opacity-0"
              }`}
            >
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Add description"
                className="w-full text-sm placeholder-gray-400 border-none outline-none resize-none focus:placeholder-purple-400 transition-all duration-200"
                rows="2"
                disabled={loading}
                aria-multiline="true"
                aria-label="Task Description"
              />

              <div>
                <input
                  type="date"
                  name="dueDate"
                  id="dueDate"
                  value={dueDate.date}
                  onChange={(e) =>
                    setDueDate({ ...dueDate, date: e.target.value })
                  }
                  className="text-sm"
                />
                <br />
                <input
                  type="time"
                  name="dueDate"
                  id="dueDate"
                  value={dueDate.time}
                  onChange={(e) =>
                    setDueDate({ ...dueDate, time: e.target.value })
                  }
                  className="text-sm"
                />
              </div>
            </div>
          </div>
        </div>

        <div
          className={`flex justify-end gap-2 pt-3 border-t border-gray-100 transition-[max-height] duration-300 ${
            isExpanded ? "max-h-16 opacity-100 mt-4" : "max-h-0 opacity-0 mt-0"
          }`}
        >
          <Button
            onClick={resetForm}
            variant="cancel"
            width="inline"
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            onClick={async () => {
              try {
                await onSubmit();
                toast.success("Task added successfully!");
              } catch (err) {
                console.error("Error adding task", err);
                toast.error("Failed to add task.");
              }
            }}
            loading={loading}
            disabled={!title.trim() || loading}
            width="inline"
          >
            <Plus className="w-4 h-4 mr-1" /> Add Task
          </Button>
        </div>
      </div>
    </div>
  );
}
