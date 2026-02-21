import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

import './adminDashboard.css';
import EmployedView from './EmployedView';
import EmployersView from './EmployersView';
import CoHostView from './CoHostView';
import ReportsView from './ReportsView';
import VouchersView from './VouchersView';
import AgencyView from './AgencyView';
import LogOutView from './LogOutView';

// --- APPLICANTS MODULE ---
const ApplicantsView = () => {
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [activeTab, setActiveTab] = useState('Documents');

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

    doc.save(`${applicant.name.replace(/\s+/g, '_')}_Record.pdf`);

    setIsGenerating(false);
    setShowDownloadModal(false);
  };

  const handleDownloadClick = (applicant) => {
    setSelectedApplicant(applicant);
    setShowDownloadModal(true);
  };

  const handleOpenAssign = (applicant) => {
    setSelectedApplicant(applicant);
    setShowAssignModal(true);
  };

  const handleOpenDetails = (applicant) => {
    setSelectedApplicant(applicant);
    setShowDetailsModal(true);
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

      <div className="d-flex justify-content-between align-items-center mb-4 p-3 bg-white shadow-sm" style={{ borderRadius: '15px', borderLeft: '6px solid #0038a8' }}>
       <div>
          <h2 className="fw-bold mb-1" style={{ color: '#0038a8' }}>Applicant Pipeline</h2>
          <p className="text-muted mb-0 small">
            Tracking <span className="fw-bold text-primary">432 Active Candidates</span> through the recruitment and visa funnel.
          </p>
        </div>
        <div className="d-flex gap-2">
                  <button className="btn btn-ph-blue-outline" onClick={() => setShowForm(true)}>📋 Application Form</button>
        </div>
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

         {/* QUICK STATS CARDS - Enhanced with better icons & borders */}
      <div className="row g-3 mb-4">
        <div className="col-md-4">
          <div className="card p-3 shadow-sm border-0" style={{ borderRadius: '15px', borderTop: '4px solid #0038a8' }}>
            <span className="text-muted small fw-bold">TOTAL APPLIED</span>
            <h2 className="fw-bold mt-1" style={{ color: '#0038a8' }}>156</h2>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card p-3 shadow-sm border-0" style={{ borderRadius: '15px', borderTop: '4px solid #ffc107' }}>
            <span className="text-muted small fw-bold text-uppercase">Medical & Screening</span>
            <h2 className="fw-bold mt-1 text-warning">24</h2>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card p-3 shadow-sm border-0" style={{ borderRadius: '15px', borderTop: '4px solid #198754' }}>
            <span className="text-muted small fw-bold text-uppercase">Ready for Deployment</span>
            <h2 className="fw-bold mt-1 text-success">12</h2>
          </div>
        </div>
      </div>
        
     {/* SEARCH SECTION - BUTTON REMOVED, SEARCH MOVED RIGHT */}
      <div className="modern-card p-4 mb-4">
         <div className="search-group-ph border-0 bg-light px-3 py-2 rounded-pill d-flex align-items-center w-50">
          <span className="me-2 text-muted">🔍</span>
          <input 
            type="text" 
            className="form-control border-0 bg-transparent shadow-none" 
            placeholder="Search Worker Name..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
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
                      <button className="btn action-btn-ph" title="Details" onClick={() => handleOpenDetails(item)}>ℹ️</button>
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
        <div className="modal-overlay-ph" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 3000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className="bg-white p-4 shadow-lg border-0 animate-fade-in" style={{ borderRadius: '20px', width: '100%', maxWidth: '450px' }}>
            <div className="d-flex align-items-center gap-3 mb-4">
              <div className="rounded-circle d-flex align-items-center justify-content-center shadow-sm"
                style={{ width: '60px', height: '60px', background: 'linear-gradient(135deg, #0038a8 50%, #ce1126 50%)' }}>
                <span style={{ fontSize: '24px', filter: 'drop-shadow(0px 0px 2px rgba(255,255,255,0.8))' }}>👥</span>
              </div>
              <h4 className="m-0 fw-bold" style={{ fontSize: '1.4rem', color: '#0038a8' }}>
                Assign an Employer for <span style={{ color: '#ce1126' }}>{selectedApplicant?.name}</span>
              </h4>
            </div>

            <div className="mb-4">
              <select className="form-select custom-input-ph py-2 px-3 shadow-sm border-0" style={{ backgroundColor: '#f8f9fa' }}>
                <option>Not Assigned</option>
                <option>Saudi Aramco</option>
                <option>Al-Futtaim Group</option>
              </select>
            </div>

            <div className="row g-3 mb-5">
              <div className="col-6">
                <label className="form-label text-muted small ms-1 fw-bold">Position Selected</label>
                <select className="form-select custom-input-ph py-2 shadow-sm border-0" style={{ backgroundColor: '#f8f9fa' }}>
                  <option>Select</option>
                  <option>Technician</option>
                  <option>Engineer</option>
                </select>
              </div>
              <div className="col-6">
                <label className="form-label text-muted small ms-1 fw-bold">Salary</label>
                <select className="form-select custom-input-ph py-2 shadow-sm border-0" style={{ backgroundColor: '#f8f9fa' }}>
                  <option>Select</option>
                  <option>SR 3,000</option>
                  <option>SR 5,000</option>
                </select>
              </div>
            </div>

            <div className="d-flex gap-3 justify-content-center">
              <button className="btn btn-light border shadow-sm px-5 py-2 fw-bold" style={{ borderRadius: '10px', color: '#6c757d' }} onClick={() => setShowAssignModal(false)}>Cancel</button>
              <button className="btn px-5 py-2 fw-bold shadow-sm text-white" style={{ borderRadius: '10px', backgroundColor: '#0038a8', borderBottom: '4px solid #fcd116' }} onClick={() => { alert('Employment record updated successfully!'); setShowAssignModal(false); }}>Assign</button>
            </div>
          </div>
        </div>
      )}

      {/* --- OTHER DETAILS MODAL --- */}
      {showDetailsModal && (
        <div className="modal-overlay-ph" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 3000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className="bg-white shadow-lg border-0" style={{ borderRadius: '25px', width: '95%', maxWidth: '850px', overflow: 'hidden' }}>
            
            <div className="p-4 d-flex align-items-center gap-3">
              <div className="rounded-circle d-flex align-items-center justify-content-center shadow-sm" style={{ width: '50px', height: '50px', border: '3px solid #0038a8', color: '#6c757d' }}>
                <span className="fw-bold" style={{ fontSize: '20px' }}>i</span>
              </div>
              <h4 className="m-0 fw-bold text-secondary">Other Details - {selectedApplicant?.name}</h4>
            </div>

            <div className="px-4 d-flex gap-2">
              <button 
                className={`btn px-5 py-2 fw-bold border-0 transition-all`}
                style={{ 
                  backgroundColor: activeTab === 'Documents' ? '#0038a8' : '#f8f9fa', 
                  color: activeTab === 'Documents' ? 'white' : '#6c757d',
                  borderBottom: activeTab === 'Documents' ? '4px solid #fcd116' : 'none',
                  borderRadius: '15px 15px 0 0'
                }}
                onClick={() => setActiveTab('Documents')}
              >
                Documents
              </button>
              <button 
                className={`btn px-5 py-2 fw-bold border-0 transition-all`}
                style={{ 
                  backgroundColor: activeTab === 'Flights' ? '#0038a8' : '#f8f9fa', 
                  color: activeTab === 'Flights' ? 'white' : '#6c757d',
                  borderBottom: activeTab === 'Flights' ? '4px solid #fcd116' : 'none',
                  borderRadius: '15px 15px 0 0'
                }}
                onClick={() => setActiveTab('Flights')}
              >
                Flights
              </button>
            </div>

            <div className="m-3 p-4 bg-light shadow-inner" style={{ borderRadius: '20px', border: '1px solid #dee2e6' }}>
              <div className="row g-4">
                <div className="col-md-7">
                  {activeTab === 'Flights' ? (
                    <div className="row g-3">
                      <div className="col-6">
                        <label className="form-label small fw-bold text-muted">Abroad Agency (Co-Host)</label>
                        <select className="form-select border-0 shadow-sm py-2"><option>Passport</option><option>Agency Alpha</option></select>
                      </div>
                      <div className="col-6">
                        <label className="form-label small fw-bold text-muted">File</label>
                        <div className="input-group shadow-sm rounded-3 overflow-hidden">
                          <input type="text" className="form-control border-0 bg-white" placeholder="Attach File" readOnly />
                          <button className="btn btn-secondary border-0">📑</button>
                        </div>
                      </div>
                      <div className="col-6">
                        <label className="form-label small fw-bold text-muted">Contact Person</label>
                        <input type="text" className="form-control border-0 shadow-sm py-2" placeholder="Name" />
                      </div>
                      <div className="col-6">
                        <label className="form-label small fw-bold text-muted">Contact Number</label>
                        <input type="text" className="form-control border-0 shadow-sm py-2" placeholder="Number" />
                      </div>
                      
                      <div className="mt-4 d-flex justify-content-between align-items-center">
                        <input type="text" className="form-control border-0 shadow-sm rounded-pill px-4 w-50" placeholder="Search" />
                        <div className="d-flex align-items-center gap-2 small text-muted">
                          <span>Show</span>
                          <select className="form-select form-select-sm border shadow-sm py-0 px-2 fw-bold" style={{ width: 'auto' }}>
                            <option>5</option><option>10</option><option>25</option>
                          </select>
                          <span>entries</span>
                        </div>
                      </div>
                      
                      <div className="mt-3 overflow-hidden rounded-3 shadow-sm bg-white">
                        <table className="table table-borderless m-0">
                          <thead style={{ backgroundColor: '#ced4da' }}>
                            <tr className="small"><th>ID ▾</th><th>Contact Person</th><th>Contact Number</th><th>Action</th></tr>
                          </thead>
                          <tbody><tr><td colSpan="4" className="py-4 text-center text-muted">No flight records found</td></tr></tbody>
                        </table>
                      </div>
                    </div>
                  ) : (
                    <div className="row g-3">
                      <div className="col-6">
                        <label className="form-label small fw-bold text-muted">Document Name</label>
                        <select className="form-select border-0 shadow-sm py-2"><option>Passport</option><option>NBI Clearance</option></select>
                      </div>
                      <div className="col-6">
                        <label className="form-label small fw-bold text-muted">File</label>
                        <div className="input-group shadow-sm rounded-3 overflow-hidden">
                          <input type="text" className="form-control border-0 bg-white" placeholder="Attach File" readOnly />
                          <button className="btn btn-dark border-0">+</button>
                        </div>
                      </div>
                      <div className="mt-4 d-flex justify-content-between align-items-center">
                        <input type="text" className="form-control border-0 shadow-sm rounded-pill px-4 w-50" placeholder="Search" />
                        <div className="small text-muted">Show <span className="fw-bold text-dark">5</span> entries</div>
                      </div>
                      <div className="mt-3 overflow-hidden rounded-3 shadow-sm bg-white">
                        <table className="table table-borderless m-0">
                          <thead style={{ backgroundColor: '#ced4da' }}>
                            <tr className="small"><th>ID ▾</th><th>Documents</th><th>Date Submitted</th><th>Action</th></tr>
                          </thead>
                          <tbody><tr><td colSpan="4" className="py-4 text-center text-muted">No records found</td></tr></tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </div>
                <div className="col-md-5">
                  <div className="bg-white p-4 h-100 shadow-sm" style={{ borderRadius: '20px', border: '1px solid #dee2e6' }}>
                    <h6 className="fw-bold mb-3">Add to Check List</h6>
                    <div className="d-flex gap-2">
                      <button className="btn btn-light w-100 border-0 shadow-sm text-muted">Pending</button>
                      <button className="btn btn-dark">+</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 d-flex justify-content-end gap-3">
              <button className="btn btn-white shadow-sm px-5 py-2 fw-bold text-secondary" onClick={() => setShowDetailsModal(false)}>Cancel</button>
              <button className="btn px-5 py-2 fw-bold shadow-sm text-white" style={{ backgroundColor: '#28a745', borderRadius: '10px' }} onClick={() => { alert('Details saved!'); setShowDetailsModal(false); }}>Save Changes</button>
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
                            <option>Single</option><option>Married</option><option>Widowed</option><option>Separated</option>
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

                      <div className="col-md-4 ps-4 d-flex flex-column">
                        <label className="form-label-ph">Expected Deployment Date</label>
                        <input type="date" className="form-control-ph mb-3" />
                        <label className="form-label-ph">Application Date</label>
                        <input type="date" className="form-control-ph mb-3" defaultValue={new Date().toISOString().split('T')[0]} />
                        <label className="form-label-ph">Initial Career Notes</label>
                        <textarea className="form-control-ph w-100 mb-4 flex-grow-1" placeholder="General observations..." style={{ resize: 'none', minHeight: '200px' }}></textarea>
                        <div className="mt-auto d-flex justify-content-end gap-2 pb-2 pt-3 border-top">
                          <button type="button" className="btn btn-outline-secondary px-4 py-2" onClick={closeAndReset}>Cancel</button>
                          <button type="button" className="btn btn-primary px-5 py-2 fw-bold shadow-sm" onClick={() => setFormStep(2)}>NEXT STEP →</button>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
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
                        <textarea className="form-control-ph w-100 mb-4 flex-grow-1" placeholder="Describe the applicant's professional goals..." style={{ resize: 'none', minHeight: '200px' }}></textarea>
                        <div className="mt-auto d-flex justify-content-end gap-2 pb-2 pt-3 border-top">
                          <button type="button" className="btn btn-outline-secondary px-4 py-2" onClick={() => setFormStep(1)}>Back</button>
                          <button type="submit" className="btn btn-success px-5 py-2 fw-bold text-white shadow-sm border-0">SAVE APPLICATION</button>
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


const AdminDashboard = () => {

  const [activePage, setActivePage] = useState('Dashboard');
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const pht = {
    time: currentTime.toLocaleTimeString('en-US', { 
      hour12: true, 
      timeZone: 'Asia/Manila',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    }),
    date: currentTime.toLocaleDateString('en-US', { 
      month: 'long', 
      day: 'numeric', 
      year: 'numeric', 
      timeZone: 'Asia/Manila' 
    })
  };

  const renderContent = () => {
    switch (activePage) {
      case 'Dashboard':
  return (
    <div className="animate-fade-in dashboard-viewport">
      
      {}
      <div className="hero-gradient-card p-4 rounded-4 shadow-sm mb-4 text-white">
        <div className="row align-items-center">
          <div className="col-md-8">
            <h1 className="display-6 fw-bold mb-1">Mabuhay, Admin Martha! 🇵🇭</h1>
            <p className="opacity-75 mb-0">
              Today is {pht.date}. System is monitoring <strong>1,534</strong> active overseas profiles.
            </p>
          </div>
          <div className="col-md-4 text-md-end d-none d-md-block">
             <span className="badge bg-white text-primary rounded-pill px-3 py-2 fw-bold shadow-sm">
               <span className="text-success">●</span> SERVER: RIYADH-MNL-SYNC
             </span>
          </div>
        </div>
      </div>

      {/* QUICK STATS CARDS - Enhanced with better icons & borders */}
      <div className="stats-grid mb-4">
        <div className="stat-box blue-border border-start border-5 shadow-sm p-3 rounded-3 bg-white d-flex justify-content-between">
          <div className="stat-info">
            <small className="text-muted fw-bold">TOTAL APPLICANTS</small>
            <h2 className="fw-bold mt-1">432</h2>
          </div>
          <div className="stat-icon fs-3 opacity-50">📝</div>
        </div>
        
        <div className="stat-box yellow-border border-start border-5 shadow-sm p-3 rounded-3 bg-white d-flex justify-content-between">
          <div className="stat-info">
            <small className="text-muted fw-bold">CURRENTLY EMPLOYED</small>
            <h2 className="fw-bold mt-1">1,102</h2>
          </div>
          <div className="stat-icon fs-3 opacity-50">💼</div>
        </div>

        <div className="stat-box red-border border-start border-5 shadow-sm p-3 rounded-3 bg-white d-flex justify-content-between">
          <div className="stat-info">
            <small className="text-muted fw-bold">PENDING REPORTS</small>
            <h2 className="fw-bold mt-1 text-danger">08</h2>
          </div>
          <div className="stat-icon fs-3 opacity-50">🚨</div>
        </div>

        <div className="stat-box blue-border border-start border-5 shadow-sm p-3 rounded-3 bg-white d-flex justify-content-between">
          <div className="stat-info">
            <small className="text-muted fw-bold">ACTIVE AGENCIES</small>
            <h2 className="fw-bold mt-1">12</h2>
          </div>
          <div className="stat-icon fs-3 opacity-50">🏛️</div>
        </div>
      </div>

      {/* BOTTOM SECTION: ACTIVITY & CLOCK */}
      <div className="row g-4">
        <div className="col-lg-8">
          <div className="modern-card h-100 bg-white shadow-sm border-0 rounded-4 overflow-hidden">
            <div className="card-header-ph d-flex justify-content-between align-items-center p-3 border-bottom bg-white">
              <span className="fw-bold text-dark"><span className="text-primary">●</span> Recent Deployment Activity</span>
              <button className="btn btn-sm btn-light border rounded-pill px-3">View Full Log</button>
            </div>
            <div className="p-0">
              {/* Activity Item 1 */}
              <div className="activity-item-new border-bottom p-3 d-flex align-items-center transition-all">
                <div className="activity-icon bg-light-blue rounded-circle p-2 me-3">✈️</div>
                <div className="activity-details flex-grow-1">
                  <p className="m-0 fw-bold small">Juan Dela Cruz</p>
                  <small className="text-muted">Document Verification: Riyadh Flight PH-402</small>
                </div>
                <div className="activity-time text-end text-muted small">Just now</div>
              </div>
              {/* Activity Item 2 */}
              <div className="activity-item-new p-3 d-flex align-items-center transition-all">
                <div className="activity-icon bg-light-yellow rounded-circle p-2 me-3">🤝</div>
                <div className="activity-details flex-grow-1">
                  <p className="m-0 fw-bold small">Maria Santos</p>
                  <small className="text-muted">Assigned to Saudi Aramco (Principal)</small>
                </div>
                <div className="activity-time text-end text-muted small">12 mins ago</div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          {/* Enhanced Clock with PH Flag Colors */}
          <div className="clock-card-ph h-100 d-flex flex-column justify-content-center text-center p-4 rounded-4 shadow-sm text-white" 
               style={{ background: 'linear-gradient(180deg, #0038a8 0%, #ce1126 100%)', borderTop: '6px solid #fcd116' }}>
            <small className="fw-bold opacity-75 mb-1 text-uppercase ls-2">Manila Time (PHT)</small>
            <h1 className="display-4 fw-bold mb-0">{pht.time}</h1>
            <p className="m-0 small opacity-75 fw-medium">{pht.date}</p>
            <div className="mt-3 py-1 px-3 bg-white bg-opacity-10 rounded-pill d-inline-block mx-auto small">
              UTC +8:00
            </div>
          </div>
        </div>
      </div>
    </div>
  );

      // Routing to external views
      case 'Applicants': return <ApplicantsView />;
      case 'Employed':   return <EmployedView />;
      case 'Principals':  return <EmployersView />;
      case 'Co-Host':    return <CoHostView />;
      case 'Reports':     return <ReportsView />;
      case 'Vouchers':    return <VouchersView />;
      case 'Agency':      return <AgencyView />;
      case 'LogOut':      return <LogOutView />;

      default:
        return (
          <div className="p-5 text-center">
            <h2 className="text-muted">{activePage} Module</h2>
            <p>Component is loading...</p>
          </div>
        );
    }
  };

  return (
    <div className="admin-wrapper d-flex vw-100 vh-100 bg-light">
      
      {/* 4. SIDEBAR NAVIGATION */}
      <aside className="sidebar-ph shadow">
        <div className="sidebar-brand-ph">
          <div className="flag-accent"></div>
          <h2 className="logo-text-ph">KalingaGate <span className="ksa-tag">KSA</span></h2>
        </div>
        
        <nav className="nav-list-ph">
          <small className="nav-section-label">MAIN MENU</small>
          
          <button 
            onClick={() => setActivePage('Dashboard')} 
            className={`nav-item-ph ${activePage === 'Dashboard' ? 'active' : ''}`}
          >
            <span>📊</span> Dashboard
          </button>
          
          <button 
            onClick={() => setActivePage('Applicants')} 
            className={`nav-item-ph ${activePage === 'Applicants' ? 'active' : ''}`}
          >
            <span>📝</span> Applicants
          </button>
          
          <button 
            onClick={() => setActivePage('Employed')} 
            className={`nav-item-ph ${activePage === 'Employed' ? 'active' : ''}`}
          >
            <span>💼</span> Employed
          </button>
          
          <button 
            onClick={() => setActivePage('Principals')} 
            className={`nav-item-ph ${activePage === 'Principals' ? 'active' : ''}`}
          >
            <span>🏢</span> Principals
          </button>

          <small className="nav-section-label mt-3">OPERATIONS</small>
          
          <button 
            onClick={() => setActivePage('Co-Host')} 
            className={`nav-item-ph ${activePage === 'Co-Host' ? 'active' : ''}`}
          >
            <span>🤝</span> Co-Host
          </button>
          
          <button 
            onClick={() => setActivePage('Reports')} 
            className={`nav-item-ph ${activePage === 'Reports' ? 'active' : ''}`}
          >
            <span>📋</span> Reports
          </button>
          
          <button 
            onClick={() => setActivePage('Vouchers')} 
            className={`nav-item-ph ${activePage === 'Vouchers' ? 'active' : ''}`}
          >
            <span>🎟️</span> Vouchers
          </button>
          
          <button 
            onClick={() => setActivePage('Agency')} 
            className={`nav-item-ph ${activePage === 'Agency' ? 'active' : ''}`}
          >
            <span>🏛️</span> Agency Profile
          </button>

          {}
<div className="mt-auto pb-4 px-3">
  <button 
    className="btn btn-outline-danger w-100 d-flex align-items-center justify-content-center gap-2 fw-bold shadow-sm" 
    style={{ 
      borderRadius: '12px', 
      padding: '12px',
      border: '2px solid #dc3545',
      transition: '0.3s'
    }}
    onClick={() => {
      if(window.confirm('Log out from system?')) {
        window.location.reload();
      }
    }}
  >
    <span style={{ fontSize: '1.1rem' }}>⏻</span> Log Out
  </button>
</div>
        </nav>
      </aside>

      {/* 5. MAIN CONTENT AREA */}
      <main className="main-content-ph flex-grow-1 d-flex flex-column overflow-hidden">
        
        {/* TOP HEADERBAR */}
        <header className="header-ph px-4 border-bottom bg-white d-flex justify-content-between align-items-center shadow-sm">
          <div className="d-flex align-items-center">
            <h5 className="m-0 fw-bold text-dark">{activePage}</h5>
          </div>
          
          <div className="user-profile-ph d-flex align-items-center gap-3">
            <div className="user-text text-end d-none d-md-block">
              <p className="m-0 fw-bold small text-dark lh-1">Admin Martha</p>
              <small className="text-success fw-medium" style={{ fontSize: '10px' }}>● SUPER ADMIN</small>
            </div>
            <div className="avatar-ph">AM</div>
          </div>
        </header>

        {/* DYNAMIC SCROLL AREA */}
        <div className="scroll-area-ph p-4">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;