export function isNumber(obj: any): obj is number {
  return (
    Object.prototype.toString.call(obj) === '[object Number]' && obj === obj // 判断是否是number类型 并且排除掉 NaN，因为Nan===NaN为false
  )
}

/**
 * 将字符串转换为数字，如果转换失败则返回默认值
 * @param value
 * @param defaultValue
 * @returns
 */
export function toNumber(value?: string | number, defaultValue?: number) {
  if (value === undefined) {
    return defaultValue
  }

  if (isNumber(value)) {
    return value
  }

  const numberVal = parseFloat(value)

  return isNumber(numberVal) ? numberVal : defaultValue
}
