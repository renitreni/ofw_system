import React, { useState } from 'react';

const EmployersView = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEmployer, setSelectedEmployer] = useState(null);
  const [showEmployerForm, setShowEmployerForm] = useState(false);

  const phColors = {
    blue: '#0038a8',
    red: '#ce1126',
    gold: '#fcd116',
    lightBlue: '#e6ebf5',
    success: '#198754' 
  };

  const [employers] = useState([
    { 
      id: 1, 
      name: "Saudi Aramco", 
      industry: "Energy & Infrastructure", 
      location: "Dhahran", 
      marketShare: "45%", 
      status: "Active",
      activeJobs: 15,
      totalDeployed: 450,
      growth: "+12%"
    },
    { 
      id: 2, 
      name: "King Fahad Medical City", 
      industry: "Healthcare", 
      location: "Riyadh", 
      marketShare: "15%", 
      status: "Active",
      activeJobs: 8,
      totalDeployed: 120,
      growth: "+5%"
    }
  ]);

  const getInitials = (name) => name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();

  const filteredEmployers = employers.filter(emp =>
    emp.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="view-container animate-fade-in p-2">
      {/* HEADER SECTION */}
      <div className="d-flex justify-content-between align-items-center mb-4 p-3 bg-white shadow-sm" style={{ borderRadius: '15px', borderLeft: '6px solid #0038a8' }}>
        <div>
          <h2 className="fw-bold mb-0" style={{ color: '#0038a8' }}>Employer & Client Portfolio</h2>
          <p className="text-muted mb-0 small">Analysis of Partner Employers and Regional Market Presence</p>
        </div>
      </div>

      {/* SUCCESS METRICS */}
      <div className="row g-4 mb-4 text-center">
        {[
          { label: 'PARTNER EMPLOYERS', val: '12', color: phColors.blue },
          { label: 'TOTAL MARKET REACH', val: '60%', color: phColors.red },
          { label: 'ACTIVE JOB VACANCIES', val: '23', color: '#b8860b' },
          { label: 'AVG. GROWTH RATE', val: '+8.5%', color: '#0dcaf0' }
        ].map((stat, i) => (
          <div className="col-md-3" key={i}>
            <div className="modern-card p-3 bg-white shadow-sm border-0 h-100" 
                 style={{ borderTop: `4px solid ${stat.color}`, borderRadius: '12px' }}>
              <h6 className="text-muted x-small fw-bold mb-2">{stat.label}</h6>
              <h2 className="fw-black m-0" style={{ color: stat.color }}>{stat.val}</h2>
            </div>
          </div>
        ))}
      </div>

      {/* ACTION BAR */}
      <div className="d-flex justify-content-between mb-4 align-items-center">
        <div className="search-wrapper w-50">
          <div className="input-group bg-white shadow-sm rounded-pill overflow-hidden px-3 border">
            <span className="input-group-text bg-transparent border-0 text-muted">🔍</span>
            <input 
              type="text" 
              className="form-control border-0 bg-transparent shadow-none"
              placeholder="Filter by Name or Region..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <button 
          className="btn shadow-sm fw-bold px-4 rounded-pill" 
          style={{ backgroundColor: '#f0f4ff', color: phColors.blue, border: '1px solid #dbeafe' }}
          onClick={() => setShowEmployerForm(true)}
        >
          ➕ Register Employer
        </button>
      </div>

      {/* DATA TABLE */}
      <div className="modern-card bg-white shadow-sm overflow-hidden border-0" style={{ borderRadius: '15px' }}>
        <div className="table-responsive">
          <table className="table table-hover align-middle m-0">
            <thead className="small fw-bold text-white" style={{ backgroundColor: phColors.blue }}>
              <tr>
                <th className="ps-4 py-3">EMPLOYER ENTITY</th>
                <th>SECTOR</th>
                <th>HQ LOCATION</th>
                <th>DEPLOYMENT</th>
                <th>GROWTH</th>
                <th>STATUS</th>
                <th className="text-center">ANALYSIS</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployers.map(emp => (
                <tr key={emp.id} className="employer-table-row">
                  <td className="ps-4 py-3">
                    <div className="d-flex align-items-center">
                      <div className="company-avatar me-3 text-white d-flex align-items-center justify-content-center fw-bold" 
                           style={{ backgroundColor: phColors.blue, width: '40px', height: '40px', borderRadius: '10px' }}>
                        {getInitials(emp.name)}
                      </div>
                      <div>
                        <div className="fw-bold text-dark">{emp.name}</div>
                        <small className="text-muted" style={{fontSize: '10px'}}>KSA-ID: {emp.id}0029</small>
                      </div>
                    </div>
                  </td>
                  <td><span className="badge bg-light text-primary border-0 px-3 py-2 rounded-pill small">{emp.industry}</span></td>
                  <td><i className="bi bi-geo-alt me-1"></i>{emp.location}, KSA</td>
                  <td className="fw-bold" style={{ color: phColors.blue }}>{emp.totalDeployed}</td>
                  <td className="fw-bold" style={{ color: phColors.red }}>{emp.growth}</td>
                  <td>
                    <span className="badge bg-success-subtle text-success px-3 py-2 rounded-pill">
                      ● {emp.status}
                    </span>
                  </td>
                  <td className="text-center">
                    <button className="btn btn-sm btn-outline-dark rounded-pill px-3 border-2 fw-bold" onClick={() => setSelectedEmployer(emp)}>
                      Insights
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {}
      {showEmployerForm && (
        <div className="modal-overlay d-flex align-items-center justify-content-center" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 3000, padding: '20px' }}>
          <div className="modern-card bg-white shadow-lg p-0 border-0 overflow-hidden animate-slide-up d-flex flex-column" style={{ width: '850px', maxHeight: '90vh', borderRadius: '20px' }}>
            
            {}
            <div className="p-4 d-flex justify-content-between text-white flex-shrink-0" style={{ backgroundColor: phColors.blue }}>
              <div className="d-flex align-items-center gap-2">
                <span className="fs-4">🏢</span>
                <h4 className="m-0 fw-bold">New Employer Registration</h4>
              </div>
              <button className="btn text-white p-0 fs-4" onClick={() => setShowEmployerForm(false)}>&times;</button>
            </div>
            
            {}
            <div className="p-4 overflow-auto" style={{ backgroundColor: '#f8fbff', flexGrow: 1 }}>
                <form className="row g-3 bg-white p-4 rounded-4 shadow-sm border">
                    <div className="col-md-6">
                        <label className="small fw-bold text-muted mb-1">Company Legal Name</label>
                        <input type="text" className="form-control rounded-3 border-light bg-light py-2" placeholder="e.g. Saudi Aramco" />
                    </div>
                    <div className="col-md-6">
                        <label className="small fw-bold text-muted mb-1">Business Type</label>
                        <select className="form-select rounded-3 border-light bg-light py-2">
                            <option>Private Corporation</option>
                            <option>Government / Semi-Gov</option>
                            <option>Foreign Principal</option>
                            <option>Recruitment Agency Partner</option>
                        </select>
                    </div>

                    <div className="col-md-6">
                        <label className="small fw-bold text-muted mb-1">Industry Sector</label>
                        <select className="form-select rounded-3 border-light bg-light py-2">
                            <option>Healthcare</option>
                            <option>Construction & Engineering</option>
                            <option>Oil & Gas</option>
                            <option>Hospitality</option>
                            <option>IT & Digital Services</option>
                        </select>
                    </div>
                    <div className="col-md-6">
                        <label className="small fw-bold text-muted mb-1">CR Number / National ID</label>
                        <input type="text" className="form-control rounded-3 border-light bg-light py-2" placeholder="CR-1010XXXXXX" />
                    </div>

                    <div className="col-md-6">
                        <label className="small fw-bold text-muted mb-1">Primary Contact Email</label>
                        <input type="email" className="form-control rounded-3 border-light bg-light py-2" placeholder="hr@company.sa" />
                    </div>
                    <div className="col-md-6">
                        <label className="small fw-bold text-muted mb-1">Website / LinkedIn Profile</label>
                        <input type="text" className="form-control rounded-3 border-light bg-light py-2" placeholder="https://www.linkedin.com/company/..." />
                    </div>

                    <div className="col-12">
                        <label className="small fw-bold text-muted mb-1">Regional Office Address</label>
                        <textarea className="form-control rounded-3 border-light bg-light" rows="3" placeholder="Building, Street, City, KSA"></textarea>
                    </div>

                    {/* Added more fields to test scroll */}
                    <div className="col-md-6">
                        <label className="small fw-bold text-muted mb-1">Point of Contact Person</label>
                        <input type="text" className="form-control rounded-3 border-light bg-light py-2" placeholder="Full Name" />
                    </div>
                    <div className="col-md-6">
                        <label className="small fw-bold text-muted mb-1">POC Contact Number</label>
                        <input type="text" className="form-control rounded-3 border-light bg-light py-2" placeholder="+966..." />
                    </div>
                </form>

                <div className="mt-3 p-3 rounded-3 d-flex align-items-center gap-3" style={{ backgroundColor: '#fff9db', borderLeft: `5px solid ${phColors.gold}` }}>
                    <span className="fs-5">⚠️</span>
                    <div>
                      <small className="fw-bold text-dark d-block">DMW Protocol Alert:</small> 
                      <small className="text-muted">Documentary verification of Commercial Registration (CR) is required prior to job order validation.</small>
                    </div>
                </div>
            </div>

            {/* FIXED FOOTER */}
            <div className="p-4 bg-white border-top d-flex justify-content-between align-items-center px-4 flex-shrink-0">
              <p className="text-muted small m-0 italic d-none d-md-block">* Ensure all data matches official KSA records.</p>
              <div className="d-flex gap-2">
                <button className="btn btn-link text-muted fw-bold text-decoration-none" onClick={() => setShowEmployerForm(false)}>Cancel</button>
                <button 
                  className="btn text-white fw-bold px-5 rounded-pill shadow-sm" 
                  style={{ backgroundColor: phColors.success }}
                  onClick={(e) => { e.preventDefault(); alert('Employer Data Submitted'); setShowEmployerForm(false); }}
                >
                  Submit Registration
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ANALYSIS MODAL (Insights) */}
      {selectedEmployer && (
        <div className="modal-overlay d-flex align-items-center justify-content-center" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 3000 }}>
          <div className="modern-card bg-white shadow-lg overflow-hidden animate-pop-in" style={{ width: '500px', borderRadius: '20px' }}>
            <div className="p-4 text-white d-flex align-items-center" style={{ backgroundColor: phColors.blue }}>
              <div className="company-avatar bg-white text-primary me-3 d-flex align-items-center justify-content-center fw-bold" style={{width: '45px', height: '45px', borderRadius: '12px', color: phColors.blue}}>
                {getInitials(selectedEmployer.name)}
              </div>
              <h5 className="m-0 fw-bold">{selectedEmployer.name} Insights</h5>
            </div>
            <div className="p-4">
              <div className="row text-center mb-4">
                 <div className="col-6 border-end">
                    <h6 className="small text-muted fw-bold">MARKET SHARE</h6>
                    <h4 className="fw-bold" style={{color: phColors.red}}>{selectedEmployer.marketShare}</h4>
                 </div>
                 <div className="col-6">
                    <h6 className="small text-muted fw-bold">ACTIVE JOBS</h6>
                    <h4 className="fw-bold text-dark">{selectedEmployer.activeJobs}</h4>
                 </div>
              </div>
              
              <h6 className="fw-bold small mb-2 text-uppercase text-muted">Labor Deployment Distribution</h6>
              <div className="progress rounded-pill mb-2" style={{ height: '15px' }}>
                <div className="progress-bar" style={{ width: '75%', backgroundColor: phColors.blue }}>Skilled (75%)</div>
                <div className="progress-bar" style={{ width: '25%', backgroundColor: phColors.gold }}>General (25%)</div>
              </div>
            </div>
            <div className="p-3 bg-light text-center">
              <button className="btn btn-dark btn-sm rounded-pill px-4" onClick={() => setSelectedEmployer(null)}>Close Insight</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployersView;