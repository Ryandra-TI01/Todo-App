import { ReactElement } from "react";
import { HelpItemType } from "../../types/NotFoundTypes";

export default function HelpItem({ icon, title, description, gradient }: HelpItemType): ReactElement {
  return (
    <div className="group">
      <div className={`w-12 h-12 bg-gradient-to-r ${gradient} rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300`}>
        {icon}
      </div>
      <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
        {title}
      </h4>
      <p className="text-sm text-gray-600 dark:text-gray-400">
        {description}
      </p>
    </div>
  );
}
