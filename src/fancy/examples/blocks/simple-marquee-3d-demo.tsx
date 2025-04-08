import React, { useEffect, useState } from "react"
import { motion } from "motion/react"

import { cn } from "@/lib/utils"
import SimpleMarquee from "@/fancy/components/blocks/simple-marquee"

// Interface for album data
interface Album {
  coverArt: string
  title: string
  artist: string
}

const hardcodedAlbums: Album[] = [
  {
    coverArt:
      "https://ia600207.us.archive.org/28/items/mbid-770b9b80-10e1-4297-b1fd-46ad0dbb0305/mbid-770b9b80-10e1-4297-b1fd-46ad0dbb0305-1148987477_thumb500.jpg",
    title: "Homework",
    artist: "Daft Punk",
  },
  {
    coverArt:
      "https://ia800905.us.archive.org/5/items/mbid-9da1a863-f3f2-4618-bdce-f0c88c055ba5/mbid-9da1a863-f3f2-4618-bdce-f0c88c055ba5-8201721911_thumb500.jpg",
    title: "✝",
    artist: "Justice",
  },
  {
    coverArt:
      "https://ia800909.us.archive.org/12/items/mbid-ee618541-23df-4973-afb7-e2d9f02e03d8/mbid-ee618541-23df-4973-afb7-e2d9f02e03d8-8154031977_thumb500.jpg",
    title: "By Your Side",
    artist: "Breakbot",
  },
  {
    coverArt:
      "https://ia800804.us.archive.org/20/items/mbid-3adfe4c6-0fa2-4813-a212-058d9a99b4a8/mbid-3adfe4c6-0fa2-4813-a212-058d9a99b4a8-16639897570_thumb500.jpg",
    title: "Still Waters",
    artist: "Breakbot",
  },
  {
    coverArt:
      "https://ia803403.us.archive.org/14/items/mbid-a7fcead9-ab9d-3d15-bb0d-a2b1945517dd/mbid-a7fcead9-ab9d-3d15-bb0d-a2b1945517dd-8093147470_thumb500.jpg",
    title: "Fancy Footwork",
    artist: "Chromeo",
  },
  {
    coverArt:
      "https://ia801301.us.archive.org/18/items/mbid-8acb4d6d-2cf9-4685-b4e8-5c9937621691/mbid-8acb4d6d-2cf9-4685-b4e8-5c9937621691-5651042668_thumb500.jpg",
    title: "Trax on da Rocks Vol. 2",
    artist: "Thomas Bangalter",
  },
  {
    coverArt:
      "https://ia904509.us.archive.org/32/items/mbid-cb844a4d-c02f-3199-b949-1656b36722da/mbid-cb844a4d-c02f-3199-b949-1656b36722da-8145217760_thumb500.jpg",
    title: "1999",
    artist: "Cassius",
  },
  {
    coverArt:
      "https://ia903201.us.archive.org/6/items/mbid-747ed90c-6479-4cec-a98a-b320a5ef75be/mbid-747ed90c-6479-4cec-a98a-b320a5ef75be-18417637214_thumb500.jpg",
    title: "Woman",
    artist: "Justice",
  },
  {
    coverArt:
      "https://ia800200.us.archive.org/5/items/mbid-9d0a791d-c0ed-4b99-bb31-976fad672408/mbid-9d0a791d-c0ed-4b99-bb31-976fad672408-1959533822_thumb500.jpg",
    title: "Modjo",
    artist: "Modjo",
  },
  {
    coverArt:
      "https://ia903106.us.archive.org/23/items/mbid-bbfc83ad-826f-4957-893d-a808105c828b/mbid-bbfc83ad-826f-4957-893d-a808105c828b-25063975521_thumb500.jpg",
    title: "Random Access Memories",
    artist: "Daft Punk",
  },
]

