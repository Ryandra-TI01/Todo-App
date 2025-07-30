import { useState, useEffect } from "react";
import { Home, LogIn, Search, ArrowLeft, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { ROUTES } from "../routes/Route";

export default function NotFoundPage() {
  const [glitchText, setGlitchText] = useState("404");
  const [isAnimating, setIsAnimating] = useState(false);

  // Glitch effect for 404 text
  useEffect(() => {
    const glitchChars = ["4", "0", "4", "¿", "?", "!", "@", "#", "$", "%"];
    let interval;

    const startGlitch = () => {
      setIsAnimating(true);
      let counter = 0;

      interval = setInterval(() => {
        if (counter < 10) {
          const randomText = Array.from(
            { length: 3 },
            () => glitchChars[Math.floor(Math.random() * glitchChars.length)]
          ).join("");
          setGlitchText(randomText);
          counter++;
        } else {
          setGlitchText("404");
          setIsAnimating(false);
          clearInterval(interval);
        }
      }, 100);
    };

    const glitchTimer = setInterval(startGlitch, 3000);
    return () => {
      clearInterval(interval);
      clearInterval(glitchTimer);
    };
  }, []);

  return (
    <div className="relative z-10 text-center pt-16 px-6 max-w-4xl mx-auto">
      {/* 404 Illustration */}
      <div className="mb-8 relative">
        {/* Main 404 Text with Glitch Effect */}
        <div className="relative">
          <h1
            className={`text-9xl md:text-9xl font-black mb-4 transition-all duration-200 ${
              isAnimating
                ? "bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text text-transparent animate-pulse"
                : "bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"
            }`}
          >
            {glitchText}
          </h1>
        </div>

        {/* Floating Elements */}
        <div className="absolute -top-4 -left-4 w-8 h-8 bg-red-500/30 rounded-full animate-bounce delay-300" />
        <div className="absolute -top-8 right-8 w-6 h-6 bg-yellow-500/40 rounded-full animate-bounce delay-700" />
        <div className="absolute -bottom-4 left-12 w-10 h-10 bg-purple-500/25 rounded-full animate-bounce delay-1000" />
        <div className="absolute -bottom-8 -right-4 w-7 h-7 bg-blue-500/35 rounded-full animate-bounce delay-500" />

        {/* Broken Robot/Character Illustration */}
        <div className="mx-auto w-24 h-24 relative mb-6">
          <div className="absolute inset-0 bg-gradient-to-r from-gray-400 to-gray-600 rounded-2xl transform rotate-12 opacity-80" />
          <div className="absolute inset-2 bg-white/10 dark:bg-white/5 backdrop-blur-xl border border-white/20 rounded-2xl flex items-center justify-center">
            <div className="text-2xl animate-bounce">🤖</div>
          </div>

          {/* Broken screen effect */}
          <div className="absolute top-4 left-4 w-6 h-1 bg-red-500 transform rotate-45" />
          <div className="absolute top-6 left-6 w-4 h-1 bg-red-500 transform -rotate-45" />

          {/* Sparks */}
          <div className="absolute -top-2 -right-2">
            <Zap size={24} className="text-yellow-400 animate-pulse" />
          </div>
        </div>
      </div>

      {/* Error Message */}
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
          <span>
            Pro tip: Try checking the URL or use the navigation above.{" "}
          </span>
        </div>
      </div>

      {/* Action Buttons */}
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

      {/* Additional Help */}
      <div className="bg-white/10 dark:bg-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-8">
        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">
          Need some help? 🤔
        </h3>

        <div className="grid md:grid-cols-3 gap-6 text-left mt-8">
          <div className="group">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
              <Home size={20} className="text-white" />
            </div>
            <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
              Home
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Back to the homepage to explore our features
            </p>
          </div>

          <div className="group">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
              <Search size={20} className="text-white" />
            </div>
            <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
              Search Feature
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Use navigation or menus to find the feature you need
            </p>
          </div>

          <div className="group">
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
              <LogIn size={20} className="text-white" />
            </div>
            <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
              Login
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Log in tou your account to access all personal features
            </p>
          </div>
        </div>
      </div>

      {/* Back Link */}
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
    </div>
  );
}
