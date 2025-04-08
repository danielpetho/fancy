import { useRef } from "react"
import { exampleImages } from "@/utils/demo-images"

import ImageTrail from "@/fancy/components/image/image-trail"

const ImageTrailDemo = () => {
  const ref = useRef<HTMLDivElement>(null)

  return (
    <div className="flex w-full h-full justify-center items-center bg-white text-foreground dark:text-muted">
      <div className="absolute top-0 left-0 z-0" ref={ref}>
        <ImageTrail containerRef={ref}>
          {exampleImages.map((image, index) => (
            <div
              key={index}
              className="flex relative overflow-hidden w-24 h-24 "
            >
              <img
                src={image.url}
                alt="image"
                className="object-cover absolute inset-0"
              />
            </div>
          ))}
        </ImageTrail>
      </div>
      <h1 className="text-9xl z-10">ALBUMS</h1>
    </div>
  )
}

export default ImageTrailDemo
