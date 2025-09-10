import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

import {useAuth} from "../context/AuthContext";
import {useTasks} from "../hooks/useTasks";
import Card from "../components/Analytics/Card";
type AnalyticsData = {
  status: {
    completed: number;
    uncompleted: number;
  };
  average_per_day: number;
  growth: { date: string; count: number }[];
  deadlines: { date: string; count: number }[];
  task_per_month: { month: string; count: number }[];
};

const COLORS = ["#10B981", "#EF4444"]; // green for completed, red for uncompleted

export default function AnalyticsPage() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const {token} = useAuth();
  const {  analyticsQuery } = useTasks(token);
  useEffect(()=>{
    if (analyticsQuery.data) {
      setData(analyticsQuery.data);
    }
  },[analyticsQuery.data])


  if (!data) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6 space-y-6">
      {/* --- Cards Section --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card title="Completed" value={data.status.completed} />
        <Card title="Uncompleted" value={data.status.uncompleted} />
        <Card
          title="Avg. Tasks / Day"
          value={data.average_per_day.toFixed(2)}
        />
      </div>

      {/* --- Charts Section --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Growth Line Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-4">
          <h2 className="text-lg font-semibold mb-4 dark:text-gray-200">
            Task Growth Over Time
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data.growth}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-gray-300" />
              <XAxis dataKey="date" className="text-xs text-gray-600 dark:text-gray-400 " />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="count"
                stroke="#6366F1"
                strokeWidth={2}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Status Donut Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-4">
          <h2 className="text-lg font-semibold mb-4 dark:text-gray-200">
            Task Completion Status
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                dataKey="value"
                data={[
                  { name: "Completed", value: data.status.completed },
                  { name: "Uncompleted", value: data.status.uncompleted },
                ]}
                cx="50%"
                cy="50%"
                outerRadius={100}
                innerRadius={60}
                paddingAngle={4}
              >
                {COLORS.map((color, i) => (
                  <Cell key={i} fill={color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Monthly Tasks Bar Chart */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-4">
        <h2 className="text-lg font-semibold mb-4 dark:text-gray-200">
          Tasks Per Month
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data.task_per_month}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-gray-300 dark:stroke-gray-600" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#6366F1" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

// function Card({ title, value }: { title: string; value: string | number }) {
//   return (
//     <div className="bg-white dark:bg-white/10 backdrop-blur-xl rounded-2xl shadow p-4 flex flex-col">
//       <span className="text-sm text-gray-500 dark:text-gray-400">{title}</span>
//       <span className="text-2xl font-bold text-gray-900 dark:text-gray-100">
//         {value}
//       </span>
//     </div>
//   );
// }
