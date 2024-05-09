import { Dayjs } from 'dayjs'
import { useContext } from 'react'
import LocaleContext from './LocaleContext'
import allLocales from './locale'

interface HeaderProps {
  curMonth: Dayjs
  prevMonthHandler: () => void
  nextMonthHandler: () => void
  todayHandler: () => void
}

function Header(props: HeaderProps) {
  const { curMonth, prevMonthHandler, nextMonthHandler, todayHandler } = props

  const localeContext = useContext(LocaleContext)

  return (
    <div className="calendar-header">
      <div className="calendar-header-left">
        <div className="calendar-header-icon" onClick={prevMonthHandler}>
          &lt;
        </div>
        <div className="calendar-header-value">
          {curMonth.format(allLocales[localeContext.locale].formatMonth)}
        </div>
        <div className="calendar-header-icon" onClick={nextMonthHandler}>
          &gt;
        </div>
        <button className="calendar-header-btn" onClick={todayHandler}>
          {allLocales[localeContext.locale].today}
        </button>
      </div>
    </div>
  )
}

export default Header
