import React from "react";
import {
    Building2,
    CheckCircle,
    XCircle,
    Users,
    AlertTriangle,
    Clock
} from "lucide-react";
import "../../css/SuperAdminDashboard.css";
import { NavLink } from "react-router-dom";

export default function SuperAdminDashboard() {
    return (
        <div className="dashboard-container">

            {/* HEADER */}
            <div className="dashboard-header">
                <h2>Dashboard Overview</h2>
                <p>
                    Monitor and manage recruitment agencies and overseas Filipino workers
                </p>
            </div>

            {/* STATS GRID */}
            <div className="stats-grid">
                <div className="stat-card">
                    <div>
                        <span className="stat-title">Total Agencies</span>
                        <h3>6</h3>
                    </div>
                    <div className="stat-icon blue"><Building2 /></div>
                </div>

                <div className="stat-card">
                    <div>
                        <span className="stat-title">Active Agencies</span>
                        <h3 className="green">5</h3>
                    </div>
                    <div className="stat-icon green"><CheckCircle /></div>
                </div>

                <div className="stat-card">
                    <div>
                        <span className="stat-title">Blocked Agencies</span>
                        <h3 className="red">1</h3>
                    </div>
                    <div className="stat-icon red"><XCircle /></div>
                </div>

                <div className="stat-card">
                    <div>
                        <span className="stat-title">Total OFWs</span>
                        <h3>6</h3>
                    </div>
                    <div className="stat-icon purple"><Users /></div>
                </div>

                <div className="stat-card">
                    <div>
                        <span className="stat-title">OFWs with Issues</span>
                        <h3 className="orange">1</h3>
                    </div>
                    <div className="stat-icon orange"><AlertTriangle /></div>
                </div>

                <div className="stat-card">
                    <div>
                        <span className="stat-title">Processing</span>
                        <h3 className="blue">1</h3>
                    </div>
                    <div className="stat-icon blue"><Clock /></div>
                </div>
            </div>

            {/* LOWER GRID (NEW SECTION) */}
            <div className="lower-grid">

                {/* RECENT ACTIVITY */}
                <div className="card activity-card">
                    <h3>Recent Activity</h3>

                    <ul className="activity-list">
                        <li>
                            <span className="dot blue"></span>
                            <div>
                                <strong>Blocked Agency</strong> - Pacific Workforce Solutions  
                                <p>By SuperAdmin Cruz • 2024-02-05 14:30:00</p>
                            </div>
                        </li>

                        <li>
                            <span className="dot blue"></span>
                            <div>
                                <strong>Suspended OFW</strong> - Pedro Garcia (OFW-2024-00004)  
                                <p>By SuperAdmin Cruz • 2024-02-05 13:15:00</p>
                            </div>
                        </li>

                        <li>
                            <span className="dot blue"></span>
                            <div>
                                <strong>Approved Document</strong> - Maria Santos - Passport  
                                <p>By SuperAdmin Lopez • 2024-02-05 11:45:00</p>
                            </div>
                        </li>

                        <li>
                            <span className="dot blue"></span>
                            <div>
                                <strong>Rejected Contract</strong> - Pedro Garcia (OFW-2024-00004)  
                                <p>By SuperAdmin Santos • 2024-02-05 10:20:00</p>
                            </div>
                        </li>

                        <li>
                            <span className="dot blue"></span>
                            <div>
                                <strong>Verified Contract</strong> - Maria Santos (OFW-2024-00001)  
                                <p>By SuperAdmin Cruz • 2024-02-04 16:00:00</p>
                            </div>
                        </li>
                    </ul>
                </div>

                {/* AGENCIES REQUIRING ATTENTION */}
                <div className="card attention-card">
                    <h3>Agencies Requiring Attention</h3>

                    <div className="attention-box">
                        <div>
                            <strong>Excellence Overseas Employment</strong>
                            <p className="red-text">12 complaints • Active</p>
                        </div>
                        <NavLink to="/superadmin/agencies/excellence" className="view-link">View</NavLink>
                    </div>

                    <div className="attention-box">
                        <div>
                            <strong>Pacific Workforce Solutions</strong>
                            <p className="red-text">28 complaints • Blocked</p>
                        </div>
                        <NavLink to="/superadmin/agencies/pacific" className="view-link">View</NavLink>
                    </div>
                </div>

            </div>
        </div>
    );
}
