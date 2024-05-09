import dayjs from 'dayjs'
import Calendar, { CalendarProps } from './components/Calendar'

function App() {
  const dateRender: CalendarProps['dateRender'] = (date) => {
    return (
      <div
        className='date'
        style={{
          height: '300px',
          // backgroundColor: 'lightblue',
        }}>
        {date.format('YYYY-MM-DD')}
      </div>
    )
  }

  const dateInnerContent: CalendarProps['dateInnerContent'] = (date) => {
    return (
      <div>
        <p
          style={{
            // background: 'yellowgreen',
            height: '30px',
          }}>
          {date.date()}
        </p>
      </div>
    )
  }

  return (
    <div className='App'>
      <Calendar
        value={dayjs('2024-05-09')}
        className={'aaa'}
        // style={{
        //   background: 'grey',
        // }}
        locale='zh-CN'
        // dateRender={dateRender}
        // dateInnerContent={dateInnerContent}
      ></Calendar>
    </div>
  )
}

export default App
