import { useRef, useState } from "react";
import { motion, Transition } from "framer-motion";
import { useMousePosition } from "@/hooks/use-mouse-position";

interface FollowCursorProps {
  className?: string;
  transition?: Transition;
  containerRef?: React.RefObject<HTMLElement>;
}

export const FollowCursor: React.FC<FollowCursorProps> = ({
  className,
  transition = {
    type: "spring",
    stiffness: 50,
    damping: 10,
  },
  containerRef,
  ...props
}) => {

  const container = containerRef ?? useRef<HTMLDivElement>(null);

  const mousePosition = useMousePosition();


  return (
    <motion.div
      className={`-translate-x-1/2 -translate-y-1/2 ${className}`}
      transition={transition}
    >
      {/* <span className="cursorText">{cursorText}</span> */}
    </motion.div>
  );
};
