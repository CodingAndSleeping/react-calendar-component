import { toNumber } from '../../utils/numberUtils'
import { WatermarkOptions } from '../useWatermark'

export default async function getCanvasData(
  options: Required<WatermarkOptions>
): Promise<{
  width: number
  height: number
  base64Url: string
}> {
  const { rotate, image, content, fontStyle, gap } = options

  const canvas = document.createElement('canvas')

  const ctx = canvas.getContext('2d')!

  const ratio = window.devicePixelRatio

  const configCanvas = (size: { width: number; height: number }) => {
    const canvasWidth = gap[0] + size.width
    const canvasHeight = gap[1] + size.height

    canvas.setAttribute('width', `${canvasWidth * ratio}px`)
    canvas.setAttribute('height', `${canvasHeight * ratio}px`)
    canvas.style.width = `${canvasWidth}px`
    canvas.style.height = `${canvasHeight}px`

    ctx.translate((canvasWidth * ratio) / 2, (canvasHeight * ratio) / 2)
    ctx.scale(ratio, ratio)

    const RotateAngle = (rotate * Math.PI) / 180
    ctx.rotate(RotateAngle)
  }

  const drawText = () => {
    const { fontSize, color, fontWeight, fontFamily } = fontStyle

    const realFontSize = toNumber(fontSize, 0) || fontStyle.fontSize

    ctx.font = `${fontWeight} ${realFontSize}px ${fontFamily}`
    const measureSize = measureTextSize(ctx, [...content], rotate)

    const width = options.width || measureSize.width
    const height = options.height || measureSize.height

    configCanvas({ width, height })

    ctx.fillStyle = color!

    ctx.font = `${fontWeight} ${realFontSize}px ${fontFamily}`

    ctx.textBaseline = 'top'

    const contents = [...content]

    contents.forEach((item, index) => {
      const { height: lineHeight, width: lineWidth } =
        measureSize.lineSize[index]

      const xStartPoint = -lineWidth / 2
      const yStartPoint =
        -(options.height || measureSize.originHeight) / 2 + lineHeight * index

      ctx.fillText(
        item,
        xStartPoint,
        yStartPoint,
        options.width || measureSize.originWidth
      )
    })
    return Promise.resolve({ base64Url: canvas.toDataURL(), height, width })
  }

  const drawImage = () => {
    return new Promise<{
      width: number
      height: number
      base64Url: string
    }>(reslove => {
      const img = new Image()
      img.crossOrigin = 'anonymous'
      img.referrerPolicy = 'no-referrer'

      img.src = image

      img.onload = () => {
        let { width, height } = options
        if (!width || !height) {
          if (width) {
            height = (img.height / img.width) * +width
          } else {
            width = (img.width / img.height) * +height
          }
        }

        configCanvas({ width, height })
        ctx.drawImage(img, -width / 2, -height / 2, width, height)

        return reslove({
          base64Url: canvas.toDataURL(),
          width,
          height,
        })
      }

      img.onerror = () => {
        return drawText()
      }
    })
  }

  return image ? drawImage() : drawText()
}

const measureTextSize = (
  ctx: CanvasRenderingContext2D,
  content: string[],
  rotate: number
) => {
  let width = 0
  let height = 0
  const lineSize: Array<{ width: number; height: number }> = []

  content.forEach(item => {
    const {
      width: textWidth,
      fontBoundingBoxAscent,
      fontBoundingBoxDescent,
    } = ctx.measureText(item)

    const textHeight = fontBoundingBoxAscent + fontBoundingBoxDescent

    if (textWidth > width) {
      width = textWidth
    }

    height += textHeight
    lineSize.push({ height: textHeight, width: textWidth })
  })

  const angle = (rotate * Math.PI) / 180

  return {
    originWidth: width,
    originHeight: height,
    width: Math.ceil(
      Math.abs(Math.sin(angle) * height) + Math.abs(Math.cos(angle) * width)
    ),
    height: Math.ceil(
      Math.abs(Math.sin(angle) * width) + Math.abs(height * Math.cos(angle))
    ),
    lineSize,
  }
}
