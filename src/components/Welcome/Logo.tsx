import { CheckSquare } from "lucide-react";
import { ReactElement } from "react";

export default function Logo(): ReactElement {
    return (
        <div className="flex items-center justify-center space-x-3 mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center transform hover:scale-110 transition-transform duration-300">
                <CheckSquare size={32} className="text-white" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                TaskFlow
            </h1>
        </div>
    )
}