import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './adminDashboard.css';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

// --- APPLICANTS MODULE ---
const ApplicantsView = () => {
const [showDownloadModal, setShowDownloadModal] = useState(false);
const [isGenerating, setIsGenerating] = useState(false);

  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [formStep, setFormStep] = useState(1);
  const [refCode, setRefCode] = useState('REF-' + Math.random().toString(36).substr(2, 9).toUpperCase());
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedApplicant, setSelectedApplicant] = useState(null);

 const executeDownload = (applicant) => {
  setIsGenerating(true);
  
  // Create PDF
  const doc = new jsPDF();
  doc.setFillColor(0, 51, 102); 
  doc.rect(0, 0, 210, 40, 'F'); 
  doc.setFontSize(22);
  doc.setTextColor(255, 255, 255);
  doc.text('KALINGAGATE KSA', 14, 20);
  doc.text(`REFERENCE CODE: ${refCode}`, 14, 34);

  doc.autoTable({
    startY: 50,
    head: [['PERSONAL INFORMATION', '']],
    body: [
      ['Full Name:', applicant.name.toUpperCase()],
      ['Gender:', applicant.gender],
      ['Age:', applicant.age.toString()],
      ['Passport No:', applicant.passport || '---'],
      ['Contact:', applicant.contact],
      ['Email:', applicant.email],
    ],
    theme: 'plain',
    headStyles: { fillColor: [220, 53, 69] }
  });

  // Final Save
  doc.save(`${applicant.name.replace(/\s+/g, '_')}_Record.pdf`);
  
  // Close the popup after download
  setIsGenerating(false);
  setShowDownloadModal(false);
};

