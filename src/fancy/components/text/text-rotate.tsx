import { motion, AnimatePresence, Transition } from "framer-motion";
import { useCallback, useEffect, useMemo, useState } from "react";

interface TextRotateProps {
  words: string[];
  className?: string;
  rotationInterval?: number;
  staggerDuration?: number;
  staggerFrom?: "first" | "last" | "center" | number | "random";
  transition?: Transition;
  loop?: boolean;
}

const TextRotate = ({
  words,
  className,
  transition = { type: "spring", damping: 25, stiffness: 300 },
  rotationInterval = 2000,
  staggerDuration = 0,
  staggerFrom = "first",
  loop = true,
  ...props
}: TextRotateProps) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  // handy function to split text into characters with support for unicode and emojis
  const splitIntoCharacters = (text: string): string[] => {
    if (typeof Intl !== "undefined" && "Segmenter" in Intl) {
      const segmenter = new Intl.Segmenter("en", { granularity: "grapheme" });
      return Array.from(segmenter.segment(text), ({ segment }) => segment);
    }
    // Fallback for browsers that don't support Intl.Segmenter
    return Array.from(text);
  };

  const getStaggerDelay = useCallback(
    (index: number) => {
      const total = splitIntoCharacters(words[currentTextIndex]).length;
      if (staggerFrom === "first") return index * staggerDuration;
      if (staggerFrom === "last") return (total - 1 - index) * staggerDuration;
      if (staggerFrom === "center") {
        const center = Math.floor(total / 2);
        return Math.abs(center - index) * staggerDuration;
      }
      if (staggerFrom === "random") {
        const randomIndex = Math.floor(Math.random() * total);
        return Math.abs(randomIndex - index) * staggerDuration;
      }
      return Math.abs(staggerFrom - index) * staggerDuration;
    },
    [staggerFrom, staggerDuration, currentTextIndex]
  );

  const elements = useMemo(() => {
    return splitIntoCharacters(words[currentTextIndex]);
  }, [words, currentTextIndex]);

  useEffect(() => {
    const rotateTexts = () => {
      setCurrentTextIndex((prevIndex) => {
        if (prevIndex === words.length - 1) {
          return loop ? 0 : prevIndex;
        }
        return prevIndex + 1;
      });
    };

    const intervalId = setInterval(rotateTexts, rotationInterval);

    return () => clearInterval(intervalId);
  }, [words, rotationInterval, loop]);

  useEffect(() => {
    if (staggerFrom === "random") {
      const indices = Array.from({ length: words.length }, (_, i) => i);
    } else {
    }
  }, [staggerFrom]);

  return (
    <motion.span
      className={`flex ${className}`}
      {...props}
      layout
      transition={transition}
    >
      <AnimatePresence initial={false} mode="wait">
        <motion.div
          key={currentTextIndex}
          className="flex"
          layout
        >
          {elements.map((letter, index) => {
            return (
              <motion.span
                key={index}
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "-120%" }}
                transition={{
                  ...transition,
                  delay: getStaggerDelay(index),
                }}
                className=""
              >
                {letter}
              </motion.span>
            );
          })}
        </motion.div>
      </AnimatePresence>
    </motion.span>
  );
};

export default TextRotate;
