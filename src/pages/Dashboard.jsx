import TaskSection from "../components/tasks/TaskSection";
export default function Dashboard() {
  return (
    <div className="mt-10 text-center">
      <h2 className="text-2xl font-bold">📝 Todo List</h2>
      <p className="text-gray-600 mt-2">Your tasks will be displayed here</p>
      <TaskSection />
    </div>
  );
}
