import { ArrowLeft } from "lucide-react";
import { ReactElement } from "react";

export default function BackLine(): ReactElement {
  return (
    <div className="my-8">
      <button
        onClick={() => window.history.back()}
        className="group inline-flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
      >
        <ArrowLeft
          size={16}
          className="group-hover:-translate-x-1 transition-transform duration-300"
        />
        <span className="text-sm font-medium">
          Or back to the previous page
        </span>
      </button>
    </div>
  );
}
