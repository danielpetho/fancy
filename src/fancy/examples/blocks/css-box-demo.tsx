import { useRef } from "react"

import CSSBox, { CSSBoxRef } from "@/fancy/components/blocks/css-box"

export default function CSSBoxDemo() {
  const boxRef = useRef<CSSBoxRef>(null)

  // Example text face component
  const TextFace = ({
    texts,
    className,
  }: {
    texts: string[]
    className?: string
  }) => (
    <div className={`flex flex-col ${className || ""}`}>
      {texts.map((text, i) => (
        <div key={i} className="text-primary-blue font-bold tracking-wider">
          {text}
        </div>
      ))}
    </div>
  )

  return (
    <CSSBox
      ref={boxRef}
      width={200}
      height={200}
      depth={200}
      perspective={600}
      stiffness={100}
      damping={30}
      faces={{
        front: (
          <TextFace
            texts={["YOU CAN", "JUST", "DO THINGS"]}
            className="text-right justify-end items-end h-full w-full p-2 select-none"
          />
        ),
        back: (
          <TextFace
            texts={["MAKE THINGS", "YOU WISH", "EXISTED"]} 
            className="text-left justify-end h-full w-full p-2 select-none"
          />
        ),
        right: (
          <TextFace
            texts={["MAKE THINGS", "YOU WISH", "EXISTED"]}
            className="text-left justify-end h-full w-full p-2 select-none"
          />
        ),
        left: (
          <TextFace
            texts={["BREAK", "THINGS", "MOVE", "FAST"]}
            className="items-end w-full h-full p-2 select-none"
          />
        ),
        top: (
          <TextFace
            texts={["YOU CAN", "JUST", "DO THINGS"]}
            className="text-right justify-end items-end h-full w-full p-2 select-none" 
          />
        ),
        bottom: (
          <TextFace
            texts={["BREAK", "THINGS", "MOVE", "FAST"]}
            className="items-end w-full h-full p-2 select-none"
          />
        ),
      }}
      className="text-3xl"
    />
  )
}
