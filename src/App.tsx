import dayjs, { Dayjs } from 'dayjs'
import Calendar, { CalendarProps } from './components/Calendar'

function App() {
  const dateRender: CalendarProps['dateRender'] = date => {
    return (
      <div
        className="date"
        style={{
          height: '300px',
          // backgroundColor: 'lightblue',
        }}
      >
        {date.format('YYYY-MM-DD')}
      </div>
    )
  }

  const dateInnerContent: CalendarProps['dateInnerContent'] = date => {
    return (
      <div>
        <p
          style={{
            // background: 'yellowgreen',
            height: '30px',
          }}
        >
          {date.date()}
        </p>
      </div>
    )
  }

  const handleChange = (date: Dayjs) => {
    console.log(date.format('YYYY-MM-DD'))
  }

  return (
    <div className="App">
      <Calendar
        value={dayjs('2024-05-31')}
        className={'aaa'}
        // style={{
        //   background: 'grey',
        // }}
        locale="en-US"
        // dateRender={dateRender}
        // dateInnerContent={dateInnerContent}
        onChange={handleChange}
      ></Calendar>
    </div>
  )
}

export default App
