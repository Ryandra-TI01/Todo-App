import completeTask from "../../assets/illustrations/complete-task.svg";
export default function EmptyTask() {
  return (
    <div className="text-center py-8">
      <img
        src={completeTask}
        alt="Task Completed"
        className="w-56 h-auto mx-auto mb-3 mt-14"
      />
      <p className="text-gray-500 mt-8">All tasks are done!</p>
    </div>
  );
}
