import MediaBetweenText from "@/fancy/components/blocks/media-between-text"

export default function Preview() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-background">
      <MediaBetweenText
        firstWord="that's a nice ("
        secondWord=") chair!"
        mediaUrl={"https://cdn.cosmos.so/90e2192e-7bd4-44af-96ae-05cd955c0cfb?format=jpeg"}
        mediaType="image"
        triggerType="hover"
        mediaContainerClassName="w-full h-[100px] overflow-hidden mx-2 mt-4" 
        className="cursor-pointer text-6xl text-primaryRed lowercase font-light flex flex-row items-center justify-center w-full"
        cursorAnimationVariants = {{
            initial: { width: 0 },
            animate: { width: "100px", transition: { duration: 0.4, type: "spring", bounce: 0 }  },
        }}
      />
    </div>
  )
}
