"use client"

import React, { useState, useRef } from 'react';
import { Copy } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { motion, Variants } from 'motion/react';

interface CopyButtonProps {
  onCopy: () => Promise<void> | void;
}

const copyIconVariants: Variants = {
  idle: { 
    opacity: 1,
    scale: 1,
    transition: { duration: 0.2, ease: "easeOut" }
  },
  copying: { 
    opacity: 0,
    scale: 0.8,
    transition: { duration: 0.2, ease: "easeOut" }
  },
  copied: { 
    opacity: 0,
    scale: 0.8,
    transition: { duration: 0.2, ease: "easeOut" }
  }
};

const checkIconVariants: Variants = {
  idle: {
    opacity: 0,
    scale: 0.8,
    transition: { duration: 0.2, ease: "easeOut" }
  },
  copying: {
    opacity: 0,
    scale: 0.8,
    transition: { duration: 0.2, ease: "easeOut" }
  },
  copied: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.2, ease: "easeOut" }
  }
};

const checkPathVariants: Variants = {
  idle: { 
    pathLength: 0,
    opacity: 0,
    transition: { duration: 0.2, ease: "easeOut" }
  },
  copying: { 
    pathLength: 0,
    opacity: 1,
    transition: { duration: 0.2, ease: "easeOut" }
  },
  copied: { 
    pathLength: 1,
    opacity: 1,
    transition: { duration: 0.3, ease: "easeOut" }
  }
};

const MotionButton = motion.create(Button);

export const CopyButton: React.FC<CopyButtonProps> = ({ onCopy }) => {
  const [status, setStatus] = useState<"idle" | "copying" | "copied">("idle");
  const [backgroundState, setBackgroundState] = useState<"hidden" | "entering" | "centered" | "leaving">("hidden");
  const [entryDirection, setEntryDirection] = useState({ x: 0, y: 0 });
  const [leaveDirection, setLeaveDirection] = useState({ x: 0, y: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleCopy = async () => {
    if (status !== "idle") return;
    
    setStatus("copying");
    await onCopy();
    
    setTimeout(() => {
      setStatus("copied");
    }, 100);
    
    setTimeout(() => {
      setStatus("idle");
    }, 2000);
  };

  const calculateDirection = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return { x: 0, y: 0 };
    
    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    
    const offsetX = mouseX - centerX;
    const offsetY = mouseY - centerY;
  
    
    return { x: offsetX, y: offsetY };
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    const direction = calculateDirection(e);
    setEntryDirection(direction);
    
    // phase 1: instantly spawn at cursor position
    setBackgroundState("entering");
    
    // phase 2: animate to center after a brief moment
    setTimeout(() => {
      setBackgroundState("centered");
    }, 10);
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    const direction = calculateDirection(e);
    setLeaveDirection(direction);
    
    // phase 3: animate to leave direction
    setBackgroundState("leaving");
    
    // reset to hidden after animation completes
    setTimeout(() => {
      setBackgroundState("hidden");
    }, 150);
  };

  const getBackgroundAnimation = () => {
    switch (backgroundState) {
      case "hidden":
        return {
          opacity: 0,
          x: entryDirection.x,
          y: entryDirection.y,
          scale: 0.6,
          transition: { duration: 0 }
        };
      case "entering":
        return {
          opacity: 0,
          x: entryDirection.x,
          y: entryDirection.y,
          scale: 0.6,
          transition: { duration: 0 }
        };
      case "centered":
        return {
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
          transition: { duration: 0.15, ease: "easeOut" }
        };
      case "leaving":
        return {
          opacity: 0,
          x: leaveDirection.x,
          y: leaveDirection.y,
          scale: 1,
          transition: { duration: 0.15, ease: "easeOut" }
        };
      default:
        return {
          opacity: 0,
          x: 0,
          y: 0,
          scale: 0.6,
          transition: { duration: 0 }
        };
    }
  };

  return (
    <div className="relative">
      {/* animated Background */}
      <motion.div
        className="absolute inset-0 bg-editor-border rounded-md"
        animate={getBackgroundAnimation()}
      />
      
      <MotionButton
        ref={buttonRef}
        onClick={handleCopy}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        variant="ghost"
        size="icon"
        className="relative text-muted-foreground cursor-pointer w-8 h-8 hover:text-white hover:scale-105 duration-300 transition ease-out hover:bg-transparent bg-none"
        aria-label="Copy code"
        whileTap={{ scale: 0.9 }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        // disabled={status !== "idle"}
      >
        <div className="relative w-4 h-4">
          {/* Copy Icon */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            animate={status}
            variants={copyIconVariants}
          >
            <Copy className="w-4 h-4" />
          </motion.div>
          
          {/* Check Icon */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            animate={status}
            variants={checkIconVariants}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={16}
              height={16}
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <motion.path
                d="M4 12 9 17L20 6"
                animate={status}
                variants={checkPathVariants}
              />
            </svg>
          </motion.div>
        </div>
      </MotionButton>
    </div>
  );
};