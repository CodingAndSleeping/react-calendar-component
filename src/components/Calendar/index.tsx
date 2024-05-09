import { CSSProperties, ReactNode } from 'react'
import type { Dayjs } from 'dayjs'
import cs from 'classnames'
import './index.scss'
import Header from './Header'
import MonthCalendar from './MonthCalendar'
import LocaleContext from './LocaleContext'
import { languageType } from './locale'

export interface CalendarProps {
  value: Dayjs
  style?: CSSProperties
  className?: string | string[]
  // 定制日期显示，会完全覆盖日期单元格
  dateRender?: (currentDate: Dayjs) => ReactNode
  // 定制日期单元格，内容会被添加到单元格内，只在全屏日历模式下生效
  dateInnerContent?: (currentDate: Dayjs) => ReactNode
  // 国际化相关
  locale?: languageType
  onChange?: (date: Dayjs) => void
}

function Calendar(props: CalendarProps) {
  const { style, className, locale } = props

  const calssNames = cs('calendar', className)

  return (
    <LocaleContext.Provider
      value={{
        locale: locale || (navigator.language as languageType),
      }}>
      <div className={calssNames} style={style}>
        <Header></Header>
        <MonthCalendar {...props} />
      </div>
    </LocaleContext.Provider>
  )
}

export default Calendar
