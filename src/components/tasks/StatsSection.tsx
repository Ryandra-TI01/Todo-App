import { ReactElement } from "react";
import { useAuth } from "../../context/AuthContext";
import { CreateStatsData } from "../../data/StatsData";
import { useTasks } from "../../hooks/useTasks";

export default function StatsSection(): ReactElement {
    const { token } = useAuth();
    const { taskStatsQuery } = useTasks(token);
    const data = CreateStatsData(taskStatsQuery.data);
    return (
        <div className="flex justify-center gap-12 mt-10 mb-4">
            {/* Task stats */}
            {data.map((item, index) => (
                <div key={index} className="text-center">
                    <div className={`text-2xl font-bold ${item.color}`}>
                        {item.value} {<item.icon className="inline w-5 h-5" />}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-300">
                        {item.title}
                    </div>
                </div>
            ))}
        </div>
    )
}