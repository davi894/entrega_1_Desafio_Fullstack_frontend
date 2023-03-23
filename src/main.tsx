import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import ContextDadosUser from './context/index';
import { BrowserRouter } from "react-router-dom";
import './reset.css'
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <ContextDadosUser>
        <App />
      </ContextDadosUser>
    </BrowserRouter>
  </React.StrictMode>,
)
