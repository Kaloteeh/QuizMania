import './panel.css'
import Admin from './elements/Admin'
import Users from './elements/Users'
import Dashboard from './elements/Dashboard'
import Navigation from './elements/Navigation'
import { useState } from 'react'

export default function Panel ()  {

    const [selectedPage, setSelectedPage] = useState('admin'); // Default selected page is 'navigation'

    return(
        <>
       
        <div className='container'>

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