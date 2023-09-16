
import Home from './Pages/Home'
import About from './Pages/About'
import Another from './Pages/Another'
import Header from './header/Header'
import Login from './Pages/Login'
import Panel  from './panel/Panel'
import Navigation from './panel/elements/Nav/Navigation'
import Admin from './panel/elements/Admin/Admin'
import Users from './panel/elements/Users/Users'
import Dashboard from './panel/elements/Dashboard'
import Signup from  './Pages/Signup'
import { Route, Routes, useLocation} from 'react-router-dom'


function App() {

  

  const location = useLocation();

  // Check if the current route is for the Panel component
  const isPanelRoute = location.pathname.startsWith('/panel'); // Check if it starts with '/panel'


  return (
    <>
      {isPanelRoute ? null : <Header />} {/* Conditionally render the Header */}
      <div >
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/about' element={<About/>}/>
          <Route path='/another' element={<Another/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/login' element={<Login/>}/>

          {/* PANEL ROUTE */}
          <Route path='/panel' element={<Panel/>}> 
              <Route path='/panel/navigation' element={<Navigation/>}/>
              <Route path='/panel/admin' element={<Admin/>}/>
              <Route path='/panel/users' element={<Users/>}/>
              <Route path='/panel/dashboard' element={<Dashboard/>}/>
          </Route>

        </Routes>
        
      </div>
    </>
  )
}

export default App
