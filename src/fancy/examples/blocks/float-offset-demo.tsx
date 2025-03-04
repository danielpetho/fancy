import { cn } from "@/lib/utils"
import Float from "@/fancy/components/blocks/float"

export default function FloatDemo() {
  const texts = [
    { text: "@mdx-js/loader", position: "top-[0%] left-[20%]" },
    { text: "@mdx-js/react", position: "top-[20%] left-[80%]" },
    { text: "@next/mdx", position: "top-[70%] left-[40%]" },
    { text: "@vercel/analytics", position: "top-[80%] left-[30%]" },
    { text: "class-variance-authority", position: "top-[40%] left-[0%]" },
    { text: "clsx", position: "top-[15%] left-[45%]" },
    { text: "flubber", position: "top-[65%] left-[85%]" },
    { text: "motion", position: "top-[85%] left-[15%]" },
    { text: "lenis", position: "top-[35%] left-[75%]" },
    { text: "lodash", position: "top-[75%] left-[55%]" },
    { text: "lucide-react", position: "top-[25%] left-[35%]" },
    { text: "matter-js", position: "top-[45%] left-[25%]" },
    { text: "mdast-util-toc", position: "top-[55%] left-[65%]" },
    { text: "next", position: "top-[90%] left-[45%]" },
    { text: "next-mdx-remote", position: "top-[10%] left-[70%]" },
    { text: "poly-decomp", position: "top-[60%] left-[10%]" },
    { text: "react", position: "top-[30%] left-[50%]" },
    { text: "react-dom", position: "top-[95%] left-[60%]" },
    { text: "react-syntax-highlighter", position: "top-[5%] left-[90%]" },
    { text: "react-wrap-balancer", position: "top-[82%] left-[75%]" },
    { text: "rehype-pretty-code", position: "top-[28%] left-[15%]" },
    { text: "remark", position: "top-[67%] left-[5%]" },
    { text: "svg-path-commander", position: "top-[92%] left-[25%]" },
    { text: "tailwind-merge", position: "top-[28%] left-[95%]" },
    { text: "tailwindcss-animate", position: "top-[73%] left-[20%]" },
    { text: "zod", position: "top-[8%] left-[40%]" },
  ]

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-white relative">
      {texts.map((item, i) => (
        <Float
          key={i}
          timeOffset={i * 0.8}
          amplitude={[
            15 + Math.random() * 20,
            25 + Math.random() * 30,
            20 + Math.random() * 25,
          ]}
          rotationRange={[
            10 + Math.random() * 10,
            10 + Math.random() * 10,
            5 + Math.random() * 5,
          ]}
          speed={0.3 + Math.random() * 0.4}
          className={cn(
            "absolute text-lg flex sm:text-xl md:text-2xl font-light hover:underline cursor-pointer text-primary-blue",
            item.position
          )}
        >
          <p>{item.text}</p>
        </Float>
      ))}
    </div>
  )
}
