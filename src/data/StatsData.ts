import { Stats } from "../types/Stats";
import { CheckCheck, Clock, Percent } from "lucide-react";

export const CreateStatsData = (taskStats: any): Stats[] => [
    {
        title: "Active Tasks",
        value: taskStats?.active,
        icon: Clock,
        color: "text-blue-600 dark:text-blue-400",
    },
    {
        title: "Completed Tasks",
        value: taskStats?.completed,
        icon: CheckCheck,
        color: "text-green-600 dark:text-green-400",
    },
    {
        title: "Completion Rate",
        value: taskStats?.rate,
        icon: Percent,
        color: "text-indigo-600 dark:text-indigo-400",
    },
]