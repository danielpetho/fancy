import { useMouseVector } from "@/hooks/use-mouse-vector";
import {
  animate,
  AnimationSequence,
  motion,
  Segment,
  useAnimate,
  useAnimation,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { useCallback, useEffect, useState, Children, useRef } from "react";
import { v4 as uuidv4 } from "uuid";

interface ImageTrailProps {
  children: React.ReactNode;
  containerRef?: React.RefObject<HTMLElement>;
  newOnTop?: boolean;
  rotationRange?: number;
  scaleRange?: number;
}

interface TrailItem {
  id: string;
  x: number;
  y: number;
  rotation: number;
  scale: number;
  child: React.ReactNode;
}

export const ImageTrail = ({
  children,
  newOnTop = true,
  rotationRange = 15,
  containerRef,
  scaleRange = 1,
}: ImageTrailProps) => {
  const [trail, setTrail] = useState<TrailItem[]>([]);
  const { position: mousePosition, vector: mouseVector } =
    useMouseVector(containerRef);

  // Convert children to array for random selection
  const childrenArray = Children.toArray(children);

  useEffect(() => {
    setTrail((prevTrail) => {
      const newItem: TrailItem = {
        id: uuidv4(),
        x: mousePosition.x,
        y: mousePosition.y,
        rotation: (Math.random() - 0.5) * rotationRange * 2,
        scale: 1,
        child: childrenArray[Math.floor(Math.random() * childrenArray.length)],
      };

      const updatedTrail = newOnTop ? [newItem, ...prevTrail] : [...prevTrail, newItem];
      return updatedTrail;
    });
  }, [mousePosition, mouseVector]);

  const removeFromTrail = useCallback((itemId: string) => {
    setTrail((prevTrail) => prevTrail.filter((item) => item.id !== itemId));
  }, []);

  return (
    <div className="relative w-full h-full pointer-events-none">
      {trail.map((item) => (
        <TrailItem key={item.id} item={item} onComplete={removeFromTrail} />
      ))}
    </div>
  );
};

interface TrailItemProps {
  item: TrailItem;
  onComplete: (id: string) => void;
}

const TrailItem = ({ item, onComplete }: TrailItemProps) => {
  const [scope, animate] = useAnimate();

  const sequence: AnimationSequence[] = [
    [
      scope.current,
      { scale: item.scale * 1.2 },
      { duration: 0.1, ease: "easeOutCirc" },
    ],
    [scope.current, { scale: 0 }, { duration: 0.5, ease: "easeOutCirc" }],
  ];

  useEffect(() => {
    animate(
      scope.current,
      { scale: item.scale * 1.2 },
      { duration: 0.1, ease: "circOut" }
    ).then(() => {
      animate(
        scope.current,
        { scale: 0 },
        { duration: 1, ease: "circIn" }
      ).then(() => {
        onComplete(item.id);
      });
    });
  }, []);

  return (
    <motion.div
      ref={scope}
      key={item.id}
      className="absolute"
      style={{
        left: item.x,
        top: item.y,
      }}
      // initial={{ opacity: 1, left: item.x, top: item.y, scale: item.scale }}
      // animate={{
      //   opacity: [1, 1],
      //   left: item.x,
      //   top: item.y,
      //   rotate: item.rotation,
      //   scale: item.scale,
      // }}
      // transition={{
      //   duration: 0.5,
      //   ease: "easeInOut",
      //   opacity: { duration: 1.5 },
      // }}
      // onAnimationComplete={() => onComplete(item.id)}
    >
      {item.child}
    </motion.div>
  );
};
