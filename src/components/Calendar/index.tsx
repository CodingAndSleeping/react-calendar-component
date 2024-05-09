import { CSSProperties, ReactNode, useState } from 'react'
import type { Dayjs } from 'dayjs'
import cs from 'classnames'
import './index.scss'
import Header from './Header'
import MonthCalendar from './MonthCalendar'
import LocaleContext from './LocaleContext'
import { languageType } from './locale'
import dayjs from 'dayjs'

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
  const { value, style, className, locale, onChange } = props

  const [curValue, setCurValue] = useState<Dayjs>(value)

  const changeDate = (date: Dayjs) => {
    setCurValue(date)
    setCurMonth(date)
    onChange && onChange(date)
  }

  const handleSlectChange = (date: Dayjs) => {
    changeDate(date)
  }

  const [curMonth, setCurMonth] = useState<Dayjs>(value)

  const handlePrev = () => {
    setCurMonth(curMonth.subtract(1, 'month'))
  }

  const handleNext = () => {
    setCurMonth(curMonth.add(1, 'month'))
  }

  const handleToday = () => {
    const date = dayjs(Date.now())
    changeDate(date)
  }

  const calssNames = cs('calendar', className)

  return (
    <LocaleContext.Provider
      value={{
        locale: locale || (navigator.language as languageType),
      }}
    >
      <div className={calssNames} style={style}>
        <Header
          curMonth={curMonth}
          prevMonthHandler={handlePrev}
          nextMonthHandler={handleNext}
          todayHandler={handleToday}
        />
        <MonthCalendar
          {...props}
          value={curValue}
          curMonth={curMonth}
          selectHandler={handleSlectChange}
        />
      </div>
    </LocaleContext.Provider>
  )
}

export default Calendar
