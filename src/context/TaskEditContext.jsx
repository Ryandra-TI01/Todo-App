import { createContext, useContext, useState } from "react";

const TaskEditContext = createContext();

export const TaskEditProvider = ({ children }) => {
  const [editingId, setEditingId] = useState(null);

  return (
    <TaskEditContext.Provider value={{ editingId, setEditingId }}>
      {children}
    </TaskEditContext.Provider>
  );
};

export const useTaskEdit = () => useContext(TaskEditContext);
