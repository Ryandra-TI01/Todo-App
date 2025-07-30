import { Zap } from "lucide-react";
import { ReactElement } from "react";

export default function BrokenRobotIllustration(): ReactElement {
  return (
    <div className="mx-auto w-24 h-24 relative mb-6">
      <div className="absolute inset-0 bg-gradient-to-r from-gray-400 to-gray-600 rounded-2xl transform rotate-12 opacity-80" />
      <div className="absolute inset-2 bg-white/10 dark:bg-white/5 backdrop-blur-xl border border-white/20 rounded-2xl flex items-center justify-center">
        <div className="text-2xl animate-bounce">🤖</div>
      </div>

      {/* Broken screen effect */}
      <div className="absolute top-4 left-4 w-6 h-1 bg-red-500 transform rotate-45" />
      <div className="absolute top-6 left-6 w-4 h-1 bg-red-500 transform -rotate-45" />

      {/* Sparks */}
      <div className="absolute -top-2 -right-2">
        <Zap size={24} className="text-yellow-400 animate-pulse" />
      </div>
    </div>
  );
}
