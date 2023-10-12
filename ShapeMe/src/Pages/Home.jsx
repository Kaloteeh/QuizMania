
import {useTitle} from './Title';
import './home.css'
import { useEffect, useState } from "react"
import axios from 'axios';

export default function Home () {

    const [message, setMessage] = useState('You are not authenticated')
    const [error, setError] = useState(null);

    const token = sessionStorage.getItem('access_token');
    // console.log(token)

    useEffect(() => {
    (
             async () => {         
              try {
                const response = await axios.get('http://localhost:3001/api/user', { withCredentials: true });
                const user = response.data; // Get response data
                setMessage("Hello " + user.first_name +  "!");
              } catch (e) {
                console.error(e);
                setMessage('You are not authenticated');
                if (e.response) {
                  console.error(e.response.data); // Log response data for more details
                }
                setError('Authentication failed. Please log in.');
                setMessage('You are not authenticated');
                }
              }
              )();
    },[]);
 
    useTitle('Home | ShapeMe'); 

    return (
        <>  
         <div className='homeContainer'>
      {error ? (
        <p>{error}</p>
      ) : (
        <p>{message}</p>
      )}
    </div>
        </>
    )
}