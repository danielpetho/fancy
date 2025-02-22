interface AnimatedPathTextProps {
  // Path properties
  path: string
  pathId?: string
  pathClassName?: string

  // SVG properties
  width?: string | number
  height?: string | number
  viewBox?: string
  svgClassName?: string

  // Text properties
  text: string
  textClassName?: string
  textAnchor?: "start" | "middle" | "end"

  // Animation properties
  duration?: number
  repeatCount?: number | "indefinite"
  from?: string
  to?: string

  side?: 'inside' | 'outside'
  ease?: boolean
}

const AnimatedPathText = ({
  // Path defaults
  path,
  pathId = "animated-path",
  pathClassName,

  // SVG defaults
  width = "100%",
  height = "100%",
  viewBox = "0 0 100 100",
  svgClassName,

  // Text defaults
  text,
  textClassName,
  textAnchor = "middle",

  // Animation defaults
  duration = 4,
  repeatCount = "indefinite",
  from = "0%",
  to = "100%",
  side = 'outside',
  ease = true,
}: AnimatedPathTextProps) => {
    const transform = side === 'inside' ? 'scale(1, -1)' : undefined;

  return (
    <svg
      className={svgClassName}
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox={viewBox}
      preserveAspectRatio="xMidYMid meet"
    >
      <path id={pathId} className={pathClassName} d={path} fill="none" />

      {/* First text element */}
      <text textAnchor={textAnchor} transform={transform} fill="currentColor">
        <textPath
          className={textClassName}
          href={`#${pathId}`}
          startOffset="0%"
        >
          <animate
            attributeName="startOffset"
            from="0%"
            to="100%"
            begin="0s"
            dur={`${duration}s`}
            repeatCount={repeatCount}
            {...(ease && {
                calcMode: "spline",
                keyTimes: "0;1",
                keySplines: "0.762 0.002 0.253 0.999"
              })}
          />
          {text}
        </textPath>
      </text>

      {/* Second text element (offset to hide the jump) */}
      <text textAnchor={textAnchor} transform={transform} fill="currentColor">
        <textPath
          className={textClassName}
          href={`#${pathId}`}
          startOffset="0%"
        >
          <animate
            attributeName="startOffset"
            from="-100%"
            to="0%"
            begin="0s"
            dur={`${duration}s`}
            repeatCount={repeatCount}
            {...(ease && {
                calcMode: "spline",
                keyTimes: "0;1",
                keySplines: "0.762 0.002 0.253 0.999"
              })}
          />
          
          {text}
        </textPath>
      </text>
    </svg>
  )
}

export default AnimatedPathText
