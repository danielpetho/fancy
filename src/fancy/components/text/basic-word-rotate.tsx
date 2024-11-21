import { motion, AnimatePresence, Transition } from "framer-motion";
import { useEffect, useState } from "react";

interface WordRotateProps {
  words: string[];
  className?: string;
  rotationInterval?: number;
  transition?: Transition;
  loop?: boolean;
}

const BasicWordRotate = ({
  words,
  className,
  transition={ type: "spring", damping: 20, stiffness: 300 },
  rotationInterval = 2000,
  loop = true,
  ...props
}: WordRotateProps) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  useEffect(() => {
    const rotateWords = () => {
      setCurrentWordIndex((prevIndex) => {
        if (prevIndex === words.length - 1) {
          return loop ? 0 : prevIndex;
        }
        return prevIndex + 1;
      });
    };

    const intervalId = setInterval(rotateWords, rotationInterval);

    return () => clearInterval(intervalId);
  }, [words, rotationInterval, loop]);

  return (
    <motion.span className={`flex ${className}`} {...props} layout>
      {/* <AnimatePresence initial={false} mode="wait"> */}
        <motion.span
          key={currentWordIndex}
          initial={{ opacity: 0, y: 10}}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={transition}
          className="inline-block"
          layout
        >
          {words[currentWordIndex]}
        </motion.span>
      {/* </AnimatePresence> */}
    </motion.span>
  );
};

export default BasicWordRotate;