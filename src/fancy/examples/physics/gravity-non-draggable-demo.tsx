import Gravity, { MatterBody } from "@/fancy/components/physics/gravity";
import { motion } from "framer-motion";

const socialLinks = [
  { name: "LinkedIn", x: "30%", y: "10%" },
  { name: "X (Twitter)", x: "30%", y: "30%" },
  { name: "Instagram", x: "40%", y: "20%", angle: 10 },
  { name: "GitHub", x: "75%", y: "10%" },
  { name: "BlueSky", x: "80%", y: "20%" },
];

const stars = ["✱", "✽", "✦", "✸", "✹", "✺"];

export default function Preview() {
  return (
    <div className="w-full h-full flex flex-col relative bg-background font-calendas">
      <p className="pt-4 text-9xl text-[#0015ff] w-full text-center font-calendas">
        CONTACT
      </p>
      <Gravity gravity={{ x: 0, y: 1 }} className="w-full h-full" >
        {socialLinks.map((link) => (
          <MatterBody
            key={link.name}
            matterBodyOptions={{ friction: 0.5, restitution: 0.2 }}
            x={link.x}
            y={link.y}
            angle={link.angle || 0}
            isDraggable={false}
          >
            <motion.div
              className="text-3xl bg-white text-[#0015ff] border border-[#0015ff] rounded-full hover:cursor-pointer hover:bg-[#0015ff] hover:text-white px-8 py-4"
              whileTap={{ scale: 0.9 }}
            >
              {link.name}
            </motion.div>
          </MatterBody>
        ))}

        {stars.map((star, i) => (
          <MatterBody
            key={i}
            matterBodyOptions={{ friction: 0.5, restitution: 0.2 }}
            x={`${Math.random() * 60 + 20}%`}
            y={`${Math.random() * 20 + 40}%`}
            angle={Math.random() * 360}
          >
            <div className={`aspect-square w-16 h-16 bg-[#0015ff] text-white rounded-lg text-center`}>
            </div>
          </MatterBody>
        ))}
      </Gravity>
    </div>
  );
}
