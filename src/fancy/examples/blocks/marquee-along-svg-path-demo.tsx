import MarqueeAlongSvgPath from "@/fancy/components/blocks/marquee-along-svg-path"

const path =
  "M1 209.434C58.5872 255.935 387.926 325.938 482.583 209.434C600.905 63.8051 525.516 -43.2211 427.332 19.9613C329.149 83.1436 352.902 242.723 515.041 267.302C644.752 286.966 943.56 181.94 995 156.5"

export default function MarqueeAlongSvgPathDemo() {
  return (
    <div className="w-full h-full bg-zinc-50 flex">
      <MarqueeAlongSvgPath
        path={path}
        baseVelocity={8}
        slowdownOnHover={true}
        draggable={true}
        repeat={2}
        dragSensitivity={0.1}
        className="absolute -left-24 sm:-left-32 top-32 scale-60 sm:scale-100"
        grabCursor
      >
        {imgs.map((img, i) => (
          <div
            key={i}
            className="w-14 h-full hover:scale-150 duration-300 ease-in-out"
          >
            <img
              src={img.src}
              alt={`Example ${i}`}
              className="w-full h-full object-cover"
              draggable={false}
            />
          </div>
        ))}
      </MarqueeAlongSvgPath>
    </div>
  )
}

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
