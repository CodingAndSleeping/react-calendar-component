import Space from './components/Space'
import ConfigProvider from './components/Space/ConfigProvider'

function App() {
  return (
    <div className='App'>
      <ConfigProvider space={{ size: 20 }}>
        <Space
          className='container'
          style={{ width: '300px', height: '300px' }}
          direction='vertical'
          align='end'
          wrap={true}
          // size={['large', 'small']}
          split={<div>11</div>}
        >
          <div
            className='box'
            style={{ width: '100px', height: '100px', background: 'green' }}
          >
            1
          </div>
          <div
            className='box'
            style={{ width: '100px', height: '100px', background: 'green' }}
          >
            2
          </div>
          <div
            className='box'
            style={{ width: '100px', height: '100px', background: 'green' }}
          >
            3
          </div>
        </Space>
      </ConfigProvider>
    </div>
  )
}

export default App
