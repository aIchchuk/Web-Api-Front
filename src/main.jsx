import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css'; // ✅ Important: global styles
import { BrowserRouter } from 'react-router-dom';
import Kpp from './Kpp.jsx';
import AuthProvider from './Expected Structure/auth/AuthProvider.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>

    {/* <Kpp></Kpp> */}
    
  </React.StrictMode>
);
