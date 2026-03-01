import React, { useEffect, useState, useRef } from 'react';
import { useInView } from 'motion/react';

interface ScrambleTextProps {
  text: string;
  className?: string;
}

const ScrambleText: React.FC<ScrambleTextProps> = ({ 
  text, 
  className = ''
}) => {
  const characters = '!<>-_\\\\/[]{}—=+*^?#01';
  
  // Start with scrambled text of the same length to avoid layout shift
  const [displayText, setDisplayText] = useState(() => 
    text.split('').map(char => char === ' ' ? ' ' : characters[Math.floor(Math.random() * characters.length)]).join('')
  );
  
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

  useEffect(() => {
    if (!isInView) return;

    let iteration = 0;
    let animationFrame: number;

    const animate = () => {
      setDisplayText(() => {
        return text
          .split('')
          .map((letter, index) => {
            if (index < iteration) {
              return text[index];
            }
            if (letter === ' ') return ' ';
            return characters[Math.floor(Math.random() * characters.length)];
          })
          .join('');
      });

      if (iteration >= text.length) {
        cancelAnimationFrame(animationFrame);
      } else {
        iteration += 1 / 2; // Adjust this value to change the speed (lower is slower)
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [isInView, text]);

  return (
    <span ref={ref} className={className}>
      {displayText}
    </span>
  );
};

export default ScrambleText;
