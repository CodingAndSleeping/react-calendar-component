import IconAdd from './components/Icon/icons/IconAdd'
import IconEmail from './components/Icon/icons/IconEmail'
import IconfontMsg from './components/Icon/icons/IconfontMsg'

function App() {
  return (
    <div className="App">
      <IconAdd size="40px" spin></IconAdd>
      <IconEmail style={{ color: 'blue', fontSize: '50px' }}></IconEmail>
      <IconfontMsg type="icon-xiaoxi-zhihui"></IconfontMsg>
    </div>
  )
}

export default App
