import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'; 
import './index.css'
import OfwDashboard from './OfwDashboard'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <OfwDashboard />
  </StrictMode>,
)