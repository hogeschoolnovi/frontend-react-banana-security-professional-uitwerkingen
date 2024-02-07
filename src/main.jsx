import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom';
import AuthContextProvider from '../../frontend-react-banana-security-professional-uitwerkingen/src/context/AuthContext';
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <Router>
          <AuthContextProvider>
              <App/>
          </AuthContextProvider>
      </Router>
  </React.StrictMode>,
)
