import React from "react";
import "../../css/SuperAdmin.css";
import { Shield, Users, Building2, LayoutDashboard } from "lucide-react";
import { NavLink, Outlet } from "react-router-dom";

export default function SuperAdmin() {
  return (
    <div className="superadmin-layout d-flex">

      {/* ===== SIDEBAR ===== */}
      <div className="sidebar p-4">
        <div className="mb-4 d-flex align-items-center gap-2">
          <Shield size={28} className="text-primary" />
          <div>
            <h5 className="fw-bold mb-0">OFW System</h5>
            <small className="text-muted">SuperAdmin</small>
          </div>
        </div>

        <ul className="nav flex-column gap-2">

          <li>
            <NavLink
              to="/superadmin/dashboard"
              className={({ isActive }) =>
                `nav-link sidebar-link ${isActive ? "active" : ""}`
              }
            >
              <LayoutDashboard size={18} className="me-2" />
              Dashboard
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/superadmin/agencies"
              className={({ isActive }) =>
                `nav-link sidebar-link ${isActive ? "active" : ""}`
              }
            >
              <Building2 size={18} className="me-2" />
              Agencies
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/superadmin/ofws"
              className={({ isActive }) =>
                `nav-link sidebar-link ${isActive ? "active" : ""}`
              }
            >
              <Users size={18} className="me-2" />
              OFWs
            </NavLink>
          </li>

        </ul>
      </div>

      {/* ===== MAIN CONTENT ===== */}
      <div className="content-area flex-grow-1 p-4">
        <Outlet />
      </div>

    </div>
  );
}