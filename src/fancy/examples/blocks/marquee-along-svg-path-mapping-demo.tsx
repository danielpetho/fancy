import MarqueeAlongSvgPath from "@/fancy/components/blocks/marquee-along-svg-path"

function generateSpiralPath(turns = 5, centerX = 500, centerY = 137) {
  const points = []
  const numPoints = turns * 300 // number of points to create smooth spiral
  const spacing = 18 // controls how far apart the spiral arms are

  for (let i = 0; i < numPoints; i++) {
    const angle = (i / numPoints) * turns * 2 * Math.PI
    const radius = spacing * angle // radius increases with angle
    const x = centerX + radius * Math.cos(angle)
    const y = centerY + radius * Math.sin(angle)
    points.push(`${i === 0 ? "M" : "L"} ${x} ${y}`)
  }

  return points.join(" ")
}

const path = generateSpiralPath(4)

export default function MarqueeAlongSvgPathDemo() {
  return (
    <div className="w-full h-full bg-zinc-50 flex items-center justify-center">
      <h2 className="text-black text-6xl sm:text-8xl z-10">fancy</h2>
      <MarqueeAlongSvgPath
        path={path}
        viewBox="0 0 400 474" // Adjusted to center the spiral
        baseVelocity={1}
        showPath={false}
        slowdownOnHover={true}
        repeat={8}
        enableRollingZIndex={false}
        dragSensitivity={0.01}
        className="absolute top-40 scale-100 -left-32 w-full h-full transform-3d"
        cssVariableInterpolation={[
          { property: "opacity", from: 0, to: 1.5 },
          { property: "scale", from: 0.1, to: 1 },
        ]}
        grabCursor
      >
        {imgs.map((img, i) => (
          <a
            href={img.link}
            target="_blank"
            rel="noopener noreferrer"
            className="pointer-events-auto"
          >
            <div
              key={i}
              className="w-14 h-full cursor-pointer transform-3d hover:rotate-y-0 duration-300 ease-in-out hover:rotate-x-0 perspective-midrange -rotate-x-35 rotate-y-35 hover:scale-200"
            >
              <img
                src={img.src}
                alt={`Example ${i}`}
                className="w-full h-full object-cover"
                draggable={false}
              />
            </div>
          </a>
        ))}
      </MarqueeAlongSvgPath>
    </div>
  )
}

// EXAMPLE IMAGES
const imgs = [
  {
    src: "https://cdn.cosmos.so/b9909337-7a53-48bc-9672-33fbd0f040a1?format=jpeg",
    link: "https://www.instagram.com/p/DCOl6YTS85e/?igsh=MXNvdHhyczl1djJ6ZA%3D%3D",
  },
  {
    src: "https://cdn.cosmos.so/ecdc9dd7-2862-4c28-abb1-dcc0947390f3?format=jpeg",
    link: "https://www.instagram.com/p/C4RTJvVpP4R/?igsh=MWZwOTNlYTVodGszMw%3D%3D",
  },
  {
    src: "https://cdn.cosmos.so/79de41ec-baa4-4ac0-a9a4-c090005ca640?format=jpeg",
    link: "https://pangrampangram.com/products/mori",
  },
  {
    src: "https://cdn.cosmos.so/1a18b312-21cd-4484-bce5-9fb7ed1c5e01?format=jpeg",
    link: "https://www.sergidelgado.com/selected-work/ampersand",
  },
  {
    src: "https://cdn.cosmos.so/d765f64f-7a66-462f-8b2d-3d7bc8d7db55?format=jpeg",
    link: "https://www.instagram.com/p/C40XmANsoe_/?igsh=MXFlZGx4cmw3ZW1qYw%3D%3D",
  },
  {
    src: "https://cdn.cosmos.so/6b9f08ea-f0c5-471f-a620-71221ff1fb65?format=jpeg",
    link: "https://abduzeedo.com/super-stylish-type-explorations",
  },
  {
    src: "https://cdn.cosmos.so/40a09525-4b00-4666-86f0-3c45f5d77605?format=jpeg",
    link: "https://www.instagram.com/p/CrhdrGjr9yK/?igshid=MTc4MmM1YmI2Ng%3D%3D",
  },
  {
    src: "https://cdn.cosmos.so/14f05ab6-b4d0-4605-9007-8a2190a249d0?format=jpeg",
    link: "https://www.instagram.com/julian.stiber/p/By5RBApiDzE/?img_index=1",
  },
  {
    src: "https://cdn.cosmos.so/d05009a2-a2f8-4a4c-a0de-e1b0379dddb8?format=jpeg",
    link: "https://www.instagram.com/p/CeT3COysRNN/?img_index=2",
  },
  {
    src: "https://cdn.cosmos.so/ba646e35-efc2-494a-961b-b40f597e6fc9?format=jpeg",
    link: "https://www.instagram.com/godfreydadich/",
  },
  {
    src: "https://cdn.cosmos.so/e899f9c3-ed48-4899-8c16-fbd5a60705da?format=jpeg",
    link: "https://www.instagram.com/p/Bty1U6BhTOW/?img_index=5",
  },
  {
    src: "https://cdn.cosmos.so/24e83c11-c607-45cd-88fb-5059960b56a0?format=jpeg",
    link: "https://www.instagram.com/p/C48dxn1LqhC/?igsh=dmV5ZWR0Z2Y3Zzlt&img_index=3",
  },
  {
    src: "https://cdn.cosmos.so/cd346bce-f415-4ea7-8060-99c5f7c1741a?format=jpeg",
    link: "https://www.instagram.com/p/C08ZDVyyRhK/?img_index=2&igsh=bHAyZjcxYW1jZDNu",
  },
]
