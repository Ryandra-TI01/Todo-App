export interface Task {
  id: number;
  title: string;
  description?: string;
  is_completed: boolean;
  due_date?: string;
  priority?: "low" | "medium" | "high";
}

// define type PaginatedResponse
export interface PaginatedResponse {
  data: Task[];
  current_page: number;
  last_page: number;
  total: number;
}

// define type TaskStats
export interface TaskStats {
  completed: number;
  active: number;
  rate: string;
}