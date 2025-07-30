export function getFormStyles({ isExpanded, isFocused, isHovered }) {
  let base = "mb-4 bg-white border border-gray-200 rounded-lg transition-all duration-200 ease-in-out";
  if (isExpanded || isFocused) return `${base} border-blue-300 shadow-md`;
  if (isHovered) return `${base} border-gray-300 shadow-sm`;
  return `${base} hover:shadow-sm`;
}

export function getPlusIconStyles({ isExpanded, isFocused, isHovered }) {
  if (isExpanded || isFocused)
    return `w-5 h-5 text-blue-500 transform ${isExpanded ? "rotate-45" : "rotate-0"} transition-all duration-200`;
  if (isHovered) return "w-5 h-5 text-blue-400 transition-all duration-200";
  return "w-5 h-5 text-gray-400 transition-all duration-200";
}

export function getInputStyles({ isExpanded, isFocused }) {
  return `w-full text-sm placeholder-gray-500 border-none outline-none resize-none transition-all duration-200 ${
    (isExpanded || isFocused) ? 'focus:placeholder-blue-400' : 'placeholder-gray-500'
  }`;
}
