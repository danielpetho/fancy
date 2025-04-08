import useScreenSize from "@/hooks/use-screen-size"
import MediaBetweenText from "@/fancy/components/blocks/media-between-text"

export default function Preview() {
  const screenSize = useScreenSize()

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-background">
      <a
        href="https://www.instagram.com/p/C3oL4euoc2l/?img_index=1"
        target="_blank"
        rel="noreferrer"
      >
        <MediaBetweenText
          firstText="that's a nice ("
          secondText=") chair!"
          mediaUrl={
            "https://cdn.cosmos.so/90e2192e-7bd4-44af-96ae-05cd955c0cfb?format=jpeg"
          }
          mediaType="image"
          triggerType="hover"
          mediaContainerClassName="w-full h-[30px] sm:h-[100px] overflow-hidden mx-px mt-1 sm:mx-2 sm:mt-4"
          className="cursor-pointer sm:text-6xl text-2xl text-primary-red lowercase font-light flex flex-row items-center justify-center w-full"
          animationVariants={{
            initial: { width: 0 },
            animate: {
              width: screenSize.lessThan("sm") ? "30px" : "100px",
              transition: { duration: 0.4, type: "spring", bounce: 0 },
            },
          }}
        />
      </a>
    </div>
  )
}
