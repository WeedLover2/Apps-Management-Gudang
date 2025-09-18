import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import RouterWrapper from './routes/index.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { ProductProvider } from './context/ProductContext.jsx'

createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <ProductProvider>
      <RouterWrapper />
    </ProductProvider>
  </AuthProvider>,
)