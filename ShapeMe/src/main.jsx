import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google';


ReactDOM.createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId='230827833124-tnimfcl2qs7q5ii8gn5gdh1kal1o1phq.apps.googleusercontent.com'>
  <React.StrictMode>
    <BrowserRouter>
    <App />
    </BrowserRouter>   
  </React.StrictMode>
  </GoogleOAuthProvider>,
)
