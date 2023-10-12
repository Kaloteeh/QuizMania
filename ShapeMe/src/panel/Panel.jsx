import './panel.css'
import Admin from './elements/Admin/Admin'
import Users from './elements/Users/Users'
import Dashboard from './elements/Dashboard'
import Navigation from './elements/Nav/Navigation'
import { useState,useEffect } from 'react'
import { Link } from 'react-router-dom'
import {useTitle} from '../Pages/Title';
import Button from '@mui/material/Button';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';

export default function Panel ()  {

    useTitle('Admin Panel | ShapeMe');
    const [selectedPage, setSelectedPage] = useState('admin');

    useEffect(() => {
        const storedSelectedPage = localStorage.getItem('selectedPage');
        if (storedSelectedPage) {
          setSelectedPage(storedSelectedPage);
        }
      }, []);
      

   

    return(
        <>
       
        <div className='container'>
            <Link to='/'>
                <Button 
                    variant='contained' 
                    style={{width:100,height:30, position:'absolute',top:10,left:10}}> 
                    <ArrowLeftIcon style={{height:40,width:40}}/> 
                    Back
                    
                </Button>
            </Link>


                <Navigation className='navi'  selectedPage={selectedPage} setSelectedPage={setSelectedPage} />

            <div className='content'>
                {/* Emrin "navi" se po lidhet me css tjere nese ja lojm nav edhe po ndryshon navigacionin te headeri */}
                    {selectedPage === 'admin' && <Admin />}
                    {selectedPage === 'users' && <Users/>}
                    {selectedPage === 'dashboard' && <Dashboard/>}
            </div>
        </div>
        
        </>
    )
}