import React, { useState } from 'react';

const EmployedView = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedWorker, setSelectedWorker] = useState(null);
  const [activeTab, setActiveTab] = useState('Documents');

  const [deployedWorkers] = useState([
    { 
      id: 1, 
      name: "Juan Dela Cruz", 
      job: "Electrician", 
      principal: "Binladin Group", 
      iqamaNo: "2409881234", 
      iqamaStatus: "Active",
      expiryDate: "2025-12-10",
      deploymentDate: "2023-10-12",
      passport: "P879472974",
      passportExpiry: "2028-05-20",
      contactPerson: "Maria Cruz",
      contactNumber: "0917-123-4567"
    },
    { 
      id: 2, 
      name: "Maria Clara", 
      job: "Staff Nurse", 
      principal: "King Fahad Hospital", 
      iqamaNo: "2301124556", 
      iqamaStatus: "Expiring",
      expiryDate: "2024-04-15",
      deploymentDate: "2023-11-05",
      passport: "P12345678A",
      passportExpiry: "2027-11-12",
      contactPerson: "Pedro Clara",
      contactNumber: "0918-765-4321"
    }
  ]);

  const filteredWorkers = deployedWorkers.filter(worker =>
    worker.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    worker.principal.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusStyle = (status) => {
    if (status === "Expiring") return { backgroundColor: '#fff3cd', color: '#856404', border: '1px solid #ffeeba', fontWeight: 'bold' };
    return { backgroundColor: '#d4edda', color: '#155724', border: '1px solid #c3e6cb', fontWeight: 'bold' };
  };

  const getInitials = (name) => name.split(' ').map(n => n[0]).join('').toUpperCase();

  return (
    <div className="animate-fade-in p-3" style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      
      {/* HEADER SECTION */}
      <div className="d-flex justify-content-between align-items-center mb-4 p-3 bg-white shadow-sm" style={{ borderRadius: '15px', borderLeft: '6px solid #0038a8' }}>
        <div>
          <h2 className="fw-bold mb-0" style={{ color: '#0038a8' }}>Deployed Worker Registry</h2>
          <p className="text-muted mb-0 small">Monitoring Kingdom of Saudi Arabia (KSA) Deployments</p>
        </div>
        <div className="d-flex gap-2">
           <div className="text-end me-3">
             <div className="small text-muted">Last Sync</div>
             <div className="fw-bold text-dark">Feb 20, 2026</div>
           </div>
        </div>
      </div>

      {/* SUMMARY CARDS - DASHBOARD STYLE */}
      <div className="row g-3 mb-4">
        <div className="col-md-4">
          <div className="modern-card p-3 shadow-sm bg-white border-0 h-100" style={{ borderRadius: '15px', borderTop: '4px solid #0038a8' }}>
            <span className="text-muted small fw-bold text-uppercase">Total On-Site</span>
            <h2 className="display-6 fw-bold mt-2" style={{ color: '#0038a8' }}>{deployedWorkers.length}</h2>
          </div>
        </div>
        <div className="col-md-4">
          <div className="modern-card p-3 shadow-sm bg-white border-0 h-100" style={{ borderRadius: '15px', borderTop: '4px solid #ffc107' }}>
            <span className="text-muted small fw-bold text-uppercase">Expiring Iqama</span>
            <h2 className="display-6 fw-bold mt-2 text-warning">1</h2>
          </div>
        </div>
        <div className="col-md-4">
          <div className="modern-card p-3 shadow-sm bg-white border-0 h-100" style={{ borderRadius: '15px', borderTop: '4px solid #0dcaf0' }}>
            <span className="text-muted small fw-bold text-uppercase">New Monthly Deployments</span>
            <h2 className="display-6 fw-bold mt-2" style={{ color: '#0dcaf0' }}>12</h2>
          </div>
        </div>
      </div>

      {/* SEARCH AND ACTIONS */}
      <div className="modern-card p-3 mb-4 bg-white shadow-sm border-0 d-flex justify-content-between align-items-center" style={{ borderRadius: '15px' }}>
        <div className="search-group-ph border-0 bg-light px-3 py-2 rounded-pill d-flex align-items-center w-50">
          <span className="me-2 text-muted">🔍</span>
          <input 
            type="text" 
            className="form-control border-0 bg-transparent shadow-none" 
            placeholder="Search Worker Name, Employer, or Iqama No..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="btn btn-warning fw-bold px-4 shadow-sm" style={{ borderRadius: '10px', color: '#000' }} onClick={() => alert('Exporting CSV...')}>
          📥 Export Deployment Report
        </button>
      </div>

      {/* MAIN DATA TABLE */}
      <div className="modern-card overflow-hidden shadow-sm border-0 bg-white" style={{ borderRadius: '15px' }}>
        <div className="table-responsive">
          <table className="table table-hover align-middle m-0">
            <thead style={{ backgroundColor: '#0038a8', color: '#fff' }}>
              <tr>
                <th className="ps-4 py-3 small fw-bold text-uppercase">Full Name</th>
                <th className="small fw-bold text-uppercase">Designation</th>
                <th className="small fw-bold text-uppercase">Saudi Employer</th>
                <th className="small fw-bold text-uppercase">Iqama / ID No.</th>
                <th className="small fw-bold text-uppercase">Contract End</th>
                <th className="text-center small fw-bold text-uppercase">Status</th>
                <th className="text-center small fw-bold text-uppercase">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredWorkers.map(worker => (
                <tr key={worker.id} style={{ cursor: 'pointer' }}>
                  <td className="ps-4">
                    <div className="d-flex align-items-center">
                      <div className="rounded-circle bg-primary-subtle text-primary d-flex align-items-center justify-content-center fw-bold me-3" style={{ width: '40px', height: '40px', fontSize: '14px' }}>
                        {getInitials(worker.name)}
                      </div>
                      <span className="fw-bold text-dark">{worker.name}</span>
                    </div>
                  </td>
                  <td><span className="badge bg-light text-secondary border-0">{worker.job}</span></td>
                  <td className="fw-bold">{worker.principal}</td>
                  <td><code className="text-primary fw-bold">{worker.iqamaNo}</code></td>
                  <td>{worker.expiryDate}</td>
                  <td className="text-center">
                    <span className="badge rounded-pill px-3 py-2" style={getStatusStyle(worker.iqamaStatus)}>
                      {worker.iqamaStatus === 'Active' ? '● Active' : '⚠️ Expiring'}
                    </span>
                  </td>
                  <td className="text-center">
                    <button className="btn btn-sm btn-outline-primary border-2 fw-bold" style={{ borderRadius: '8px' }} onClick={() => setSelectedWorker(worker)}>
                      Open File
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* DETAIL MODAL - APPLICATION STYLE */}
      {selectedWorker && (
        <div className="modal-overlay-ph" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 5000, display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(5px)' }}>
          <div className="bg-white rounded-4 shadow-lg p-0 overflow-hidden animate-slide-up" style={{ width: '90%', maxWidth: '900px', border: 'none' }}>
            
            {/* Modal Header */}
            <div className="p-4 d-flex justify-content-between align-items-center" style={{ backgroundColor: '#0038a8', color: '#fff' }}>
              <div className="d-flex align-items-center">
                <div className="bg-white text-primary rounded p-2 me-3 fw-bold">{getInitials(selectedWorker.name)}</div>
                <h4 className="fw-bold mb-0">{selectedWorker.name} - Registry Details</h4>
              </div>
              <button className="btn text-white fs-4 border-0" onClick={() => setSelectedWorker(null)}>&times;</button>
            </div>

            {/* Modal Tabs */}
            <div className="d-flex bg-light border-bottom">
              <button className={`flex-grow-1 py-3 border-0 fw-bold ${activeTab === 'Documents' ? 'bg-white text-primary border-bottom border-primary border-3' : 'text-muted'}`} onClick={() => setActiveTab('Documents')}>📑 Documents</button>
              <button className={`flex-grow-1 py-3 border-0 fw-bold ${activeTab === 'Flights' ? 'bg-white text-primary border-bottom border-primary border-3' : 'text-muted'}`} onClick={() => setActiveTab('Flights')}>✈️ Flights & Passport</button>
            </div>

            <div className="p-4">
              {activeTab === 'Documents' ? (
                <div className="row g-4">
                  <div className="col-md-8">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h6 className="fw-bold text-dark mb-0 text-uppercase">Verified Document List</h6>
                        <select className="form-select form-select-sm w-auto">
                            <option>All Documents</option>
                            <option>Passport</option>
                            <option>Visa</option>
                        </select>
                    </div>
                    <table className="table table-sm table-bordered">
                      <thead className="table-light">
                        <tr><th>ID</th><th>Filename</th><th>Uploaded</th><th>Action</th></tr>
                      </thead>
                      <tbody>
                        <tr>
                            <td>01</td>
                            <td className="text-primary">{selectedWorker.passport}_scan.pdf</td>
                            <td>{selectedWorker.deploymentDate}</td>
                            <td><button className="btn btn-sm btn-light">👁️</button></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="col-md-4">
                    <div className="p-3 rounded border border-dashed text-center bg-light">
                        <div className="fs-1">☁️</div>
                        <p className="small text-muted">Drag documents here to upload to worker file</p>
                        <button className="btn btn-sm btn-primary">Select File</button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="row g-4">
                  <div className="col-md-6">
                    <h6 className="fw-bold text-primary text-uppercase small">Passport Details</h6>
                    <div className="mb-3">
                      <label className="text-muted x-small fw-bold">PASSPORT NUMBER</label>
                      <input type="text" className="form-control bg-light border-0" defaultValue={selectedWorker.passport} />
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <label className="text-muted x-small fw-bold">EXPIRY DATE</label>
                            <input type="date" className="form-control bg-light border-0" defaultValue={selectedWorker.passportExpiry} />
                        </div>
                        <div className="col-6">
                            <label className="text-muted x-small fw-bold">FLIGHT DATE</label>
                            <input type="text" className="form-control bg-light border-0" defaultValue={selectedWorker.deploymentDate} />
                        </div>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <h6 className="fw-bold text-primary text-uppercase small">KSA Representative & Emergency</h6>
                    <div className="mb-3">
                      <label className="text-muted x-small fw-bold">CONTACT PERSON (KSA)</label>
                      <input type="text" className="form-control bg-light border-0" defaultValue={selectedWorker.contactPerson} />
                    </div>
                    <div className="mb-3">
                      <label className="text-muted x-small fw-bold">EMERGENCY PHONE</label>
                      <input type="text" className="form-control bg-light border-0" defaultValue={selectedWorker.contactNumber} />
                    </div>
                    <div className="info-alert-box-gold p-2 small border-0" style={{ backgroundColor: '#fff8e1', borderRadius: '8px' }}>
                      ⚠️ Ensure all emergency numbers are verified before deployment.
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="p-4 bg-light d-flex justify-content-end gap-2 border-top">
              <button className="btn btn-white border px-4 fw-bold" onClick={() => setSelectedWorker(null)}>Cancel</button>
              <button className="btn btn-primary px-4 fw-bold shadow" onClick={() => setSelectedWorker(null)}>Update Registry</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployedView;