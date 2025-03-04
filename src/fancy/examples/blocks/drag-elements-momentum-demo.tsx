import React from "react"

import DragElements from "@/fancy/components/blocks/drag-elements"

const DragElementsDemo: React.FC = () => {
  return (
    <div className="w-full h-full relative bg-teal text-teal overflow-hidden">
      <DragElements dragMomentum={true} className="p-30 md:p-40">
        <div className="text-2xl md:text-6xl px-6 py-3 md:px-8 md:py-4 rounded-full bg-primary-pink shadow-lg rotate-[-2deg] justify-center items-center">
          super fun ✿
        </div>
        <div className="text-2xl md:text-6xl px-6 py-3 md:px-8 md:py-4 rounded-full bg-primary-pink shadow-lg rotate-[2deg] justify-center items-center">
          funky time! ✴
        </div>
        <div className="text-2xl md:text-6xl px-6 py-3 md:px-8 md:py-4 rounded-full bg-primary-pink shadow-lg rotate-[-4deg] justify-center items-center">
          awesome ✺
        </div>
      </DragElements>
    </div>
  )
}

export default DragElementsDemo
