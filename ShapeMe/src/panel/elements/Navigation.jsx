import './Navigation.css'
import { Link } from 'react-router-dom'

export default function Navigation () {


    return(
        <>
        <ul className='navlist'>
            <li>
                Users
            </li>
            <li>
                Admins
            </li>
            <li>
                Dashboard
            </li>
        </ul>
        </>
    )
}