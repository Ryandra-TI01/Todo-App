// components/common/Button.jsx
import { motion } from "framer-motion";
import clsx from "clsx";

export default function   Button({
  children,
  type = "button",
  onClick,
  disabled = false,
  loading = false,
  variant = "primary", // primary, outline, danger, icon
  className = "",
}) {
  const baseClass = "w-full py-3 px-4 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer ";

  const variants = {
    primary: " bg-gradient-to-r from-blue-600 to-purple-600 text-white",
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
      {loading ? (
         <>
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            Loading...
          </>
      ):(
        <>
          {children}
        </>
      )}
    </motion.button>
  );
}
