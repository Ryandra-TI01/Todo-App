// GiantMoleLoader.tsx
import React from 'react';
import { motion } from 'framer-motion';

type Props = {
  size?: number;       
  color?: string;      
  duration?: number;
};

 const Spinner: React.FC<Props> = ({
  size = 16,
  color = '#3b82f6', // default: Tailwind blue-500
  duration = 0.6,
}) => {
  const dots = [0, 1, 2, 3];

  // Animasi: scale bergantian
  const variants = {
    initial: { scale: 1 },
    animate: { scale: [1, 1.5, 1] },
  };

  return (
    <div
      className="flex space-x-2 justify-center items-center"
      role="status"
      aria-label="loading"
    >
      {dots.map((i) => (
        <motion.div
          key={i}
          className="rounded-full"
          style={{
            width: size,
            height: size,
            backgroundColor: color,
          }}
          variants={variants}
          initial="initial"
          animate="animate"
          transition={{
            repeat: Infinity,
            ease: 'easeInOut',
            duration,
            delay: (i * duration) / dots.length,
          }}
        />
      ))}
    </div>
  );
};

export default Spinner