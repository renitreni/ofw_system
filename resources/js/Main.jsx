import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '../css/app.css';
import '@fortawesome/fontawesome-free/css/all.min.css';


import { BrowserRouter, Routes, Route } from 'react-router-dom';

import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import SuperAdmin from './pages/SuperAdmin';
import AdminDashboard from './pages/AdminDashboard';
import AgentPage from './pages/AgentPage';
import OfwPage from './pages/OfwPage';
import SignUp from "./pages/SignUp";


export default function Main() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/superadmin" element={<SuperAdmin />} />
                <Route path="/superadmin/dashboard" element={<SuperAdmin />} />
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                <Route path="/agent/dashboard" element={<AgentPage />} />
                <Route path="/ofw/home" element={<OfwPage />} />
                <Route path="/register" element={<SignUp />} />
            </Routes>

        </BrowserRouter>
    )
}