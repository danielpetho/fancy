import React from "react"

const Preview: React.FC = () => {
  return (
    <div className="w-full bg-[#efefef] items-center justify-center h-full overflow-auto">
      {/* add relative positioning to the main conent */}
      <div className="relative h-full w-full z-10 text-2xl md:text-7xl font-bold uppercase flex justify-center items-center bg-primary-red text-white whitespace-pre">
        Scroll down ↓
      </div>

      {/* Sticky footer. The only important thing here is the z-index, the sticky position and the bottom value */}
      <div className="sticky z-0 bottom-0 left-0 w-full h-80 bg-white flex justify-center items-center">
        <div className="relative overflow-hidden w-full h-full flex justify-end px-12 text-right items-start py-12 text-primary-red">
          <div className="flex flex-row space-x-12 sm:pace-x-16  md:space-x-24 text-sm sm:text-lg md:text-xl">
            <ul>
              <li className="hover:underline cursor-pointer">Home</li>
              <li className="hover:underline cursor-pointer">Docs</li>
              <li className="hover:underline cursor-pointer">Comps</li>
            </ul>
            <ul>
              <li className="hover:underline cursor-pointer">Github</li>
              <li className="hover:underline cursor-pointer">Instagram</li>
              <li className="hover:underline cursor-pointer">X (Twitter)</li>
            </ul>
          </div>
          <h2 className="absolute bottom-0 left-0  translate-y-1/3 sm:text-[192px]  text-[80px] text-primary-red font-calendas">
            fancy
          </h2>
        </div>
      </div>
    </div>
  )
}

export default Preview
