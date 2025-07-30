import { AlertCircle } from "lucide-react";

export default function CustomInput({ label, icon, name, error, ...props }) {
  return (
    <>
      {/* label */}
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <div className="relative">
        {/* icon */}
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          {icon}
        </div>

        {/* input field */}
        <input
          name={name}
          {...props}
          className={`w-full pl-10 pr-4 py-3 border-1 rounded-lg border-gray-200 focus:outline-none
        ${
          error
            ? "border-red-500 focus:ring-red-500"
            : "outline-offset-2 focus:outline-purple-300 focus:outline-2 "
        }`}
        />
        {/* error icon */}
        {error && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            <AlertCircle className="w-5 h-5 text-red-500" />
          </div>
        )}
      </div>
      {/* error message */}
      {error && (
        <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
          <AlertCircle className="w-4 h-4" />
          {error}
        </p>
      )}
    </>
  );
}
