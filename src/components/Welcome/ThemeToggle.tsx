import { ReactElement } from "react";
import { useDarkMode } from "../../context/DarkModeContext";
import { Moon } from "lucide-react";

export default function ThemeToggle(): ReactElement {
    const { isDark, toggleTheme } = useDarkMode();

    return (
        <div className="absolute top-6 right-6">
            <button
                onClick={toggleTheme}
                className="p-3 rounded-full bg-white/10 dark:bg-white/5 backdrop-blur-xl border border-white/20 hover:bg-white/20 dark:hover:bg-white/10 transition-all duration-300 hover:scale-110"
            >
                {isDark ? (
                    <svg className="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                    </svg>
                ) : (
                    <Moon className="w-6 h-6 text-slate-600" />
                )}
            </button>
        </div>
    )
}