import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'; 
import './index.css'
// 1. Change to Capital A
import AdminDashboard from './adminDashboard' 

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* 2. Use Capital A here */}
    <AdminDashboard /> 
  </StrictMode>,
)