export default function SimpleMarqueeDemo() {
  const [albums, setAlbums] = useState<Album[]>([])
  const [loading, setLoading] = useState(true)
  const [container, setContainer] = useState<HTMLElement | null>(null)

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setAlbums(hardcodedAlbums)
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const firstRow = albums.slice(0, Math.floor(albums.length / 2))
  const secondRow = albums.slice(Math.floor(albums.length / 2))

  const MarqueeItem = ({ album, index }: { album: Album; index: number }) => {
    const variants = {
      initial: {
        y: "0px",
        x: "0px",
        scale: 1,
        opacity: 1,
      },
      hover: {
        y: "-12px",
        x: "-12px",
        scale: 1.05,
        transition: {
          duration: 0.15,
          ease: "easeOut",
        },
      },
    }

    const textVariants = {
      initial: {
        opacity: 0,
      },
      hover: {
        opacity: 1,
        transition: {
          duration: 0.15,
          ease: "easeOut",
        },
      },
    }

    const imageVariants = {
      initial: {
        opacity: 1,
      },
      hover: {
        opacity: 0.45,
        transition: {
          duration: 0.15,
          ease: "easeOut",
        },
      },
    }

    const containerClasses = cn(
      "mx-2 sm:mx-3 md:mx-4 cursor-pointer",
      "h-32 w-32 sm:h-40 sm:w-40 md:h-48 md:w-48",
      "relative flex shadow-white/20 shadow-md",
      "overflow-hidden flex-col transform-gpu bg-black"
    )

    const textContainerClasses = cn(
      "justify-end p-2 sm:p-2.5 md:p-3 h-full flex items-start flex-col",
      "leading-tight"
    )

    const imageClasses = cn("object-cover w-full h-full shadow-2xl absolute")

    return (
      <motion.div
        className={containerClasses}
        initial="initial"
        whileHover="hover"
        variants={variants}
      >
        <motion.div className={textContainerClasses} variants={textVariants}>
          <h3 className="text-white text-sm sm:text-base md:text-lg font-medium z-30">
            {album.title}
          </h3>
          <p className="text-neutral-300 text-xs sm:text-sm md:text-base z-30">
            {album.artist}
          </p>
        </motion.div>
        <motion.img
          src={album.coverArt}
          alt={`${album.title} by ${album.artist}`}
          draggable={false}
          className={imageClasses}
          variants={imageVariants}
        />
      </motion.div>
    )
  }

  return (
    <div
      className="flex w-full h-full relative justify-center items-center flex-col bg-black overflow-y-auto overflow-x-hidden"
      ref={(node) => setContainer(node)}
    >
      <h1 className="absolute text-center text-3xl sm:text-5xl md:text-6xl top-1/4 text-white font-calendas">
        Weekly Mix
      </h1>

      {loading ? (
        <div className="text-white">Loading album covers...</div>
      ) : (
        <>
          <div
            className="absolute h-1/2 sm:h-full w-[200%] top-32 -left-3/4 justify-center items-center flex flex-col space-y-2 sm:space-y-3 md:space-y-4 perspective-near"
            style={{
              transform:
                "rotateX(45deg) rotateY(-15deg) rotateZ(35deg) translateZ(-200px)",
            }}
          >
            <SimpleMarquee
              className="w-full"
              baseVelocity={10}
              repeat={3}
              draggable={false}
              scrollSpringConfig={{ damping: 50, stiffness: 400 }}
              slowDownFactor={0.2}
              slowdownOnHover
              slowDownSpringConfig={{ damping: 60, stiffness: 300 }}
              scrollAwareDirection={true}
              scrollContainer={{ current: container }}
              useScrollVelocity={true}
              direction="left"
            >
              {firstRow.map((album, i) => (
                <MarqueeItem key={i} index={i} album={album} />
              ))}
            </SimpleMarquee>

            <SimpleMarquee
              className="w-full"
              baseVelocity={10}
              repeat={3}
              scrollAwareDirection={true}
              scrollSpringConfig={{ damping: 50, stiffness: 400 }}
              slowdownOnHover
              slowDownFactor={0.2}
              slowDownSpringConfig={{ damping: 60, stiffness: 300 }}
              useScrollVelocity={true}
              scrollContainer={{ current: container }}
              draggable={false}
              direction="right"
            >
              {secondRow.map((album, i) => (
                <MarqueeItem key={i} index={i} album={album} />
              ))}
            </SimpleMarquee>
          </div>
        </>
      )}
    </div>
  )
}
