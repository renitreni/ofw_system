import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../css/OfwPage.css";
import {
  Bell,
  Settings,
  Home,
  User,
  Briefcase,
  FileText,
  HelpCircle,
  Mail,
  Phone,
  Pencil,
} from "lucide-react";


export default function OfwPage() {
  const [activePage, setActivePage] = useState("dashboard");
  const [openPanel, setOpenPanel] = useState(null);

  const togglePanel = (panel) => {
    setOpenPanel(openPanel === panel ? null : panel);
  };

   const [isEditing, setIsEditing] = useState(false);

    const [profile, setProfile] = useState({
    name: "Maria Santos",
    title: "Registered Nurse",
    email: "maria.santos@email.com",
    phone: "+971 50 123 4567",
    dob: "March 15, 1990",
    nationality: "Filipino",
    passport: "P1234567A",
    employer: "Dubai Healthcare Center",
    position: "Registered Nurse",
    contract: "January 10, 2024",
    });

    const [selectedFile, setSelectedFile] = useState(null);
    const [docName, setDocName] = useState("");
    const [docType, setDocType] = useState("");
    const [expiryDate, setExpiryDate] = useState("");

    //Documents
    const [documents, setDocuments] = useState([]);
    const [previewFile, setPreviewFile] = useState(null);

    const getStatus = (expiryDate) => {
        if (!expiryDate) return "Valid";

        const today = new Date();
        const expiry = new Date(expiryDate);
        const diffDays = (expiry - today) / (1000 * 60 * 60 * 24);

        if (diffDays < 0) return "Expired";
        if (diffDays <= 30) return "Expiring";

        return "Valid";
        };
  //Upload Document function
    const handleUpload = () => {
  if (!selectedFile || !docName) return;

  const newDoc = {
    name: docName,
    type: docType || "Other",
    expiry: expiryDate,
    status: getStatus(expiryDate),
    uploaded: new Date().toLocaleDateString(),
    fileUrl: URL.createObjectURL(selectedFile),
  };

  setDocuments([...documents, newDoc]);

  setSelectedFile(null);
  setDocName("");
  setDocType("");
  setExpiryDate("");
};
//Delete Document function
const deleteDocument = (index) => {
  const updated = [...documents];
  updated.splice(index, 1);
  setDocuments(updated);
};
//Replace Document function
const replaceFile = (index, file) => {
  if (!file) return;

  const updated = [...documents];
  updated[index].fileUrl = URL.createObjectURL(file);
  updated[index].uploaded = new Date().toLocaleDateString();

  setDocuments(updated);
};
const totalDocs = documents.length;
  const validDocs = documents.filter(d => d.status === "Valid").length;
  const expiringDocs = documents.filter(d => d.status === "Expiring").length;
  const expiredDocs = documents.filter(d => d.status === "Expired").length;

  return (
    
    <div className="d-flex">

      {/* ================= SIDEBAR ================= */}
      <div className="sidebar p-3">
        <h3 className="fw-bold text-primary">OFW Portal</h3>
        <p className="text-muted small">Overseas Filipino Workers</p>

        <ul className="nav flex-column mt-4">
          <li
            className={`nav-item ${activePage === "dashboard" ? "active" : ""}`}
            onClick={() => setActivePage("dashboard")}
          >
            <Home className="me-2" /> Dashboard
          </li>

          <li
            className={`nav-item ${activePage === "profile" ? "active" : ""}`}
            onClick={() => setActivePage("profile")}
          >
            <User className="me-2" /> Profile
          </li>

          <li
            className={`nav-item ${activePage === "jobs" ? "active" : ""}`}
            onClick={() => setActivePage("jobs")}
          >
            <Briefcase className="me-2" /> Jobs
          </li>

          <li
            className={`nav-item ${activePage === "documents" ? "active" : ""}`}
            onClick={() => setActivePage("documents")}
          >
            <FileText className="me-2" /> Documents
          </li>

          <li
            className={`nav-item ${activePage === "support" ? "active" : ""}`}
            onClick={() => setActivePage("support")}
          >
            <HelpCircle className="me-2" /> Support
          </li>
        </ul>

        <div className="footer small text-muted mt-auto">
          © 2026 OFW Portal
        </div>
      </div>

 

      {/* ================= MAIN ================= */}
      <div className="flex-grow-1">

       {/* TOP BAR */}
        <div
      className="topbar d-flex justify-content-between align-items-center p-3 position-relative"
      style={{ backgroundColor: "#0d3b66" }}
    >
      {/* LEFT */}
      <div>
        <h4 className="fw-bold mb-0 text-white">Welcome!</h4>
        <small className="text-white-50">Manage your OFW journey</small>
      </div>

      {/* RIGHT */}
      <div className="d-flex align-items-center gap-3 text-white position-relative">
        
        {/* NOTIFICATION */}
        <div className="position-relative">
          <Bell size={20} style={{ cursor: "pointer" }} onClick={() => togglePanel("notif")} />

          {openPanel === "notif" && (
            <div className="dropdown-panel">
              <strong>Notifications</strong>
              <ul>
                <li>New message received</li>
                <li>Profile updated</li>
                <li>Job alert available</li>
              </ul>
            </div>
          )}
        </div>

        {/* SETTINGS */}
        <div className="position-relative">
          <Settings size={20} style={{ cursor: "pointer" }} onClick={() => togglePanel("settings")} />

          {openPanel === "settings" && (
            <div className="dropdown-panel">
              <ul>
                <li>Account Settings</li>
                <li>Privacy</li>
                <li>Help & Support</li>
              </ul>
            </div>
          )}
        </div>

        {/* PROFILE */}
        <div className="position-relative d-flex align-items-center gap-2">
          <img
            src="/images/woman.png"
            alt="profile"
            className="rounded-circle"
            width="40"
            style={{ cursor: "pointer" }}
            onClick={() => togglePanel("profile")}
          />

          {openPanel === "profile" && (
            <div className="dropdown-panel">
              <strong>Maria Santos</strong>
              <p className="mb-1">Healthcare Worker</p>
              <hr />
              <button className="btn btn-sm btn-outline-primary w-100">View Profile</button>
              <button className="btn btn-sm btn-outline-danger w-100 mt-2">Logout</button>
            </div>
          )}
        </div>

      </div>
    </div>


        {/* ================= CONTENT ================= */}
        <div className="container-fluid p-4">

          {/* ===== DASHBOARD ===== */}
           {activePage === "dashboard" && (
    <>
        <h4 className="fw-bold mb-4">Dashboard Overview</h4>
        <p className="text-muted">Welcome to your OFW dashboard.</p>

        {/* SUMMARY CARDS */}
        <div className="row g-4 mt-1">
        {[
            { title: "Active Contract", value: "12 months", icon: "/images/briefcase.png" },
            { title: "Documents", value: "8 Valid", icon: "/images/valid.png" },
            { title: "Days Abroad", value: "487", icon: "/images/appointment.png" },
            { title: "Remittances", value: "₱450K", icon: "/images/transfers.png" },
        ].map((card, i) => (
            <div className="col-md-3" key={i}>
            <div className="card stat-card p-3 shadow-sm border-0">
                <div className="d-flex justify-content-between align-items-center">
                <div>
                    <small className="text-muted">{card.title}</small>
                    <h3 className="fw-bold mb-0" style={{ fontSize: "26px" }}>
                    {card.value}
                    </h3>
                </div>
                <div className="icon-box">
                    <img src={card.icon} width="26" height="26" alt="" />
                </div>
                </div>
            </div>
            </div>
        ))}
        </div>

        {/* CONTENT ROW */}
        <div className="row mt-4 g-4">
        
        {/* RECENT ACTIVITIES */}
        <div className="col-md-6">
            <div className="card p-4 h-100 shadow-sm border-0">
            <h5 className="fw-bold mb-3">Recent Activities</h5>

            <div className="activity mb-3">
                <strong>Document Verified</strong>
                <div className="text-muted small">Passport renewed successfully</div>
                <small className="text-muted">2 hours ago</small>
            </div>

            <div className="activity mb-3">
                <strong>Remittance Sent</strong>
                <div className="text-muted small">₱25,000 sent to family</div>
                <small className="text-muted">1 day ago</small>
            </div>

            <div className="activity mb-3">
                <strong>Health Check Scheduled</strong>
                <div className="text-muted small">Annual medical exam on March 5</div>
                <small className="text-muted">3 days ago</small>
            </div>

            <div className="activity">
                <strong>Training Completed</strong>
                <div className="text-muted small">Workplace safety training</div>
                <small className="text-muted">5 days ago</small>
            </div>
            </div>
        </div>

        {/* QUICK ACTIONS */}
        <div className="col-md-6">
            <div className="card p-4 h-100 shadow-sm border-0">
            <h5 className="fw-bold mb-3">Quick Actions</h5>

            <button className="btn btn-primary btn-lg w-100 mb-3">
                Send Remittance
            </button>

            <button className="btn btn-light btn-lg w-100 mb-3 border">
                Upload Document
            </button>

            <button className="btn btn-light btn-lg w-100 mb-3 border">
                Browse Jobs
            </button>

            <button className="btn btn-light btn-lg w-100 border">
                Contact Support
            </button>
            </div>
        </div>

        </div>
    </>
    )}


          {/* ===== PROFILE ===== */}
        {activePage === "profile" && (
        <>
            {/* PROFILE HEADER */}
            <div className="card p-4 mb-4 shadow-sm border-0">
            <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
                <div className="d-flex align-items-center gap-4">
                <img
                    src="/images/woman.png"
                    width="90"
                    className="rounded-circle"
                    alt="profile"
                />

                <div>
                    {isEditing ? (
                        <>
                            <input
                            className="form-control mb-2"
                            value={profile.name}
                            onChange={(e) => setProfile({...profile, name: e.target.value})}
                            />
                            <input
                            className="form-control"
                            value={profile.title}
                            onChange={(e) => setProfile({...profile, title: e.target.value})}
                            />
                        </>
                        ) : (
                        <>
                            <h3 className="fw-bold">{profile.name}</h3>
                            <div className="text-muted">{profile.title}</div>
                        </>
                        )}
                    <div className="text-muted small d-flex flex-wrap gap-3 mt-1">
                    {isEditing ? (
                        <>
                            <input
                            className="form-control"
                            value={profile.email}
                            onChange={(e) => setProfile({...profile, email: e.target.value})}
                            />
                            <input
                            className="form-control mt-2"
                            value={profile.phone}
                            onChange={(e) => setProfile({...profile, phone: e.target.value})}
                            />
                        </>
                        ) : (
                        <>
                            <span><Mail size={14} className="me-1" /> {profile.email}</span>
                            <span><Phone size={14} className="me-1" /> {profile.phone}</span>
                        </>
                        )}
                    </div>
                </div>
                </div>

                <button
                className="btn btn-primary"
                onClick={() => setIsEditing(!isEditing)}
                >
                <Pencil size={16} className="me-2" />
                {isEditing ? "Save Profile" : "Edit Profile"}
                </button>
            </div>
            </div>

            {/* INFO CARDS */}
            <div className="row g-4">
            {/* PERSONAL INFO */}
            <div className="col-md-6">
                <div className="card p-4 h-100 shadow-sm border-0">
                <h5 className="fw-bold mb-4">Personal Information</h5>
                <InfoItem
                label="Date of Birth"
                value={profile.dob}
                editing={isEditing}
                onChange={(val) => setProfile({...profile, dob: val})}
                />
                <InfoItem
                label="Nationality"
                value={profile.nationality}
                editing={isEditing}
                onChange={(val) => setProfile({...profile, nationality: val})}
                />
                <InfoItem
                label="passport Number"
                value={profile.passport}
                editing={isEditing}
                onChange={(val) => setProfile({...profile, passport: val})}
                />
                
                </div>
            </div>

            {/* EMPLOYMENT INFO */}
            <div className="col-md-6">
                <div className="card p-4 h-100 shadow-sm border-0">
                <h5 className="fw-bold mb-4">Employment Information</h5>
                <InfoItem
                label="Current Employer"
                value={profile.employer}
                editing={isEditing}
                onChange={(val) => setProfile({...profile, employer: val})}
                />
                <InfoItem
                label="Position"
                value={profile.position}
                editing={isEditing}
                onChange={(val) => setProfile({...profile, position: val})}
                />
                <InfoItem
                label="Contract Start"
                value={profile.contract}
                editing={isEditing}
                onChange={(val) => setProfile({...profile, contract: val})}
                />
                
                </div>
            </div>
            </div>

            {/* ===== SKILLS & EMERGENCY CONTACT ===== */}
            <div className="row g-4 mt-1">

            {/* SKILLS & CERTIFICATIONS */}
            <div className="col-md-6">
                <div className="card p-4 shadow-sm border-0 h-100">
                <h5 className="fw-bold mb-4">Skills & Certifications</h5>

                {[
                    "Registered Nurse License",
                    "BLS Certification",
                    "ACLS Certification",
                    "ICU Specialist",
                ].map((skill, index) => (
                    <div
                    key={index}
                    className="d-flex justify-content-between align-items-center bg-light rounded px-4 py-3 mb-3"
                    >
                    <span className="fw-medium">{skill}</span>
                    <span className="text-success fw-semibold">Valid</span>
                    </div>
                ))}
                </div>
            </div>

            {/* EMERGENCY CONTACT */}
            <div className="col-md-6">
                <div className="card p-4 shadow-sm border-0 h-100">
                <h5 className="fw-bold mb-4">Emergency Contact</h5>

                <div className="mb-4">
                    <div className="text-muted small">Name</div>
                    <div className="fw-semibold fs-5">Juan Santos (Spouse)</div>
                </div>

                <div className="mb-4">
                    <div className="text-muted small">Phone Number</div>
                    <div className="fw-semibold fs-5">+63 917 123 4567</div>
                </div>

                <div className="mb-4">
                    <div className="text-muted small">Relationship</div>
                    <div className="fw-semibold fs-5">Husband</div>
                </div>

                <div>
                    <div className="text-muted small">Address</div>
                    <div className="fw-semibold fs-5">
                    123 Rizal Street, Manila, Philippines
                    </div>
                </div>
                </div>
            </div>

            </div>
                    </>
                    )}

         {/* ===== JOBS ===== */}
        {activePage === "jobs" && (
        <div className="p-4">
            <h4 className="fw-bold mb-4">Job Opportunities</h4>
            <p className="text-muted mb-4">Find your next opportunity abroad</p>

            {/* Search & Location Filter (optional) */}
            <div className="d-flex mb-4 gap-2">
            <input
                type="text"
                placeholder="Search jobs..."
                className="form-control"
            />
            <select className="form-select" style={{ maxWidth: "200px" }}>
                <option>All Locations</option>
                <option>Singapore</option>
                <option>Dubai, UAE</option>
                <option>Japan</option>
                <option>UK</option>
                <option>Hong Kong</option>
            </select>
            </div>

            {/* Job Cards */}
            {[
            {
                title: "Registered Nurse",
                company: "Singapore General Hospital",
                description: "Seeking experienced RN for general ward duties",
                location: "Singapore",
                salary: "SGD 3,500 - 4,500",
                type: "Full-time",
                posted: "2 days ago",
            },
            {
                title: "Construction Worker",
                company: "Al Habtoor Group",
                description: "Experience in high-rise construction required",
                location: "Dubai, UAE",
                salary: "AED 1,800 - 2,200",
                type: "Full-time",
                posted: "5 days ago",
            },
            {
                title: "Domestic Helper",
                company: "Private Family",
                description: "family of 4, child care experience preferred",
                location: "Hongkong",
                salary: "HKD 4,630",
                type: "Live-in",
                posted: "1 week ago",
            },
            {
                title: "Hotel Staff",
                company: "marriott international",
                description: "Front desk and housekeeping positions available",
                location: "Doha, Qatar",
                salary: "QAR 1,800 - 2,200",
                type: "Full-time",
                posted: "1 weeks ago",
            },
            {
                title: "Electrical Engineer",
                company: "Saudi Aramco",
                description: "5+ years experience in power systems required",
                location: "Riyadh, Saudi Arabia",
                salary: "SAR 8,000 - 10,000",
                type: "Full-time",
                posted: "2 weeks ago",
            },
            {
                title: "Caregiver",
                company: "Care Home Services",
                description: "Elderly care experience required, live-in position",
                location: "london, UK",
                salary: "GBP 1,800 - 2,200",
                type: "Full-time",
                posted: "3 weeks ago",
            },
            
    ].map((job, i) => (
      <div
        key={i}
        className="card mb-3 p-3 shadow-sm border-0 d-flex flex-column flex-md-row justify-content-between align-items-center"
      >
        <div>
          <h5 className="fw-bold mb-1">{job.title}</h5>
          <div className="text-muted">{job.company}</div>
          <div className="text-muted mb-2">{job.description}</div>

          <div className="text-muted d-flex flex-wrap gap-3">
            <div>📍 {job.location}</div>
            <div>💰 {job.salary}</div>
            <div>👜 {job.type}</div>
            <div>⏱ {job.posted}</div>
          </div>
        </div>

        <div className="d-flex gap-2 mt-3 mt-md-0">
          <button className="btn btn-primary">Apply Now</button>
          <button className="btn btn-outline-secondary">Save Job</button>
        </div>
      </div>
    ))}
  </div>
)}

      {/* ===== DOCUMENTS ===== */}
        {activePage === "documents" && (
            
        <div className="p-4">

            {/* Header */}
            <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
                <h4 className="fw-bold mb-1">My Documents</h4>
                <small className="text-muted">Manage your important documents</small>
            </div>
            <button
                className="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#uploadModal"
                >
                <i className="bi bi-upload me-2"></i> Upload Document
                </button>
            </div>

    {/* Summary Cards */}
    <div className="row g-3 mb-4">
      {[
        { value: totalDocs, label: "Total Documents", color: "text-primary" },
        { value: validDocs, label: "Valid", color: "text-success" },
        { value: expiringDocs, label: "Expiring Soon", color: "text-warning" },
        { value: expiredDocs, label: "Expired", color: "text-danger" },
      ].map((card, i) => (
        <div className="col-md-3" key={i}>
          <div className="card p-3 text-center shadow-sm border-0">
            <h3 className={`fw-bold mb-2 ${card.color}`}>{card.value}</h3>
            <small className="text-muted">{card.label}</small>
          </div>
        </div>
      ))}
    </div>

    {/* Document Table */}
    <div className="table-responsive">
      <table className="table align-middle">
        <thead className="table-light">
          <tr>
            <th>Document</th>
            <th>Type</th>
            <th>Status</th>
            <th>Expiry Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
  {documents.map((doc, i) => (
    <tr key={i}>
      <td>
        <strong>{doc.name}</strong>
        <br />
        <small className="text-muted">Uploaded {doc.uploaded}</small>
      </td>

      <td>{doc.type}</td>

      <td>
        <span
          className={`badge ${
            doc.status === "Valid"
              ? "bg-success"
              : doc.status === "Expiring"
              ? "bg-warning text-dark"
              : "bg-danger"
          }`}
        >
          {doc.status}
        </span>
      </td>

      <td>{doc.expiry || "—"}</td>

      <td className="d-flex gap-2 flex-wrap">

        {/* PREVIEW */}
        <button
          className="btn btn-link p-0 text-primary"
          data-bs-toggle="modal"
          data-bs-target="#previewModal"
          onClick={() => setPreviewFile(doc.fileUrl)}
        >
          <i className="bi bi-eye me-1"></i> Preview
        </button>

        {/* DOWNLOAD */}
        <a href={doc.fileUrl} download className="btn btn-link p-0">
          <i className="bi bi-download"></i>
        </a>

        {/* REPLACE */}
        <label className="btn btn-link p-0 text-warning mb-0">
          <i className="bi bi-arrow-repeat"></i>
          <input
            type="file"
            hidden
            onChange={(e) => replaceFile(i, e.target.files[0])}
          />
        </label>

        {/* DELETE */}
        <button
          className="btn btn-link p-0 text-danger"
          onClick={() => deleteDocument(i)}
        >
          <i className="bi bi-trash"></i>
        </button>

      </td>
    </tr>
  ))}
</tbody>
      </table>
    </div>

    {/* UPLOAD MODAL */}
<div className="modal fade" id="uploadModal">
  <div className="modal-dialog modal-dialog-centered">
    <div className="modal-content">

      <div className="modal-header">
        <h5 className="modal-title">Upload Document</h5>
        <button className="btn-close" data-bs-dismiss="modal"></button>
      </div>

      <div className="modal-body">

        {/* Document Name */}
        <label className="form-label">Document Name</label>
        <input
          className="form-control mb-3"
          value={docName}
          onChange={(e) => setDocName(e.target.value)}
        />

        {/* Type */}
        <label className="form-label">Type</label>
        <select
          className="form-select mb-3"
          value={docType}
          onChange={(e) => setDocType(e.target.value)}
        >
          <option value="">Select type</option>
          <option>Identity</option>
          <option>Employment</option>
          <option>Health</option>
          <option>Legal</option>
          <option>Insurance</option>
        </select>

        {/* Expiry */}
        <label className="form-label">Expiry Date</label>
        <input
          type="date"
          className="form-control mb-3"
          value={expiryDate}
          onChange={(e) => setExpiryDate(e.target.value)}
        />

        {/* File */}
        <label className="form-label">Choose File</label>
        <input
          type="file"
          className="form-control"
          onChange={(e) => setSelectedFile(e.target.files[0])}
        />

      </div>

      <div className="modal-footer">
        <button className="btn btn-secondary" data-bs-dismiss="modal">
          Cancel
        </button>

        <button
          className="btn btn-primary"
          onClick={handleUpload}
          data-bs-dismiss="modal"
        >
          Upload
        </button>
      </div>

    </div>
  </div>
</div>
  

 {/* ✅ PDF PREVIEW MODAL GOES HERE */}
    <div className="modal fade" id="previewModal">
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content">

          <div className="modal-header">
            <h5 className="modal-title">Document Preview</h5>
            <button className="btn-close" data-bs-dismiss="modal"></button>
          </div>

          <div className="modal-body text-center">
            {previewFile && (
              <iframe
                src={previewFile}
                width="100%"
                height="500px"
                title="PDF Preview"
              />
            )}
          </div>

        </div>
      </div>
    </div>
  
  </div>
)}


  {/* ===== SUPPORT ===== */}

       {activePage === "support" && (
        
  <div className="p-4">

    {/* HEADER */}
    <div className="mb-4">
      <h4 className="fw-bold mb-1">Support Center</h4>
      <small className="text-muted">We're here to help you</small>
    </div>

    {/* SUPPORT OPTIONS */}
    <div className="row g-4">

      {/* Phone */}
      <div className="col-md-4">
        <div className="card text-center p-4 shadow-sm border-0 h-100">
          <Phone size={30} className="text-primary mb-3" />
          <h5 className="fw-bold">Phone Support</h5>
          <p className="text-muted">+63 2 8722 0000</p>
          <button className="btn btn-outline-primary btn-lg w-100">Call Now</button>
        </div>
      </div>

      {/* Email */}
      <div className="col-md-4">
        <div className="card text-center p-4 shadow-sm border-0 h-100">
          <Mail size={30} className="text-success mb-3" />
          <h5 className="fw-bold">Email Support</h5>
          <p className="text-muted">support@ofwportal.ph</p>
          <button className="btn btn-outline-success btn-lg w-100">Send Email</button>
        </div>
      </div>

      {/* Chat */}
      <div className="col-md-4">
        <div className="card text-center p-4 shadow-sm border-0 h-100">
          <HelpCircle size={30} className="text-warning mb-3" />
          <h5 className="fw-bold">Live Chat</h5>
          <p className="text-muted">Available 24/7</p>
          <button className="btn btn-outline-dark btn-lg w-100">Start Chat</button>
        </div>
      </div>

    </div>

    {/* EMERGENCY HOTLINES */}
    <div className="card border-danger-subtle bg-danger-subtle p-4 mt-4 shadow-sm">
      <div className="d-flex gap-3">
        <Phone className="text-danger" size={28} />
        <div>
          <h5 className="fw-bold mb-2">Emergency Hotlines</h5>
          <div className="text-muted">POLO-OWWA Hotline: 1348 (Philippines)</div>
          <div className="text-muted">DFA Hotline: +63 2 8834 4000</div>
          <div className="text-muted">Philippine Embassy: Contact nearest embassy</div>
        </div>
      </div>
    </div>

    {/* FAQ */}
    <div className="card p-4 mt-4 shadow-sm border-0">
      <h5 className="fw-bold mb-3">Frequently Asked Questions</h5>

      <div className="mb-3">
        <h6 className="fw-semibold">How do I renew my work visa?</h6>
        <p className="text-muted mb-0">
          Contact your employer at least 3 months before expiry.
        </p>
      </div>

      <hr />

      <div className="mb-3">
        <h6 className="fw-semibold">What documents do I need to travel home?</h6>
        <p className="text-muted mb-0">
          Valid passport, OEC, and proof of employment.
        </p>
      </div>

      <hr />

      <div>
        <h6 className="fw-semibold">What should I do in an emergency?</h6>
        <p className="text-muted mb-0">
          Contact your emergency contact and the Philippine embassy.
        </p>
      </div>
    </div>

    {/* CONTACT FORM */}
    <div className="card p-4 mt-4 shadow-sm border-0">
      <h5 className="fw-bold mb-4">Send us a message</h5>

      <div className="mb-3">
        <label className="form-label fw-semibold">Subject</label>
        <input className="form-control" placeholder="What do you need help with?" />
      </div>

      <div className="mb-3">
        <label className="form-label fw-semibold">Category</label>
        <select className="form-select">
          <option>Select a category</option>
          <option>Account Issues</option>
          <option>Document Assistance</option>
          <option>Employment Concerns</option>
          <option>Technical Support</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="form-label fw-semibold">Message</label>
        <textarea
          className="form-control"
          rows="4"
          placeholder="Describe your issue..."
        />
      </div>

      <button className="btn btn-primary btn-lg w-100">
        Submit Request
      </button>
    </div>

  </div>
)}
</div>
</div>
</div>
);
}
const InfoItem = ({ label, value, editing, onChange }) => (
  <div className="mb-3">
    <div className="text-muted small">{label}</div>

    {editing ? (
      <input
        className="form-control"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    ) : (
      <div className="fw-semibold">{value}</div>
    )}
  </div>
);


