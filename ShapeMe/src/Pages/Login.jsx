import React, { useState, useEffect } from 'react';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import './login.css'
import Button from '@mui/material/Button';
import { Helmet } from 'react-helmet'

function Login() {

   


    const [ user, setUser ] = useState([]);
    const [ profile, setProfile ] = useState(null);

    const login = useGoogleLogin({
        onSuccess: (codeResponse) => setUser(codeResponse),
        onError: (error) => console.log('Login Failed:', error)
    });

    useEffect(
        () => {
            if (user) {
                axios
                    .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                        headers: {
                            Authorization: `Bearer ${user.access_token}`,
                            Accept: 'application/json'
                        }
                    })
                    .then((res) => {
                        setProfile(res.data);
                    })
                    .catch((err) => console.log(err));
            }
        },
        [ user ]
    );

    // log out function to log the user out of google and set the profile array to null
    const logOut = () => {
        googleLogout();
        setProfile(null);
    };

    return (

        <>
                    <Helmet>
                        <title>
                            ShapeMe | Login
                        </title>
                    </Helmet>
        
        <div className='logincontainer'>
            <h2>React Google Login</h2>
           
            {profile ? (
                <div className='logincontents'>
                    <img src={profile.picture} alt="user image" />
                    <h3>User Logged in</h3>
                    <p>Name: {profile.name}</p>
                    <p>Email Address: {profile.email}</p>
                    <br />
                    <br />
                    <Button variant='contained' onClick={logOut}>Log out</Button>
                </div>
            ) : (
               <> 
               <Button 
              style={{ padding:' 0.5rem 1rem 0.5rem 1rem',margin:'1rem'}}
                variant='contained'
                 onClick={() => login()}>
                    Sign in with Google 
                    </Button>
                    <Button variant='contained' style={{backgroundColor:'purple',padding:' 0.5rem 1rem 0.5rem 1rem',margin:'1rem'}}>Sign in</Button>
                    </>
            )}
        </div>
        </>
    );
}
export default Login;