import { CheckSquare } from "lucide-react";

export default function Footer() {
  return (
        <footer className="py-12 px-6 border-t border-white/10 dark:border-white/5">
          <div className="max-w-6xl mx-auto text-center">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <CheckSquare size={20} className="text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                TaskFlow
              </span>
            </div>
            <p className="text-gray-500 dark:text-gray-400">
              © 2025 TaskFlow. Create with ❤️ for better productivity.
            </p>
          </div>
        </footer>
  );
}
