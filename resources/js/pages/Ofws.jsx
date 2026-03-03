import React, { useState } from "react";
import "../../css/Ofws.css";
import { Search, MapPin, Building2, Eye } from "lucide-react";

export default function Ofws() {
  // 🔹 SAMPLE DATA
  const ofwData = [
    {
      id: "OFW-2024-00001",
      name: "Maria Santos",
      job: "Domestic Helper",
      destination: "Saudi Arabia",
      agency: "Global Manpower Services Inc.",
      status: "Active",
    },
    {
      id: "OFW-2024-00002",
      name: "Juan Dela Cruz",
      job: "Construction Worker",
      destination: "UAE",
      agency: "Premier Recruitment Agency",
      status: "Processing",
    },
    {
      id: "OFW-2024-00003",
      name: "Ana Reyes",
      job: "Nurse",
      destination: "Singapore",
      agency: "Elite Professional Staffing",
      status: "Active",
    },
    {
      id: "OFW-2024-00004",
      name: "Pedro Garcia",
      job: "Driver",
      destination: "Qatar",
      agency: "Excellence Overseas Employment",
      status: "Suspended",
    },
  ];

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedOfw, setSelectedOfw] = useState(null); // ✅ FIX 1

  // 🔹 Filter logic
  const filteredOFWs = ofwData.filter((ofw) => {
    const matchesSearch =
      ofw.name.toLowerCase().includes(search.toLowerCase()) ||
      ofw.id.toLowerCase().includes(search.toLowerCase()) ||
      ofw.destination.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All" || ofw.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const statuses = [
    "All",
    "Active",
    "Processing",
    "On Leave",
    "Ended",
    "Suspended",
  ];

  return (
    <div className="container">
      {/* HEADER */}
      <div className="page-header">
        <h2>OFW Management</h2>
        <p>Manage and monitor overseas Filipino workers</p>
      </div>

      {!selectedOfw ? (
        <>
          {/* 🔍 SEARCH BAR */}
          <div className="search-bar">
            <Search size={18} />
            <input
              type="text"
              placeholder="Search by name, ID, or country..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* 🧭 STATUS FILTER TABS */}
          <div className="agency-tabs">
            {statuses.map((status) => (
              <button
                key={status}
                className={`agency-tab ${
                  statusFilter === status ? "active" : ""
                }`}
                onClick={() => setStatusFilter(status)}
              >
                {status}
              </button>
            ))}
          </div>

          {/* ================= TABLE VIEW ================= */}
          <div className="table-wrapper">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>OFW</th>
                  <th>ID NUMBER</th>
                  <th>DESTINATION</th>
                  <th>AGENCY</th>
                  <th>STATUS</th>
                  <th>ACTION</th>
                </tr>
              </thead>

              <tbody>
                {filteredOFWs.map((ofw, index) => (
                  <tr key={index}>
                    <td>
                      <div className="ofw-cell">
                        <img
                          src={`https://i.pravatar.cc/40?img=${index + 10}`}
                          alt=""
                          className="avatar"
                        />
                        <div>
                          <div className="ofw-name">{ofw.name}</div>
                          <div className="ofw-job">{ofw.job}</div>
                        </div>
                      </div>
                    </td>

                    <td>{ofw.id}</td>

                    <td>
                      <MapPin size={16} /> {ofw.destination}
                    </td>

                    <td>
                      <Building2 size={16} /> {ofw.agency}
                    </td>

                    <td>
                      <span
                        className={`status-badge ${ofw.status.toLowerCase()}`}
                      >
                        {ofw.status}
                      </span>
                    </td>

                    <td>
                      <button
                        className="view-btn"
                        onClick={() => setSelectedOfw(ofw)}
                      >
                        <Eye size={16} /> View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        /* ================= DETAILS VIEW ================= */
        <div className="details-card">
          <button
            className="back-btn"
            onClick={() => setSelectedOfw(null)}
          >
            ← Back to List
          </button>

          <div className="details-header">
            <img
              src="https://i.pravatar.cc/120?img=15"
              alt=""
              className="details-avatar"
            />
            <div>
              <h2>{selectedOfw.name}</h2>
              <p>{selectedOfw.job}</p>
              <span
                className={`status-badge ${selectedOfw.status.toLowerCase()}`}
              >
                {selectedOfw.status}
              </span>
            </div>
          </div>

          <div className="details-grid">
            <div>
              <strong>ID Number:</strong>
              <p>{selectedOfw.id}</p>
            </div>

            <div>
              <strong>Destination:</strong>
              <p>{selectedOfw.destination}</p>
            </div>

            <div>
              <strong>Agency:</strong>
              <p>{selectedOfw.agency}</p>
            </div>

            <div>
              <strong>Status:</strong>
              <p>{selectedOfw.status}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}