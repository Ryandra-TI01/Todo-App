export default function Card({ title, value }: { title: string; value: string | number }) {
  return (
    <div className="bg-white dark:bg-white/10 backdrop-blur-xl rounded-2xl shadow p-4 flex flex-col">
      <span className="text-sm text-gray-500 dark:text-gray-400">{title}</span>
      <span className="text-2xl font-bold text-gray-900 dark:text-gray-100">
        {value}
      </span>
    </div>
  );
}
