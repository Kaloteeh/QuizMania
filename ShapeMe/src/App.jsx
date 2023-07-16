import { useState } from 'react'

import Header from './header/Header.jsx'
import Model from './model1/Model.jsx'
import About from './about/About.jsx'

console.log(window.location)

function App() {

let component

  switch(window.location.pathname){
    case "/" :
      Component = <App/>
      break
        case "/model":
          Component= <Model/>
          break
          case "/about":
          Component= <About/>
            break
  }
  return (
    <>
      <Header/>
      {component}
    </>
  )
}

export default App
