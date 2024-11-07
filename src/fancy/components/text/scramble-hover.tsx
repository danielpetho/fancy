import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ScrambleHoverProps {
  text: string;
  scrambleSpeed?: number;
  maxIterations?: number;
  useOriginalCharsOnly?: boolean;
  characters?: string;
  className?: string;
  scrambledClassName?: string;
}

export const ScrambleHover: React.FC<ScrambleHoverProps> = ({
  text,
  scrambleSpeed = 50,
  maxIterations = 10,
  useOriginalCharsOnly = false,
  characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+",
  className,
  scrambledClassName,
}) => {
  const [displayText, setDisplayText] = useState(text);
  const [isHovering, setIsHovering] = useState(false);
  const [isScrambling, setIsScrambling] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    let currentIteration = 0;

    const shuffleText = (text: string) => {
      if (useOriginalCharsOnly) {
        // Split text into characters, preserving spaces in their original positions
        const positions = text
          .split("")
          .map((char, i) => ({ char, isSpace: char === " ", index: i }));
        const nonSpaceChars = positions
          .filter((p) => !p.isSpace)
          .map((p) => p.char);

        // Shuffle non-space characters
        for (let i = nonSpaceChars.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [nonSpaceChars[i], nonSpaceChars[j]] = [
            nonSpaceChars[j],
            nonSpaceChars[i],
          ];
        }

        // Reconstruct text with spaces in original positions
        let charIndex = 0;
        return positions
          .map((p) => (p.isSpace ? " " : nonSpaceChars[charIndex++]))
          .join("");
      } else {
        // Original random character selection for non-useOriginalCharsOnly mode
        return text
          .split("")
          .map((char) => {
            if (char === " ") return " ";
            return availableChars[
              Math.floor(Math.random() * availableChars.length)
            ];
          })
          .join("");
      }
    };

    const availableChars = useOriginalCharsOnly
      ? Array.from(new Set(text.split(""))).filter((char) => char !== " ")
      : characters.split("");

    if (isHovering) {
      setIsScrambling(true);
      interval = setInterval(() => {
        setDisplayText(shuffleText(text));

        currentIteration++;
        if (currentIteration >= maxIterations) {
          clearInterval(interval);
          setIsScrambling(false);
          setDisplayText(text);
        }
      }, scrambleSpeed);
    } else {
      setDisplayText(text);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isHovering, text, characters, scrambleSpeed, useOriginalCharsOnly]);

  return (
    <motion.span
      onHoverStart={() => setIsHovering(true)}
      onHoverEnd={() => setIsHovering(false)}
      className={cn(
        "inline-block whitespace-pre-wrap",
        scrambledClassName && isScrambling && isHovering
          ? `${scrambledClassName}`
          : `${className}`
      )}
    >
      {displayText}
    </motion.span>
  );
};
