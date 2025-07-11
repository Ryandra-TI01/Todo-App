// components/common/Button.jsx
import { motion } from "framer-motion";
import clsx from "clsx";
import { Loader2 } from "lucide-react";

export default function Button({
  children,
  type = "button",
  onClick,
  disabled = false,
  loading = false,
  variant = "primary", // primary, outline, danger, icon
  className = "",
}) {
  const baseClass = "inline-flex items-center justify-center px-4 py-2 rounded-md font-medium text-sm transition-all duration-200 transform hover:scale-105";

  const variants = {
    primary: "bg-purple-400 hover:bg-purple-600 text-white",
    cancel:"bg-gray-500 hover:bg-gray-600 text-white",
    outline: "border border-purple-600 text-purple-600 hover:bg-purple-50",
    danger: "bg-red-600 hover:bg-red-700 text-white",
    icon: "p-2 rounded-full bg-purple-100 hover:bg-purple-200 text-purple-700",
  };

  const interactiveCursorClass = !(disabled || loading)
  ? "cursor-pointer"
  : "cursor-not-allowed opacity-50";

  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={clsx(
        baseClass,
        variants[variant],
        interactiveCursorClass,
        className
      )}
    >
      {loading && (
        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
      )}
      {children}
    </motion.button>
  );
}
