import Screen from './Components/Screen'
import { useState } from 'react'
import Complete from './Components/Complete'

function App() {
  const [completed, setCompleted] = useState(false)
  return (
    <div className='App'>
      {!completed ? (
        <Screen setCompleted={setCompleted} />
      ) : (
        <Complete setCompleted={setCompleted} />
      )}
    </div>
  )
}

export default App
