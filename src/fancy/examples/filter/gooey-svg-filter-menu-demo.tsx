import { useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { Home, Mail, Menu, Settings, User, X } from "lucide-react"

import useDetectBrowser from "@/hooks/use-detect-browser"
import GooeySvgFilter from "@/fancy/components/filter/gooey-svg-filter"

const MENU_ITEMS = [
  { icon: Home, label: "Home" },
  { icon: Mail, label: "Contact" },
  { icon: User, label: "Profile" },
  { icon: Settings, label: "Settings" },
]

export default function GooeyDemo() {
  const [isOpen, setIsOpen] = useState(false)
  const browser = useDetectBrowser()
  const isSafari = browser === "Safari"

  return (
    <div className="relative w-full h-full flex items-center justify-center dark:bg-black bg-white">
      <GooeySvgFilter id="gooey-filter-menu" strength={5} />

      <div
        className="absolute top-4 left-4"
        style={{ filter: "url(#gooey-filter-menu)" }}
      >
        {/* Menu Items */}
        <AnimatePresence>
          {isOpen &&
            MENU_ITEMS.map((item, index) => {
              const Icon = item.icon
              return (
                <motion.button
                  key={item.label}
                  className="absolute w-12 h-12 bg-[#efefef] rounded-full flex items-center justify-center"
                  initial={{ x: 0, opacity: 0 }}
                  animate={{
                    y: (index + 1) * 44,
                    opacity: 1,
                  }}
                  exit={{
                    y: 0,
                    opacity: 0,
                    transition: {
                      delay:
                        (MENU_ITEMS.length - index) * (isSafari ? 0.0 : 0.05),
                      duration: isSafari ? 0 : 0.4,
                      type: "spring",
                      bounce: 0,
                    },
                  }}
                  transition={{
                    delay: index * (isSafari ? 0.0 : 0.05),
                    duration: isSafari ? 0 : 0.4,
                    type: "spring",
                    bounce: 0,
                  }}
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, filter: "blur(10px)" }}
                      animate={{ opacity: 1, filter: "blur(0px)" }}
                      exit={{ opacity: 0, filter: "blur(10px)" }}
                      transition={{
                        delay: index * (isSafari ? 0.0 : 0.05),
                        duration: isSafari ? 0 : 0.2,
                        type: "spring",
                        bounce: 0,
                      }}
                    >
                      <Icon className="w-5 h-5 text-muted-foreground hover:text-black" />
                    </motion.div>
                  </AnimatePresence>
                </motion.button>
              )
            })}
        </AnimatePresence>

        {/* Main Menu Button */}
        <motion.button
          className="relative w-12 h-12 bg-[#efefef] rounded-full flex items-center justify-center"
          onClick={() => setIsOpen(!isOpen)}
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ opacity: 0, filter: "blur(10px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, filter: "blur(10px)" }}
                transition={{ duration: isSafari ? 0 : 0.2 }}
              >
                <X className="w-5 h-5 text-black" />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ opacity: 0, filter: "blur(10px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, filter: "blur(10px)" }}
                transition={{ duration: isSafari ? 0 : 0.2 }}
              >
                <Menu className="w-5 h-5 text-black" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      <p>Open the menu in the top left corner</p>
    </div>
  )
}
