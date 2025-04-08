import { useRef, useState } from "react"

import useScreenSize from "@/hooks/use-screen-size"
import { Button } from "@/components/ui/button"
import MediaBetweenText, {
  MediaBetweenTextRef,
} from "@/fancy/components/blocks/media-between-text"

export default function Preview() {
  const ref = useRef<MediaBetweenTextRef>(null)
  const [isOpen, setIsOpen] = useState(false)
  const screenSize = useScreenSize()

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-background">
      <Button
        onClick={() => {
          setIsOpen(!isOpen)
          if (!isOpen) {
            ref.current?.animate()
          } else {
            ref.current?.reset()
          }
        }}
        size={"sm"}
        variant={"outline"}
        className="absolute top-4 left-4 h-8"
      >
        {isOpen ? "Close" : "Open"}
      </Button>

      <MediaBetweenText
        firstText="Artificial "
        secondText="Intelligence"
        mediaUrl={
          "https://cdn.cosmos.so/47c0223f-c704-4d5a-8b47-c48262ebe301?format=jpeg"
        }
        mediaType="image"
        triggerType="ref"
        ref={ref}
        mediaContainerClassName="w-full h-[60px] sm:h-[100px] overflow-hidden pt-1"
        className="cursor-pointer text-3xl sm:text-7xl font-calendas flex flex-col font-light items-center justify-center"
        leftTextClassName=""
        rightTextClassName="italic"
        animationVariants={{
          initial: {
            width: screenSize.lessThan("sm") ? "160px" : "280px",
            height: 0,
            transition: { duration: 0.7, ease: [0.944, 0.008, 0.147, 1.002] },
          },
          animate: {
            width: screenSize.lessThan("sm") ? "200px" : "330px",
            height: screenSize.lessThan("sm") ? "200px" : "300px",
            transition: { duration: 0.7, ease: [0.944, 0.008, 0.147, 1.002] },
          },
        }}
      />
    </div>
  )
}
