import { CheckSquare, Calendar, BarChart3, Moon, Zap } from "lucide-react";

import { Feature } from '../../types/Feature'
// Feature List
export const features: Feature[] = [
    {
        icon: CheckSquare,
        title: "Todo List",
        description: "Create, edit, and check off your tasks quickly and easily",
        color: "from-blue-500 to-cyan-500"
    },
    {
        icon: Calendar,
        title: "Calendar",
        description: "See all your tasks visually in calendar view",
        color: "from-purple-500 to-pink-500"
    },
    {
        icon: BarChart3,
        title: "Analytics",
        description: "See the progress of completed tasks and the time you spent",
        color: "from-green-500 to-emerald-500"
    },
    {
        icon: Moon,
        title: "Dark Mode",
        description: "Dark mode for comfortable use at night or in low light",
        color: "from-indigo-500 to-purple-500"
    },
    {
        icon: Zap,
        title: "Smart UX",
        description: "Simple, fast, and intuitive UI (React + Tailwind + Animations)",
        color: "from-orange-500 to-red-500"
    }
];