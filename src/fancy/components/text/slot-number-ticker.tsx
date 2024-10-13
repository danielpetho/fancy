import { useEffect, useState } from "react";
import { useAnimate, motion, DynamicAnimationOptions, useMotionValue } from "framer-motion";

interface SlotNumberTickerProps {
  from: number;
  target: number;
  transition?: DynamicAnimationOptions;
  direction?: "up" | "down" | "alternate";
  className?: string;
}

export const SlotNumberTicker = ({
  from = 0,
  target = 100,
  transition = {
    type: "spring",
    stiffness: 50,
    damping: 10,
  },
  direction = "up",
  className,
  ...props
}: SlotNumberTickerProps) => {

  const currentNumber = useMotionValue(from);
  
  const [digits, setDigits] = useState<string[]>([]);
  const [prevDigits, setPrevDigits] = useState<string[]>([]);
  const [animationDirection, setAnimationDirection] = useState<string>("up");

  return (
    <div className={`flex space-x-1 ${className}`} {...props}>
      {/* {digits.map((digit, index) => {
        const prevDigit = prevDigits[index] || "0";
        const isDifferent = prevDigit !== digit;

        return (
          <span
            key={index}
            className="flex flex-col overflow-hidden h-6 w-4 relative"
          >
            <motion.span
              initial={{ y: 0 }}
              animate={{
                y: isDifferent
                  ? animationDirection === "up"
                    ? "-100%"
                    : "100%"
                  : "0%",
              }}
              transition={transition}
              className="absolute left-0"
            >
              {prevDigit}
            </motion.span>
            <motion.span
              initial={{ y: animationDirection === "up" ? "100%" : "-100%" }}
              animate={{ y: isDifferent ? "0%" : animationDirection === "up" ? "0%" : "0%" }}
              transition={transition}
              className="absolute left-0"
            >
              {digit}
            </motion.span>
          </span>
        );
      })} */}
    </div>
  );
};