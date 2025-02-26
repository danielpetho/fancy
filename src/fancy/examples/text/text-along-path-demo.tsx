import { useCallback, useState } from "react"
import { AnimatePresence, motion } from "motion/react"

import AnimatedPathText from "@/fancy/components/text/text-along-path"
import { Button } from "@/components/ui/button"

export default function Preview() {
  // Rounded rectangle path
  const rectPath =
    "M 20,20 L 180,20 A 20,20 0 0,1 200,40 L 200,160 A 20,20 0 0,1 180,180 L 20,180 A 20,20 0 0,1 0,160 L 0,40 A 20,20 0 0,1 20,20"
  const [buttonState, setButtonState] = useState<'idle' | 'loading' | 'success'>('idle')
  const [email, setEmail] = useState("")

  const buttonCopy = {
    idle: "Subscribe",
    loading: (
      <motion.div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
    ),
    success: "Done ✓",
  } as const

  const handleSubmit = useCallback(() => {
    if (buttonState === "success") return

    setButtonState("loading")

    setTimeout(() => {
      setButtonState("success")
    }, 1750)

    setTimeout(() => {
      setButtonState("idle")
      setEmail("")
    }, 3500)
  }, [buttonState])

  return (
    <div className="w-full h-full flex justify-center items-center text-primaryBlue relative">
      <AnimatedPathText
        path={rectPath}
        svgClassName="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 h-4/5"
        viewBox="10 10 180 180"
        text="JOIN THE WAITLIST ✉ JOIN THE WAITLIST ✉ JOIN THE WAITLIST ✉ JOIN THE WAITLIST ✉ JOIN THE WAITLIST ✉ "
        textClassName="text-[10.6px] lowercase font-azeretMono text-primaryBlue"
        side="outside"
        duration={20}
        textAnchor="start"
      />

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 p-6 bg-white/90 backdrop-blur-sm">
        <div className="space-y-2">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-primaryBlue focus:outline-none focus:none focus:ring-primaryBlue/50 font-azeretMono text-base placeholder:text-primaryBlue rounded-lg"
          />
          <Button
            type="submit"
            onClick={handleSubmit}
            disabled={buttonState === "loading"}
            className="w-full px-8 py-2 bg-primaryBlue text-white hover:bg-primaryBlue/90 transition-colors font-azeretMono text-base rounded-lg"
          >
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span
                transition={{ type: "spring", duration: 0.3, bounce: 0 }}
                initial={{ opacity: 0, y: -25 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 25 }}
                key={buttonState}
              >
                {buttonCopy[buttonState]}
              </motion.span>
            </AnimatePresence>
          </Button>
        </div>
      </div>
    </div>
  )
}
