// src/pages/TaskPage.jsx
import { useEffect, useState } from "react";
import TaskList from "../components/tasks/TaskList";
import TaskForm from "../components/tasks/TaskForm";
import { useAuth } from "../context/AuthContext";
import API from "../api/axios";

export default function TaskPage() {
  const { token } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {
    try {
      const res = await API.get("/api/tasks", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(res.data);
    } catch (err) {
      console.error("❌ Gagal ambil task:", err.response?.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">📝 Todo List</h1>
      <TaskForm onTaskAdded={fetchTasks} />
      {loading ? <p>Loading...</p> : <TaskList tasks={tasks} onChange={fetchTasks} />}
    </div>
  );
}
