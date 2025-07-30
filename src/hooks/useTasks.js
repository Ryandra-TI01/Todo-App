// hooks/useTasks.js
import { useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import API from "../api/axios";

// Manage tasks with React Query
export function useTasks(token) {
  const queryClient = useQueryClient();

  const incompleteQuery = useInfiniteQuery({
    queryKey: ["tasks", "incomplete"],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await API.get(`/api/tasks?is_completed=false&page=${pageParam}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    },
    getNextPageParam: (lastPage) => {
      if (lastPage.current_page < lastPage.last_page) {
        return lastPage.current_page + 1;
      }
      return undefined;
    },
    staleTime: 5 * 60 * 1000,
  });

  const completedQuery = useInfiniteQuery({
    queryKey: ["tasks", "completed"],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await API.get(`/api/tasks?is_completed=true&page=${pageParam}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    },
    getNextPageParam: (lastPage) => {
      if (lastPage.current_page < lastPage.last_page) {
        return lastPage.current_page + 1;
      }
      return undefined;
    },
    staleTime: 5 * 60 * 1000,
  });

  const addTask = useMutation({
    mutationFn: async (task) => {
      const res = await API.post("/api/tasks", task, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  const updateTask = useMutation({
    mutationFn: async (task) => {
      const res = await API.put(`/api/tasks/${task.id}`, task, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  const deleteTask = useMutation({
    mutationFn: async (id) => {
      await API.delete(`/api/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  return {
    incompleteQuery,
    completedQuery,
    addTask,
    updateTask,
    deleteTask,
  };
}
