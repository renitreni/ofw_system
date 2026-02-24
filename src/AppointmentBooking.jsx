import React, { useState } from 'react';

const AppointmentBooking = () => {
  const [step, setStep] = useState(1);

  // Philippine Flag Palette
  const phBlue = "#0038a8";
  const phRed = "#ce1126";
  const phYellow = "#fcd116";

  return (
    <div className="min-vh-100 py-5" style={{ backgroundColor: '#f4f7f6' }}>
      <div className="container">
        <div className="card shadow-lg border-0 mx-auto" style={{ maxWidth: '950px', borderRadius: '20px' }}>
          
          {/* TOP DECORATIVE BAR */}
          <div className="d-flex" style={{ height: '8px' }}>
            <div className="flex-grow-1" style={{ backgroundColor: phBlue }}></div>
            <div style={{ width: '20%', backgroundColor: phYellow }}></div>
            <div className="flex-grow-1" style={{ backgroundColor: phRed }}></div>
          </div>

          {/* HEADER */}
          <div className="p-4 bg-white d-flex justify-content-between align-items-center border-bottom">
            <div className="d-flex align-items-center gap-3">
              <div className="p-2 rounded-3 shadow-sm" style={{ backgroundColor: phBlue }}>
                <span className="text-white fw-bold">PH</span>
              </div>
              <div>
                <h4 className="fw-bold mb-0" style={{ color: phBlue }}>KalingaGate</h4>
                <small className="text-muted fw-bold">OFW APPOINTMENT SYSTEM</small>
              </div>
            </div>
            <div className="text-end">
              <span className="badge rounded-pill px-3 py-2" style={{ backgroundColor: phYellow, color: '#000' }}>
                Step {step} of 2
              </span>
            </div>
          </div>

          <div className="card-body p-4 p-md-5">
            {step === 1 ? (
              /* --- PAGE 1: FULL DETAILS --- */
              <div className="row g-3 animate-fade-in">
                <div className="col-12 mb-2">
                  <h5 className="fw-bold" style={{ color: phBlue }}>Step 1: Personal & Agency Information</h5>
                  <div style={{ height: '3px', width: '60px', backgroundColor: phRed }}></div>
                </div>
                
                {/* Column 1 */}
                <div className="col-md-6">
                  <label className="form-label small fw-bold text-secondary">Full Name</label>
                  <input type="text" className="form-control border-0 bg-light py-2" placeholder="Juan Dela Cruz" />
                </div>
                <div className="col-md-6">
                  <label className="form-label small fw-bold text-secondary">Email Address</label>
                  <input type="email" className="form-control border-0 bg-light py-2" placeholder="juan@example.com" />
                </div>

                {/* Column 2 */}
                <div className="col-md-6">
                  <label className="form-label small fw-bold text-secondary">Address Line 1</label>
                  <input type="text" className="form-control border-0 bg-light py-2" placeholder="House/Bldg No, Street" />
                </div>
                <div className="col-md-6">
                  <label className="form-label small fw-bold text-secondary">Address Line 2</label>
                  <input type="text" className="form-control border-0 bg-light py-2" placeholder="Barangay, District" />
                </div>

                {/* Column 3 */}
                <div className="col-md-4">
                  <label className="form-label small fw-bold text-secondary">City</label>
                  <input type="text" className="form-control border-0 bg-light py-2" placeholder="City Name" />
                </div>
                <div className="col-md-4">
                  <label className="form-label small fw-bold text-secondary">Contact Person</label>
                  <input type="text" className="form-control border-0 bg-light py-2" placeholder="Emergency Contact" />
                </div>
                <div className="col-md-4">
                  <label className="form-label small fw-bold text-secondary">Phone Number</label>
                  <input type="tel" className="form-control border-0 bg-light py-2" placeholder="0917XXXXXXX" />
                </div>

                {/* Column 4: Dropdowns */}
                <div className="col-md-4">
                  <label className="form-label small fw-bold text-secondary">Status</label>
                  <select className="form-select border-0 bg-light py-2">
                    <option>Select Status</option>
                    <option>Single</option>
                    <option>Married</option>
                    <option>Widowed</option>
                  </select>
                </div>
                <div className="col-md-4">
                  <label className="form-label small fw-bold text-secondary">Business Type</label>
                  <select className="form-select border-0 bg-light py-2">
                    <option>Select Type</option>
                    <option>Land-based</option>
                    <option>Sea-based</option>
                    <option>Direct Hire</option>
                  </select>
                </div>
                <div className="col-md-4">
                  <label className="form-label small fw-bold text-secondary">Agency</label>
                  <select className="form-select border-0 bg-light py-2">
                    <option>Select Agency</option>
                    <option>Agency A</option>
                    <option>Agency B</option>
                  </select>
                </div>

                <div className="col-md-12">
                  <label className="form-label small fw-bold text-secondary">Choose Country</label>
                  <select className="form-select border-0 bg-light py-2" style={{ borderLeft: `5px solid ${phYellow}` }}>
                    <option>Select Destination Country</option>
                    <option>Saudi Arabia</option>
                    <option>United Arab Emirates</option>
                    <option>Kuwait</option>
                    <option>Qatar</option>
                    <option>Hong Kong</option>
                  </select>
                </div>
              </div>
            ) : (
              /* --- PAGE 2: SCHEDULE CHOICES --- */
              <div className="animate-fade-in">
                <div className="col-12 mb-4">
                  <h5 className="fw-bold" style={{ color: phBlue }}>Step 2: Choose Available Schedule</h5>
                  <p className="text-muted">Select your preferred date and time slot.</p>
                </div>

                <div className="row g-3">
                  {[
                    { date: 'Nov 24, 2026', time: '08:00 AM - 10:00 AM', slots: '15 Slots', color: 'success' },
                    { date: 'Nov 24, 2026', time: '01:00 PM - 03:00 PM', slots: 'Full', color: 'danger' },
                    { date: 'Nov 25, 2026', time: '09:00 AM - 11:00 AM', slots: '5 Slots', color: 'warning' }
                  ].map((item, index) => (
                    <div className="col-12" key={index}>
                      <div className="p-3 border rounded-3 d-flex justify-content-between align-items-center bg-white shadow-sm" 
                           style={{ borderLeft: `6px solid ${item.slots === 'Full' ? '#ccc' : phBlue}` }}>
                        <div>
                          <h6 className="fw-bold mb-1">{item.date}</h6>
                          <span className="text-muted small">{item.time}</span>
                        </div>
                        <div className="text-end d-flex align-items-center gap-3">
                          <span className={`badge bg-${item.color}`}>{item.slots}</span>
                          <input type="radio" name="schedule" disabled={item.slots === 'Full'} style={{ transform: 'scale(1.2)' }} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* FOOTER CONTROLS */}
          <div className="p-4 bg-light border-top d-flex justify-content-between">
            <button 
              className="btn fw-bold px-4" 
              style={{ color: phBlue }}
              onClick={() => setStep(1)} 
              disabled={step === 1}
            >
              {step === 2 ? "← Back" : ""}
            </button>
            
            {step === 1 ? (
              <button 
                className="btn btn-lg px-5 shadow text-white" 
                style={{ backgroundColor: phBlue, borderRadius: '10px' }}
                onClick={() => setStep(2)}
              >
                Next Step
              </button>
            ) : (
              <button 
                className="btn btn-lg px-5 shadow text-white" 
                style={{ backgroundColor: phRed, borderRadius: '10px' }}
              >
                Confirm Appointment
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentBooking;