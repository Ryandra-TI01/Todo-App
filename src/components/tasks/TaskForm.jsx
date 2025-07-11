import { useAuth } from "../../context/AuthContext";
import API from "../../api/axios";
import Button from "../common/Button";
import { useCallback, useState, useRef, useEffect } from "react";
import { Plus } from "lucide-react";
import { toast } from "react-toastify";
import CustomDateTimePicker from "../common/CustomDateTimePicker";

export default function TaskForm({ onAdded }) {
  const { token } = useAuth();
  const [loading, setLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState({ date: "", time: "" }); // Changed to object
  const titleInputRef = useRef(null);
  const formRef = useRef(null);

  // Auto-focus title when expanded
  useEffect(() => {
    if (isExpanded && titleInputRef.current) {
      titleInputRef.current.focus();
    }
  }, [isExpanded]);

  // Close form when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (formRef.current && !formRef.current.contains(event.target)) {
        if (!title.trim() && !description.trim() && !dueDate.date && !dueDate.time) {
          setIsExpanded(false);
          setIsFocused(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [title, description, dueDate]);

  // Reset form
  const resetForm = () => {
    setTitle("");
    setDescription("");
    setDueDate({ date: "", time: "" });
    setIsExpanded(false);
    setIsFocused(false);
  };

  const onSubmit = async () => {
    if (!title.trim()) return;

    setLoading(true);
    try {
      // Format due_date for API (combine date and time if both exist)
      const dueDateString = dueDate.date && dueDate.time 
        ? `${dueDate.date}T${dueDate.time}:00`
        : null;

      await API.post(
        "/api/tasks",
        {
          title: title.trim(),
          description: description.trim(),
          due_date: dueDateString,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Task added successfully!");
      resetForm();
      onAdded();
    } catch (err) {
      console.error("❌ Error adding task", err);
      toast.error("Failed to add task. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        onSubmit();
      }
      if (e.key === "Escape") {
        resetForm();
      }
    },
    [title, description, dueDate, onAdded, token]
  );

  const handleFocus = () => {
    setIsExpanded(true);
    setIsFocused(true);
  };

  const handleToggleFocus = () => {
    setIsExpanded(!isExpanded);
    setIsFocused(!isFocused);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  // Dynamic styling based on state
  const getFormStyles = () => {
    let baseStyles = "mb-4 bg-white border border-gray-200 rounded-lg transition-all duration-200 ease-in-out transform";
    
    if (isExpanded || isFocused) {
      return `${baseStyles} border-gray-300 scale-[1.02]`;
    } else if (isHovered) {
      return `${baseStyles} border-gray-300 scale-[1.01]`;
    } else {
      return `${baseStyles} `;
    }
  };

  const getPlusIconStyles = () => {
    if (isExpanded || isFocused) {
      return `w-5 h-5 text-purple-500 transform ${isExpanded ? 'rotate-45' : 'rotate-0'} transition-all duration-200`;
    } else if (isHovered) {
      return "w-5 h-5 text-purple-500 transition-all duration-200";
    } else {
      return "w-5 h-5 text-gray-400 transition-all duration-200";
    }
  };

  const getInputStyles = () => {
    return `w-full text-sm placeholder-gray-500 border-none outline-none resize-none transition-all duration-200 ${
      (isExpanded || isFocused) ? 'focus:placeholder-purple-400' : 'placeholder-gray-500'
    }`;
  };

  return (
    <div 
      ref={formRef}
      className={getFormStyles()}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="p-4">
        <div className="flex items-start gap-3">
          <div className="w-5 h-5 flex-shrink-0 mt-0.5">
            <Plus className={`cursor-pointer ${getPlusIconStyles()}`} onClick={handleToggleFocus} />
          </div>

          <div className="flex-1">
            <input
              ref={titleInputRef}
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onFocus={handleFocus}
              onBlur={handleBlur}
              onKeyDown={handleKeyDown}
              placeholder="Add new task"
              className={getInputStyles()}
              disabled={loading}
            />

            {/* Animated expansion */}
            <div 
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                isExpanded ? 'max-h-96 opacity-100 mt-6' : 'max-h-0 opacity-0'
              }`}
            >
              <div className="">
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Add description"
                  className="w-full text-sm placeholder-gray-400 border-none outline-none resize-none focus:placeholder-purple-400 transition-all duration-200"
                  rows="2"
                  disabled={loading}
                />

                <div className="flex items-center gap-2 group">
                  <CustomDateTimePicker
                    value={dueDate}
                    onChange={setDueDate}
                    placeholder="Due date"
                    showTime={true}
                    timeInterval={15}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action buttons with smooth slide-in */}
        <div 
          className={`flex items-center justify-end gap-2 border-t pt-2 border-gray-100 transition-all duration-300 ease-in-out ${
            isExpanded ? 'max-h-16 opacity-100 mt-4' : 'max-h-0 opacity-0 mt-0'
          }`}
        >
          <Button
            onClick={resetForm}
            variant="cancel"
            disabled={loading}
          >
            Cancel
          </Button>

          <Button
            onClick={onSubmit}
            loading={loading}
            disabled={!title.trim() || loading}
          >
            <Plus className="w-4 h-4 mr-1 inline" />
            Add Task
          </Button>
        </div>
      </div>

      {/* Subtle loading overlay */}
      {loading && (
        <div className="absolute inset-0 bg-white/50 backdrop-blur-sm rounded-lg flex items-center justify-center">
          <div className="w-6 h-6 border-2 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
}