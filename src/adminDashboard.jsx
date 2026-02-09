import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal } from 'bootstrap';
import './adminDashboard.css';

const AdminDashboard = () => {
  const [activePage, setActivePage] = useState('Dashboard');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [selectedOFW, setSelectedOFW] = useState(null);
  const [searchTerm, setSearchTerm] = useState(''); 

 
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const getPHTDisplay = (date) => {
    const formatter = new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Asia/Manila',
      day: '2-digit', month: '2-digit', year: '2-digit',
      hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false
    });
    const parts = formatter.formatToParts(date);
    const getPart = (type) => parts.find(p => p.type === type).value;
    return {
      time: `${getPart('hour')} : ${getPart('minute')} : ${getPart('second')}`,
      date: `${getPart('month')}-${getPart('day')}-${getPart('year')}` 
    };
  };

  const pht = getPHTDisplay(currentTime);

  const openFilesModal = () => {
    const modal = new Modal(document.getElementById('filesModal'));
    modal.show();
  };

  const openPreviewModal = (docType) => {
    setSelectedDoc(docType);
 
    const modal = new Modal(document.getElementById('previewModal'), { backdrop: false });
    modal.show();
  };

  const openProfileModal = (name) => {
    setSelectedOFW(name);
    const modal = new Modal(document.getElementById('profileModal'));
    modal.show();
  };

  const renderContent = () => {
    switch (activePage) {
      case 'Dashboard':
        return (
          <div className="animate-fade-in">
            <h1 className="h3 fw-bold mb-4 text-black text-start">Admin</h1>
            <div className="stats-banner p-4 mb-4 rounded-4 shadow-sm" style={{ backgroundColor: '#DCDCDC' }}>
              <div className="row g-3">
                <div className="col-lg-7">
                  <div className="row g-2">
                    <div className="col-6"><div className="stat-card p-3 bg-white rounded-3 shadow-sm text-black"><b>OFW</b><h2>120</h2></div></div>
                    <div className="col-6"><div className="stat-card p-3 bg-white rounded-3 shadow-sm text-black"><b>Appointment</b><h2>20</h2></div></div>
                    <div className="col-6"><div className="stat-card p-3 bg-white rounded-3 shadow-sm text-black"><b>New Contract Arrive</b><h2>13</h2></div></div>
                    <div className="col-6"><div className="stat-card p-3 bg-white rounded-3 shadow-sm text-black"><b>Rejected</b><h2>3</h2></div></div>
                  </div>
                </div>
                <div className="col-lg-5">
                  <div className="clock-card h-100 p-4 rounded-4 text-center d-flex flex-column justify-content-center border position-relative overflow-hidden" style={{ backgroundColor: '#E8EBF2' }}>
                    <div className="clock-pattern"></div>
                    <p className="text-muted fw-bold m-0 z-1">Real-time (PHT)</p>
                    <h1 className="display-4 fw-bold m-2 z-1 text-black">{pht.time}</h1>
                    <p className="fw-bold m-0 z-1 text-black">{pht.date}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="notice-box border rounded-4 bg-white shadow-sm overflow-hidden">
              <div className="notice-header p-2 px-4 fw-bold text-muted border-bottom" style={{ backgroundColor: '#E0E0E0' }}>NOTICE!</div>
              <div className="p-4">
                <div className="p-3 mb-2 border rounded bg-light d-flex justify-content-between text-black">
                  <span>New Contract!!</span><span>▼</span>
                </div>
                <div className="p-3 border rounded text-black">Maria Leonor- Contract</div>
              </div>
            </div>
          </div>
        );
      case 'OFW':
       
        const filteredOFWList = ["Brooklyn Edwards", "Jane Doe", "Juan Dela Cruz", "Maria Clara", "Antonio Luna"].filter(name =>
          name.toLowerCase().includes(searchTerm.toLowerCase())
        );

        return (
          <div className="animate-fade-in">
            <h1 className="h3 fw-bold mb-4 text-black text-start">OFW List</h1>
            <div className="ofw-table-card rounded-4 shadow-sm border bg-white overflow-hidden">
                <div className="table-header p-3 text-muted fw-bold border-bottom d-flex align-items-center" style={{backgroundColor: '#DCDCDC'}}>
                    <span className="ofw-col-name">Employee Name</span>
                    <span className="ofw-col-res">Contract Result</span>
                    <span className="ofw-col-doc">Documents</span>
                    <span className="ofw-col-act"></span>
                </div>
                <div className="p-3">
                    {filteredOFWList.map((name, i) => (
                        <div key={i} className="ofw-list-row d-flex align-items-center p-3 mb-3 border rounded-4 bg-light shadow-sm text-black">
                            <span className="ofw-col-name fw-bold">{name}</span>
                            <span className={`ofw-col-res fw-bold ${i % 2 === 0 ? 'text-warning' : 'text-success'}`}>
                              {i % 2 === 0 ? 'Pending' : 'Verified'}
                            </span>
                            <div className="ofw-col-doc cursor-pointer fw-bold" onClick={openFilesModal}>
                                <span className="small me-2">See Attached Files</span>
                                <span className="small">▼</span>
                            </div>
                            <div className="ofw-col-act cursor-pointer px-3 fs-4 fw-bold" onClick={() => openProfileModal(name)}>•••</div>
                        </div>
                    ))}
                </div>
            </div>
          </div>
        );
      case 'Appointments':
       
        const filteredApps = [
          { name: "Brooklyn Edwards", type: "Visa Interview", date: "10-12-26" },
          { name: "Jane Doe", type: "Medical Exam", date: "02-15-26" },
          { name: "Juan Dela Cruz", type: "PDOS Seminar", date: "02-20-26" }
        ].filter(app => app.name.toLowerCase().includes(searchTerm.toLowerCase()));

        return (
          <div className="animate-fade-in px-2">
            <h1 className="h3 fw-bold mb-4 text-black text-start">Appointments</h1>
            <div className="row g-3 mb-4">
              <div className="col-md-4"><div className="p-3 rounded-4 shadow-sm border bg-white text-start text-black"><p className="small fw-bold text-muted mb-1">TODAY'S APPOINTMENTS</p><h2 className="fw-bold m-0">08</h2></div></div>
              <div className="col-md-4"><div className="p-3 rounded-4 shadow-sm border bg-white text-start text-black"><p className="small fw-bold text-muted mb-1">UPCOMING (THIS WEEK)</p><h2 className="fw-bold m-0">24</h2></div></div>
              <div className="col-md-4"><div className="p-3 rounded-4 shadow-sm border bg-white text-start text-warning"><p className="small fw-bold text-muted mb-1">PENDING RESULTS</p><h2 className="fw-bold m-0">12</h2></div></div>
            </div>
            <div className="ofw-table-card rounded-4 shadow-sm border bg-white overflow-hidden">
                <div className="table-header p-3 text-muted fw-bold border-bottom d-flex align-items-center" style={{backgroundColor: '#DCDCDC'}}>
                    <span className="app-col-name">Employee Name</span>
                    <span className="app-col-type">Type</span>
                    <span className="app-col-sch">Schedule</span>
                    <span className="app-col-act"></span>
                </div>
                <div className="p-3">
                    {filteredApps.map((app, i) => (
                        <div key={i} className="ofw-list-row d-flex align-items-center p-3 mb-3 border rounded-4 bg-light shadow-sm text-black">
                            <span className="app-col-name fw-bold">{app.name}</span>
                            <span className="app-col-type fw-bold small text-muted">{app.type}</span>
                            <span className="app-col-sch fw-bold">{app.date}</span>
                            <div className="app-col-act cursor-pointer px-3 fs-4 fw-bold" onClick={() => openProfileModal(app.name)}>•••</div>
                        </div>
                    ))}
                </div>
            </div>
          </div>
        );
      case 'Documents':
        return (
          <div className="animate-fade-in">
            <h1 className="h3 fw-bold mb-4 text-black text-start">Document Repository</h1>
            <div className="row g-4">
              {["Passport", "Contract", "Medical Record", "Visa", "NBI Clearance", "Flight Details"].map((folder, i) => (
                <div key={i} className="col-md-4 col-lg-3">
                  <div className="doc-folder-card p-4 rounded-4 shadow-sm border bg-white text-center cursor-pointer" onClick={() => openPreviewModal(folder)}>
                    <div className="folder-icon mb-2" style={{ fontSize: '3rem' }}>📁</div>
                    <h6 className="fw-bold text-black mb-1">{folder}</h6>
                    <small className="text-muted">Archives</small>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'Settings': return <div className="p-4 text-black text-start"><h3>System Settings</h3></div>;
      default: return null;
    }
  };

  return (
    <div className="admin-container d-flex vw-100 vh-100 overflow-hidden">
      <aside className="ofw-sidebar flex-shrink-0">
        <div className="sidebar-brand p-4"><h2 className="logo-text m-0 h4 fw-bold text-black">🐋 Logo Name</h2></div>
        <div className="px-3 mb-4">
          <select className="agency-select form-select">
            <option>XYZ Agency</option>
          </select>
        </div>
        <nav className="nav-group px-2">
          <p className="nav-label ps-3 text-muted small fw-bold">MAIN MENU</p>
          <button onClick={() => {setActivePage('Dashboard'); setSearchTerm('')}} className={`nav-btn w-100 text-start border-0 py-2 px-3 rounded mb-1 text-black ${activePage === 'Dashboard' ? 'active' : 'bg-transparent'}`}>📊 Dashboard</button>
          <button onClick={() => {setActivePage('OFW'); setSearchTerm('')}} className={`nav-btn w-100 text-start border-0 py-2 px-3 rounded mb-1 text-black ${activePage === 'OFW' ? 'active' : 'bg-transparent'}`}>👥 OFW</button>
          <button onClick={() => {setActivePage('Appointments'); setSearchTerm('')}} className={`nav-btn w-100 text-start border-0 py-2 px-3 rounded mb-1 text-black ${activePage === 'Appointments' ? 'active' : 'bg-transparent'}`}>📄 Appointments</button>
          <button onClick={() => {setActivePage('Documents'); setSearchTerm('')}} className={`nav-btn w-100 text-start border-0 py-2 px-3 rounded mb-4 text-black ${activePage === 'Documents' ? 'active' : 'bg-transparent'}`}>📁 Documents</button>
          
          <p className="nav-label ps-3 text-muted small fw-bold">SETTINGS</p>
          <button onClick={() => setActivePage('Settings')} className={`nav-btn w-100 text-start border-0 py-2 px-3 rounded mb-1 text-black ${activePage === 'Settings' ? 'active' : 'bg-transparent'}`}>⚙️ Settings</button>
          <button className="nav-btn w-100 text-start border-0 py-2 px-3 rounded bg-transparent mt-2 text-black" onClick={() => window.confirm("Are you sure you want to log out?") && window.location.reload()}>
            <span className="me-2">⬅️</span> Log Out
          </button>
        </nav>
      </aside>

      <main className="ofw-main flex-grow-1 d-flex flex-column bg-white">
        <header className="ofw-header d-flex justify-content-between align-items-center p-4 border-bottom">
           <div className="search-wrapper w-50">
             <input 
               type="text" 
               className="form-control bg-light border-0 text-black" 
               placeholder="Search Employee..." 
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
             />
           </div>
           <div className="profile-info text-end me-3 text-black">
              <p className="m-0 fw-bold small">Maria Martha Lee</p>
              <p className="m-0 text-muted small">Status: Online</p>
            </div>
        </header>
        <div className="dashboard-scroll-area flex-grow-1 overflow-auto px-4 pb-4">{renderContent()}</div>
      </main>

      {}
      <div className="modal fade" id="filesModal" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content border-0 rounded-4 shadow">
            <div className="modal-header border-0 pb-0">
              <h5 className="modal-title w-100 text-center fw-bold text-muted mt-3">See Attached Files</h5>
              <button type="button" className="btn-close me-2" data-bs-dismiss="modal"></button>
            </div>
            <div className="modal-body p-4">
              <div className="row g-4">
                {["Passport", "Contract", "Medical Record", "Visa", "NBI/Police Clearance", "Flight Details"].map((label, idx) => (
                  <div key={idx} className="col-md-6">
                    <div className="doc-item-container shadow-sm border rounded-3 p-3 bg-white d-flex justify-content-between align-items-center">
                      <div className="text-start">
                        <p className="m-0 text-black fw-bold">{label}</p>
                        <small className="text-muted opacity-50">Attached File</small>
                      </div>
                      <span className="chevron-icon text-muted fw-bold fs-4 cursor-pointer" onClick={() => openPreviewModal(label)}>〉</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="modal fade" id="previewModal" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content border-0 rounded-4 shadow-lg p-4 text-center">
            <div className="d-flex justify-content-between mb-3 align-items-center">
                <h6 className="fw-bold m-0 text-black">{selectedDoc} Preview</h6>
                <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div className="file-preview-box border rounded-3 p-5 bg-light d-flex flex-column align-items-center">
                <span className="fs-1 mb-2">📄</span>
                <p className="fw-bold mb-0 text-black">sample_{selectedDoc?.toLowerCase().replace(/ /g, '_')}.pdf</p>
                <small className="text-muted">2.4 MB</small>
            </div>
            <button className="btn btn-dark w-100 mt-3 rounded-pill">Download File</button>
          </div>
        </div>
      </div>

      <div className="modal fade" id="profileModal" tabIndex="-1" aria-hidden="true" style={{zIndex: 1050}}>
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content border-0 rounded-4 shadow bg-light p-4">
            <div className="modal-header border-0 p-0 mb-3"><button type="button" className="btn-close" data-bs-dismiss="modal"></button></div>
            <div className="d-flex align-items-center mb-4">
                <div className="rounded-circle bg-secondary me-3" style={{width: '100px', height: '100px'}}></div>
                <div className="text-start">
                    <h4 className="fw-bold m-0 text-black">{selectedOFW}</h4>
                    <p className="text-muted small">Status: Verified</p>
                </div>
            </div>
            <div className="row g-3 mb-4">
                <div className="col-md-6 text-start"><label className="small fw-bold text-black">Name</label><input className="form-control border-0 bg-white" defaultValue={selectedOFW} readOnly /></div>
                <div className="col-md-6 text-start"><label className="small fw-bold text-black">Address</label><input className="form-control border-0 bg-white" defaultValue="Philippines" readOnly /></div>
                <div className="col-md-6 text-start"><label className="small fw-bold text-black">Email</label><input className="form-control border-0 bg-white" defaultValue="user@example.com" readOnly /></div>
                <div className="col-md-6 text-start"><label className="small fw-bold text-black">Birthdate</label><input className="form-control border-0 bg-white" defaultValue="01-01-1990" readOnly /></div>
                <div className="col-md-6 text-start"><label className="small fw-bold text-black">Phone Number</label><input className="form-control border-0 bg-white" defaultValue="09123456789" readOnly /></div>
                <div className="col-md-6 text-start"><label className="small fw-bold text-black">Emergency Contact</label><input className="form-control border-0 bg-white" defaultValue="09987654321" readOnly /></div>
            </div>
            <div className="bg-white p-3 rounded-4 border shadow-sm text-start">
                <h6 className="fw-bold text-muted border-bottom pb-2 mb-3">See Attached Files</h6>
                <div className="row g-2">
                    {["Passport", "Contract", "Medical Record", "Visa", "NBI Clearance", "Flight Details"].map((doc, idx) => (
                        <div key={idx} className="col-md-6">
                            <div className="p-2 border rounded-3 bg-light d-flex justify-content-between align-items-center">
                                <span className="small fw-bold text-black ps-2">{doc}</span>
                                <button className="btn btn-link p-0 px-2 text-muted fs-5 fw-bold text-decoration-none doc-view-btn" onClick={() => openPreviewModal(doc)}>〉</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;