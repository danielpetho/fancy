import { useRef } from "react"

import ImageTrail from "@/fancy/components/image/image-trail"

import { exampleImages } from "../_helpers/exampleImages"

const ImageTrailDemo = () => {
  const ref = useRef<HTMLDivElement>(null)

  return (
    <div className="flex w-full h-full justify-center items-center bg-white">
      <div className="absolute top-0 left-0 z-0" ref={ref}>
        <ImageTrail containerRef={ref}>
          {exampleImages.map((url, index) => (
            <div
              key={index}
              className="flex relative overflow-hidden w-24 h-24 "
            >
              <img
                src={url}
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
