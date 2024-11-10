import { useDimensions } from "@/hooks/use-dimensions";
import { motion, useAnimationControls, useAnimationFrame } from "framer-motion";
import React, { useRef, useState } from "react";

type ScreensaverProps = {
    children: React.ReactNode;
    containerRef: React.RefObject<HTMLElement>;
    speed?: number;
    startPosition?: { x: number; y: number };
    startAngle?: number; // in degrees
    className?: string;
};

export const Screensaver: React.FC<ScreensaverProps> = ({
    children,
    speed = 3,
    startPosition = { x: 0, y: 0 },
    startAngle = 45,
    containerRef,
    className,
}) => {
    const elementRef = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState(startPosition);
    const [angle, setAngle] = useState((startAngle * Math.PI) / 180);
    
    const containerDimensions = useDimensions(containerRef);
    const elementDimensions = useDimensions(elementRef);

    useAnimationFrame(() => {
        const velocity = speed;
        const dx = Math.cos(angle) * velocity;
        const dy = Math.sin(angle) * velocity;
        
        setPosition((currentPos) => {
            let newX = currentPos.x + dx;
            let newY = currentPos.y + dy;
            let newAngle = angle;

            // Check for collisions with container boundaries
            if (newX <= 0 || newX + elementDimensions.width >= containerDimensions.width) {
                newAngle = Math.PI - newAngle;
                newX = Math.max(0, Math.min(newX, containerDimensions.width - elementDimensions.width));
            }
            if (newY <= 0 || newY + elementDimensions.height >= containerDimensions.height) {
                newAngle = -newAngle;
                newY = Math.max(0, Math.min(newY, containerDimensions.height - elementDimensions.height));
            }

            setAngle(newAngle);
            return { x: newX, y: newY };
        });
    });

    return (
        <motion.div
            ref={elementRef}
            style={{
                position: "absolute",
                top: 0,
                left: 0,
                x: position.x,
                y: position.y,
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
};