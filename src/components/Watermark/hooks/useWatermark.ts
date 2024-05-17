import { useEffect, useState } from 'react'
import { WatermarkProps } from '..'
import { merge } from 'lodash-es'

export type WatermarkOptions = Omit<
  WatermarkProps,
  'className' | 'style' | 'children'
>

export default function useWatermark(params: WatermarkOptions) {
  const [options, setOptions] = useState(params || {})

  function drawWatermark() {}

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
