import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Bell, Settings, Home, User, Briefcase, FileText, 
  Phone, Pencil, AlertTriangle, Star, ShieldCheck, 
  Download, MapPin, Search, Calendar, CreditCard, ChevronRight, Mail, Check, X
} from "lucide-react";

export default function OfwPage() {
  const [activePage, setActivePage] = useState("dashboard");
  const [showEmergencyPanel, setShowEmergencyPanel] = useState(false);

  const PH_BLUE = "#0038A8";
  const PH_RED = "#CE1126";
  const PH_YELLOW = "#FCD116";

  const [profile, setProfile] = useState({
    name: "Maria Santos",
    title: "Registered Nurse",
    email: "maria.santos@email.com",
    passport: "P1234567B",
    employer: "Dubai Healthcare Center",
    salary: "AED 8,500",
    departure: "Jan 12, 2024",
    agencyName: "Alpha Global Recruitment Inc.",
    agencyPhone: "+63 2 8123 4567",
    agencyEmail: "support@alphaglobal.ph",
  });


  const [isEditing, setIsEditing] = useState(false);
  const [tempProfile, setTempProfile] = useState({ ...profile });

  const handleSaveProfile = () => {
    setProfile({ ...tempProfile });
    setIsEditing(false);
  };
  const [searchQuery, setSearchQuery] = useState("");
  const [applyingId, setApplyingId] = useState(null);
  
  const initialJobs = [
    { id: 1, t: "Registered Nurse", l: "London, UK", a: "AED 12k - 15k", h: "DMW-Verified" },
    { id: 2, t: "Civil Engineer", l: "Dammam, KSA", a: "SAR 8k - 10k", h: "Priority" },
    { id: 3, t: "Hospitality Crew", l: "Tokyo, Japan", a: "JPY 250k+", h: "New" }
  ];

  const filteredJobs = initialJobs.filter(job => 
    job.t.toLowerCase().includes(searchQuery.toLowerCase()) || 
    job.l.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleApply = (jobId, title) => {
    setApplyingId(jobId);
    setTimeout(() => {
      alert(`Application for ${title} submitted successfully!`);
      setApplyingId(null);
    }, 1500);
  };

  const [documents, setDocuments] = useState([
    { n: "Employment Contract", d: "Jan 10, 2024", s: "450 KB" },
    { n: "OEC Certificate", d: "Feb 15, 2024", s: "1.2 MB" },
    { n: "Visa Entry Permit", d: "Jan 05, 2024", s: "890 KB" },
    { n: "Insurance Policy", d: "Jan 12, 2024", s: "2.1 MB" }
  ]);

  const [newDocName, setNewDocName] = useState("");

  const handleUpload = (e) => {
    e.preventDefault();
    if (!newDocName) return;
    const docEntry = {
      n: newDocName,
      d: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      s: (Math.random() * (2.5 - 0.5) + 0.5).toFixed(1) + " MB"
    };
    setDocuments([docEntry, ...documents]);
    setNewDocName("");
    const modalElement = document.getElementById('uploadModal');
    const modal = window.bootstrap.Modal.getInstance(modalElement);
    modal.hide();
  };

  return (
    <div className="d-flex" style={{ height: "100vh", backgroundColor: "#f4f7f9", overflow: "hidden" }}>
      <style>{`
        .sidebar { width: 280px; background: ${PH_BLUE}; color: white; height: 100vh; position: sticky; top: 0; flex-shrink: 0; display: flex; flex-direction: column; overflow-y: auto; }
        .main-wrapper { flex-grow: 1; height: 100vh; overflow-y: auto; display: flex; flex-direction: column; }
        .nav-item { padding: 12px 20px; cursor: pointer; color: rgba(255,255,255,0.7); transition: 0.2s; border-radius: 10px; margin: 4px 15px; display: flex; align-items: center; font-weight: 500; text-decoration: none; }
        .nav-item:hover { background: rgba(255,255,255,0.1); color: ${PH_YELLOW}; }
        .nav-item.active { background: white; color: ${PH_BLUE}; box-shadow: 0 4px 15px rgba(0,0,0,0.1); }
        .nav-item.rescue-nav { color: #ffb3b3; border: 1px solid rgba(255,255,255,0.1); }
        .nav-item.rescue-nav.active { background: ${PH_RED}; color: white; border: none; }
        .topbar { background: white; border-bottom: 3px solid ${PH_YELLOW}; position: sticky; top: 0; z-index: 1001; }
        .card { border-radius: 15px; border: none; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
        .btn-ph-blue { background-color: ${PH_BLUE}; color: white; transition: 0.3s; border: none; }
        .btn-ph-blue:hover { background-color: #002a7a; color: white; }
        .pulse-red { animation: pulse-animation 2s infinite; background-color: ${PH_RED}; border: none; }
        @keyframes pulse-animation { 0% { box-shadow: 0 0 0 0px rgba(206, 17, 38, 0.7); } 100% { box-shadow: 0 0 0 15px rgba(206, 17, 38, 0); } }
        .form-control:focus { border-color: ${PH_BLUE}; box-shadow: 0 0 0 0.25rem rgba(0, 56, 168, 0.1); }
      `}</style>

      {}
      <div className="sidebar shadow">
        <div className="p-4 text-center">
          <div className="d-inline-block p-2 rounded-circle mb-2" style={{border: `2px dashed ${PH_YELLOW}`}}>
             <Star fill={PH_YELLOW} color={PH_YELLOW} size={30} />
          </div>
          <h5 className="fw-bold mb-0">Bagong Bayani</h5>
          <small className="opacity-75">OFW Global Portal</small>
        </div>
        <div className="nav-container">
          <div className={`nav-item ${activePage === "dashboard" ? "active" : ""}`} onClick={() => {setActivePage("dashboard"); setShowEmergencyPanel(false);}}><Home className="me-3" size={18}/> Dashboard</div>
          <div className={`nav-item ${activePage === "profile" ? "active" : ""}`} onClick={() => {setActivePage("profile"); setShowEmergencyPanel(false);}}><User className="me-3" size={18}/> My Profile</div>
          <div className={`nav-item ${activePage === "documents" ? "active" : ""}`} onClick={() => {setActivePage("documents"); setShowEmergencyPanel(false);}}><FileText className="me-3" size={18}/> Documents</div>
          <div className={`nav-item ${activePage === "jobs" ? "active" : ""}`} onClick={() => {setActivePage("jobs"); setShowEmergencyPanel(false);}}><Briefcase className="me-3" size={18}/> Job Postings</div>
          <div className="px-4 mt-4 mb-2"><small className="text-uppercase opacity-50 fw-bold" style={{fontSize: '10px'}}>Emergency</small></div>
          <div className={`nav-item rescue-nav ${activePage === "rescue" ? "active" : ""}`} onClick={() => setActivePage("rescue")}><AlertTriangle className="me-3" size={18}/> Rescue & SOS</div>
        </div>
      </div>

      {/* MAIN CONTENT AREA */}
      <div className="main-wrapper">
        <div className="topbar d-flex justify-content-between align-items-center p-3 px-4 shadow-sm">
          <h6 className="fw-bold mb-0 text-dark">Portal / <span className="text-capitalize text-muted">{activePage}</span></h6>
          <div className="d-flex gap-3 align-items-center">
            <div className="position-relative p-2 rounded-circle bg-light">
                <Bell size={20} className="text-muted" />
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-circle bg-danger" style={{padding: '3px 6px', fontSize: '9px'}}>2</span>
            </div>
            <div className="vr mx-1"></div>
            <div className="d-flex align-items-center gap-2">
                <span className="small fw-bold d-none d-md-block">{profile.name}</span>
                <img src={`https://ui-avatars.com/api/?name=${profile.name}&background=0038A8&color=fff`} width="35" className="rounded-circle border" alt="profile"/>
            </div>
          </div>
        </div>

        <div className="container-fluid p-4">
          
          {/* DASHBOARD */}
          {activePage === "dashboard" && (
            <div className="animate__animated animate__fadeIn">
              <div className="row g-3">
                {[
                  { t: "OEC Status", v: "Verified", c: PH_BLUE, icon: <ShieldCheck size={16}/> },
                  { t: "SSS Premium", v: "Active", c: PH_BLUE, icon: <CreditCard size={16}/> },
                  { t: "OWWA Validity", v: "24 Months", c: PH_RED, icon: <Calendar size={16}/> },
                  { t: "Pag-IBIG", v: "Updated", c: PH_RED, icon: <Star size={16}/> }
                ].map((s, i) => (
                  <div className="col-md-3 col-6" key={i}>
                    <div className="card p-3 border-0 shadow-sm h-100 transition-hover" style={{ borderLeft: `4px solid ${s.c}` }}>
                      <div className="d-flex align-items-center gap-2 mb-1">
                        <span style={{ color: s.c }}>{s.icon}</span>
                        <small className="text-muted fw-bold text-uppercase" style={{ fontSize: '10px', letterSpacing: '0.5px' }}>{s.t}</small>
                      </div>
                      <h5 className="fw-bold mb-0" style={{ color: s.c, fontSize: '1.1rem' }}>{s.v}</h5>
                    </div>
                  </div>
                ))}
              </div>

              {/* AGENCY CONTACT CENTER SECTION */}
              <div className="card mt-4 border-0 shadow-sm overflow-hidden">
                <div className="row g-0">
                  <div className="col-lg-7 p-4 bg-white">
                    <div className="d-flex align-items-start gap-3 mb-4">
                      <div className="p-3 rounded-4 bg-light text-ph-blue shadow-sm">
                        <ShieldCheck size={32} />
                      </div>
                      <div>
                        <div className="badge bg-success bg-opacity-10 text-success mb-1 px-2 border border-success border-opacity-25">DMW Verified</div>
                        <h4 className="fw-bold mb-0 text-dark">{profile.agencyName}</h4>
                        <p className="text-muted small mb-0">Official POEA License: 123-RE-2024-00-PR</p>
                      </div>
                    </div>
                    <div className="row g-3">
                      <div className="col-sm-6">
                        <button className="btn btn-ph-blue w-100 fw-bold py-2 d-flex align-items-center justify-content-center gap-2 shadow-sm" onClick={() => alert(`Calling Welfare Officer...`)}>
                          <Phone size={18} /> Contact Welfare Officer
                        </button>
                      </div>
                      <div className="col-sm-6">
                        <button className="btn btn-outline-dark w-100 fw-bold py-2 shadow-sm" data-bs-toggle="modal" data-bs-target="#contractModal">
                          View Contract Details
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-5 p-4" style={{ backgroundColor: "#f8f9fa", borderLeft: "1px solid #eee" }}>
                    <h6 className="fw-bold text-uppercase mb-3" style={{ fontSize: '11px', color: PH_BLUE, letterSpacing: '1px' }}>Agency Contact Center</h6>
                    <div className="d-flex flex-column gap-2">
                      <div className="bg-white p-3 rounded-3 shadow-sm border border-light d-flex align-items-center gap-3">
                        <div className="p-2 rounded-circle bg-primary bg-opacity-10 text-primary"><Phone size={18} /></div>
                        <div>
                          <small className="text-muted d-block" style={{ fontSize: '10px' }}>HOTLINE</small>
                          <span className="fw-bold text-dark">{profile.agencyPhone}</span>
                        </div>
                      </div>
                      <div className="bg-white p-3 rounded-3 shadow-sm border border-light d-flex align-items-center gap-3">
                        <div className="p-2 rounded-circle bg-danger bg-opacity-10 text-danger"><Mail size={18} /></div>
                        <div>
                          <small className="text-muted d-block" style={{ fontSize: '10px' }}>EMAIL SUPPORT</small>
                          <span className="fw-bold text-dark">{profile.agencyEmail}</span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-3 d-flex align-items-center gap-2">
                      <span className="position-relative d-inline-flex">
                          <span className="position-absolute translate-middle p-1 bg-success border border-light rounded-circle animate-pulse" style={{left: '10px', top: '10px'}}></span>
                          <span className="p-1 bg-success bg-opacity-20 rounded-circle" style={{width: '20px', height: '20px'}}></span>
                      </span>
                      <small className="fw-bold text-success">Welfare Officer is Online</small>
                    </div>
                  </div>
                </div>
              </div>

              {/* CONTRACT MODAL */}
              <div className="modal fade" id="contractModal" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                  <div className="modal-content border-0 shadow-lg" style={{ borderRadius: '20px' }}>
                    <div className="modal-header border-0 pb-0 px-4 pt-4">
                      <h5 className="fw-bold mb-0">Contract Overview</h5>
                      <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div className="modal-body p-4">
                      <div className="bg-light p-3 rounded-4 mb-4 border border-light">
                        <div className="row g-3">
                          <div className="col-6">
                            <small className="text-muted d-block text-uppercase fw-bold" style={{fontSize: '9px'}}>Employer</small>
                            <span className="fw-bold text-ph-blue small">{profile.employer}</span>
                          </div>
                          <div className="col-6 text-end">
                            <small className="text-muted d-block text-uppercase fw-bold" style={{fontSize: '9px'}}>Salary</small>
                            <span className="fw-bold text-success">{profile.salary}</span>
                          </div>
                        </div>
                      </div>
                      <div className="list-group list-group-flush small">
                        {[{l:"Passport", v:profile.passport}, {l:"Job Title", v:profile.title}, {l:"Departure", v:profile.departure}].map((item, idx) => (
                          <div key={idx} className="list-group-item d-flex justify-content-between px-0 py-3">
                            <span className="text-muted">{item.l}</span>
                            <span className="fw-bold">{item.v}</span>
                          </div>
                        ))}
                      </div>
                      <button className="btn btn-ph-blue w-100 mt-4 py-2 fw-bold rounded-pill" data-bs-dismiss="modal">Close</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

     {/* PROFILE - WITH FUNCTIONAL UPDATE */}
          {activePage === "profile" && (
            <div className="animate__animated animate__fadeIn">
              <div className="card p-0 overflow-hidden shadow-sm">
                <div style={{height: '120px', background: `linear-gradient(90deg, ${PH_BLUE}, ${PH_RED})`}}></div>
                <div className="px-4 pb-4">
                    <div className="d-flex justify-content-between align-items-end" style={{marginTop: '-50px'}}>
                        <img src={`https://ui-avatars.com/api/?name=${profile.name}&background=fff&color=0038A8&size=120`} className="rounded-circle border border-4 border-white shadow" alt="avatar"/>
                        
                        {/* UPDATE BUTTON TOGGLE */}
                        {!isEditing ? (
                          <button 
                            className="btn btn-primary btn-sm px-4 rounded-pill fw-bold mb-2 shadow-sm"
                            onClick={() => { setIsEditing(true); setTempProfile({...profile}); }}
                          >
                            <Pencil size={14} className="me-2"/>Update Info
                          </button>
                        ) : (
                          <div className="mb-2 d-flex gap-2">
                            <button className="btn btn-success btn-sm px-3 rounded-pill fw-bold shadow-sm" onClick={handleSaveProfile}><Check size={14} className="me-1"/> Save</button>
                            <button className="btn btn-light btn-sm px-3 rounded-pill fw-bold shadow-sm border" onClick={() => setIsEditing(false)}><X size={14} className="me-1"/> Cancel</button>
                          </div>
                        )}
                    </div>

                    <div className="mt-3">
                        {isEditing ? (
                          <div className="col-md-4">
                             <input type="text" className="form-control form-control-lg fw-bold" value={tempProfile.name} onChange={(e) => setTempProfile({...tempProfile, name: e.target.value})} />
                          </div>
                        ) : (
                          <h4 className="fw-bold mb-1">{profile.name} <Star size={16} fill={PH_YELLOW} color={PH_YELLOW} className="ms-1"/></h4>
                        )}
                        <p className="text-muted mt-1"><MapPin size={14} className="me-1"/> Dubai, United Arab Emirates</p>
                    </div>

                    <hr className="my-4 opacity-10" />

                    <div className="row g-4 mt-2">
                        {[
                          { label: "Position", key: "title", color: "text-dark" },
                          { label: "Monthly Income", key: "salary", color: "text-success" },
                          { label: "Passport No.", key: "passport", color: "text-dark" },
                          { label: "Departure Date", key: "departure", color: "text-dark" }
                        ].map((item, idx) => (
                          <div className="col-md-3" key={idx}>
                              <small className="text-muted d-block text-uppercase fw-bold mb-1" style={{fontSize: '10px'}}>{item.label}</small>
                              {isEditing ? (
                                <input 
                                  type="text" 
                                  className="form-control form-control-sm border-light bg-light" 
                                  value={tempProfile[item.key]} 
                                  onChange={(e) => setTempProfile({...tempProfile, [item.key]: e.target.value})}
                                />
                              ) : (
                                <span className={`fw-bold ${item.color}`}>{profile[item.key]}</span>
                              )}
                          </div>
                        ))}
                    </div>
                </div>
              </div>
            </div>
          )}
          {/* DOCUMENTS */}
          {activePage === "documents" && (
            <div className="animate__animated animate__fadeIn">
              <div className="d-flex justify-content-between mb-4 align-items-center">
                <h5 className="fw-bold mb-0">Document Repository</h5>
                <button className="btn btn-ph-blue btn-sm px-4 fw-bold" data-bs-toggle="modal" data-bs-target="#uploadModal">+ Upload New</button>
              </div>
              <div className="row g-3">
                {documents.map((doc, i) => (
                    <div className="col-md-6" key={i}>
                        <div className="card p-3 d-flex flex-row align-items-center justify-content-between hover-shadow">
                            <div className="d-flex align-items-center gap-3">
                                <div className="p-2 bg-light rounded text-ph-blue"><FileText/></div>
                                <div>
                                    <h6 className="mb-0 fw-bold small">{doc.n}</h6>
                                    <small className="text-muted" style={{fontSize:'10px'}}>{doc.d} • {doc.s}</small>
                                </div>
                            </div>
                            <button className="btn btn-light border-0"><Download size={18} className="text-muted"/></button>
                        </div>
                    </div>
                ))}
              </div>

              {/* UPLOAD MODAL */}
              <div className="modal fade" id="uploadModal" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                  <div className="modal-content border-0 shadow-lg" style={{borderRadius: '20px'}}>
                    <div className="modal-header border-0 px-4 pt-4">
                      <h5 className="fw-bold">Upload Document</h5>
                      <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <form onSubmit={handleUpload}>
                      <div className="modal-body p-4">
                        <div className="mb-3">
                          <label className="form-label small fw-bold">Document Name</label>
                          <input type="text" className="form-control" placeholder="e.g. Visa Copy" value={newDocName} onChange={(e) => setNewDocName(e.target.value)} required />
                        </div>
                        <div className="p-4 border border-2 border-dashed rounded text-center bg-light">
                           <Download size={24} className="text-muted mb-2"/><br/>
                           <small className="text-muted">Click to select file</small>
                        </div>
                        <button type="submit" className="btn btn-ph-blue w-100 mt-4 py-2 fw-bold">Save to Portal</button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          )}

        {/* JOBS */}
          {activePage === "jobs" && (
            <div className="animate__animated animate__fadeIn">
              <div className="card p-3 mb-4 bg-white border-0 shadow-sm">
                <div className="input-group">
                    <span className="input-group-text bg-transparent border-end-0"><Search size={18} className="text-muted"/></span>
                    <input 
                      type="text" 
                      className="form-control border-start-0" 
                      placeholder="Search verified job orders..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
              </div>
              <div className="row g-3">
                {filteredJobs.length > 0 ? (
                  filteredJobs.map((job) => (
                    <div className="col-12" key={job.id}>
                        <div className="card p-3 hover-shadow transition">
                            <div className="d-flex justify-content-between align-items-start">
                                <div>
                                    <span className="badge bg-light text-primary mb-2 border">{job.h}</span>
                                    <h6 className="fw-bold mb-1">{job.t}</h6>
                                    <div className="d-flex gap-3 text-muted small">
                                        <span><MapPin size={12} className="me-1"/> {job.l}</span>
                                        <span><CreditCard size={12} className="me-1"/> {job.a}</span>
                                    </div>
                                </div>
                                <button 
                                  className={`btn btn-sm fw-bold px-4 ${applyingId === job.id ? 'btn-secondary disabled' : 'btn-outline-primary'}`}
                                  onClick={() => handleApply(job.id, job.t)}
                                >
                                  {applyingId === job.id ? (
                                    <span className="spinner-border spinner-border-sm me-2"></span>
                                  ) : "Apply Now"}
                                </button>
                            </div>
                        </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-5 text-muted">No jobs found matching your search.</div>
                )}
              </div>
            </div>
          )}

        {/* RESCUE PAGE */}
          {activePage === "rescue" && (
            <div className="animate__animated animate__fadeIn">
              <div className="row g-4">
                {/* Left Side: SOS Action & Protocol */}
                <div className="col-lg-5 text-center border-end border-light">
                  {!showEmergencyPanel ? (
                    <div className="py-5">
                        <div className="mb-4 position-relative d-inline-block">
                           <button className="btn btn-danger btn-lg rounded-circle shadow-lg pulse-red" style={{width: '180px', height: '180px', zIndex: 2, position: 'relative'}} onClick={() => setShowEmergencyPanel(true)}>
                               <AlertTriangle size={60} /><br/><span className="fw-bold">SOS</span>
                           </button>
                           {/* Decorative rings */}
                           <div className="position-absolute top-50 start-50 translate-middle rounded-circle border border-danger opacity-25" style={{width: '220px', height: '220px'}}></div>
                        </div>
                        <h4 className="fw-bold text-dark">Emergency SOS</h4>
                        <p className="text-muted mx-auto px-3 mb-4" style={{maxWidth: '350px'}}>
                          Your location, profile, and agency details will be broadcasted to rescue authorities.
                        </p>
                        
                        <div className="bg-white p-3 rounded-4 shadow-sm text-start mx-auto" style={{maxWidth: '350px'}}>
                           <h6 className="fw-bold small mb-3 text-uppercase opacity-50">Rescue Protocol:</h6>
                           <div className="d-flex gap-2 mb-2 small align-items-center">
                              <Check size={16} className="text-success"/> <span>GPS Coordinates Logged</span>
                           </div>
                           <div className="d-flex gap-2 mb-2 small align-items-center">
                              <Check size={16} className="text-success"/> <span>DMW Response Team Notified</span>
                           </div>
                           <div className="d-flex gap-2 small align-items-center">
                              <Check size={16} className="text-success"/> <span>Emergency Contacts Alerted</span>
                           </div>
                        </div>
                    </div>
                  ) : (
                    <div className="card mx-auto p-4 shadow-lg border-0 my-4 bg-white" style={{maxWidth:'400px', borderRadius: '25px'}}>
                      <div className="text-danger mb-3"><AlertTriangle size={48} className="animate__animated animate__flash animate__infinite" /></div>
                      <h5 className="fw-bold text-danger mb-2">Final Confirmation</h5>
                      <p className="text-muted small mb-4">You are about to signal an immediate life-safety emergency. Are you sure?</p>
                      
                      <div className="d-grid gap-2">
                        <button className="btn btn-danger py-3 fw-bold shadow-sm" onClick={() => {
                          alert("SIGNAL ENCRYPTED: Rescue teams have been dispatched to your location.");
                          setShowEmergencyPanel(false);
                        }}>
                          CONFIRM & SEND SIGNAL
                        </button>
                        <button className="btn btn-outline-secondary py-2 border-0" onClick={() => setShowEmergencyPanel(false)}>Cancel / Accidental Tap</button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Right Side: Map, Location Details & Consular Info */}
                <div className="col-lg-7">
                  {/* SIMULATED MAP INTERFACE */}
                  <div className="card border-0 shadow-sm overflow-hidden mb-4" style={{borderRadius: '20px'}}>
                    <div className="bg-white p-3 border-bottom d-flex justify-content-between align-items-center">
                       <div>
                          <span className="small fw-bold d-block"><MapPin size={14} className="text-danger me-1"/> Current GPS Feed</span>
                          <code className="text-muted small" style={{fontSize: '10px'}}>Lat: 25.2048° N, Long: 55.2708° E</code>
                       </div>
                       <div className="d-flex align-items-center gap-2">
                          <span className="spinner-grow spinner-grow-sm text-success"></span>
                          <span className="badge bg-success bg-opacity-10 text-success border border-success border-opacity-25">Locating...</span>
                       </div>
                    </div>
                    <div style={{height: '280px', backgroundColor: '#f1f3f5', position: 'relative', overflow: 'hidden'}}>
                      {/* Grid Background */}
                      <div style={{ position: 'absolute', width: '100%', height: '100%', backgroundImage: 'linear-gradient(#dee2e6 1px, transparent 1px), linear-gradient(90deg, #dee2e6 1px, transparent 1px)', backgroundSize: '30px 30px', opacity: 0.3 }}></div>
                      
                      {/* Pulse Marker */}
                      <div className="position-absolute top-50 start-50 translate-middle text-center">
                         <div className="pulse-red rounded-circle mb-1" style={{width: '24px', height: '24px', background: PH_RED, border: '4px solid white', boxShadow: '0 0 10px rgba(0,0,0,0.2)'}}></div>
                         <div className="bg-dark text-white px-2 py-1 rounded small fw-bold" style={{fontSize: '10px'}}>YOU ARE HERE</div>
                      </div>

                      {/* Floating Map Controls */}
                      <div className="position-absolute bottom-0 end-0 p-3 d-flex flex-column gap-2">
                         <button className="btn btn-white btn-sm shadow-sm bg-white" onClick={() => alert("Zooming In...")}>+</button>
                         <button className="btn btn-white btn-sm shadow-sm bg-white" onClick={() => alert("Zooming Out...")}>-</button>
                      </div>
                    </div>
                  </div>

                  {/* NEAREST CONSULATE INFO */}
                  <div className="card border-0 shadow-sm p-3 mb-4 bg-primary text-white" style={{background: `linear-gradient(45deg, ${PH_BLUE}, #0056b3)`}}>
                    <div className="d-flex align-items-center gap-3">
                       <div className="p-2 bg-white bg-opacity-20 rounded-3"><ShieldCheck size={24} /></div>
                       <div>
                          <h6 className="mb-0 fw-bold">Nearest Philippine Consulate</h6>
                          <small className="opacity-75">7th St, Al Qusais 3, Dubai, UAE</small>
                       </div>
                       <button className="btn btn-white btn-sm ms-auto bg-white text-primary fw-bold px-3">Call</button>
                    </div>
                  </div>

                  {/* QUICK ACTION HOTLINES */}
                  <div className="row g-2">
                    {[
                      { n: "DMW Response Team", v: "+63 2 8722-1144", icon: <Phone size={14}/> },
                      { n: "Agency Welfare Officer", v: profile.agencyPhone, icon: <User size={14}/> }
                    ].map((h, i) => (
                      <div className="col-sm-6" key={i}>
                        <div className="p-3 bg-white rounded-4 shadow-sm border border-light d-flex justify-content-between align-items-center hover-shadow transition">
                          <div>
                            <small className="text-muted d-block text-uppercase fw-bold" style={{fontSize: '9px'}}>{h.n}</small>
                            <span className="fw-bold small">{h.v}</span>
                          </div>
                          <div className="p-2 bg-light rounded-circle text-primary">{h.icon}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}