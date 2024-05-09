import type { Dayjs } from 'dayjs'
import { CalendarProps } from '.'
import { useContext } from 'react'
import LocaleContext from './LocaleContext'
import allLocales from './locale'

interface MonthCalendarProps extends CalendarProps {}

function getAllDays(date: Dayjs) {
  const startDate = date.startOf('month')
  const startDay = startDate.day()

  const daysInfo: Array<{ date: Dayjs; currentMonth: boolean }> = new Array(
    6 * 7,
  )

  // 当月开始日 前面的日期
  for (let i = 0; i < startDay; i++) {
    daysInfo[i] = {
      date: startDate.subtract(startDay - i, 'day'),
      currentMonth: false,
    }
  }
  // 当月开始日 后面的日期
  for (let i = startDay; i < daysInfo.length; i++) {
    daysInfo[i] = {
      date: startDate.add(i - startDay, 'day'),
      currentMonth: startDate.add(i - startDay, 'day').month() === date.month(),
    }
  }

  return daysInfo
}

function renderDays(
  days: Array<{ date: Dayjs; currentMonth: boolean }>,
  dateRender: MonthCalendarProps['dateRender'],
  dateInnerContent: MonthCalendarProps['dateInnerContent'],
  currentDate: Dayjs,
) {
  const rows = []

  for (let i = 0; i < 6; i++) {
    const row = []
    for (let j = 0; j < 7; j++) {
      const item = days[i * 7 + j]
      row.push(
        <div
          className={`calendar-month-body-cell ${
            item.currentMonth ? 'calendar-month-body-cell-current' : ''
          }`}
          key={item.date.toString()}>
          {dateRender ? (
            dateRender(item.date)
          ) : (
            <div className='calendar-month-body-cell-inner'>
              <div
                className={`calendar-month-body-cell-inner-value ${
                  currentDate.isSame(item.date, 'date')
                    ? 'calendar-month-body-cell-inner-selected'
                    : ''
                }`}>
                {item.date.date()}
              </div>
              <div className='calendar-month-body-cell-inner-content'>
                {dateInnerContent?.(item.date)}
              </div>
            </div>
          )}
        </div>,
      )
    }
    rows.push(row)
  }

  return rows.map((row, index) => (
    <div className='calendar-month-body-row' key={index}>
      {row}
    </div>
  ))
}

// 月份日历组件
function MonthCalendar(props: MonthCalendarProps) {
  const { value, dateRender, dateInnerContent } = props

  const localeContext = useContext(LocaleContext)

  const weekList = [
    'sunday',
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
  ]

  const allDays = getAllDays(value)

  return (
    <div className='calendar-month'>
      <div className='calendar-month-week-list'>
        {weekList.map((week, index) => (
          <div className='calendar-month-week-list-item' key={index}>
            {allLocales[localeContext.locale].week[week]}
          </div>
        ))}
      </div>

      <div className='calendar-month-body'>
        {renderDays(allDays, dateRender, dateInnerContent, value)}
      </div>
    </div>
  )
}

export default MonthCalendar
