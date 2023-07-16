
import Home from './Pages/Home'
import About from './Pages/About'
import Another from './Pages/Another'
import Header from './header/Header'
import { Route, Routes} from 'react-router-dom'

console.log(window.location)

function App() {




  return (
    <>
      <Header/>
      <div className='container'>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/about' element={<About/>}/>
          <Route path='/another' element={<Another/>}/>
        </Routes>
      </div>
    </>
  )
}

export default App
