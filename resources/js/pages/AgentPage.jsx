import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../../css/AgentPage.css";

export default function AgentPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeDashboardTab, setActiveDashboardTab] = useState("all");

  /* ================= SAMPLE DATA ================= */
  const [contracts, setContracts] = useState([
    {
      id: 1,
      name: "Maria Santos",
      company: "Al-Rashid Construction LLC",
      position: "Domestic Helper",
      salary: "AED 2,500/month",
      status: "pending",
    },
    {
      id: 2,
      name: "Juan Dela Cruz",
      company: "Dubai Engineering",
      position: "Electrician",
      salary: "AED 3,000/month",
      status: "processed",
    },
    {
      id: 3,
      name: "Ana Reyes",
      company: "Emirates Catering",
      position: "Kitchen Staff",
      salary: "AED 2,800/month",
      status: "pending",
    },
    {
      id: 4,
      name: "Mark Villanueva",
      company: "Gulf Logistics",
      position: "Warehouse Assistant",
      salary: "AED 2,400/month",
      status: "processed",
    },
  ]);

  React.useEffect(() => {
  localStorage.setItem("contracts", JSON.stringify(contracts));
}, [contracts]);

const viewContract = (contract) => {
  navigate(`/agent/contracts/${contract.id}`, { state: contract });
};

