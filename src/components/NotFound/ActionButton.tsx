import { Home } from "lucide-react";
import { ROUTES } from "../../routes/Route";
import { Link } from "react-router-dom";
import { ReactElement } from "react";

export default function ActionButton(): ReactElement {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
      <Link
        to={ROUTES.HOME}
        className="group flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-2xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 hover:scale-105 shadow-2xl hover:shadow-blue-500/25"
      >
        <Home
          size={20}
          className="group-hover:scale-110 transition-transform duration-300"
        />
        <span>Back to Home</span>
      </Link>
    </div>
  );
}
