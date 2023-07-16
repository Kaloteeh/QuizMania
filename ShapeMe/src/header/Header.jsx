import './header.css'
import {Link} from 'react-router-dom'
export default function Header(){

return (
<>
<nav className="nav">
    <a href="/" className="site-title">ShapeMe</a>

    <ul>
        <li className='active'>
            <Link to="/" >Home</Link>
        </li>
        <li> 
        <Link to="/about" >About</Link>
        </li>
        <li> 
        <Link to="/another" >Another</Link>
        </li>
    </ul>
</nav>
</>

)

}

