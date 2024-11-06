import { useEffect, useRef, useState } from 'react'
import { WatermarkProps } from '../../index'
import { merge } from 'lodash-es'
import getCanvasData from './getCanvasDate'
import getMergedOptions from './getMergedOptions'

export type WatermarkOptions = Omit<
  WatermarkProps,
  'className' | 'style' | 'children'
>

/**
 * 生成水印 hooks
 * @param params
 * @returns
 */
export default function useWatermark(params: WatermarkOptions) {
  const [options, setOptions] = useState(params || {})

  // 得到合并后的参数
  const mergedOptions = getMergedOptions(options)

  // 存储水印div
  const watermarkDiv = useRef<HTMLDivElement>()

  const mutationObserver = useRef<MutationObserver>()

  const container = mergedOptions.getContainer()

  const { zIndex, gap } = mergedOptions

  // 绘制水印函数
  function drawWatermark() {
    if (!container) return

    getCanvasData(mergedOptions).then(({ base64Url, width, height }) => {
      // 设置水印的样式
      const wnStyle = `
        width:100%;
        height:100%;
        position:absolute;
        top:0;
        left:0;
        bottom:0;
        right:0;
        pointer-events: none;
        z-index:${zIndex};
        background-position: 0 0;
        background-size:${gap[0] + width}px ${gap[1] + height}px;
        background-repeat: repeat;
        background-image:url(${base64Url})
      `

      if (!watermarkDiv.current) {
        // 创建水印div
        const div = document.createElement('div')
        watermarkDiv.current = div
        container.append(div)
        container.style.position = 'relative'
      }
      // 设置水印div的样式
      watermarkDiv.current?.setAttribute('style', wnStyle.trim())

      if (container) {
        mutationObserver.current?.disconnect()
        mutationObserver.current = new MutationObserver(mutations => {
          const isChanged = mutations.some((mutation: MutationRecord) => {
            let flag = false

            if (mutation.removedNodes.length) {
              flag = Array.from(mutation.removedNodes).some(
                node => node === watermarkDiv.current
              )
            }

            if (
              mutation.type === 'attributes' &&
              mutation.target === watermarkDiv.current
            ) {
              flag = true
            }

            return flag
          })

          if (isChanged) {
            watermarkDiv.current?.parentNode?.removeChild(watermarkDiv.current)
            watermarkDiv.current = void 0
            drawWatermark()
          }
        })

        mutationObserver.current.observe(container, {
          attributes: true,
          childList: true,
          subtree: true,
        })
      }
    })
  }

  useEffect(() => {
    drawWatermark()
  }, [options])

  return {
    generateWatermark: (newOptions: Partial<WatermarkOptions>) => {
      setOptions(merge({}, options, newOptions))
    },
    destroy: () => {},
  }
}
