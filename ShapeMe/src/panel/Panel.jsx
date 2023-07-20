import './panel.css'
import Admin from './elements/Admin'
import Users from './elements/Users'
import Dashboard from './elements/Dashboard'
import Navigation from './elements/Navigation'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import Button from '@mui/material/Button';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';

export default function Panel ()  {

    const [selectedPage, setSelectedPage] = useState('admin'); // Default selected page is 'navigation'

    return(
        <>
       
        <div className='container'>
            <Link to='/'>
                <Button 
                    variant='contained' 
                    style={{width:40,height:35, position:'absolute',top:10,left:10}}> 
                    <ArrowLeftIcon style={{height:40,width:40}}/> 
                    
                    
                </Button>
            </Link>

            <div className='content'>

                
                {/* Emrin "navi" se po lidhet me css tjere nese ja lojm nav edhe po ndryshon navigacionin te headeri */}
                    <Navigation className='navi'  selectedPage={selectedPage} setSelectedPage={setSelectedPage} />
                    {selectedPage === 'admin' && <Admin />}
                    {selectedPage === 'users' && <Users/>}
                    {selectedPage === 'dashboard' && <Dashboard/>}
            </div>

        </div>
        
        </>
    )
}