export function calculatePosition(
  value: number | string | undefined,
  containerSize: number,
  elementSize: number
): number {
  // Handle percentage strings (e.g. "50%")
  if (typeof value === "string" && value.endsWith("%")) {
    const percentage = parseFloat(value) / 100
    return containerSize * percentage
  }

  // Handle direct pixel values
  if (typeof value === "number") {
    return value
  }

  // If no value provided, center the element
  return (containerSize - elementSize) / 2
}
