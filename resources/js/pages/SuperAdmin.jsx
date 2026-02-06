import React from "react";
import "../../css/SuperAdmin.css";
import { Shield, Users, Building2 } from "lucide-react";
import { NavLink, Outlet } from "react-router-dom";

export default function SuperAdmin() {
    return (
        <div className="container">

    {/* HEADER */}
    <div className="page-header">
        {/* LEFT SIDE */}
        <div className="header-left">
            <Shield className="icon-shield" />
            <div>
                <h1>OFW Management System</h1>
                <p>SuperAdmin Dashboard</p>
            </div>
        </div>

        {/* RIGHT SIDE NAV */}
        <div className="header-right bubble-tabs">
            <NavLink
                to="/superadmin/dashboard"
                className={({ isActive }) =>
                    `bubble-tab ${isActive ? "active" : ""}`
                }
            >
                <span>Dashboard</span>
            </NavLink>

            <NavLink
                to="/superadmin/agencies"
                className={({ isActive }) =>
                    `bubble-tab ${isActive ? "active" : ""}`
                }
            >
                <Building2 size={18} />
                <span>Agencies</span>
            </NavLink>

            <NavLink
                to="/superadmin/ofws"
                className={({ isActive }) =>
                    `bubble-tab ${isActive ? "active" : ""}`
                }
            >
                <Users size={18} />
                <span>OFWs</span>
            </NavLink>
        </div>
    </div>



            {/* 🔥 CONTENT AREA LANG ANG NAGBABAGO */}
            <Outlet />

        </div>
    );
}
