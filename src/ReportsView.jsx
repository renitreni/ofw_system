import React, { useState } from 'react';

const ReportsView = () => {

  const [reportFilter, setReportFilter] = useState('Daily');
  const [activeModal, setActiveModal] = useState(null); // 'Schedule', 'Export', 'Logs', 'Download'
  const [isProcessing, setIsProcessing] = useState(false);

  const phColors = {
    blue: '#0038a8',
    red: '#ce1126',
    gold: '#fcd116',
    success: '#198754',
    bgLight: '#f8fbff'
  };

  const reportData = [
    { id: "RPT-001", type: "Deployment", date: "Feb 20, 2026", user: "Admin Martha", status: "Generated", size: "1.2 MB" },
    { id: "RPT-002", type: "Medical Summary", date: "Feb 19, 2026", user: "System Auto", status: "Scheduled", size: "850 KB" },
    { id: "RPT-003", type: "Financial (Vouchers)", date: "Feb 18, 2026", user: "Admin Martha", status: "Generated", size: "2.4 MB" },
    { id: "RPT-004", type: "Principal Analytics", date: "Feb 15, 2026", user: "Super Admin", status: "Archived", size: "3.1 MB" },
  ];

  const triggerProcess = (modalType) => {
    setIsProcessing(true);
   
    setTimeout(() => {
      setIsProcessing(false);
      setActiveModal(modalType);
    }, 700);
  };

  return (
    <div className="view-container animate-fade-in p-2" style={{ backgroundColor: '#fcfdfe' }}>
      
      {/* 1. PPT STYLE HEADER */}
      <div className="d-flex justify-content-between align-items-center mb-4 p-3 bg-white shadow-sm" style={{ borderRadius: '15px', borderLeft: '6px solid #0038a8' }}>
        <div>
          <h2 className="fw-bold mb-0" style={{ color: '#0038a8' }}>Executive Intelligence Reports</h2>
          <p className="text-muted mb-0 small">Operational Analytics & Deployment Documentation Hub</p>
        </div>
        <div className="d-flex gap-2">
           <button className="btn btn-sm border px-3 fw-bold" 
                   style={{ backgroundColor: '#f0f4ff', color: phColors.blue, borderRadius: '50px' }}
                   onClick={() => triggerProcess('Schedule')}>
             📅 Schedule Auto-Report
           </button>
           <button className="btn btn-sm text-white rounded-pill px-4 fw-bold shadow-sm" 
                   style={{ backgroundColor: phColors.blue }}
                   onClick={() => triggerProcess('Export')}>
             📊 Export Master Data
           </button>
        </div>
      </div>

      {/* 2. KPI PERFORMANCE SLIDE (PPT INSPIRED) */}
      <div className="row g-4 mb-4">
        {[
          { label: 'MONTHLY DEPLOYMENT', val: '154', change: '↑ 14%', color: phColors.blue, progress: 70, note: 'Target: 220' },
          { label: 'REVENUE SNAPSHOT', val: '$42.5K', change: '↓ 2%', color: phColors.red, progress: 85, note: 'MoM Variance' },
          { label: 'PENDING CLEARANCE', val: '38', change: 'Alert', color: '#b8860b', progress: 40, note: 'Medical/NBI' }
        ].map((kpi, idx) => (
          <div className="col-md-4" key={idx}>
            <div className="modern-card p-4 bg-white shadow-sm border-0 h-100" style={{ borderRadius: '20px' }}>
              <div className="d-flex justify-content-between mb-3">
                 <span className="fw-bold text-muted small">{kpi.label}</span>
                 <span className={`fw-bold small ${kpi.change.includes('↑') ? 'text-success' : 'text-danger'}`}>{kpi.change}</span>
              </div>
              <h1 className="fw-black m-0" style={{ color: kpi.color, fontSize: '2.5rem' }}>{kpi.val}</h1>
              <div className="progress mt-3" style={{ height: '8px', backgroundColor: '#eef2ff' }}>
                <div className="progress-bar" style={{ width: `${kpi.progress}%`, backgroundColor: kpi.color }}></div>
              </div>
              <small className="text-muted mt-2 d-block">{kpi.note}</small>
            </div>
          </div>
        ))}
      </div>

      {/* 3. REPORT LOG TABLE */}
      <div className="modern-card bg-white shadow-sm border-0 overflow-hidden mb-4" style={{ borderRadius: '15px' }}>
        <div className="p-3 border-bottom d-flex justify-content-between align-items-center bg-light">
          <h6 className="m-0 fw-bold"><span className="text-primary me-2">●</span> Generated Report History</h6>
          <div className="btn-group btn-group-sm rounded-pill overflow-hidden border bg-white">
            {['Daily', 'Weekly', 'Monthly'].map(period => (
              <button 
                key={period} 
                className={`btn btn-sm px-3 border-0 ${reportFilter === period ? 'btn-primary' : 'text-muted'}`}
                style={reportFilter === period ? { backgroundColor: phColors.blue } : {}}
                onClick={() => setReportFilter(period)}
              >
                {period}
              </button>
            ))}
          </div>
        </div>
        <div className="table-responsive">
          <table className="table table-hover align-middle m-0">
            <thead className="small text-muted bg-white border-bottom">
              <tr>
                <th className="ps-4 py-3">REPORT ID</th>
                <th>CATEGORY</th>
                <th>GENERATION DATE</th>
                <th>REQUESTED BY</th>
                <th>STATUS</th>
                <th className="text-center">ACTION</th>
              </tr>
            </thead>
            <tbody>
              {reportData.map((rpt, i) => (
                <tr key={i}>
                  <td className="ps-4 fw-bold" style={{ color: phColors.blue }}>{rpt.id}</td>
                  <td>
                    <div className="fw-bold text-dark">{rpt.type}</div>
                    <small className="text-muted">{rpt.size}</small>
                  </td>
                  <td>{rpt.date}</td>
                  <td>{rpt.user}</td>
                  <td>
                    <span className={`badge rounded-pill ${
                      rpt.status === 'Generated' ? 'bg-success-subtle text-success' : 
                      rpt.status === 'Scheduled' ? 'bg-info-subtle text-info' : 'bg-secondary-subtle text-secondary'
                    }`}>
                      ● {rpt.status}
                    </span>
                  </td>
                  <td className="text-center">
                    <button className="btn btn-sm border-0 px-3 fw-bold rounded-pill" 
                            style={{ backgroundColor: '#f0f4ff', color: phColors.blue }}
                            onClick={() => triggerProcess('Download')}>
                      📥 Download
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 4. FOOTER GRADIENT SUMMARY */}
      <div className="p-4 text-white rounded-4 shadow-sm d-flex justify-content-between align-items-center" 
           style={{ background: 'linear-gradient(90deg, #0038a8 0%, #ce1126 100%)' }}>
        <div>
          <h5 className="fw-bold m-0">System Integrity Health</h5>
          <p className="m-0 small opacity-75">All datasets are synchronized with Riyadh HQ and Manila DMW Portals.</p>
        </div>
        <button className="btn btn-light fw-bold text-primary px-4 rounded-pill shadow-sm" onClick={() => triggerProcess('Logs')}>
          View Live Logs
        </button>
      </div>

      {}
      
      {}
      {isProcessing && (
        <div className="modal-overlay d-flex flex-column align-items-center justify-content-center" 
             style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(255,255,255,0.85)', zIndex: 5000 }}>
          <div className="spinner-border text-primary mb-3" style={{ width: '3rem', height: '3rem' }}></div>
          <h6 className="fw-bold text-primary text-uppercase" style={{ letterSpacing: '2px' }}>Updating Intelligence Hub...</h6>
        </div>
      )}

      {/* MODAL: EXPORT MASTER DATA */}
      {activeModal === 'Export' && (
        <div className="modal-overlay d-flex align-items-center justify-content-center" 
             style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 4000 }}>
          <div className="modern-card bg-white p-0 shadow-lg border-0 overflow-hidden" style={{ width: '480px', borderRadius: '25px' }}>
            <div className="p-4 text-white text-center" style={{ backgroundColor: phColors.blue }}>
              <h5 className="m-0 fw-bold">Master Data Export Tool</h5>
              <p className="small m-0 opacity-75">Select datasets for secure CSV generation</p>
            </div>
            <div className="p-4">
              <div className="bg-light p-3 rounded-4 border">
                {['Candidate Bio-Data', 'Principal Contract Terms', 'Deployment Financials', 'DMW Compliance Logs'].map((field, i) => (
                  <div className="form-check mb-2" key={i}>
                    <input className="form-check-input" type="checkbox" defaultChecked />
                    <label className="form-check-label small fw-bold text-muted">{field}</label>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-4 border-top d-flex gap-2">
              <button className="btn btn-link text-muted fw-bold w-100 text-decoration-none" onClick={() => setActiveModal(null)}>Cancel</button>
              <button className="btn text-white w-100 fw-bold rounded-pill" style={{ backgroundColor: phColors.success }} 
                      onClick={() => { alert('Master Export Initiated'); setActiveModal(null); }}>
                Generate CSV
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: LIVE LOGS (COMMANDER VIEW) */}
      {activeModal === 'Logs' && (
        <div className="modal-overlay d-flex align-items-center justify-content-center" 
             style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.7)', zIndex: 4000 }}>
          <div className="modern-card bg-dark p-0 shadow-lg border-0 overflow-hidden" style={{ width: '700px', borderRadius: '20px', border: '1px solid #444' }}>
            <div className="p-3 border-bottom border-secondary d-flex justify-content-between align-items-center text-white">
              <span className="fw-bold small">KALINGAGATE_LIVE_STREAM</span>
              <button className="btn btn-sm text-white" onClick={() => setActiveModal(null)}>✕</button>
            </div>
            <div className="p-3 font-monospace" style={{ height: '350px', overflowY: 'auto', fontSize: '13px', color: '#00ff00', lineHeight: '1.6' }}>
              <div>[19:54:10] <span className="text-info">SYNC</span>: Riyadh Server Handshake Successful</div>
              <div>[19:54:15] <span className="text-warning">DATA</span>: Principal "Saudi Aramco" updated Job Orders</div>
              <div>[19:54:22] <span className="text-white">AUTH</span>: Martha (Admin) generated deployment analytics</div>
              <div>[19:54:30] <span className="text-success">SUCCESS</span>: 12 Medical Certificates verified via DMW Portal</div>
              <div>[19:54:35] <span className="text-info">SYNC</span>: Manila Backup node operational</div>
              <div className="animate-pulse">_</div>
            </div>
            <div className="p-2 bg-secondary text-center text-white-50" style={{ fontSize: '10px' }}>ENCRYPTED SESSION ACTIVE</div>
          </div>
        </div>
      )}

      {/* MODAL: SCHEDULER */}
      {activeModal === 'Schedule' && (
        <div className="modal-overlay d-flex align-items-center justify-content-center" 
             style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 4000 }}>
           <div className="modern-card bg-white p-4 shadow-lg border-0" style={{ width: '450px', borderRadius: '25px' }}>
             <h5 className="fw-bold mb-3" style={{ color: phColors.blue }}>Automation Engine</h5>
             <div className="mb-3">
               <label className="small fw-bold text-muted">Interval Frequency</label>
               <select className="form-select bg-light border-0 py-2 mt-1">
                 <option>Every Monday (08:00 AM)</option>
                 <option>Daily Summary (23:00 PM)</option>
                 <option>Real-time (Critical Only)</option>
               </select>
             </div>
             <div className="mb-4">
               <label className="small fw-bold text-muted">Distribution List</label>
               <input type="text" className="form-control bg-light border-0 py-2 mt-1" defaultValue="executive@kalingagate.com" />
             </div>
             <button className="btn w-100 text-white fw-bold py-2 rounded-pill shadow-sm" 
                     style={{ backgroundColor: phColors.blue }}
                     onClick={() => { alert('Automation Configured!'); setActiveModal(null); }}>
               Save Schedule
             </button>
             <button className="btn btn-link text-muted w-100 mt-2 text-decoration-none small" onClick={() => setActiveModal(null)}>Dismiss</button>
           </div>
        </div>
      )}
    </div>
  );
};

export default ReportsView;