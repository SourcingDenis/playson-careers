import { motion } from 'motion/react';

interface BlurTextProps {
  text: string;
  delay?: number;
  className?: string;
  animateBy?: 'words' | 'letters';
  direction?: 'top' | 'bottom';
  onAnimationComplete?: () => void;
}

const BlurText = ({
  text,
  delay = 0,
  className = '',
  animateBy = 'words',
  direction = 'top',
  onAnimationComplete,
}: BlurTextProps) => {
  const elements = animateBy === 'words' ? text.split(' ') : text.split('');
  
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: delay / 1000 },
    },
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.8,
        ease: [0.2, 0.65, 0.3, 0.9],
      },
    },
    hidden: {
      opacity: 0,
      y: direction === 'top' ? -20 : 20,
      filter: 'blur(10px)',
    },
  };

  return (
    <motion.div
      className={`inline-flex flex-wrap ${className}`}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      onAnimationComplete={onAnimationComplete}
    >
      {elements.map((element, index) => (
        <motion.span
          key={index}
          variants={child}
          className={`inline-block ${animateBy === 'words' ? 'mr-[0.25em] last:mr-0' : ''}`}
        >
          {element === ' ' ? '\u00A0' : element}
        </motion.span>
      ))}
    </motion.div>
  );
};

export default BlurText;
