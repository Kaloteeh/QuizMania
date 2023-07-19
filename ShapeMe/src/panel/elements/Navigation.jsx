import './Navigation.css'
import { Link } from 'react-router-dom'

export default function Navigation ({ selectedPage, setSelectedPage }) {


    return(
        <>
        <ul className='navlist'>

        <li
          className={selectedPage === 'admin' ? 'active' : ''}
          onClick={() => setSelectedPage('admin')}
        >
          <Link to='/panel/admin'>Admin</Link>
        </li>
        <li
          className={selectedPage === 'users' ? 'active' : ''}
          onClick={() => setSelectedPage('users')}
        >
          <Link to='/panel/users'>Users</Link>
        </li>
        <li
          className={selectedPage === 'dashboard' ? 'active' : ''}
          onClick={() => setSelectedPage('dashboard')}
        >
          <Link to='/panel/dashboard'>Dashboard</Link>
        </li>
        </ul>
        </>
    )
}