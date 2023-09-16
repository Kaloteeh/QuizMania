import {useTitle} from './Title';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import './login.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook,faGithub,faGoogle } from '@fortawesome/free-brands-svg-icons'
import InputLabel from '@mui/material/InputLabel';  
import FormControl from '@mui/material/FormControl';    
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import axios from 'axios';
import { Navigate } from 'react-router-dom';



function Login() {

    
    

    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
  
    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };


        useTitle('Login | ShapeMe');    

        const [email, setEmail] = useState('')
        const [password, setPassword] = useState('')
        const [redirect, setRedirect] = useState(false)

        const submit = async (e) => {
                e.preventDefault()
            try{
                await axios.post('http://localhost:3001/api/login', {
                    email,
                    password

            }) 
                setRedirect(true)
            }catch(err){
                console.log(err)
            }
        }

    if(redirect){
        return <Navigate to='/'/>
    }

    

    return (

        <>
             <div className='loginContainer'>

                <div className='loginBranded'>
                    
                <h2 className='heading'>Welcome</h2>
            
                    <form onSubmit={submit} className='loginForm'>
                        <TextField
                            sx={{ m: 1, width: '28ch' }}
                            id="outlined-password-input"
                            label="Email"
                            type="text"
                            autoComplete="current-password"
                            onChange={e => setEmail(e.target.value)}
                            >
                            
                        </TextField>

                        <FormControl sx={{ m: 1, width: '28ch' }} variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-password"
                                    type={showPassword ? 'text' : 'password'}
                                    endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                        >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                                }
                                label="Password"
                                onChange={e => setPassword(e.target.value)}
                            />
                        </FormControl>

                        <button type='submit' className='continueButton'>Continue</button>

                    </form>
                        <p className='doYouHaveAnAccount'>
                                    Don't have an account? <Link to='/signup' className='signUp'>Sign up
                                </Link>
                        </p>

                        <h3 className='or'> 
                            <span>
                            OR
                            </span>    
                        </h3>

                    <div className='loginButtons'>
                        <button className='loginBrandedButtons' id='facebook'>
                            {/* <p id='paragraph'>Facebook 
                            </p> */}
                            <FontAwesomeIcon id='icon' className='facebook'
                                icon={faFacebook}/>
                        </button>

                        <button className='loginBrandedButtons' id='google'>
                            {/* <p id='paragraph'>Google 
                            </p> */}
                            <FontAwesomeIcon id='icon' className='google'
                                icon={faGoogle} />
                        </button>

                        <button className='loginBrandedButtons' id='github'>
                            {/* <p id='paragraph'>GitHub 
                            </p> */}
                            <FontAwesomeIcon id='icon' className='github'
                                icon={faGithub} />
                        </button>
                        </div>
                    </div>
             </div>     
       
        </>
    );
}
export default Login;


//RETURN >>

 {/* <div className='containerLogin'>
   {profile ? (
        <div className='loggedProfile'>
            <div className='img'>
            <img src={profile.picture} style={{borderRadius:20}}/>
            </div>
            <h3>User Logged in</h3>
            <p>Name : {profile.name}</p>
            <p>Email : {profile.email}</p>
            <Button variant='contained' onClick={logOut}> Sign Out</Button>

        </div>)
        : (
            <div className='login'>
    <LoginSocialGoogle 
    client_id='230827833124-tnimfcl2qs7q5ii8gn5gdh1kal1o1phq.apps.googleusercontent.com'
    scope='openid profile email'
    discoveryDocs='claims_supported'
    access_type='offline'
    onResolve={handleLoginSuccess}
    onReject={(err)=>{
        console.log(err);
    }}
    >
    <Button variant='contained' > Sign</Button>
    </LoginSocialGoogle>
   </div>   

        )
        
        }
       </div> */}


    //CONSTS >

//     const [profile,setProfile] = useState(null)
// const handleLoginSuccess = ({ provider,data})=>{
//     console.log("Logged in with " , provider)
//     console.log("User Data" , data )

//     setProfile(data)


// }

// const logOut = () => {
//     googleLogout();
//    setProfile(null);
// };