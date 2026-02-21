import React, { useState } from 'react';

const VoucherView = () => {

  const [activeModal, setActiveModal] = useState(null); 
  const [isProcessing, setIsProcessing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const phColors = {
    blue: '#0038a8',
    red: '#ce1126',
    gold: '#fcd116',
    success: '#198754',
    bgLight: '#f4f7fc'
  };

  const voucherData = [
    { id: "VCH-2026-001", payee: "St. Lukes Medical", category: "Medical Fees", amount: "₱45,000.00", date: "Feb 20, 2026", status: "Approved", method: "Bank Transfer" },
    { id: "VCH-2026-002", payee: "Harold Fernand", category: "Refund / Cash Advance", amount: "₱5,500.00", date: "Feb 19, 2026", status: "Pending", method: "Cash" },
    { id: "VCH-2026-003", payee: "DHL Express", category: "Document Courier", amount: "₱2,150.00", date: "Feb 18, 2026", status: "Paid", method: "Check" },
    { id: "VCH-2026-004", payee: "Manila Hotel (Event)", category: "Principal Hosting", amount: "₱120,000.00", date: "Feb 15, 2026", status: "For Review", method: "Bank Transfer" },
  ];

  const triggerAction = (modalType) => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setActiveModal(modalType);
    }, 600);
  };

  return (
    <div className="view-container animate-fade-in p-2">
      
      {/* 1. FINANCIAL HEADER */}
      <div className="d-flex justify-content-between align-items-center mb-4 p-3 bg-white shadow-sm" style={{ borderRadius: '15px', borderLeft: `6px solid ${phColors.blue}` }}>
        <div>
          <h2 className="fw-bold mb-0" style={{ color: phColors.blue }}>Disbursement & Vouchers</h2>
          <p className="text-muted mb-0 small">KalingaGate Treasury | Expense Tracking & Fund Allocation</p>
        </div>
        <div className="d-flex gap-2">
           <button className="btn btn-sm border px-3 fw-bold" 
                   style={{ backgroundColor: '#fff9db', color: '#856404', borderRadius: '50px', border: '1px solid #ffeeba' }}
                   onClick={() => triggerAction('Verify')}>
             🛡️ Verify Voucher
           </button>
           <button className="btn btn-sm text-white rounded-pill px-4 fw-bold shadow-sm" 
                   style={{ backgroundColor: phColors.blue }}
                   onClick={() => triggerAction('NewVoucher')}>
             ➕ Create Disbursement
           </button>
        </div>
      </div>

      {/* 2. TREASURY KPI CARDS */}
      <div className="row g-4 mb-4">
        {[
          { label: 'TOTAL DISBURSED (FEB)', val: '₱172,650', color: phColors.blue, icon: '🏦' },
          { label: 'PENDING APPROVALS', val: '08', color: phColors.red, icon: '⏳' },
          { label: 'OPERATIONAL BUDGET', val: '84%', color: phColors.success, icon: '📈' }
        ].map((stat, idx) => (
          <div className="col-md-4" key={idx}>
            <div className="modern-card p-4 bg-white shadow-sm border-0 h-100 position-relative overflow-hidden" style={{ borderRadius: '20px' }}>
              <div className="position-absolute opacity-10" style={{ right: '10px', bottom: '-10px', fontSize: '5rem' }}>{stat.icon}</div>
              <h6 className="fw-bold text-muted small text-uppercase">{stat.label}</h6>
              <h2 className="fw-black m-0" style={{ color: stat.color }}>{stat.val}</h2>
              <div className="mt-2 small text-primary fw-bold">View Ledger →</div>
            </div>
          </div>
        ))}
      </div>

      {/* 3. VOUCHER REGISTRY TABLE */}
      <div className="modern-card bg-white shadow-sm border-0 overflow-hidden" style={{ borderRadius: '15px' }}>
        <div className="p-3 border-bottom d-flex justify-content-between align-items-center bg-light">
          <div className="input-group input-group-sm w-25">
             <input type="text" className="form-control rounded-pill px-3" placeholder="Search Payee..." onChange={(e) => setSearchTerm(e.target.value)} />
          </div>
          <span className="badge bg-white text-dark border px-3 py-2 rounded-pill small fw-bold">FY 2026 | Q1 Period</span>
        </div>
        <div className="table-responsive">
          <table className="table table-hover align-middle m-0">
            <thead className="small text-white" style={{ backgroundColor: phColors.blue }}>
              <tr>
                <th className="ps-4 py-3">VOUCHER ID</th>
                <th>PAYEE / ENTITY</th>
                <th>CATEGORY</th>
                <th>AMOUNT</th>
                <th>STATUS</th>
                <th className="text-center">DOCUMENTS</th>
              </tr>
            </thead>
            <tbody>
              {voucherData.map((vch, i) => (
                <tr key={i}>
                  <td className="ps-4 fw-bold">{vch.id}</td>
                  <td>
                    <div className="fw-bold text-dark">{vch.payee}</div>
                    <small className="text-muted">{vch.method}</small>
                  </td>
                  <td><span className="text-muted small">{vch.category}</span></td>
                  <td className="fw-bold text-dark">{vch.amount}</td>
                  <td>
                    <span className={`badge rounded-pill ${
                      vch.status === 'Approved' ? 'bg-success text-white' : 
                      vch.status === 'Pending' ? 'bg-warning text-dark' : 'bg-info text-white'
                    }`}>
                      {vch.status}
                    </span>
                  </td>
                  <td className="text-center">
                    <button className="btn btn-sm btn-outline-primary rounded-pill px-3 fw-bold" onClick={() => triggerAction('Details')}>
                      Open File
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {}

      {}
      {isProcessing && (
        <div className="modal-overlay d-flex flex-column align-items-center justify-content-center" 
             style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(255,255,255,0.9)', zIndex: 5000 }}>
          <div className="spinner-grow text-primary mb-3"></div>
          <h6 className="fw-bold text-primary text-uppercase">Accessing Financial Vault...</h6>
        </div>
      )}

      {/* MODAL: NEW DISBURSEMENT */}
      {activeModal === 'NewVoucher' && (
        <div className="modal-overlay d-flex align-items-center justify-content-center" 
             style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 4000 }}>
          <div className="modern-card bg-white p-0 shadow-lg border-0 overflow-hidden" style={{ width: '650px', borderRadius: '25px' }}>
            <div className="p-4 text-white d-flex justify-content-between align-items-center" style={{ backgroundColor: phColors.blue }}>
              <h5 className="m-0 fw-bold">Voucher Creation Wizard</h5>
              <button className="btn btn-sm text-white fs-4" onClick={() => setActiveModal(null)}>&times;</button>
            </div>
            <div className="p-4" style={{ backgroundColor: '#f8fbff' }}>
              <form className="row g-3 bg-white p-4 rounded-4 shadow-sm border">
                <div className="col-md-12">
                  <label className="small fw-bold text-muted">Payee Name</label>
                  <input type="text" className="form-control bg-light border-0" placeholder="Individual or Company Name" />
                </div>
                <div className="col-md-6">
                  <label className="small fw-bold text-muted">Amount (PHP)</label>
                  <input type="number" className="form-control bg-light border-0" placeholder="0.00" />
                </div>
                <div className="col-md-6">
                  <label className="small fw-bold text-muted">Payment Method</label>
                  <select className="form-select bg-light border-0">
                    <option>Bank Transfer</option>
                    <option>Check</option>
                    <option>Petty Cash</option>
                  </select>
                </div>
                <div className="col-md-12">
                  <label className="small fw-bold text-muted">Purpose / Particulars</label>
                  <textarea className="form-control bg-light border-0" rows="2" placeholder="Describe the reason for disbursement"></textarea>
                </div>
              </form>
            </div>
            <div className="p-4 bg-white border-top d-flex gap-2 justify-content-end">
              <button className="btn btn-link text-muted fw-bold text-decoration-none" onClick={() => setActiveModal(null)}>Cancel</button>
              <button className="btn text-white fw-bold px-5 rounded-pill shadow-sm" style={{ backgroundColor: phColors.success }} onClick={() => {alert('Voucher Queued for Approval'); setActiveModal(null);}}>Submit for Approval</button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: VERIFY VOUCHER (QR/CODE SIMULATION) */}
      {activeModal === 'Verify' && (
        <div className="modal-overlay d-flex align-items-center justify-content-center" 
             style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 4000 }}>
          <div className="modern-card bg-white p-5 shadow-lg border-0 text-center" style={{ width: '400px', borderRadius: '30px' }}>
            <div className="mb-4" style={{ fontSize: '3rem' }}>🛡️</div>
            <h5 className="fw-bold">Integrity Verification</h5>
            <p className="small text-muted mb-4">Input Voucher Reference Code to verify its authenticity in the ledger.</p>
            <input type="text" className="form-control text-center mb-3 fw-bold border-2" placeholder="VCH-XXXX-XXXX" style={{ borderColor: phColors.gold }} />
            <button className="btn btn-ph-blue w-100 text-white fw-bold rounded-pill py-2" style={{ backgroundColor: phColors.blue }} onClick={() => {alert('Voucher Verified & Authentic'); setActiveModal(null);}}>Verify Record</button>
          </div>
        </div>
      )}

      {/* MODAL: VOUCHER DETAILS / DIGITAL CHECK */}
      {activeModal === 'Details' && (
        <div className="modal-overlay d-flex align-items-center justify-content-center" 
             style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.7)', zIndex: 4000 }}>
          <div className="bg-white p-0 shadow-lg border-0" style={{ width: '700px', borderRadius: '15px', position: 'relative' }}>
            {/* PPT SLIDE WATERMARK */}
            <div className="p-5">
              <div className="d-flex justify-content-between align-items-start border-bottom pb-3 mb-4">
                <div>
                  <h4 className="fw-bold m-0" style={{ color: phColors.blue }}>OFFICIAL DISBURSEMENT VOUCHER</h4>
                  <p className="text-muted small">KalingaGate Recruitment Services Inc.</p>
                </div>
                <div className="text-end">
                  <div className="badge bg-success mb-1">PAID & CLEARED</div>
                  <div className="small fw-bold">Ref: VCH-2026-001</div>
                </div>
              </div>

              <div className="row mb-4">
                <div className="col-6">
                  <label className="x-small fw-bold text-muted text-uppercase">Pay To the Order Of:</label>
                  <p className="fw-bold border-bottom">St. Lukes Medical Center - Global City</p>
                </div>
                <div className="col-6 text-end">
                  <label className="x-small fw-bold text-muted text-uppercase">Amount in Words:</label>
                  <p className="fw-bold border-bottom italic">Forty-Five Thousand Pesos Only</p>
                </div>
              </div>

              <div className="bg-light p-3 rounded-3 mb-4">
                <table className="table table-sm table-borderless m-0 small">
                  <thead><tr className="border-bottom"><th>PARTICULARS</th><th className="text-end">AMOUNT</th></tr></thead>
                  <tbody>
                    <tr><td>Medical Examination for 15 Candidates (Aramco Project)</td><td className="text-end">₱45,000.00</td></tr>
                  </tbody>
                </table>
              </div>

              <div className="d-flex justify-content-between align-items-end mt-5">
                <div className="text-center">
                  <div className="border-bottom px-4 italic">Martha A.</div>
                  <small className="text-muted">Prepared By</small>
                </div>
                <div className="text-center">
                   <div className="border-bottom px-4 fw-bold text-primary font-monospace" style={{ transform: 'rotate(-2deg)' }}>STAMPED_VERIFIED</div>
                   <small className="text-muted">Treasury Status</small>
                </div>
                <div className="text-center">
                  <button className="btn btn-dark btn-sm rounded-pill px-4" onClick={() => setActiveModal(null)}>Close View</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VoucherView;