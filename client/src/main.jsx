import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { Toaster } from 'react-hot-toast';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    <Toaster
      position="bottom-right"
      toastOptions={{
        style: {
          fontFamily: 'var(--font-body)',
          borderRadius: 'var(--radius-md)',
        },
        success: { iconTheme: { primary: '#52B788', secondary: 'white' } },
      }}
    />
  </React.StrictMode>
);
