import { useState } from 'react'
import reactLogo from './assets/react.svg'
import Navbar from './components/Quiz/Quiz'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar />
    </>
  )
}

export default App
