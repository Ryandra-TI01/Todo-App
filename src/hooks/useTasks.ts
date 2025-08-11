import {
  // for infinite scroll
  useInfiniteQuery,
  // for change data (create, update, delete)
  useMutation,
  // for get data
  useQuery,
  // for cache
  useQueryClient,
  // for manage cache
  QueryClient,
} from "@tanstack/react-query";
import API from "../api/axios";
import { Task, PaginatedResponse, TaskStats } from "../types/Task";

// setup manage cache
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // cache time fresh for 5 minutes
      staleTime: 5 * 60 * 1000, 
      // retry 2 times
      retry: 2, 
    },
  },
});

// 3. Main Hook
export function useTasks(token: string) {

  //  Access to cache management
  const queryClient = useQueryClient();

  // Fetch paginated tasks
  const fetchPaginatedTasks = async ({
    pageParam = 1,
  }: { pageParam?: number; }, isCompleted: boolean): Promise<PaginatedResponse> => {
    const res = await API.get(
      `/api/tasks?is_completed=${isCompleted}&page=${pageParam}`
    );
    return res.data;
  };

  // get task stats
  const fetchTaskStats = async (): Promise<TaskStats> => {
    const res = await API.get("/api/tasks/stats");
    return res.data;
  };

  // get incomplete tasks with infinite scroll
  const incompleteQuery = useInfiniteQuery({
    queryKey: ["tasks", "incomplete"],
    queryFn: (context) => fetchPaginatedTasks(context, false),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.current_page < lastPage.last_page
        ? lastPage.current_page + 1
        : undefined,
  });

  // get completed tasks with infinite scroll
  const completedQuery = useInfiniteQuery({
    queryKey: ["tasks", "completed"],
    queryFn: (context) => fetchPaginatedTasks(context, true),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.current_page < lastPage.last_page
        ? lastPage.current_page + 1
        : undefined,
  });


  const taskStatsQuery = useQuery({
    queryKey: ["tasks", "stats"],
    queryFn: fetchTaskStats,
  });

  // Mutation for create, update, delete
  const addTask = useMutation({
    mutationFn: (task: Omit<Task, "id">) =>
      API.post("/api/tasks", task).then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  const updateTask = useMutation({
    mutationFn: (task: Task) =>
      API.put(`/api/tasks/${task.id}`, task).then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  const deleteTask = useMutation({
    mutationFn: (id: number) => API.delete(`/api/tasks/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  // 7. Return Values
  return {
    // Queries
    incompleteQuery,
    completedQuery,
    taskStatsQuery,
    
    // Mutations
    addTask,
    updateTask,
    deleteTask,  

    // Utilities
    refetchAll: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  };
}
