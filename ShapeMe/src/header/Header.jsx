import './header.css'

export default function Header(){

return (
<>
<nav className="nav">
    <a href="/" className="site-title">ShapeMe</a>

    <ul>
        <li className='active'>
            <a href="/model">Model</a>
        </li>
        <li> 
            <a href="/about">About</a>
        </li>
        <li> 
            <a href="/about">Another</a>
        </li>
    </ul>
</nav>
</>

)

}

