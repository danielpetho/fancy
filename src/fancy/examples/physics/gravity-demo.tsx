import Gravity, { MatterBody } from "@/fancy/components/physics/gravity";

export default function Preview() {
  return (
    <div className="w-full h-full flex flex-col relative font-azeretMono text-white">
      <div className="pt-20 text-6xl text-black w-full text-center">FANCY</div>
      <p className="pt-4 text-2xl text-black w-full text-center">components made with:</p>
      <Gravity debug={false} gravity={1}>
        <MatterBody friction={0.5} restitution={0.2}
        >
          <div className="text-3xl bg-[#0015ff] text-white rounded-full hover:cursor-grab px-8 py-4 ">
            react
          </div>
        </MatterBody>
        <MatterBody friction={0.5} restitution={0.2}>
          <div className="text-2xl bg-[#E794DA]   rounded-full hover:cursor-grab px-8 py-4 ">
            typescript
          </div>
        </MatterBody>
        <MatterBody friction={0.5} restitution={0.2}>
          <div className="text-4xl bg-[#1f464d]  text-white rounded-full hover:cursor-grab px-8 py-4 ">
            motion
          </div>
        </MatterBody>
        <MatterBody friction={0.5} restitution={0.2}>
          <div className="text-2xl bg-[#ff5941]  text-white [#E794DA] rounded-full hover:cursor-grab px-8 py-4 ">
            tailwind
          </div>
        </MatterBody>
        <MatterBody friction={0.5} restitution={0.2}>
          <div className="text-2xl bg-orange-500  text-white [#E794DA] rounded-full hover:cursor-grab px-8 py-4 ">
            drei
          </div>
        </MatterBody>
        <MatterBody friction={0.5} restitution={0.2}>
          <div className="text-3xl bg-[#ffd726]  text-white [#E794DA] rounded-full hover:cursor-grab px-8 py-4 ">
            matter-js
          </div>
        </MatterBody>
      </Gravity>
    </div>
  );
}
