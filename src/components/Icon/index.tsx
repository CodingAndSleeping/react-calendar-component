import React, {
  ForwardRefRenderFunction,
  PropsWithChildren,
  forwardRef,
} from 'react'
import cs from 'classnames'
import './index.scss'

interface BaseIconProps {
  className?: string
  style?: React.CSSProperties

  size?: string | string[]
  spin?: boolean
}

export type IconProps = BaseIconProps &
  Omit<React.SVGAttributes<SVGElement>, keyof BaseIconProps>

const getSize = (size: IconProps['size']): [string, string] => {
  if (Array.isArray(size) && size.length === 2) {
    return size as [string, string]
  }

  const width = (size as string) || '1em'

  const height = (size as string) || '1em'

  return [width, height]
}

const Icon: ForwardRefRenderFunction<
  SVGSVGElement,
  PropsWithChildren<IconProps>
> = (props, ref) => {
  const { className, style, size = '1em', spin, children, ...rest } = props

  const [width, height] = getSize(size)

  const cn = cs('icon', { 'icon-spin': spin }, className)

  return (
    <svg
      ref={ref}
      className={cn}
      style={style}
      width={width}
      height={height}
      fill='currentColor'
      {...rest}
    >
      {children}
    </svg>
  )
}

export default forwardRef(Icon)
