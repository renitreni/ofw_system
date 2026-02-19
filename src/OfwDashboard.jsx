import React, { useState } from 'react';
import './OfwDashboard.css';

const OfwDashboard = () => {
  const [activePage, setActivePage] = useState('dashboard');
  const [showRegistration, setShowRegistration] = useState(false);
  const [regStep, setRegStep] = useState('Account Information');
  const [isVerifying, setIsVerifying] = useState(false);
  const [isBookingComplete, setIsBookingComplete] = useState(false);
  const [selectedSession, setSelectedSession] = useState("");
  const [selectedSlotId, setSelectedSlotId] = useState(null);

  // Flight Details States
  const [flightList, setFlightList] = useState([]);

  // ... (Emergency & Modal States preserved)
  const [sosActive, setSosActive] = useState(false);
  const [isLiveTracking, setIsLiveTracking] = useState(false);
  const [showDiscreetModal, setShowDiscreetModal] = useState(false);
  const [isVerifyingOTP, setIsVerifyingOTP] = useState(false);
  const [currentCaseId, setCurrentCaseId] = useState("");
  const [previewDoc, setPreviewDoc] = useState(null);
  const [callingHotline, setCallingHotline] = useState(null);

  const stepOrder = ['Account Information', 'Personal Details', 'Upload Documents', 'Profile Completed', 'Book Appointment'];
  const isCompleted = (stepName) => stepOrder.indexOf(regStep) >= stepOrder.indexOf(stepName);

  const slotsData = {
    "morning": [{ id: 1, date: "10-20-26", time: "8:00 am - 12:00 pm" }],
    "afternoon": [{ id: 3, date: "10-21-26", time: "1:00 pm - 5:00 pm" }],
    "evening": [{ id: 5, date: "10-22-26", time: "6:00 pm - 10:00 pm" }]
  };

  return (
    <div className="ofw-container">
      <aside className="ofw-sidebar">
        <div className="sidebar-brand">
          <div className="logo-icon">🐋</div>
          <h2 className="logo-text">Logo Name</h2>
        </div>
        <nav className="nav-group">
          <p className="nav-label">MAIN MENU</p>
          <button className={`nav-btn ${activePage === 'dashboard' ? 'active' : ''}`} onClick={() => { setActivePage('dashboard'); setShowRegistration(false); }}><span className="icon">📊</span> Dashboard</button>
          <button className={`nav-btn ${activePage === 'emergency' ? 'active' : ''}`} onClick={() => { setActivePage('emergency'); setShowRegistration(false); }}><span className="icon">🆘</span> Emergency</button>
          {/* Added Flight Details to Sidebar */}
          <button className={`nav-btn ${activePage === 'flight' ? 'active' : ''}`} onClick={() => { setActivePage('flight'); setShowRegistration(false); }}><span className="icon">✈️</span> Flight Details</button>
        </nav>
        <nav className="nav-group settings-group">
          <p className="nav-label">SETTINGS</p>
          <button className="nav-btn"><span className="icon">⚙️</span> Settings</button>
          <button className="nav-btn" onClick={() => alert("Logging out...")}><span className="icon">⬅️</span> Log Out</button>
        </nav>
      </aside>

      <main className="ofw-main">
        <header className="ofw-header">
          <div className="search-wrapper"><span className="search-icon">🔍</span><input type="text" placeholder="Search" /></div>
          <div className="profile-wrapper">
            <div className="profile-info"><p className="profile-name">Maria Martha Lee</p><p className="profile-status">Status: Registered</p></div>
            <div className="profile-avatar"></div>
          </div>
        </header>

        <div className="dashboard-frame">
          
          {/* FLIGHT DETAILS PAGE */}
          {activePage === 'flight' && (
            <div className="flight-container aesthetic-fade">
              <div className="flight-header-banner">
                <h3 className="m-0">Flight Details</h3>
              </div>

              <div className="flight-form-card aesthetic-card mt-3">
                <div className="flight-input-grid">
                  <select className="reg-input flight-select"><option>Abroad Agency</option></select>
                  <input type="text" placeholder="Contact Person" className="reg-input" />
                  <input type="text" placeholder="Contact Number" className="reg-input" />
                  <input type="text" placeholder="Contact Address" className="reg-input" />
                </div>

                <div className="add-checklist-section mt-4">
                  <h5 className="fw-bold">Add to Check List</h5>
                  <div className="checklist-input-row">
                    <div className="pending-status-box">Pending</div>
                    <button className="add-plus-btn" onClick={() => alert("Feature: Add to checklist")}>+</button>
                  </div>
                </div>

                <div className="flight-table-container mt-4">
                  <table className="flight-table">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Contact Person</th>
                        <th>Contact Number</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {flightList.length === 0 ? (
                        <tr><td colSpan="4" className="text-center py-5 text-muted">No flight records found</td></tr>
                      ) : (
                        flightList.map(item => (
                          <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.person}</td>
                            <td>{item.number}</td>
                            <td><button className="btn-action">View</button></td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* EMERGENCY PAGE (Preserved) */}
          {activePage === 'emergency' && (
            <div className="emergency-container aesthetic-fade">
              {/* ... existing emergency code ... */}
              <div className="emergency-header-alert aesthetic-alert">
                <span className="warning-icon">⚠️</span>
                <div>
                  <h3>Emergency Assistance</h3>
                  <p>In case of immediate danger, press the button and wait for rescue.</p>
                </div>
              </div>
              <div className="emergency-grid">
                <div className="panic-section">
                  <div className="panic-card aesthetic-card text-center">
                    {!sosActive ? (
                      <>
                        <h2 className="fw-bold">Need Rescue?</h2>
                        <p className="card-subtitle">Kindly press the button below.</p>
                        <button className="sos-button-clean" onClick={() => setSosActive(true)}>SOS</button>
                      </>
                    ) : (
                      <div className="sos-active-ui">
                        <div className="sos-pulse-ring"></div>
                        <h2 className="text-danger fw-bold">SOS DISPATCHED</h2>
                        <p className="small text-muted">Tracking your coordinates...</p>
                        <button className="btn-cancel-sos" onClick={() => setSosActive(false)}>Cancel SOS</button>
                      </div>
                    )}
                    <div className="location-toggle-aesthetic mt-4">
                      <div className="toggle-info text-start">
                        <span className="fw-bold d-block">Share Live Location</span>
                        <span className="small text-muted">GPS: 14.28, 121.08</span>
                        {isLiveTracking && <span className="live-dot-pulse ms-2">● Live</span>}
                      </div>
                      <label className="switch-clean">
                        <input type="checkbox" onChange={(e) => setIsLiveTracking(e.target.checked)} />
                        <span className="slider-clean round"></span>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="silent-signal-section">
                  <div className="aesthetic-card h-100">
                    <div className="card-icon-header"><span className="icon-circle shadow-sm">💬</span><h4>Silent Signal</h4></div>
                    <p className="card-subtitle">Select a message for discreet rescue.</p>
                    <div className="quick-msg-chips mb-3">
                      <button className="chip-outline" onClick={() => document.getElementById('silentInput').value = "I need help, just text"}>Just text</button>
                      <button className="chip-outline" onClick={() => document.getElementById('silentInput').value = "Being monitored"}>Monitored</button>
                    </div>
                    <textarea id="silentInput" className="aesthetic-textarea" placeholder="Type discreet message..." rows="3"></textarea>
                    
                    <button className="send-btn-outline w-100 mt-3" onClick={() => {
                      const newId = "CASE-" + Math.random().toString(36).substr(2, 9).toUpperCase();
                      setCurrentCaseId(newId);
                      setIsVerifyingOTP(true);
                    }}>
                      Send Discreet Report
                    </button>
                  </div>
                </div>

                <div className="safe-havens-section">
                  <div className="aesthetic-card">
                    <div className="card-icon-header"><span className="icon-circle shadow-sm">📍</span><h4>Nearby Safe Havens</h4></div>
                    <div className="aesthetic-map-sample">
                       <div className="map-marker-clean shadow-sm">PH Embassy</div>
                       <div className="user-location-ping"></div>
                    </div>
                  </div>
                </div>

                <div className="hotline-vault-section d-flex flex-column gap-3">
                   <div className="aesthetic-card py-3">
                      <h5 className="fw-bold small mb-2 text-muted">Emergency Docs</h5>
                      <div className="d-flex gap-2">
                        <button className="doc-tag-btn" onClick={() => setPreviewDoc('Passport')}>Passport.pdf</button>
                        <button className="doc-tag-btn" onClick={() => setPreviewDoc('Visa')}>Visa.jpg</button>
                      </div>
                   </div>
                   <div className="aesthetic-card py-3">
                      <h5 className="fw-bold small mb-2 text-muted">Hotlines</h5>
                      <button className="hotline-pill-clean mb-2" onClick={() => setCallingHotline({ name: "Embassy Hotline", number: "+63 2 8888 1234" })}>
                        Embassy Hotline <span className="call-icon-red">📞</span>
                      </button>
                      <button className="hotline-pill-clean" onClick={() => setCallingHotline({ name: "Local Police", number: "911" })}>
                        Local Police <span className="call-icon-red">📞</span>
                      </button>
                   </div>
                </div>
              </div>
            </div>
          )}

          {/* DASHBOARD & REGISTRATION FLOW (Preserved) */}
          {!showRegistration && activePage === 'dashboard' && (
             <>
               <section className="hero-banner">
                 <div className="hero-content"><h1>Registration for <br/> Deployment</h1><button className="register-btn" onClick={() => setShowRegistration(true)}>Register NOW</button></div>
               </section>
               <div className="notice-container">
                  <div className="notice-inner-frame">
                    <section className="appointment-card"><div className="appointment-content-row"><span className="notice-tag">NOTICE!</span><p className="notice-text">Your Appointment is booked</p></div></section>
                  </div>
                </div>
             </>
          )}

          {showRegistration && activePage === 'dashboard' && (
            <section className="registration-view">
              <h1 className="registration-title">Registration for Deployment</h1>
              {/* ... (existing registration code) ... */}
              <div className="registration-content">
                <div className="steps-sidebar">
                  <button className={`step-card-btn ${regStep === 'Account Information' ? 'active' : ''}`} onClick={() => setRegStep('Account Information')}>Account Information</button>
                  <div className={`step-connector ${isCompleted('Personal Details') ? 'completed' : ''}`}></div>
                  <button className={`step-card-btn ${regStep === 'Personal Details' ? 'active' : ''}`} onClick={() => setRegStep('Personal Details')}>Personal Details</button>
                  <div className={`step-connector ${isCompleted('Upload Documents') ? 'completed' : ''}`}></div>
                  <button className={`step-card-btn ${regStep === 'Upload Documents' ? 'active' : ''}`} onClick={() => setRegStep('Upload Documents')}>Upload Documents</button>
                  <div className={`step-connector ${isCompleted('Profile Completed') ? 'completed' : ''}`}></div>
                  <button className={`step-card-btn ${regStep === 'Profile Completed' ? 'active' : ''}`} onClick={() => setRegStep('Profile Completed')}>Profile Completed</button>
                  <div className={`step-connector ${isCompleted('Book Appointment') ? 'completed' : ''}`}></div>
                  <button className={`step-card-btn ${regStep === 'Book Appointment' ? 'active' : ''}`} onClick={() => setRegStep('Book Appointment')}>Book Appointment</button>
                </div>

                <div className="registration-form-card">
                  <div className="form-header">{regStep}</div>
                  <div className="form-body">
                    {regStep === 'Account Information' && (
                      <>
                        <p className="form-instruction">Fill out forms:</p>
                        <input type="text" placeholder="Full name" className="reg-input" />
                        <input type="email" placeholder="Email" className="reg-input" />
                        <input type="text" placeholder="Phone Number" className="reg-input" />
                        <input type="text" placeholder="Emergency Contact" className="reg-input" />
                        <button className="next-step-btn centered-btn" onClick={() => setIsVerifying(true)}>Verify Email</button>
                      </>
                    )}
                    {regStep === 'Personal Details' && (
                      <>
                        <p className="form-instruction">Fill out forms:</p>
                        <input type="text" placeholder="Address" className="reg-input" />
                        <div className="input-with-icon">
                          <input type="text" placeholder="Birthdate" className="reg-input" onFocus={(e) => (e.target.type = "date")} onBlur={(e) => { if (!e.target.value) e.target.type = "text"; }} />
                          <span className="calendar-icon">🗓️</span>
                        </div>
                        <select className="reg-input reg-select" defaultValue=""><option value="" disabled className="placeholder-option">Civil Status</option><option value="single">Single</option><option value="married">Married</option><option value="widowed">Widowed</option><option value="separated">Separated</option></select>
                        <input type="text" placeholder="Emergency Contact" className="reg-input" />
                        <button className="next-step-btn centered-btn" onClick={() => setRegStep('Upload Documents')}>Next</button>
                      </>
                    )}
                    {regStep === 'Upload Documents' && (
                      <div className="upload-view">
                        <p className="form-instruction">Please upload documents:</p>
                        <div className="upload-grid">
                          <div className="upload-box"><p className="upload-label">Passport</p><div className="drag-zone"><span className="upload-icon">📁</span><p>Drag & Drop</p></div></div>
                          <div className="upload-box"><p className="upload-label">Contract</p><div className="drag-zone"><span className="upload-icon">📄</span><p>Drag & Drop</p></div></div>
                          <div className="upload-box"><p className="upload-label">Medical</p><div className="drag-zone"><span className="upload-icon">🏥</span><p>Drag & Drop</p></div></div>
                          <div className="upload-box"><p className="upload-label">Visa</p><div className="drag-zone"><span className="upload-icon">🛂</span><p>Drag & Drop</p></div></div>
                          <div className="upload-box"><p className="upload-label">Flight</p><div className="drag-zone"><span className="upload-icon">✈️</span><p>Drag & Drop</p></div></div>
                          <div className="upload-box"><p className="upload-label">NBI</p><div className="drag-zone"><span className="upload-icon">🛡️</span><p>Drag & Drop</p></div></div>
                        </div>
                        <button className="next-step-btn centered-btn" onClick={() => setRegStep('Profile Completed')}>Submit Documents</button>
                      </div>
                    )}
                    {regStep === 'Profile Completed' && (
                      <div className="success-message">
                        <div className="success-header"><span className="check-icon">✅</span><h2 className="success-title">Profile Completed!</h2></div>
                        <p className="success-text">Documents reviewed. Proceed to booking.</p>
                        <button className="next-step-btn centered-btn" onClick={() => setRegStep('Book Appointment')}>Proceed to Booking</button>
                      </div>
                    )}
                    {regStep === 'Book Appointment' && (
                      <div className="appointment-view">
                        <div className="appointment-selection-card">
                          <select className="reg-input reg-select schedule-select" value={selectedSession} onChange={(e) => { setSelectedSession(e.target.value); setSelectedSlotId(null); }}>
                            <option value="" disabled>Choose Available Schedule</option><option value="morning">Morning Session</option><option value="afternoon">Afternoon Session</option><option value="evening">Evening Session</option>
                          </select>
                          <div className="slots-table-container">
                            <div className="table-header">Available Slots</div>
                            <table className="slots-table">
                              <thead><tr><th>Date</th><th>Time</th><th>Select</th></tr></thead>
                              <tbody>
                                {selectedSession && slotsData[selectedSession].map((slot) => (
                                  <tr key={slot.id} className={selectedSlotId === slot.id ? "selected-row" : ""}>
                                    <td>{slot.date}</td><td>{slot.time}</td>
                                    <td><input type="checkbox" className="slot-checkbox" checked={selectedSlotId === slot.id} onChange={() => setSelectedSlotId(slot.id)}/></td>
                                  </tr>
                                ))}
                                {!selectedSession && (<tr><td colSpan="3" style={{padding: '20px', color: '#888'}}>Please select a session to view slots</td></tr>)}
                              </tbody>
                            </table>
                          </div>
                        </div>
                        <button className={`next-step-btn centered-btn ${!selectedSlotId ? "disabled-btn" : ""}`} disabled={!selectedSlotId} onClick={() => setIsBookingComplete(true)}>Appointment Booked</button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </section>
          )}
        </div>
      </main>

      {/* --- ALL OVERLAY MODALS --- (Preserved) */}
      {callingHotline && (
        <div className="verification-overlay">
          <div className="verify-card aesthetic-fade text-center p-5" style={{ background: '#fff', maxWidth: '350px', borderRadius: '30px' }}>
            <div className="calling-avatar mb-4" style={{ margin: '0 auto', width: '80px', height: '80px', background: '#f1f5f9', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
               <div className="avatar-ripple"></div>
               <span className="fs-1">📞</span>
            </div>
            <h2 className="fw-bold m-0">{callingHotline.name}</h2>
            <p className="text-muted mb-4">{callingHotline.number}</p>
            <div className="calling-status mb-5"><span className="dot-pulse"></span> Calling...</div>
            <button className="end-call-btn" style={{ background: '#ef4444', color: '#fff', border: 'none', width: '60px', height: '60px', borderRadius: '50%', transform: 'rotate(135deg)', cursor: 'pointer' }} onClick={() => setCallingHotline(null)}>📞</button>
            <p className="text-danger small fw-bold mt-2">End Call</p>
          </div>
        </div>
      )}
      {previewDoc && (
        <div className="verification-overlay">
          <div className="verify-card aesthetic-fade p-4 text-center">
            <h3 className="fw-bold mb-3">{previewDoc} Preview</h3>
            <div className="doc-placeholder-img bg-light rounded-3 mb-4 d-flex align-items-center justify-content-center" style={{height: '300px', border: '2px dashed #ddd'}}>
               <p className="text-muted">Sample {previewDoc} Image Displayed Here</p>
            </div>
            <button className="open-email-btn w-100" onClick={() => setPreviewDoc(null)}>Close Preview</button>
          </div>
        </div>
      )}
      {isVerifyingOTP && (
        <div className="verification-overlay">
          <div className="verify-card custom-verify-modal text-center aesthetic-fade" style={{maxWidth: '400px'}}>
            <span className="fs-1">🔐</span>
            <h2 className="fw-bold mt-3">Confirm Identity</h2>
            <p className="verify-text text-muted small">An OTP has been sent to your device to confirm this emergency request.</p>
            <input type="text" placeholder="Enter OTP" className="reg-input text-center mb-3" maxLength="6" />
            <button className="open-email-btn w-100" onClick={() => { setIsVerifyingOTP(false); setShowDiscreetModal(true); }}>Confirm & Send</button>
            <button className="btn btn-link text-muted small mt-2" onClick={() => setIsVerifyingOTP(false)}>Cancel</button>
          </div>
        </div>
      )}
      {showDiscreetModal && (
        <div className="verification-overlay">
          <div className="verify-card success-pop text-center aesthetic-fade" style={{maxWidth: '400px'}}>
            <div className="mail-icon-circle success-circle mb-3"><span className="fs-2">🛰️</span></div>
            <h3 className="fw-bold">Report Transmitted</h3>
            <p className="text-muted small">Your signal and location have been sent to SuperAdmin and Agency.</p>
            <div className="bg-light p-3 rounded-3 mb-4 border">
              <p className="m-0 x-small text-uppercase text-muted fw-bold">Incident Reference</p>
              <h4 className="m-0 fw-bold text-dark">{currentCaseId}</h4>
            </div>
            <button className="open-email-btn w-100" onClick={() => setShowDiscreetModal(false)}>Understood</button>
          </div>
        </div>
      )}
      {isVerifying && (
        <div className="verification-overlay">
          <div className="verify-card custom-verify-modal">
            <div className="mail-icon-circle"><span className="mail-emoji">✉️</span></div>
            <h2>Verify Email</h2>
            <button className="open-email-btn" onClick={() => { setIsVerifying(false); setRegStep('Personal Details'); }}>Verify Now</button>
          </div>
        </div>
      )}
      {isBookingComplete && (
        <div className="verification-overlay">
          <div className="verify-card success-pop">
            <div className="mail-icon-circle success-circle"><span>✅</span></div>
            <h2>Confirmed</h2>
            <div className="summary-details p-3 bg-light rounded-3 mb-3 text-start">
              <p className="m-1 small"><strong>Reference:</strong> #OFW-2026-77B2</p>
            </div>
            <div className="d-flex gap-2">
              <button className="open-email-btn secondary-btn" onClick={() => window.print()}>Print</button>
              <button className="open-email-btn" onClick={() => { setIsBookingComplete(false); setShowRegistration(false); setActivePage('dashboard'); setRegStep('Account Information'); }}>Done</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OfwDashboard;