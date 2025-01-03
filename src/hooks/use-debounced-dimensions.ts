import { RefObject, useEffect, useState } from "react"

interface Dimensions {
  width: number
  height: number
}

export function useDimensions(
  ref: RefObject<HTMLElement | SVGElement>
): Dimensions {
  const [dimensions, setDimensions] = useState<Dimensions>({
    width: 0,
    height: 0,
  })

  useEffect(() => {
    let timeoutId: NodeJS.Timeout

    const updateDimensions = () => {
      if (ref.current) {
        const { width, height } = ref.current.getBoundingClientRect()
        setDimensions({ width, height })
      }
    }

    const debouncedUpdateDimensions = () => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(updateDimensions, 250) // Wait 250ms after resize ends
    }

    // Initial measurement
    updateDimensions()

    window.addEventListener("resize", debouncedUpdateDimensions)

    return () => {
      window.removeEventListener("resize", debouncedUpdateDimensions)
      clearTimeout(timeoutId)
    }
  }, [ref])

  return dimensions
}
