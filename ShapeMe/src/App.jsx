
import Home from './Pages/Home'
import About from './Pages/About'
import Another from './Pages/Another'
import Header from './header/Header'
// import Panel from './Pages/Panel'
import Panel from './panel/Panel'
import Navigation from './panel/elements/Navigation'
import { Route, Routes, useLocation} from 'react-router-dom'

console.log(window.location)

function App() {

  const location = useLocation();

  // Check if the current route is for the Panel component
  const isPanelRoute = location.pathname === '/panel';


  return (
    <>
      {isPanelRoute ? null : <Header />} {/* Conditionally render the Header */}
      <div >
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/about' element={<About/>}/>
          <Route path='/another' element={<Another/>}/>
          {/* <Route path='/panel' element={<Panel/>}/> */}
          <Route path='/panel' element={<Panel/>}/>
          <Route path='/panel/navigation' element={<Navigation/>}/>


        </Routes>
      </div>
    </>
  )
}

export default App
