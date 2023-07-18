import './panel.css'
import Navigation from './elements/Navigation'

export default function Panel ()  {

    return(
        <>
       
        <div className='container'>

            <div className='content'>
                    <Navigation className='navi'></Navigation>
            </div>

        </div>
        
        </>
    )
}