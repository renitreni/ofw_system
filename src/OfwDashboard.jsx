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

  // New states for interactive email actions
  const [isChangingEmail, setIsChangingEmail] = useState(false);
  const [newEmail, setNewEmail] = useState("");

  const slotsData = {
    "morning": [
      { id: 1, date: "10-20-26", time: "8:00 am - 10:00 am" },
      { id: 2, date: "10-20-26", time: "10:30 am - 12:00 pm" }
    ],
    "afternoon": [
      { id: 3, date: "10-21-26", time: "1:00 pm - 3:00 pm" },
      { id: 4, date: "10-21-26", time: "3:30 pm - 5:30 pm" }
    ],
    "evening": [
      { id: 5, date: "10-22-26", time: "6:00 pm - 8:00 pm" },
      { id: 6, date: "10-22-26", time: "8:30 pm - 10:00 pm" }
    ]
  };

  return (
    <div className="ofw-container">
      {/* SIDEBAR (Unchanged) */}
      <aside className="ofw-sidebar">
        <div className="sidebar-brand">
          <div className="logo-icon">🐋</div>
          <h2 className="logo-text">Logo Name</h2>
        </div>
        <nav className="nav-group">
          <p className="nav-label">MAIN MENU</p>
          <button className={`nav-btn ${activePage === 'dashboard' ? 'active' : ''}`} onClick={() => { setActivePage('dashboard'); setShowRegistration(false); setIsVerifying(false); setIsBookingComplete(false); }}><span className="icon">📊</span> Dashboard</button>
          <button className={`nav-btn ${activePage === 'appointment' ? 'active' : ''}`} onClick={() => { setActivePage('appointment'); setShowRegistration(false); setIsVerifying(false); setIsBookingComplete(false); }}><span className="icon">📅</span> Appointment</button>
        </nav>
        <nav className="nav-group settings-group">
          <p className="nav-label">SETTINGS</p>
          <button className="nav-btn" onClick={() => { setActivePage('settings'); setShowRegistration(false); }}><span className="icon">⚙️</span> Settings</button>
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
          {/* UPDATED EMAIL VERIFICATION MODAL */}
          {isVerifying && (
            <div className="verification-overlay">
              <div className="verify-card custom-verify-modal">
                <div className="mail-icon-circle"><span className="mail-emoji">✉️</span></div>
                <h2>Verify your Email</h2>
                <p className="verify-text">
                  To keep a trusted and safe community, we've sent an email to 
                  <strong> youremail@gmail.com</strong> for verification, and you'll only do this once.
                </p>

                <div className="verify-actions-group">
                  <p>Not the correct email? 
                    <button className="text-action-btn" onClick={() => setIsChangingEmail(true)}>Change email address</button>
                  </p>
                  
                  <button className="open-email-btn" onClick={() => { setIsVerifying(false); setRegStep('Personal Details'); }}>
                    Open Email
                  </button>

                  <p>Did not receive? 
                    <button className="text-action-btn" onClick={() => alert("Verification email resent!")}>Resend Email</button>
                  </p>
                </div>

                {/* NESTED CHANGE EMAIL POP-UP */}
                {isChangingEmail && (
                  <div className="inner-modal-overlay">
                    <div className="inner-modal-card">
                      <h3>Update Email Address</h3>
                      <input 
                        type="email" 
                        placeholder="Enter new email" 
                        className="reg-input"
                        value={newEmail}
                        onChange={(e) => setNewEmail(e.target.value)}
                      />
                      <div className="inner-modal-buttons">
                        <button className="cancel-btn" onClick={() => setIsChangingEmail(false)}>Cancel</button>
                        <button className="confirm-btn" onClick={() => { alert(`Email changed to: ${newEmail}`); setIsChangingEmail(false); }}>Update</button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* FINAL COMPLETION POP-UP (Unchanged) */}
          {isBookingComplete && (
            <div className="verification-overlay">
              <div className="verify-card success-pop">
                <div className="mail-icon-circle success-circle"><span className="mail-emoji">✅</span></div>
                <h2>Completed</h2>
                <div className="summary-details">
                  <p><strong>Reference:</strong> #OFW-2026-77B2</p>
                  <p><strong>Schedule:</strong> Oct 20, 2026 | Selected Session Time</p>
                  <p className="reminder-text">Please bring original copies of your uploaded documents on your appointment date.</p>
                </div>
                <div className="popup-button-group">
                  <button className="open-email-btn secondary-btn" onClick={() => window.print()}>Print Confirmation</button>
                  <button className="open-email-btn" onClick={() => { setIsBookingComplete(false); setShowRegistration(false); setActivePage('dashboard'); setSelectedSlotId(null); setSelectedSession(""); }}>Done</button>
                </div>
              </div>
            </div>
          )}

          {showRegistration ? (
            <section className="registration-view">
              <h1 className="registration-title">Registration for Deployment</h1>
              <div className="registration-content">
                <div className="steps-sidebar">
                  <button className={`step-card-btn ${regStep === 'Account Information' ? 'active' : ''}`} onClick={() => setRegStep('Account Information')}>Account Information</button>
                  <div className="step-connector"></div>
                  <button className={`step-card-btn ${regStep === 'Personal Details' ? 'active' : ''}`} onClick={() => setRegStep('Personal Details')}>Personal Details</button>
                  <div className="step-connector"></div>
                  <button className={`step-card-btn ${regStep === 'Upload Documents' ? 'active' : ''}`} onClick={() => setRegStep('Upload Documents')}>Upload Documents</button>
                  <div className="step-connector"></div>
                  <button className={`step-card-btn ${regStep === 'Profile Completed' ? 'active' : ''}`} onClick={() => setRegStep('Profile Completed')}>Profile Completed</button>
                  <div className="step-connector"></div>
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
                        <select className="reg-input reg-select" defaultValue=""><option value="" disabled className="placeholder-option">Civil Status</option><option value="single">Single</option><option value="married">Married</option></select>
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
          ) : (
            activePage === 'dashboard' && (
              <>
                <section className="hero-banner">
                  <div className="hero-content"><h1>Registration for <br/> Deployment</h1><p>Stay updated on real-time location and safety reports</p><button className="register-btn" onClick={() => setShowRegistration(true)}>Register NOW</button></div>
                  <div className="hero-graphics">
                    <div className="circle circle-1"></div><div className="circle circle-2"></div><div className="circle circle-3"></div><div className="circle circle-4"></div><div className="circle circle-5"></div>
                  </div>
                </section>
                <div className="notice-container">
                  <div className="notice-header-bar"></div>
                  <div className="notice-inner-frame">
                    <section className="appointment-card"><div className="appointment-content-row"><span className="notice-tag">NOTICE!</span><p className="notice-text">Your Appointment is booked</p></div></section>
                  </div>
                </div>
              </>
            )
          )}
        </div>
      </main>
    </div>
  );
};

export default OfwDashboard;