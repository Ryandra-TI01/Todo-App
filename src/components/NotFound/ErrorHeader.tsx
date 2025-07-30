import { ReactElement } from "react";

export default function ErrorHeader(): ReactElement {
  return (
    <div className="mb-12">
      <h2 className="text-3xl md:text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
        Oops! Page Not Found.
      </h2>
      <p className="text-lg md:text-md text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed mb-6">
        We couldn't find the page you're looking for. It might have been
        removed, renamed, or never existed.
      </p>

      {/* Fun message */}
      <div className="inline-flex items-center space-x-2 px-4 py-2 bg-orange-500/10 border border-orange-500/20 rounded-full text-orange-600 dark:text-orange-400 text-sm font-medium">
        <span>💡</span>
        <span>Pro tip: Try checking the URL or use the navigation above. </span>
      </div>
    </div>
  );
}
