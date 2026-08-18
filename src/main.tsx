import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import Login from './Features/Login/Components/Login.tsx';
import LoginProvider from './Features/Login/Context/Login/LoginProvider.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LoginProvider>
      <Login />
    </LoginProvider>

  </StrictMode>,
)
