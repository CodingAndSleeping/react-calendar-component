import { toNumber } from '../../utils/numberUtils'
import { WatermarkProps } from '../..'
export type WatermarkOptions = Omit<
  WatermarkProps,
  'className' | 'style' | 'children'
>
/**
 * 默认参数
 */
const defaultOptions = {
  rotate: -20,
  zIndex: 1,
  width: 100,
  gap: [100, 100],
  offset: [0, 0],
  fontStyle: {
    fontSize: '16px',
    color: 'rgba(0, 0, 0, 0.15)',
    fontFamily: 'sans-serif',
    fontWeight: 'normal',
  },
  getContainer: () => document.body,
}
/**
 * 将传入的参数与默认值合并，并返回合并后的参数
 * @param options
 * @returns
 */
const getMergedOptions = (options: Partial<WatermarkOptions> = {}) => {
  const mergedOptions: Required<WatermarkOptions> = {
    ...options,
    rotate: options.rotate || defaultOptions.rotate,
    zIndex: options.zIndex || defaultOptions.zIndex,
    fontStyle: { ...defaultOptions.fontStyle, ...options.fontStyle },
    width: toNumber(
      options.width,
      options.image ? defaultOptions.width : undefined
    )!,
    height: toNumber(options.height, undefined)!,
    getContainer: options.getContainer!,
    gap: [
      toNumber(options.gap?.[0], defaultOptions.gap[0])!,
      toNumber(options.gap?.[1] || options.gap?.[0], defaultOptions.gap[1])!,
    ],

    offset: [
      toNumber(options.offset?.[0], defaultOptions.offset[0])!,
      toNumber(
        options.offset?.[1] || options.offset?.[0],
        defaultOptions.offset[1]
      )!,
    ],
  } as Required<WatermarkOptions>

  return mergedOptions
}

export default getMergedOptions
