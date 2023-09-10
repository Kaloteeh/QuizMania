import './signup.css'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook,faGithub,faGoogle } from '@fortawesome/free-brands-svg-icons'
import React, { useState, useEffect } from 'react';
import InputLabel from '@mui/material/InputLabel';  
import FormControl from '@mui/material/FormControl';    
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';  
import axios from 'axios'
import {useTitle} from './Title';
import { Navigate } from 'react-router-dom';


export default function Signup () {

        useTitle('Signup | ShapeMe');

        const [showPassword, setShowPassword] = useState(false);
        const [showConfirmPassword ,setShowConfirmPassword] = useState(false)

        
        const handleClickShowPassword = () => setShowPassword((show) => !show);
        const handleClickShowConfimrPassword = () => setShowConfirmPassword((show)=> !show);

        const handleMouseDownPassword = (event) => {
        event.preventDefault();
        };

        const [fullname, setFullname] = useState('')
        const [email, setEmail] = useState('')
        const [password, setPassword] = useState('')
        const [password_confirm, setPasswordConfirm] = useState('')
        const [redirect, setRedirect] = useState(false)

        const submitHandler = async (e) => {
            e.preventDefault()

            try{
            await axios.post('http://localhost:3001/api/signup', { 
            fullname,
            email,
            password,
            password_confirm
            })
            setRedirect(true)
            
        }
        catch(err){
            console.log(err)
        }

            
        }


        if(redirect){
            return <Navigate to='/'/>
          }

        return (
            <>
                 <div className='signupContainer'>

                    
                    <form onSubmit={submitHandler} className='signupForm'>
                    <h1 className='signupHeader'>Sign Up</h1>
            
                    <TextField
                            sx={{ m: 1, width: '28ch' }}
                            id="outlined-password-input"
                            label="Full Name"
                            type="text"
                            onChange={(e) => setFullname(e.target.value)}
                            // autoComplete="current-password"
                            //Idk why autocomplete was for current password on email
                            >
                        </TextField>


                        <TextField
                            sx={{ m: 1, width: '28ch' }}
                            id="outlined-password-input"
                            label="Email"
                            type="text"
                            onChange={(e) => setEmail(e.target.value)}
                            // autoComplete="current-password"
                            //Idk why autocomplete was for current password on email
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
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </FormControl>

                        <FormControl sx={{ m: 1, width: '28ch' }} variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-confirmPassword">Confirm Password</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-confirmPassword"
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowConfimrPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                        >
                                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                                }
                                label="Confirm Password"
                                onChange={(e) => setPasswordConfirm(e.target.value)}
                            />
                        </FormControl>
                        <button type='submit' className='signupButton'> Signup </button>
                       
                        <p className='loginLink'>
                                    Already have an account? <Link to='/login' className='login'>Login here</Link>
                        </p>

                        <h3 className='signupOr'> 
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

                </form>
             </div>
        </>
    )
}