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

export default function Signup () {

        const [showPassword, setShowPassword] = useState(false);
        const [showConfirmPassword ,setShowConfirmPassword] = useState(false)

        
        const handleClickShowPassword = () => setShowPassword((show) => !show);
        const handleClickShowConfimrPassword = () => setShowConfirmPassword((show)=> !show);

        const handleMouseDownPassword = (event) => {
        event.preventDefault();
        };


    return (

        <>
                 <div className='signupContainer'>

                    
                    <div className='signupForm'>
                    <h1 className='signupHeader'>Sign Up</h1>
                        <TextField
                            sx={{ m: 1, width: '28ch' }}
                            id="outlined-password-input"
                            label="Email"
                            type="text"
                            autoComplete="current-password">

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
                            />
                        </FormControl>
                        <button type='button' className='signupButton'> Signup </button>

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

                </div>
             </div>
        </>
    )
}