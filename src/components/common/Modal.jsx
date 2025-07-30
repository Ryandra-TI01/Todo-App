import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { createPortal } from "react-dom";

export default function Modal({ isOpen, onClose, children }) {
  // Check if document is available to avoid SSR issues
  if (typeof document === "undefined") return null; // Prevent SSR issues
  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-white px-8 py-12 rounded-xl shadow-xl w-full max-w-md overflow-x-auto max-h-[90%] relative "
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.9 }}
            // to prevent click events from propagating to the backdrop
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 cursor-pointer"
              onClick={onClose}
            >
              <X className="w-5 h-5" />
            </button>

            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
