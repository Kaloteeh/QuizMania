import './Navigation.css'
import { Link } from 'react-router-dom'
import { NavigationData } from './NavigationData';

export default function Navigation ({ selectedPage, setSelectedPage }) {



const handlePageSelection = (pageName) => {
  setSelectedPage(pageName);
  localStorage.setItem('selectedPage', pageName); // Save the selected page in localStorage
};



    return(
        <div className='Navbar'>
          <ul className='Navbarlist'>
              {NavigationData.map((val,id) => {
                 return (
                    <Link to={val.link}
                    key={id}
                    ><li 
                    className='row'
                    id={window.location.pathname === val.link ? 'active' : ''} 
                    onClick={() => handlePageSelection(val.name)}
                     > 
                    {" "}
                      <div id='icon'>{val.icon}</div>{" "}
                      <div id='title'>{val.title}</div>

                   </li></Link>
                   );
                })}
              </ul>
            </div>
          
            
          )
}



        {/* <ul className='navlist'>
   
        
        
        <li
          className={selectedPage === 'admin' ? 'active' : ''}
          onClick={() => setSelectedPage('admin')}
        >
          <Link 
              to='/panel/admin'> 
              Admin
          </Link>
          
        </li>
        <li
          className={selectedPage === 'users' ? 'active' : ''}
          onClick={() => setSelectedPage('users')}
        >
          <Link 
              to='/panel/users'>
              Users
          </Link>
        </li>
        <li
          className={selectedPage === 'dashboard' ? 'active' : ''}
          onClick={() => setSelectedPage('dashboard')}
        >
          <Link
              to='/panel/dashboard'>
              Dashboard
          </Link>
        </li>
        
        </ul> */}
        
   