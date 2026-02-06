import React from "react";
import "../../css/Agencies.css";
import { NavLink, Outlet } from "react-router-dom";

export default function Agencies() {
    return (
        <div className="agency-container">
            <div className="page-header">
            <div className="header-left">
                <h2>Agency Management</h2>
                <p>Manage and monitor recruitment agencies</p>
            </div>
            </div>


            {/* TABS */}
            <div className="agency-tabs">
                <NavLink to="/superadmin/agencies/" end className={({ isActive }) =>
                    `agency-tab ${isActive ? "active" : ""}`}>
                    All Agencies (6)
                </NavLink>

                <NavLink to="/superadmin/agencies/active" className={({ isActive }) =>
                    `agency-tab ${isActive ? "active" : ""}`}>
                    Active (5)
                </NavLink>

                <NavLink to="/superadmin/agencies/blocked" className={({ isActive }) =>
                    `agency-tab ${isActive ? "active" : ""}`}>
                    Blocked (1)
                </NavLink>
            </div>

            <Outlet />
        </div>
    );
}
