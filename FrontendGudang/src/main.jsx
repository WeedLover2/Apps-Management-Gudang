import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import RouterWrapper from './routes/index.jsx'
import { AuthProvider } from './context/AuthContext.jsx'

createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <RouterWrapper />
  </AuthProvider>,
)