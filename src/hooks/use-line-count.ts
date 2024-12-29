import { useEffect, useState } from "react"

export function useLineCount(element: HTMLElement) {
  const [lineCount, setLineCount] = useState(0)

  useEffect(() => {
    const calculateLines = () => {
      if (!element) return
      const elementHeight = element.offsetHeight
      const style = window.getComputedStyle(element)
      const lineHeight = parseInt(style.lineHeight)
      const lines = Math.floor(elementHeight / lineHeight)
      setLineCount(lines)
    }

    calculateLines()

    const resizeObserver = new ResizeObserver(calculateLines)
    resizeObserver.observe(element)

    return () => {
      resizeObserver.disconnect()
    }
  }, [element])

  return lineCount
}
