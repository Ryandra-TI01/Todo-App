import { useState, useRef, useEffect, useCallback } from "react";

export function useTaskForm({ onAdded, resetOnSubmit = true }) {
  const [loading, setLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState({ date: "", time: "" });

  const titleInputRef = useRef(null);
  const formRef = useRef(null);

  useEffect(() => {
    if (isExpanded && titleInputRef.current) {
      titleInputRef.current.focus();
    }
  }, [isExpanded]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (formRef.current && !formRef.current.contains(event.target)) {
        if (!title && !description && !dueDate.date && !dueDate.time) {
          setIsExpanded(false);
          setIsFocused(false);
        }
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [title, description, dueDate]);

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
      await onAdded({
        title: title.trim(),
        description: description.trim(),
        due_date: dueDate.date && dueDate.time
          ? `${dueDate.date}T${dueDate.time}:00`
          : dueDate.date
            ? `${dueDate.date}T00:00:00`
            : null,
      });
      if (resetOnSubmit) resetForm();
    } catch (err) {
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = useCallback((e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSubmit();
    }
    if (e.key === "Escape") resetForm();
  }, [title, description, dueDate]);

  return {
    state: {
      title, setTitle,
      description, setDescription,
      dueDate, setDueDate,
      isExpanded, setIsExpanded,
      isHovered, setIsHovered,
      isFocused, setIsFocused,
      loading,
      titleInputRef,
      formRef,
    },
    handlers: {
      handleKeyDown,
      onSubmit,
      resetForm,
    },
  };
}
