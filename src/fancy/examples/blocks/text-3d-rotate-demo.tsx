import Cube from "@/fancy/components/text/text-3d-rotate"

export default function CubeDemo() {
  return (
    <div className="bg-[#efefef] w-full h-full flex items-center justify-center">
      <Cube 
        size={200}
        perspective={600}
        className="text-xl font-bold"
      />
    </div>
  )
}