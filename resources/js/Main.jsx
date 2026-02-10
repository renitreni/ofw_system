import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '../css/app.css';

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import SuperAdmin from './pages/SuperAdmin';
import AdminDashboard from './pages/AdminDashboard';
import AgentPage from './pages/AgentPage';
import ContractDetails from './pages/ContractDetails';
import OfwPage from './pages/OfwPage';
import SignUp from "./pages/SignUp";

// ✅ SUPERADMIN PAGES
import SuperAdminDashboard from './pages/SuperAdminDashboard';
import Agencies from './pages/Agencies';
import Ofws from './pages/Ofws';

// ✅ AGENCIES PAGES
import AllAgencies from './pages/AllAgencies';
import ActiveAgencies from './pages/ActiveAgencies';
import BlockedAgencies from './pages/BlockedAgencies';


export default function Main() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<Login />} />

                {/* ✅ SUPERADMIN SECTION (NESTED ROUTES) */}
                <Route path="/superadmin" element={<SuperAdmin />}>

                    {/* DEFAULT: /superadmin */}
                    <Route index element={<Navigate to="dashboard" replace />} />

                    <Route path="dashboard" element={<SuperAdminDashboard />} />

                    {/* AGENCIES SECTION WITH NESTED TABS */}
                    <Route path="agencies" element={<Agencies />}>
                        <Route index element={<AllAgencies />} />     {/* default tab */}
                        <Route path="active" element={<ActiveAgencies />} />
                        <Route path="blocked" element={<BlockedAgencies />} />
                    </Route>

                    {/* OFWS */}
                    <Route path="ofws" element={<Ofws />} />

                </Route>


                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                {/*Agent*/}
                <Route path="/agent/dashboard" element={<AgentPage />} />
                 <Route path="/agent/pending" element={<AgentPage />} />
                 <Route path="/agent/processed" element={<AgentPage />} />   
                  <Route path="/agent/rejected" element={<AgentPage />} />
                 <Route path="/agent/contracts/:id" element={<ContractDetails />} />



                <Route path="/ofw/home" element={<OfwPage />} />
                <Route path="/register" element={<SignUp />} />
            </Routes>
        </BrowserRouter>
    )
}