// Helper to open the popup
const handleDownloadClick = (applicant) => {
  setSelectedApplicant(applicant);
  setShowDownloadModal(true);

};

  const handleOpenAssign = (applicant) => {
    setSelectedApplicant(applicant);
    setShowAssignModal(true);
  };

  const generateNewCode = () => {
    setRefCode('REF-' + Math.random().toString(36).substr(2, 9).toUpperCase());
  };

  const closeAndReset = () => {
    setShowForm(false);
    setFormStep(1);
  };

  const applicantsData = [
    { id: 1, date: 'July 18, 2022', name: 'Harold Fernand', gender: 'Male', age: 27, contact: '09754680854', email: 'haroldfernand@gmail.com', passport: 'P8823412A' },
    { id: 2, date: 'February 06, 2022', name: 'Ike Gomez', gender: 'Male', age: 25, contact: '09123456789', email: 'ikegomez@gmail.com', passport: 'P1234567B' },
    { id: 3, date: 'November 22, 2021', name: 'Amber Diaz', gender: 'Female', age: 26, contact: '09754680855', email: 'amberdiaz@gmail.com', passport: 'P7654321C' },
    { id: 4, date: 'September 21, 2021', name: 'Doggy Dog', gender: 'Male', age: 27, contact: '09754680856', email: 'doggydog@gmail.com', passport: 'P9988776D' },
    { id: 5, date: 'May 15, 2021', name: 'Hannah Smith', gender: 'Female', age: 27, contact: '09754680857', email: 'hannahsmith@gmail.com', passport: 'P1122334E' },
  ];

  return (
    <div className="animate-fade-in">
      <div className="applicants-header-card mb-4">
        <div className="d-flex justify-content-between align-items-center">
          <h1 className="display-6 fw-bold m-0">Applicants</h1>
        </div>
        {/* --- DOWNLOAD CONFIRMATION POPUP --- */}
{showDownloadModal && (
  <div className="modal-overlay-ph" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.7)', zIndex: 3000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <div className="bg-white p-4 rounded shadow-lg text-center animate-slide-up" style={{ maxWidth: '400px', width: '90%' }}>
      <div className="mb-3" style={{ fontSize: '40px' }}>{isGenerating ? '⏳' : '📄'}</div>
      <h5 className="fw-bold text-dark">Export Applicant Record</h5>
      <p className="text-muted small">Prepare formal PDF for <strong>{selectedApplicant?.name}</strong>?</p>
      
      <div className="d-flex gap-2 justify-content-center mt-4">
        <button className="btn btn-light border px-4" onClick={() => setShowDownloadModal(false)} disabled={isGenerating}>Cancel</button>
        <button className="btn btn-ph-blue text-white px-4" onClick={() => executeDownload(selectedApplicant)} disabled={isGenerating}>
          {isGenerating ? 'Generating...' : 'Download PDF'}
        </button>
      </div>
    </div>
  </div>
)}
      </div>

      <div className="modern-card p-4 mb-4">
        <div className="row g-3 align-items-center">
          <div className="col-md-6 d-flex gap-2">
            <button className="btn btn-ph-red" onClick={() => setShowForm(true)}>➕ New Applicant</button>
            <button className="btn btn-ph-blue-outline" onClick={() => setShowForm(true)}>📋 Application Form</button>
          </div>
          <div className="col-md-6">
            <div className="search-group-ph">
              <span className="search-icon">🔍</span>
              <input type="text" className="form-control" placeholder="Search..." onChange={(e) => setSearchTerm(e.target.value)} />
            </div>
          </div>
        </div>
      </div>

      <div className="modern-card overflow-hidden">
        <div className="table-responsive">
          <table className="table table-hover m-0">
            <thead className="table-ph-blue">
              <tr>
                <th>Date Applied ▾</th>
                <th>Name</th>
                <th>Gender</th>
                <th>Age</th>
                <th>Primary Contact</th>
                <th>Email</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {applicantsData.filter(val => val.name.toLowerCase().includes(searchTerm.toLowerCase())).map((item, index) => (
                <tr key={index} className="align-middle">
                  <td className="text-muted small">{item.date}</td>
                  <td className="fw-bold">{item.name}</td>
                  <td>{item.gender}</td>
                  <td>{item.age}</td>
                  <td>{item.contact}</td>
                  <td className="text-primary small">{item.email}</td>
                  <td className="text-center">
                    <div className="d-flex justify-content-center gap-1">
                      <button className="btn action-btn-ph" title="Assign Employer" onClick={() => handleOpenAssign(item)}>🤝</button>
                      <button className="btn action-btn-ph" title="Download PDF" onClick={() => handleDownloadClick(item)}>📥</button>
                      <button className="btn action-btn-ph" title="Details">ℹ️</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- ASSIGN EMPLOYER POPUP --- */}
      {showAssignModal && (
        <div className="modal-overlay-ph">
          <div className="application-modal animate-slide-up" style={{ maxWidth: '500px' }}>
            <div className="p-4 bg-white rounded shadow-lg">
              <div className="d-flex justify-content-between align-items-center mb-3 border-bottom pb-2">
                <h5 className="fw-bold m-0 text-dark">Assign Employer</h5>
                <button className="btn-close" onClick={() => setShowAssignModal(false)}></button>
              </div>

              <p className="small text-muted mb-4">
                Deployment details for: <strong className="text-primary">{selectedApplicant?.name}</strong>
              </p>

              <div className="mb-3 text-start">
                <label className="form-label-ph fw-bold" style={{ fontSize: '11px' }}>SELECT COMPANY / EMPLOYER</label>
                <select className="form-select-ph w-100">
                  <option selected disabled>Choose from active records...</option>
                  <option>Saudi Aramco</option>
                  <option>Al-Futtaim Group</option>
                  <option>Binladen Group</option>
                </select>
              </div>

              <div className="row mb-3">
                <div className="col-6 text-start">
                  <label className="form-label-ph fw-bold" style={{ fontSize: '11px' }}>ASSIGNED POSITION</label>
                  <input type="text" className="form-control-ph" placeholder="e.g. Lead Pipefitter" />
                </div>
                <div className="col-6 text-start">
                  <label className="form-label-ph fw-bold" style={{ fontSize: '11px' }}>MONTHLY SALARY (SR)</label>
                  <input type="number" className="form-control-ph" placeholder="e.g. 2500" />
                </div>
              </div>

              <div className="mb-4 text-start">
                <label className="form-label-ph fw-bold" style={{ fontSize: '11px' }}>DEPLOYMENT CITY</label>
                <select className="form-select-ph w-100">
                  <option>Riyadh</option>
                  <option>Jeddah</option>
                  <option>Dammam</option>
                  <option>Al Khobar</option>
                </select>
              </div>

              <div className="d-flex gap-2 justify-content-end mt-4">
                <button className="btn btn-light border px-4 py-2" onClick={() => setShowAssignModal(false)}>Cancel</button>
                <button className="btn btn-ph-blue px-4 py-2 fw-bold text-white shadow-sm" onClick={() => {
                  alert('Employment record updated successfully!');
                  setShowAssignModal(false);
                }}>
                  Confirm Assignment
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- APPLICATION FORM MODAL --- */}
      {showForm && (
        <div className="modal-overlay-ph">
          <div className="application-modal animate-slide-up">
            <div className="modal-header-container d-flex justify-content-between align-items-center p-3 border-bottom bg-white sticky-top rounded-top">
              <div className="d-flex align-items-center gap-3">
                <div className="ph-logo-circle bg-dark text-white d-flex align-items-center justify-content-center" style={{ width: '45px', height: '45px', borderRadius: '12px' }}>
                  <span style={{ fontSize: '24px' }}>🦅</span>
                </div>
                <div>
                  <h5 className="m-0 fw-bold text-dark letter-spacing-1">KALINGAGATE <span className="text-primary">KSA</span></h5>
                  <small className="text-muted text-uppercase fw-bold" style={{ fontSize: '10px' }}>Overseas Recruitment Portal</small>
                </div>
              </div>
              <div className="d-flex gap-2">
                <button className="btn btn-sm btn-outline-secondary px-3" onClick={() => window.print()}>Print Form</button>
                <button className="btn btn-sm btn-light border fw-bold px-3" onClick={closeAndReset}>✕ Close</button>
              </div>
            </div>

            <div className="px-4 py-3 bg-light border-bottom">
              <h2 className="fw-bold text-dark mb-1">Application Form</h2>
              <p className="text-muted small m-0">Complete the profile below to proceed with the recruitment process. (Step {formStep} of 2)</p>
            </div>

            <div className="modal-body-ph p-4 scroll-form">
              <form className="row g-0 application-container-box shadow-sm border rounded bg-white">
                <div className="col-12">
                  <div className="form-section-header-red py-2 px-4 text-white fw-bold">
                    <span className="me-2">📋</span> {formStep === 1 ? 'ACCOUNT INFORMATION' : 'SKILLS & EXPERIENCE'}
                  </div>
                </div>

                <div className="p-4 row g-3">
                  {formStep === 1 ? (
                    <>
                      {/* LEFT COLUMN */}
                      <div className="col-md-4 border-end pe-4">
                        <label className="form-label-ph">Position Selected</label>
                        <select className="form-select-ph w-100 mb-3">
                          <option selected disabled>Choose position...</option>
                          <option>General Labor</option>
                          <option>Skilled Technician</option>
                          <option>Domestic Worker</option>
                          <option>Healthcare Staff</option>
                        </select>

                        <div className="d-flex align-items-end gap-2 mb-3">
                          <div className="flex-grow-1">
                            <label className="form-label-ph">System Reference Code</label>
                            <input type="text" className="form-control-ph bg-light fw-bold text-primary" value={refCode} readOnly />
                          </div>
                          <button type="button" className="btn btn-gold-ph btn-sm px-3 py-2" onClick={generateNewCode}>Generate</button>
                        </div>

                        <label className="form-label-ph">Full Name</label>
                        <input type="text" className="form-control-ph mb-3" placeholder="First Middle Last" />

                        <label className="form-label-ph">Permanent Address</label>
                        <textarea className="form-control-ph mb-3" rows="2" placeholder="Street, City, Province, Zip"></textarea>

                        <label className="form-label-ph">Date of Birth</label>
                        <input type="date" className="form-control-ph mb-3" />

                        <label className="form-label-ph">Place of Birth</label>
                        <input type="text" className="form-control-ph mb-3" placeholder="City or Province" />

                        <label className="form-label-ph">Contact Number</label>
                        <input type="tel" className="form-control-ph mb-3" placeholder="09XX XXX XXXX" />

                        <div className="row g-2">
                          <div className="col-6">
                            <label className="form-label-ph">Gender</label>
                            <select className="form-select-ph w-100"><option>Male</option><option>Female</option></select>
                          </div>
                          <div className="col-6">
                            <label className="form-label-ph">Religion</label>
                            <select className="form-select-ph w-100"><option>Catholic</option><option>Islam</option><option>Other</option></select>
                          </div>
                        </div>
                      </div>

                      {/* MIDDLE COLUMN */}
                      <div className="col-md-4 border-end px-4">
                        <label className="form-label-ph">Passport Number</label>
                        <input type="text" className="form-control-ph mb-3" placeholder="P0000000A" />

                        <label className="form-label-ph">Place of Issue</label>
                        <input type="text" className="form-control-ph mb-3" placeholder="DFA Office Location" />

                        <label className="form-label-ph">Date of Expiry</label>
                        <input type="date" className="form-control-ph mb-3" />

                        <label className="form-label-ph">College / University</label>
                        <input type="text" className="form-control-ph mb-3" placeholder="Name of Institution" />

                        <label className="form-label-ph">High School</label>
                        <input type="text" className="form-control-ph mb-3" placeholder="Name of Institution" />

                        <label className="form-label-ph">Vocational / TESDA</label>
                        <input type="text" className="form-control-ph mb-3" placeholder="Course Title" />

                        <div className="mb-3">
                          <label className="form-label-ph">Civil Status</label>
                          <select className="form-select-ph w-100">
                            <option>Single</option>
                            <option>Married</option>
                            <option>Widowed</option>
                            <option>Separated</option>
                          </select>
                        </div>

                        <div className="row g-2">
                          <div className="col-6">
                            <label className="form-label-ph">Height (cm)</label>
                            <input type="number" className="form-control-ph" placeholder="170" />
                          </div>
                          <div className="col-6">
                            <label className="form-label-ph">Weight (kg)</label>
                            <input type="number" className="form-control-ph" placeholder="65" />
                          </div>
                        </div>
                      </div>

                      {/* RIGHT COLUMN */}
                      <div className="col-md-4 ps-4 d-flex flex-column">
                        <label className="form-label-ph">Expected Deployment Date</label>
                        <input type="date" className="form-control-ph mb-3" />

                        <label className="form-label-ph">Application Date</label>
                        <input type="date" className="form-control-ph mb-3" defaultValue={new Date().toISOString().split('T')[0]} />

                        <label className="form-label-ph">Initial Career Notes</label>
                        <textarea
                          className="form-control-ph w-100 mb-4 flex-grow-1"
                          placeholder="General observations..."
                          style={{ resize: 'none', minHeight: '200px' }}
                        ></textarea>

                        <div className="mt-auto d-flex justify-content-end gap-2 pb-2 pt-3 border-top">
                          <button type="button" className="btn btn-outline-secondary px-4 py-2" onClick={closeAndReset}>Cancel</button>
                          <button type="button" className="btn btn-primary px-5 py-2 fw-bold shadow-sm" onClick={() => setFormStep(2)}>
                            NEXT STEP →
                          </button>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      {/* PAGE 2 */}
                      <div className="col-md-4 border-end pe-4">
                        <label className="form-label-ph">Applicant Face Photo</label>
                        <div className="photo-upload-placeholder border rounded p-4 text-center bg-light mb-3">
                          <div style={{ fontSize: '40px' }}>📸</div>
                          <input type="file" className="form-control form-control-sm mt-2" />
                          <small className="text-muted d-block mt-1">Upload JPG or PNG (Max 2MB)</small>
                        </div>
                        <label className="form-label-ph">Languages Spoken</label>
                        <textarea className="form-control-ph mb-3" rows="3" placeholder="e.g. English, Arabic, Tagalog"></textarea>
                      </div>

                      <div className="col-md-4 border-end px-4">
                        <label className="form-label-ph">Detailed Work History</label>
                        <textarea className="form-control-ph mb-3" rows="10" placeholder="Year | Company | Position | Country"></textarea>
                        <label className="form-label-ph">Specialized Skills</label>
                        <input type="text" className="form-control-ph" placeholder="Driving, Cooking, Medical, etc." />
                      </div>

                      <div className="col-md-4 ps-4 d-flex flex-column">
                        <label className="form-label-ph">Formal Objective</label>
                        <textarea
                          className="form-control-ph w-100 mb-4 flex-grow-1"
                          placeholder="Describe the applicant's professional goals..."
                          style={{ resize: 'none', minHeight: '200px' }}
                        ></textarea>

                        <div className="mt-auto d-flex justify-content-end gap-2 pb-2 pt-3 border-top">
                          <button type="button" className="btn btn-outline-secondary px-4 py-2" onClick={() => setFormStep(1)}>Back</button>
                          <button type="submit" className="btn btn-success px-5 py-2 fw-bold text-white shadow-sm border-0">
                            SAVE APPLICATION
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// --- MAIN DASHBOARD COMPONENT ---
const AdminDashboard = () => {
  const [activePage, setActivePage] = useState('Dashboard');
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const pht = {
    time: currentTime.toLocaleTimeString('en-US', { hour12: true, timeZone: 'Asia/Manila' }),
    date: currentTime.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'Asia/Manila' })
  };

  const renderContent = () => {
    switch (activePage) {
      case 'Dashboard':
        return (
          <div className="animate-fade-in dashboard-viewport">
            <div className="d-flex justify-content-between align-items-end mb-4">
              <div>
                <h1 className="h3 fw-bold m-0 text-dark">KSA Operations Overview</h1>
                <p className="text-muted small m-0">Monitoring deployment and welfare for Saudi Arabia operations.</p>
              </div>
              <span className="badge-ph-blue">System Online</span>
            </div>

            <div className="stats-grid mb-4">
              <div className="stat-box blue-border">
                <div className="stat-info"><small>TOTAL APPLICANTS</small><h2>432</h2></div>
                <div className="stat-icon bg-light-blue">📝</div>
              </div>
              <div className="stat-box yellow-border">
                <div className="stat-info"><small>CURRENTLY EMPLOYED</small><h2>1,102</h2></div>
                <div className="stat-icon bg-light-yellow">💼</div>
              </div>
              <div className="stat-box red-border">
                <div className="stat-info"><small>PENDING REPORTS</small><h2 className="text-danger">08</h2></div>
                <div className="stat-icon bg-light-red">🚨</div>
              </div>
              <div className="stat-box blue-border">
                <div className="stat-info"><small>ACTIVE AGENCIES</small><h2>12</h2></div>
                <div className="stat-icon bg-light-blue">🏛️</div>
              </div>
            </div>

            <div className="row g-4">
              <div className="col-lg-8">
                <div className="modern-card h-100">
                  <div className="card-header-ph d-flex justify-content-between align-items-center">
                    <span>Recent Deployment Activity</span>
                    <button className="btn btn-sm btn-outline-primary py-0" style={{ fontSize: '11px' }}>View All</button>
                  </div>
                  <div className="p-0">
                    <div className="activity-item-new border-bottom">
                      <div className="activity-icon blue">✈️</div>
                      <div className="activity-details"><p className="m-0 fw-bold small">Juan Dela Cruz</p><small className="text-muted">Verified for Deployment to Riyadh</small></div>
                      <div className="activity-time text-end"><small>2 mins ago</small></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="clock-card-ph h-100 d-flex flex-column justify-content-center text-center">
                  <small className="fw-bold opacity-75 mb-2">MANILA (PHT)</small>
                  <h1 className="display-5 fw-bold mb-1">{pht.time}</h1>
                  <p className="m-0 small opacity-75">{pht.date}</p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'Applicants': return <ApplicantsView />;
      default: return <div className="p-5 text-center"><h2>{activePage} Module</h2></div>;
    }
  };

  return (
    <div className="admin-wrapper d-flex vw-100 vh-100 bg-light">
      <aside className="sidebar-ph shadow">
        <div className="sidebar-brand-ph">
          <div className="flag-accent"></div>
          <h2 className="logo-text-ph">KalingaGate <span className="ksa-tag">KSA</span></h2>
        </div>
        <nav className="nav-list-ph">
          <small className="nav-section-label">MANAGEMENT</small>
          <button onClick={() => setActivePage('Dashboard')} className={`nav-item-ph ${activePage === 'Dashboard' ? 'active' : ''}`}><span>📊</span> Dashboard</button>
          <button onClick={() => setActivePage('Applicants')} className={`nav-item-ph ${activePage === 'Applicants' ? 'active' : ''}`}><span>📝</span> Applicants</button>
          <button onClick={() => setActivePage('Employed')} className={`nav-item-ph ${activePage === 'Employed' ? 'active' : ''}`}><span>💼</span> Employed</button>
          <button onClick={() => setActivePage('Employers')} className={`nav-item-ph ${activePage === 'Employers' ? 'active' : ''}`}><span>🏢</span> Employers</button>
          <button onClick={() => setActivePage('Co-Host')} className={`nav-item-ph ${activePage === 'Co-Host' ? 'active' : ''}`}><span>🤝</span> Co-Host</button>
          <button onClick={() => setActivePage('Reports')} className={`nav-item-ph ${activePage === 'Reports' ? 'active' : ''}`}><span>📋</span> Reports</button>
          <button onClick={() => setActivePage('Vouchers')} className={`nav-item-ph ${activePage === 'Vouchers' ? 'active' : ''}`}><span>🎟️</span> Vouchers</button>
          <button onClick={() => setActivePage('Agency')} className={`nav-item-ph ${activePage === 'Agency' ? 'active' : ''}`}><span>🏛️</span> Agency</button>
          <div className="mt-auto pb-3">
            <button className="nav-item-ph logout-btn" onClick={() => window.location.reload()}><span>⬅️</span> Log Out</button>
          </div>
        </nav>
      </aside>

      <main className="main-content-ph flex-grow-1 d-flex flex-column overflow-hidden">
        <header className="header-ph px-4 border-bottom bg-white d-flex justify-content-between align-items-center">
          <h5 className="m-0 fw-bold text-dark">{activePage}</h5>
          <div className="user-profile-ph d-flex align-items-center gap-3">
            <div className="user-text text-end d-none d-md-block">
              <p className="m-0 fw-bold small">Admin Martha</p>
              <small className="text-success" style={{ fontSize: '10px' }}>● Super Admin</small>
            </div>
            <div className="avatar-ph">AM</div>
          </div>
        </header>
        <div className="scroll-area-ph p-4">{renderContent()}</div>
      </main>
    </div>
  );
};

export default AdminDashboard;