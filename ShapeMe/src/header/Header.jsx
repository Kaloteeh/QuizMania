import './header.css'
import {Link, useResolvedPath,useMatch} from 'react-router-dom'
import Button from '@mui/material/Button';
export default function Header(){

return (
<>
<nav className="nav">
    <a href="/" className="site-title" id='title'>ShapeMe</a>
    <ul>
        <CustomLink to="/">Home </CustomLink>
        <CustomLink to="/about" >About </CustomLink>
        <CustomLink to="/another" >Another </CustomLink>
        <CustomLink to="/panel" >Panel</CustomLink>
       <Link to='/login'> <Button variant='contained' className='btn' style={{height:50,padding:20,margin:15}}>LOGIN</Button></Link>
    </ul>
</nav>
</>

)
}

//Ide s'e kom qka o ka bohet qitu amo po funskionon

function CustomLink({ to ,children,...props}){
    const reslovedPath = useResolvedPath(to)
    const isActive = useMatch({ path : reslovedPath.pathname, end: true})
    return(
        <li className={isActive ? "active" : ""}>
            <Link to={to} {...props}>
            {children}
            </Link>
        </li>
    )
}

