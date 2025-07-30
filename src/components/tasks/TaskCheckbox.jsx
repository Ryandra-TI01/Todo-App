import { Check } from "lucide-react";
import { useState } from "react";

export default function TaskCheckbox({ completed, onToggle, isHovered, isAnimating, isSaving }) {

   const [isHoveredCheckbox, setIsHoveredCheckbox]= useState(false);

  return (
    <button
      onClick={onToggle}
      disabled={isSaving}
      onMouseEnter={() => setIsHoveredCheckbox(true)}
      onMouseLeave={() => setIsHoveredCheckbox(false)}
      className="relative w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5"
    >
      <div
        className={`absolute inset-0 rounded-full border-gray-300 border-2 transition-[border] duration-300
          ${completed ? "border-none" : isHoveredCheckbox ? "border-none" : ""}`}
      />
      <Check
        className={`transition-all duration-300
          ${completed ? "text-blue-500 opacity-100 scale-100"
          : isHoveredCheckbox ? "text-purple-500 opacity-70 scale-90"
          : "text-purple-500 opacity-0 scale-75"}`}
      />
      {isAnimating && (
        <div className="absolute inset-0 bg-blue-300 rounded-full animate-ping opacity-60" />
      )}
    </button>
  );
}
