
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import ChatBot from 'react-chatbotify'
import './App.css'
import Weather from './Components/Weather'
import Test from './Components/button'

function App() {
  
  const flow = {
    "start": {
      "message": "Hello world!",
      "word": "word"
    }
  }

  return (
    <>
      <ChatBot flow={flow}/>
      {/* <Weather /> */}
      <Test />
    </>
  )
}

export default App
