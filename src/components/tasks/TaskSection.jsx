import { useEffect, useRef } from "react";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";
import CompleteAccordion from "./CompleteAccordian";
import EmptyTask from "./EmptyTask";
import ErrorState from "./ErrorState";
import Loading from "../common/Loading";
import { useTasks } from "../../hooks/useTasks";
import { useAuth } from "../../context/AuthContext";
import {TaskEditProvider} from "../../context/TaskEditContext";

export default function TaskSection() {
  const { token } = useAuth();
  const {
    incompleteQuery,
    completedQuery,
    addTask,
    updateTask,
    deleteTask,
    taskStatsQuery
  } = useTasks(token);

  const loadMoreRef = useRef();

  const isLoading = incompleteQuery.isLoading || completedQuery.isLoading;
  const isError = incompleteQuery.isError || completedQuery.isError;
  const errorMsg = incompleteQuery.error?.message || completedQuery.error?.message;

  const incompleteTasks = incompleteQuery.data?.pages.flatMap((page) => page.data) || [];    
  const completedTasks = completedQuery.data?.pages.flatMap((page) => page.data) || [];
  const taskStats = taskStatsQuery.data? taskStatsQuery.data : { total: 0, completed: 0, incomplete: 0 };

  // ⛓ Infinite Scroll for Incomplete
  useEffect(() => {
    if (!loadMoreRef.current || !incompleteQuery.hasNextPage) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          incompleteQuery.fetchNextPage();
        }
      },
      { threshold: 1 }
    );
    observer.observe(loadMoreRef.current);
    return () => observer.disconnect();
  }, [incompleteQuery]);

  if (isLoading) return <Loading />;
  if (isError)
    return (
      <ErrorState
        message={errorMsg}
        onRetry={() => {
          incompleteQuery.refetch();
          completedQuery.refetch();
        }}
      />
    );

  return (
    <TaskEditProvider>
      <div className="max-w-2xl mx-auto p-6 min-h-screen">
        <TaskForm onAdded={(task) => addTask.mutate(task)} />

        {incompleteTasks.length === 0 && <EmptyTask />}

        <div className="space-y-4">
          {incompleteTasks.length > 0 && (
            <>
              <TaskList
                tasks={incompleteTasks}
                onUpdate={(task) => updateTask.mutate(task)}
                onDelete={(id) => deleteTask.mutate(id)}
              />
              <div ref={loadMoreRef} className="h-6" />
            </>
          )}

          {completedTasks.length > 0 && (
            <CompleteAccordion
              tasks={completedTasks}
              tasksLength={taskStats.completed}
              hasMore={completedQuery.hasNextPage}
              onLoadMore={completedQuery.fetchNextPage}
              onUpdate={(task) => updateTask.mutate(task)}
              onDelete={(id) => deleteTask.mutate(id)}
            />
          )}
        </div>
      </div>
    </TaskEditProvider>
  );
}
