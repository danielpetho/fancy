import { motion, useAnimationFrame } from "framer-motion";
import React, { useState } from "react";

type CirclingElementsProps = {
  children: React.ReactNode;
  radius: number;
  duration?: number;
  className?: string;
};

export const CirclingElements: React.FC<CirclingElementsProps> = ({
  children,
  radius,
  duration = 10,
  className,
}) => {
  return (
    <div className={`relative w-full h-full ${className}`}>
      {React.Children.map(children, (child, index) => {
        const offset = (index * 360) / React.Children.count(children);
        return (
          <motion.div
            key={index}
            className="transform-gpu absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-circling"
            style={
              {
                "--circling-duration": duration,
                "--circling-radius": radius,
                "--circling-offset": offset,
              } as React.CSSProperties
            }
          >
            {child}
          </motion.div>
        );
      })}
    </div>
  );
};
