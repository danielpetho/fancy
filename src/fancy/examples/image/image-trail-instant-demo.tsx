import Image from "next/image"
import { exampleImages } from "@/utils/demo-images"

import {
  ImageTrail,
  ImageTrailItem,
} from "@/fancy/components/image/image-trail"

const ImageTrailDemo = () => {
  return (
    <div className="w-full h-full bg-white relative text-foreground dark:text-muted">
      <ImageTrail
        mouseDistanceThreshold={1}
        intensity={1}
        keyframes={{ scale: [1, 0] }}
        keyframesOptions={{
          scale: { duration: 1, times: [0, 1] },
        }}
        repeatChildren={10}
        newElementsOnTop={false}
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
    </div>
  )
}

export default ImageTrailDemo
