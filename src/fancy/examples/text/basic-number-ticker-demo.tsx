import NumberTicker from "@/fancy/components/text/basic-number-ticker"

const NumberTickerDemo = () => {
  return (
    <div className="p-10 flex w-full h-full justify-center items-center bg-white">
      <p className="w-full text-7xl md:text-9xl flex justify-center font-azeret-mono text-teal">
        <NumberTicker
          from={0}
          target={100}
          autoStart={true}
          transition={{ duration: 3.5, type: "tween", ease: "easeInOut" }}
          onComplete={() => console.log("complete")}
          onStart={() => console.log("start")}
        />
        %
      </p>
    </div>
  )
}

export default NumberTickerDemo
