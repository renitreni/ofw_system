import React, { useState } from 'react';

const AgencyProfileView = () => {
  
  const [activeModal, setActiveModal] = useState(null); // 'EditProfile', 'License', 'Team', 'Docs'
  const [isProcessing, setIsProcessing] = useState(false);

  const phColors = {
    blue: '#0038a8',
    red: '#ce1126',
    gold: '#fcd116',
    success: '#198754',
    slate: '#475569'
  };

  const agencyInfo = {
    name: "KalingaGate Recruitment Services Inc.",
    license: "DMW-123-RP-022026-R",
    expiry: "Feb 20, 2028",
    status: "Valid / Good Standing",
    address: "123 Business Tower, Ayala Ave, Makati City, Philippines",
    contact: "+63 (02) 8888-1234",
    email: "info@kalingagate.com"
  };

  const triggerAction = (modalType) => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setActiveModal(modalType);
    }, 500);
  };

  return (
    <div className="view-container animate-fade-in p-2">
      
      {/* 1. AGENCY IDENTITY HEADER */}
      <div className="d-flex justify-content-between align-items-center mb-4 p-4 bg-white shadow-sm" style={{ borderRadius: '20px', borderLeft: `8px solid ${phColors.blue}` }}>
        <div className="d-flex align-items-center">
          <div className="agency-logo-placeholder me-4 d-flex align-items-center justify-content-center text-white fw-black fs-2 shadow-sm" 
               style={{ width: '80px', height: '80px', backgroundColor: phColors.blue, borderRadius: '15px' }}>
            KG
          </div>
          <div>
            <h2 className="fw-bold mb-1" style={{ color: phColors.blue }}>{agencyInfo.name}</h2>
            <div className="d-flex gap-3">
              <span className="badge bg-success-subtle text-success rounded-pill px-3">● {agencyInfo.status}</span>
              <span className="text-muted small fw-bold">DMW License: {agencyInfo.license}</span>
            </div>
          </div>
        </div>
        <button className="btn btn-ph-light border px-4 fw-bold rounded-pill" 
                style={{ backgroundColor: '#f0f4ff', color: phColors.blue }}
                onClick={() => triggerAction('EditProfile')}>
          ✏️ Edit Profile
        </button>
      </div>

      <div className="row g-4 mb-4">
        {/* 2. COMPLIANCE RADAR (KPIs) */}
        <div className="col-md-8">
          <div className="modern-card p-4 bg-white shadow-sm border-0 h-100" style={{ borderRadius: '20px' }}>
            <h6 className="fw-bold text-muted mb-4 text-uppercase small">Compliance & Legal Standing</h6>
            <div className="row text-center">
              <div className="col-4 border-end">
                <small className="text-muted d-block mb-1">License Expiry</small>
                <h5 className="fw-bold text-danger">730 Days Left</h5>
                <div className="progress mx-auto" style={{ width: '70%', height: '5px' }}>
                  <div className="progress-bar bg-danger" style={{ width: '85%' }}></div>
                </div>
              </div>
              <div className="col-4 border-end">
                <small className="text-muted d-block mb-1">DMW Rating</small>
                <h5 className="fw-bold text-primary">5-Star Agency</h5>
                <div className="text-warning">★★★★★</div>
              </div>
              <div className="col-4">
                <small className="text-muted d-block mb-1">Active Job Orders</small>
                <h5 className="fw-bold text-dark">42 Verified</h5>
                <small className="text-success fw-bold">+5 this week</small>
              </div>
            </div>
          </div>
        </div>

        {/* 3. QUICK DOCS VAULT */}
        <div className="col-md-4">
          <div className="modern-card p-4 text-white shadow-sm border-0 h-100" 
               style={{ borderRadius: '20px', background: `linear-gradient(135deg, ${phColors.blue} 0%, #001a4d 100%)` }}>
            <h6 className="fw-bold mb-3 small opacity-75">GOVERNMENT REPOSITORY</h6>
            <div className="d-grid gap-2">
              <button className="btn btn-light btn-sm fw-bold text-start px-3" onClick={() => triggerAction('Docs')}>📄 View DMW License.pdf</button>
              <button className="btn btn-light btn-sm fw-bold text-start px-3" onClick={() => triggerAction('Docs')}>📄 SEC Registration.pdf</button>
              <button className="btn btn-light btn-sm fw-bold text-start px-3" onClick={() => triggerAction('Docs')}>📄 BIR Tax Clearance.pdf</button>
            </div>
          </div>
        </div>
      </div>

      {/* 4. OFFICE DETAILS & TEAM SLIDE */}
      <div className="row g-4">
        <div className="col-md-6">
          <div className="modern-card p-4 bg-white shadow-sm border-0" style={{ borderRadius: '20px' }}>
            <h6 className="fw-bold text-muted mb-3 small">HQ CONTACT DETAILS</h6>
            <div className="d-flex flex-column gap-3">
              <div className="d-flex align-items-center gap-3">
                <span className="fs-4">📍</span>
                <small className="fw-bold">{agencyInfo.address}</small>
              </div>
              <div className="d-flex align-items-center gap-3">
                <span className="fs-4">📞</span>
                <small className="fw-bold">{agencyInfo.contact}</small>
              </div>
              <div className="d-flex align-items-center gap-3">
                <span className="fs-4">✉️</span>
                <small className="fw-bold">{agencyInfo.email}</small>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="modern-card p-4 bg-white shadow-sm border-0" style={{ borderRadius: '20px' }}>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h6 className="fw-bold text-muted m-0 small">KEY MANAGEMENT</h6>
              <button className="btn btn-sm btn-link text-decoration-none fw-bold" onClick={() => triggerAction('Team')}>Manage Team</button>
            </div>
            <div className="d-flex gap-3 overflow-auto pb-2">
              {[
                { name: 'Admin Martha', role: 'Operations', initial: 'M' },
                { name: 'Engr. Khaled', role: 'KSA Principal', initial: 'K' },
                { name: 'Atty. Santos', role: 'Legal Counsel', initial: 'S' }
              ].map((member, i) => (
                <div key={i} className="text-center" style={{ minWidth: '100px' }}>
                  <div className="mx-auto mb-2 d-flex align-items-center justify-content-center rounded-circle bg-light fw-bold border" 
                       style={{ width: '50px', height: '50px', color: phColors.blue }}>{member.initial}</div>
                  <div className="small fw-bold text-dark" style={{ fontSize: '11px' }}>{member.name}</div>
                  <div className="text-muted" style={{ fontSize: '9px' }}>{member.role}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* --- MODAL SYSTEM --- */}

      {/* PROCESSING OVERLAY */}
      {isProcessing && (
        <div className="modal-overlay d-flex flex-column align-items-center justify-content-center" 
             style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(255,255,255,0.9)', zIndex: 5000 }}>
          <div className="spinner-border text-primary mb-3"></div>
          <h6 className="fw-bold text-primary">SECURE DATA RETRIEVAL...</h6>
        </div>
      )}

      {/* MODAL: EDIT PROFILE */}
      {activeModal === 'EditProfile' && (
        <div className="modal-overlay d-flex align-items-center justify-content-center" 
             style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 4000 }}>
          <div className="modern-card bg-white p-0 shadow-lg border-0" style={{ width: '600px', borderRadius: '25px', overflow: 'hidden' }}>
            <div className="p-4 text-white d-flex justify-content-between" style={{ backgroundColor: phColors.blue }}>
              <h5 className="m-0 fw-bold">Update Agency Profile</h5>
              <button className="btn btn-sm text-white fs-4" onClick={() => setActiveModal(null)}>&times;</button>
            </div>
            <div className="p-4">
              <div className="row g-3">
                <div className="col-12">
                  <label className="small fw-bold text-muted">Legal Agency Name</label>
                  <input type="text" className="form-control bg-light border-0" defaultValue={agencyInfo.name} />
                </div>
                <div className="col-md-6">
                  <label className="small fw-bold text-muted">DMW License Number</label>
                  <input type="text" className="form-control bg-light border-0" defaultValue={agencyInfo.license} />
                </div>
                <div className="col-md-6">
                  <label className="small fw-bold text-muted">License Expiry</label>
                  <input type="date" className="form-control bg-light border-0" />
                </div>
                <div className="col-12 text-end mt-4">
                   <button className="btn btn-link text-muted fw-bold text-decoration-none me-3" onClick={() => setActiveModal(null)}>Cancel</button>
                   <button className="btn text-white fw-bold px-4 rounded-pill" style={{ backgroundColor: phColors.success }} onClick={() => setActiveModal(null)}>Save Changes</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: TEAM MANAGEMENT */}
      {activeModal === 'Team' && (
        <div className="modal-overlay d-flex align-items-center justify-content-center" 
             style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 4000 }}>
          <div className="modern-card bg-white p-4 shadow-lg border-0" style={{ width: '500px', borderRadius: '25px' }}>
            <h5 className="fw-bold mb-4" style={{ color: phColors.blue }}>Authorized Personnel</h5>
            <div className="list-group list-group-flush">
              {['Martha Alfaro - Admin', 'Khaled Ibrahim - Principal', 'Juan Santos - Legal'].map((person, i) => (
                <div key={i} className="list-group-item d-flex justify-content-between align-items-center px-0">
                  <span className="fw-bold small">{person}</span>
                  <button className="btn btn-sm btn-outline-danger border-0">Revoke</button>
                </div>
              ))}
            </div>
            <button className="btn btn-ph-blue w-100 mt-4 text-white fw-bold rounded-pill" style={{ backgroundColor: phColors.blue }}>+ Add Key Officer</button>
            <button className="btn btn-link w-100 text-muted mt-2 text-decoration-none small" onClick={() => setActiveModal(null)}>Close</button>
          </div>
        </div>
      )}

      {/* MODAL: DOCUMENT PREVIEW */}
      {activeModal === 'Docs' && (
        <div className="modal-overlay d-flex align-items-center justify-content-center" 
             style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.8)', zIndex: 4000 }}>
          <div className="bg-light p-4 shadow-lg border-0" style={{ width: '80%', height: '80%', borderRadius: '15px' }}>
             <div className="d-flex justify-content-between mb-3 align-items-center">
               <h6 className="fw-bold m-0">LEGAL_RECORDS_PREVIEW.PDF</h6>
               <button className="btn btn-dark btn-sm rounded-pill px-3" onClick={() => setActiveModal(null)}>Close Viewer</button>
             </div>
             <div className="w-100 h-100 bg-white d-flex align-items-center justify-content-center border border-dashed text-muted">
                <div className="text-center">
                  <span className="fs-1">📄</span>
                  <p className="fw-bold mt-2">DMW Official License Document Stream</p>
                  <small>Encrypted PDF Content Loading...</small>
                </div>
             </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default AgencyProfileView;