const [searchTerm, setSearchTerm] = useState("");
const [filterStatus, setFilterStatus] = useState("all");


  /* ================= ROUTES ================= */
  const isDashboard = location.pathname.includes("dashboard");
  const isPending = location.pathname.includes("pending");
  const isProcessed = location.pathname.includes("processed");
  const isRejected = location.pathname.includes("rejected");

  /* ================= FILTERS ================= */
  const dashboardContracts =
    activeDashboardTab === "all"
      ? contracts
      : contracts.filter(c => c.status === activeDashboardTab);

  const pendingContracts = contracts.filter(c => c.status === "pending");
  const processedContracts = contracts.filter(c => c.status === "processed");
  const rejectedContracts = contracts.filter(c => c.status === "rejected");

  /* ================= COUNTS ================= */
  const pendingCount = pendingContracts.length;
  const processedCount = processedContracts.length;
  const rejectedCount = rejectedContracts.length;

  /* ================= SEARCH FILTER ================= */
  const filteredContracts = dashboardContracts.filter(c =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  /* ================= ACTIONS ================= */
  const approveContract = (id) => {
    setContracts(prev =>
      prev.map(c =>
        c.id === id ? { ...c, status: "processed" } : c
      )
    );
     navigate("/agent/processed");
  };

  const rejectContract = (id) => {
  setContracts(prev =>
    prev.map(c =>
      c.id === id ? { ...c, status: "rejected" } : c
    )
  );

  // 👉 redirect to rejected page
  navigate("/agent/rejected");
};


  /* ================= UI ================= */
  return (
    <div className="d-flex">

      {/* SIDEBAR */}
<div
  className={`sidebar ${sidebarOpen ? "open" : "closed"} d-flex flex-column`}
  onMouseEnter={() => setSidebarOpen(true)}
  onMouseLeave={() => setSidebarOpen(false)}
>

  {/* Admin Profile */}
  {sidebarOpen && (
    <div className="admin-profile mb-4 text-center">
      <img src="/images/woman.png" alt="Agent user profile" className="rounded-circle" />
      <h6 className="agent-user">Agent User</h6>
      <small class="agent-user">Agent user of Agency</small>
    </div>
  )}

  {/* Navigation Links */}
  <ul className="nav flex-column">
    <li
      className={`nav-link d-flex align-items-center ${isDashboard ? "active" : ""}`}
      onClick={() => navigate("/agent/dashboard")}
      style={{ cursor: "pointer" }}
    >
      <img src="/images/dashboards.png" alt="Dashboard" className="sidebar-icon me-2" />
      {sidebarOpen && "Dashboard"}
    </li>

    <li
      className={`nav-link d-flex align-items-center ${isPending ? "active" : ""}`}
      onClick={() => navigate("/agent/pending")}
      style={{ cursor: "pointer" }}
    >
      <img src="/images/pending.png" alt="Pending Contracts" className="sidebar-icon me-2" />
      {sidebarOpen && "Pending Contracts"}
    </li>

    <li
      className={`nav-link d-flex align-items-center ${isProcessed ? "active" : ""}`}
      onClick={() => navigate("/agent/processed")}
      style={{ cursor: "pointer" }}
    >
      <img src="/images/processed.png" alt="Processed Contracts" className="sidebar-icon me-2" />
      {sidebarOpen && "Processed Contracts"}
    </li>

    <li
      className={`nav-link d-flex align-items-center ${isRejected ? "active" : ""}`}
      onClick={() => navigate("/agent/rejected")}
      style={{ cursor: "pointer" }}
    >
      <img src="/images/rejected.png" alt="Rejected Contracts" className="sidebar-icon me-2" />
      {sidebarOpen && "Rejected Contracts"}
    </li>
  </ul>

  {/* Logout at Bottom */}
  
   <div className="mt-auto">
      <img src="/images/logout.png" alt="Logout" className="sidebar-icon me-2" />
      {sidebarOpen && "Logout"}
    
  </div>
</div>
  
      {/* MAIN CONTENT */}
      <div className="content flex-grow-1 p-4">

        {/* DASHBOARD */}
        {isDashboard && (
          <>
           {/* Dashboard Header */}
            <div className="dashboard-header mb-4 position-relative overflow-hidden rounded-4">
            <img
                src={"/images/header-dashboard.png"}
                alt="Dashboard Header"
                className="img-fluid header-img"
            />

            {/* Overlay Text */}
            <div className="header-text">
                <h2>
                <span>Your</span>
                <span>Vision,</span>
                <span>Our</span>
                <span>Mission</span>
                </h2>
            </div>
            </div>
  
            <h4 className="mb-4">Dashboard Overview</h4>

            {/* COUNTS */}
            <div className="row mb-4">
              <div className="col-md-4">
                <div
                  className="stat-box pending clickable"
                  onClick={() => setActiveDashboardTab("pending")}
                >
                  <h3>{pendingCount}</h3>
                  <p>Pending</p>
                </div>
              </div>

              <div className="col-md-4">
                <div
                  className="stat-box verified clickable"
                  onClick={() => setActiveDashboardTab("processed")}
                >
                  <h3>{processedCount}</h3>
                  <p>Processed</p>
                </div>
              </div>

              <div className="col-md-4">
                <div
                  className="stat-box rejected clickable"
                  onClick={() => setActiveDashboardTab("rejected")}
                >
                  <h3>{rejectedCount}</h3>
                  <p>Rejected</p>
                </div>
              </div>
            </div>

            {/* FILTER TABS */}
            <div className="card contracts-container p-3 rounded-4">
            {/* SEARCH BAR INSIDE CONTRACT CONTAINER */}
              

              <div className="d-flex align-items-center gap-2 mb-3">
  {["all", "pending", "processed", "rejected"].map(tab => (
    <button
      key={tab}
      className={`btn rounded-pill px-4 ${activeDashboardTab === tab ? "btn-primary" : "btn-outline-primary"}`}
      onClick={() => setActiveDashboardTab(tab)}
    >
      {tab.toUpperCase()}
    </button>
  ))}

  {/* Search Bar */}
  <input
    type="text"
    className="form-control ms-auto w-25"
    placeholder="Search contracts..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
  />
</div>

              {filteredContracts.map(contract => (
                <div key={contract.id} className="card contract-card p-3 mb-3">
                  <div className="d-flex justify-content-between">
                    <div>
                      <h6 className="fw-bold mb-1">{contract.name}
                        <span className={`badge ms-2 ${contract.status === "pending" ? "bg-warning text-dark" : contract.status === "processed" ? "bg-success" : "bg-danger"}`}>
                          {contract.status}
                        </span>
                      </h6>
                      <small className="text-muted">{contract.company}</small>
                    </div>
                    <button className="btn btn-sm btn-outline-primary" onClick={() => viewContract(contract)}>View</button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* PENDING */}
        {isPending && (
          <div>
            <h4 className="mb-4">Pending Contracts</h4>
            {pendingContracts.map(contract => (
              <div
                  key={contract.id}
                  className="card contract-card p-4 mb-3 rounded-4"
              >
                  <div className="d-flex justify-content-between align-items-start">
                  <div>
                      <h5 className="fw-bold mb-1">{contract.name}</h5>
                      <p className="mb-1">{contract.company}</p>
                      <span className="badge bg-warning text-dark">Pending</span>
                  </div>

                  <button
                      className="btn btn-sm btn-outline-primary"
                      onClick={() => viewContract(contract)}
                  >
                      View
                  </button>
                  </div>

                  <div className="mt-3 d-flex gap-2">
                  <button
                      className="btn btn-success"
                      onClick={() => approveContract(contract.id)}
                  >
                      Approve
                  </button>
                  <button
                      className="btn btn-danger"
                      onClick={() => rejectContract(contract.id)}
                  >
                      Reject
                  </button>
                  </div>
              </div>
            ))}
          </div>
        )}

        {/* PROCESSED */}
        {isProcessed && (
          <div>
            <h4 className="mb-4">Processed Contracts</h4>
            {processedContracts.map(contract => (
              <div
                key={contract.id}
                className="card contract-card p-4 mb-3 rounded-4"
              >
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h5 className="fw-bold mb-1">{contract.name}</h5>
                    <span className="badge bg-success">Processed</span>
                  </div>

                  <button
                    className="btn btn-sm btn-outline-primary"
                    onClick={() => viewContract(contract)}
                  >
                    View
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* REJECTED */}
        {isRejected && (
          <div>
            <h4 className="mb-4">Rejected Contracts</h4>
            {rejectedContracts.map(contract => (
              <div
                  key={contract.id}
                  className="card contract-card p-4 mb-3 rounded-4"
              >
                  <div className="d-flex justify-content-between align-items-center">
                  <div>
                      <h5 className="fw-bold mb-1">{contract.name}</h5>
                      <span className="badge bg-danger">Rejected</span>
                  </div>

                  <button
                      className="btn btn-sm btn-outline-primary"
                      onClick={() => viewContract(contract)}
                  >
                      View
                  </button>
                  </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
