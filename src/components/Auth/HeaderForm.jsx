import { User } from "lucide-react";

export default function HeaderForm({ title , subtitle }) {
  return (
    <div className="text-center mb-8">
      <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl mb-4">
        <User className="w-8 h-8 text-white" />
      </div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">
        {title}
      </h2>
      <p className="text-gray-600 text-sm">
        {subtitle}
      </p>
    </div>
  );
}
