import Image from "next/image"
import { exampleImages } from "@/utils/demo-images"

const images = [
  "https://cdn.cosmos.so/7dc46d69-ad3b-4942-ab84-511ae786892e?format=jpeg",
  "https://cdn.cosmos.so/cb5c5995-4ba7-4519-a0e8-aa6427cc0a90?format=jpeg",
  "https://cdn.cosmos.so/264d0ae9-f2e9-4deb-843c-229e70bbe4cc?format=jpeg",
  "https://cdn.cosmos.so/d9ed5da2-92b8-4b71-84e8-7bef645c44dc?format=jpeg",
  "https://cdn.cosmos.so/223c2fad-7dcb-46e0-9f00-826edcf8d7b1?format=jpeg",
  "https://cdn.cosmos.so/48e640ee-75e1-4390-a34a-b790785f033a?format=jpeg",
  "https://cdn.cosmos.so/d9c19f7c-d605-4257-8546-dafe0daa250f.?format=jpeg",
  "https://cdn.cosmos.so/5ff27be0-bed8-4779-b520-6896e68e7e4d?format=jpeg",
  "https://cdn.cosmos.so/9098d86e-b3f7-425f-be96-40df45c82342?format=jpeg",
  "https://cdn.cosmos.so/5c01be2f-57fe-4a1a-91ad-a37b9426e080?format=jpeg",
  "https://cdn.cosmos.so/6a1d9c63-5b32-4a22-b03e-5dc63164ad8a?format=jpeg"
]

import {
  ImageTrail,
  ImageTrailItem,
} from "@/fancy/components/image/image-trail"

const ImageTrailDemo = () => {
  return (
    <div className="w-full h-full bg-white relative text-foreground dark:text-muted">
      <ImageTrail
        mouseDistanceThreshold={0}
        intensity={1}
        keyframes={{ scale: [1, 0], rotateZ: [0, 0] }}
        keyframesOptions={{
          scale: { duration: 1.5, times: [0, 1] },
          rotateZ: { duration: 1.5, times: [0, 1] },
        }}
        repeatChildren={20}
        newElementsOnTop={true}
      >
        {images.map((url, index) => (
          <ImageTrailItem key={index}>
            <div className="w-28 h-28 relative overflow-hidden rounded-xl">
              <img
                src={url}
                alt="image"
                className="object-cover"
              />
            </div>
          </ImageTrailItem>
        ))}
      </ImageTrail>
    </div>
  )
}

export default ImageTrailDemo
