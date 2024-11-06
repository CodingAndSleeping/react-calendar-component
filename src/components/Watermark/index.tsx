import {
  CSSProperties,
  PropsWithChildren,
  useCallback,
  useEffect,
  useRef,
} from 'react'
import useWatermark from './hooks/useWatermark'

export interface WatermarkProps extends PropsWithChildren {
  sytle?: CSSProperties
  calssName?: string
  zIndex?: number | string
  width?: number
  height?: number
  rotate?: number
  image?: string
  content?: string | string[]
  fontStyle?: {
    color?: string
    fontFamily?: string
    fontSize?: number | string
    fontWeight?: number | string
  }
  gap?: [number, number]
  offset?: [number, number]
  getContainer?: () => HTMLElement
}

function Watermark(props: WatermarkProps) {
  const {
    calssName,
    sytle,

    zIndex,
    width,
    height,
    rotate,
    image,
    content,
    fontStyle,
    gap,
    offset,

    children,
  } = props

  const containerRef = useRef<HTMLDivElement>(null)

  const getContainer = useCallback(() => {
    return props.getContainer ? props.getContainer() : containerRef.current!
  }, [containerRef.current, props.getContainer])

  const { generateWatermark } = useWatermark({
    zIndex,
    width,
    height,
    rotate,
    image,
    content,
    fontStyle,
    gap,
    offset,
    getContainer,
  })

  useEffect(() => {
    generateWatermark({
      zIndex,
      width,
      height,
      rotate,
      image,
      content,
      fontStyle,
      gap,
      offset,
      getContainer,
    })
  }, [
    zIndex,
    width,
    height,
    rotate,
    image,
    content,
    JSON.stringify(props.fontStyle),
    JSON.stringify(props.gap),
    JSON.stringify(props.offset),
    getContainer,
  ])

  return children ? (
    <div className={calssName} style={sytle} ref={containerRef}>
      {children}
    </div>
  ) : null
}

export default Watermark
