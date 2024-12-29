import { RefObject, useEffect, useState } from "react"

interface UseLineBreakdownResult {
  lineCount: number
  lines: string[][]
}

export function useLineBreakdown(
  elementRef: RefObject<HTMLElement>,
  text: string
): UseLineBreakdownResult {
  const [breakdown, setBreakdown] = useState<UseLineBreakdownResult>({
    lineCount: 0,
    lines: [[]],
  })

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const calculateLines = () => {
      // Get basic measurements
      const style = window.getComputedStyle(element)
      const lineHeight = parseInt(style.lineHeight)
      const elementHeight = element.offsetHeight

      const linesCount = Math.ceil(elementHeight / lineHeight)

      console.log(elementHeight / lineHeight)

      // Create temporary elements to measure text
      const tempSpan = element.appendChild(document.createElement("span"))
      tempSpan.style.visibility = "hidden"
      tempSpan.style.position = "absolute"
      tempSpan.style.whiteSpace = "nowrap"
      element.appendChild(tempSpan)

      // Split text into words
      const words = text.split(" ")
      const lineGroups: string[][] = [[]]
      let currentLine = 0
      let previousTop = 0

      // Group words into lines
      words.forEach((word, index) => {
        tempSpan.textContent = word
        const rect = tempSpan.getBoundingClientRect()

        if (rect.top > previousTop && index > 0) {
          currentLine++
          lineGroups[currentLine] = []
          previousTop = rect.top
        }

        lineGroups[currentLine].push(word)
      })

      element.removeChild(tempSpan)

      setBreakdown({
        lineCount: lineGroups.length,
        lines: lineGroups,
      })
    }

    calculateLines()

    const resizeObserver = new ResizeObserver(calculateLines)
    resizeObserver.observe(element)

    return () => {
      resizeObserver.disconnect()
    }
  }, [elementRef, text])

  return breakdown
}
