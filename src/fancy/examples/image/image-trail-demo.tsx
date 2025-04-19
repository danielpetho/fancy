import { useRef } from "react"
import { exampleImages } from "@/utils/demo-images"

import ImageTrail from "@/fancy/components/image/image-trail"

const ImageTrailDemo = () => {
  return (
    <div className="w-full h-full bg-white relative text-foreground dark:text-muted">
      <ImageTrail
        threshold={80}
        keyframes={{ opacity: [0, 1, 1, 0], scale: [1, 1, 2] }}
        keyframesOptions={{
          opacity: { duration: 2, times: [0, 0.001, 0.9, 1] },
          scale: { duration: 2, times: [0, 0.8, 1] },
        }}
      >
        {exampleImages.map((image, index) => (
          <ImageTrailItem key={index}>
            <div className="w-28 h-24 relative overflow-hidden">
              <Image
                src={image.url}
                alt="image"
                fill
                className="object-cover"
                sizes="96px"
              />
            </div>
          </ImageTrailItem>
        ))}
      </ImageTrail>
      <h1 className="text-9xl z-10 absolute top-1/2 left-1/2 pointer-events-none -translate-x-1/2 -translate-y-1/2">
        ALBUMS
      </h1>
    </div>
  )
}

export default ImageTrailDemo
