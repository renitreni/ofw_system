import { Shield, Mail, Phone, Star } from "lucide-react";
import React from "react";
import "../../css/AllAgencies.css";
import { NavLink, Outlet } from "react-router-dom";

export default function BlockedAgencies() {
    return (
        <div className="agency-grid">

            {/* CARD */}
            <div className="agency-card">
                <div className="card-header">
                    <h3>Global Manpower Services Inc.</h3>
                    <span className="status blocked">Blocked</span>
                </div>

                <p className="license"><Shield size={16}/> POEA-001-LB-012023</p>

                <div className="rating">
                    ⭐⭐⭐⭐☆ <span>4.5</span>
                </div>

                <p><Mail size={16}/> info@globalmanpower.ph</p>
                <p><Phone size={16}/> +63 2 1234 5678</p>

                <div className="stats-row">
                    <div>
                        <span>Total OFWs</span>
                        <strong>245</strong>
                    </div>
                    <div>
                        <span>Complaints</span>
                        <strong>0</strong>
                    </div>
                </div>

                <div className="actions">
                    <button className="view-btn">View Details</button>
                    <button className="block-btn">Block Agency</button>
                </div>
            </div>

            {/* SECOND CARD */}
            <div className="agency-card">
                <div className="card-header">
                    <h3>Premier Recruitment Agency</h3>
                    <span className="status active">Active</span>
                </div>

                <p className="license"><Shield size={16}/> POEA-002-LB-012023</p>

                <div className="rating">
                    ⭐⭐⭐⭐⭐ <span>4.8</span>
                </div>

                <p><Mail size={16}/> contact@premierrecruitment.ph</p>
                <p><Phone size={16}/> +63 2 2345 6789</p>

                <div className="stats-row">
                    <div>
                        <span>Total OFWs</span>
                        <strong>189</strong>
                    </div>
                    <div>
                        <span>Complaints</span>
                        <strong>0</strong>
                    </div>
                </div>

                <div className="actions">
                    <button className="view-btn">View Details</button>
                    <button className="block-btn">Block Agency</button>
                </div>
            </div>

        </div>
    );
}
