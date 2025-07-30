import { ReactElement, useEffect, useState } from "react";
import { GlitchTextProps } from "../../types/NotFoundTypes";

export default function GlitchItem({
  characters = ["4", "0", "4", "¿", "?", "!", "@", "#", "$", "%"],
  interval = 3000,
  glitchDuration = 1000

}: GlitchTextProps): ReactElement {

  const [glitchText, setGlitchText] = useState("404");
  const [isAnimating, setIsAnimating] = useState(false);

  // Glitch effect for 404 text
  useEffect(() => {
    let glitchInterval: NodeJS.Timeout;

    const startGlitch = () => {
      setIsAnimating(true);
      let counter = 0;
      const steps = glitchDuration / 100;


      const interval = setInterval(() => {
        if (counter < steps) {
          const randomText = Array.from(
            { length: 3 },
            () => characters[Math.floor(Math.random() * characters.length)]
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

    glitchInterval = setInterval(startGlitch, interval);

    return () => {
      clearInterval(glitchInterval);
    };
  }, [characters, interval, glitchDuration]);
  return (
    <h1
      className={`text-9xl md:text-9xl font-black mb-4 transition-all duration-200 ${isAnimating
          ? "bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text text-transparent animate-pulse"
          : "bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"
        }`}
    >
      {glitchText}
    </h1>
  );
}
