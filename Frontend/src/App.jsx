import { useState } from 'react'
import Footer from './componenets/Footer/Footer'
import Header from './componenets/Header/Header'
import Home from './componenets/Home/Home'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header/>
      <Home/>
      <Footer/>
    </>
  )
}

export default App
