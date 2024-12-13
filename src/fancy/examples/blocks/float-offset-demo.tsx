import Float from "@/fancy/components/blocks/float";
import { cn } from "@/lib/utils";

export default function FloatDemo() {
  const texts = [
    { text: "James Smith", position: "top-[0%] left-[20%]" },
    { text: "Emma Johnson", position: "top-[20%] left-[80%]" },
    { text: "William Brown", position: "top-[70%] left-[40%]" },
    { text: "Olivia Davis", position: "top-[50%] left-[70%]" },
    { text: "Noah Wilson", position: "top-[80%] left-[30%]" },
    { text: "Sophia Taylor", position: "top-[40%] left-[0%]" },
    { text: "Lucas Anderson", position: "top-[15%] left-[45%]" },
    { text: "Isabella Thomas", position: "top-[65%] left-[85%]" },
    { text: "Mason Jackson", position: "top-[85%] left-[15%]" },
    { text: "Ava White", position: "top-[35%] left-[75%]" },
    { text: "Ethan Harris", position: "top-[75%] left-[55%]" },
    { text: "Mia Martin", position: "top-[25%] left-[35%]" },
    { text: "Alexander Thompson", position: "top-[45%] left-[25%]" },
    { text: "Charlotte Garcia", position: "top-[55%] left-[65%]" },
    { text: "Daniel Martinez", position: "top-[90%] left-[45%]" },
    { text: "Emily Robinson", position: "top-[10%] left-[70%]" },
    { text: "Henry Clark", position: "top-[60%] left-[10%]" },
    { text: "Sophie Lewis", position: "top-[95%] left-[80%]" },
  ];

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-background relative">
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
            "absolute text-xl flex w-full sm:text-2xl md:text-3xl font-light hover:underline cursor-pointer text-[#0015ff]",
            item.position
          )}
        >
          <p>{item.text}</p>
        </Float>
      ))}
    </div>
  );
}
