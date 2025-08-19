import TaskItem from "./TaskItem";

export default function TaskList({ tasks, onUpdate, onDelete, isEditing }) {
  return (
    <ul className="space-y-2 mt-2" role="list">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onUpdate={onUpdate}
          onDelete={onDelete}
          isEditing={isEditing}
        />
      ))}
    </ul>
  );
}
