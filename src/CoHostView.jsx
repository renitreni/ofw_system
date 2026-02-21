import React, { useState } from 'react';

const CoHostView = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('add'); 
  const [selectedAgency, setSelectedAgency] = useState(null);

  const agencies = [
    { id: 1, name: 'Al-Khobar Recruitment Services', location: 'Dammam, KSA', focal: 'Ahmed Al-Sayed', contact: '+966 50 123 4567', status: 'Active' },
    { id: 2, name: 'Jeddah Global Manpower', location: 'Jeddah, KSA', focal: 'Sarah Bin-Talal', contact: '+966 12 987 6543', status: 'Active' },
    { id: 3, name: 'Riyadh Career Gateway', location: 'Riyadh, KSA', focal: 'Omar Al-Farsi', contact: '+966 11 444 2222', status: 'Pending Review' },
  ];

  const handleAction = (type, agency = null) => {
    setModalType(type);
    setSelectedAgency(agency);
    setShowModal(true);
  };

  return (
    <div className="animate-fade-in p-2">
      
      

       {/* HEADER SECTION */}
      <div className="d-flex justify-content-between align-items-center mb-4 p-3 bg-white shadow-sm" style={{ borderRadius: '15px', borderLeft: '6px solid #0038a8' }}>
        <div>
          <h2 className="fw-bold mb-0" style={{ color: '#0038a8' }}>Co-Host Partners</h2>
          <p className="text-muted mb-0 small">Managing <span className="px-2 py-1 rounded bg-primary-subtle text-primary fw-bold" style={{ fontSize: '0.9rem' }}>12 Verified Agencies</span> across the Kingdom.</p>
        </div>
        <div className="d-flex gap-2">
          <button 
            className="btn btn-ph-blue px-4 py-2 shadow-sm fw-bold border-0 transition-all" 
            style={{ borderRadius: '12px', letterSpacing: '0.5px' }}
            onClick={() => handleAction('add')}
          >
            <span style={{color: "white"}}>+ Add New Partner</span>
          </button>
        </div>
      </div>

      {/* REMINDER ALERT BOX */}
      <div className="info-alert-box-gold shadow-sm d-flex align-items-center border-0 mb-4" style={{ borderRadius: '12px', borderLeft: '5px solid #fcd116', padding: '15px' }}>
        <span className="me-3 fs-4">🛡️</span>
        <div>
            <strong className="text-dark">Partner Compliance:</strong> Please verify the international accreditation of all agencies marked as <span className="fw-bold">"Pending Review"</span> before activation.
        </div>
      </div>

      {/* SEARCH BAR */}
      <div className="modern-card p-2 mb-4 bg-white shadow-sm border-0" style={{ borderRadius: '50px' }}>
        <div className="search-group-ph border-0 bg-light px-4 py-2 rounded-pill d-flex align-items-center">
          <span className="me-2 text-muted">🔍</span>
          <input 
            type="text" 
            className="form-control border-0 bg-transparent shadow-none" 
            placeholder="Search agency name, focal person, or city..." 
            onChange={(e) => setSearchTerm(e.target.value)} 
          />
        </div>
      </div>

      {/* TABLE */}
      <div className="modern-card overflow-hidden shadow-sm border-0 bg-white" style={{ borderRadius: '20px' }}>
        <div className="table-responsive">
          <table className="table table-hover align-middle m-0">
            <thead className="bg-light text-secondary">
              <tr style={{ borderBottom: '2px solid #00d2ff' }}>
                <th className="ps-4 py-3 small fw-bold text-uppercase">Partner Agency</th>
                <th className="small fw-bold text-uppercase">HQ Location</th>
                <th className="small fw-bold text-uppercase">Focal Person</th>
                <th className="text-center small fw-bold text-uppercase">Status</th>
                <th className="text-center small fw-bold text-uppercase">Action</th>
              </tr>
            </thead>
            <tbody>
              {agencies.filter(a => a.name.toLowerCase().includes(searchTerm.toLowerCase())).map((agency) => (
                <tr key={agency.id} className="cohost-table-row">
                  <td className="ps-4 py-3">
                    <div className="d-flex align-items-center">
                      <div className="bg-primary text-white p-2 rounded-3 me-3 d-flex align-items-center justify-content-center fw-bold" style={{ width: '38px', height: '38px', fontSize: '14px' }}>
                        {agency.name.charAt(0)}
                      </div>
                      <div>
                        <span className="fw-bold text-dark d-block">{agency.name}</span>
                        <small className="text-muted">UID: {agency.id}00-KSA</small>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="badge bg-light text-muted border px-3 py-2 rounded-pill" style={{ fontWeight: '500' }}>📍 {agency.location}</span>
                  </td>
                  <td className="fw-bold text-secondary">{agency.focal}</td>
                  <td className="text-center">
                    <span className={`badge rounded-pill px-3 py-2 ${agency.status === 'Active' ? 'badge-active' : 'badge-pending'}`}>
                      {agency.status === 'Active' ? '● Active' : '○ Pending'}
                    </span>
                  </td>
                  <td className="text-center">
                    <div className="d-flex justify-content-center gap-2">
                      <button className="btn btn-sm btn-outline-primary border-0 bg-light rounded-3 p-2" onClick={() => handleAction('edit', agency)}>✏️</button>
                      <button className="btn btn-sm btn-outline-danger border-0 bg-light rounded-3 p-2" onClick={() => handleAction('lock', agency)}>🔒</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* UNIVERSAL MODAL */}
      {showModal && (
        <div className="modal-overlay-ph" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.4)', zIndex: 5000, display: 'flex', alignItems: 'center', justifyCenter: 'center', backdropFilter: 'blur(4px)' }}>
          <div className="bg-white rounded-4 shadow-lg p-0 overflow-hidden animate-slide-up" style={{ width: '95%', maxWidth: '500px' }}>
            <div className="p-4 text-center" style={{ borderTop: '8px solid #00d2ff' }}>
              <h4 className="fw-bold mb-1 text-dark">
                {modalType === 'add' && 'New Partner Registration'}
                {modalType === 'edit' && 'Edit Partner Details'}
                {modalType === 'lock' && 'Update Status'}
              </h4>
              <p className="text-muted small">ID: {selectedAgency ? selectedAgency.id : 'NEW-ENTRY'}</p>
            </div>
            
            <div className="px-4 py-2">
              {modalType === 'lock' ? (
                <div className="alert border-0 text-center py-4" style={{ backgroundColor: '#fff5f5', color: '#c53030' }}>
                  <div className="display-4 mb-2">🔒</div>
                  Are you sure you want to change the access status for <strong>{selectedAgency?.name}</strong>?
                </div>
              ) : (
                <div className="row g-3">
                  <div className="col-12">
                    <label className="small fw-bold text-secondary mb-1">Legal Agency Name</label>
                    <input type="text" className="form-control bg-light border-0 py-2" defaultValue={selectedAgency?.name} style={{ borderRadius: '8px' }} />
                  </div>
                  <div className="col-6">
                    <label className="small fw-bold text-secondary mb-1">HQ City</label>
                    <input type="text" className="form-control bg-light border-0 py-2" defaultValue={selectedAgency?.location} style={{ borderRadius: '8px' }} />
                  </div>
                  <div className="col-6">
                    <label className="small fw-bold text-secondary mb-1">Primary Contact</label>
                    <input type="text" className="form-control bg-light border-0 py-2" defaultValue={selectedAgency?.contact} style={{ borderRadius: '8px' }} />
                  </div>
                </div>
              )}
            </div>

            <div className="p-4 bg-light mt-4 d-flex justify-content-end gap-2">
              <button className="btn btn-link text-muted text-decoration-none fw-bold" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="btn btn-ph-blue text-white px-5 shadow-sm rounded-pill fw-bold" onClick={() => setShowModal(false)}>
                Confirm & Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CoHostView;