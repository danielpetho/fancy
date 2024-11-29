import React from "react";
import Screensaver from "@/fancy/components/blocks/screensaver";
import { exampleImages } from "../_helpers/exampleImages";

const CirclingElementsDemo: React.FC = () => {
  const containerRef = React.useRef<HTMLDivElement>(null);

  return (
    <div
      className="w-full h-full bg-[#efefef] overflow-hidden flex items-center justify-center relative"
      ref={containerRef}
    >
      <h1 className="z-30 text-3xl md:text-6xl font-overusedGrotesk">
        page not found
      </h1>
      {[...exampleImages, ...exampleImages].map((image, index) => (
        <Screensaver
          key={index}
          speed={1}
          startPosition={{ x: index * 15, y: index * 15 }}
          startAngle={40}
          containerRef={containerRef}
        >
          <div className="w-20 h-20 md:w-48 md:h-48 overflow-hidden">
            <img 
              src={image} 
              alt={`Example ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        </Screensaver>
      ))}
    </div>
  );
};

export default CirclingElementsDemo;
