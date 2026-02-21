import React from 'react';


const LogOutView = () => { 
  const handleLogout = () => {
    if (window.confirm("Confirm Sign Out?")) {
      window.location.reload(); 
    }
  };

  return (
    <div className="d-flex">
      <nav className="bg-white border-end" style={{ width: '280px', height: '100vh', position: 'fixed', display: 'flex', flexDirection: 'column' }}>
        <div className="p-4">
          <h4 className="fw-bold text-primary">KALINGA<span className="text-dark">GATE</span></h4>
        </div>
        
        <div className="flex-grow-1 px-3">
          <div className="nav-link active p-3 mb-2 rounded bg-light" style={{cursor: 'pointer'}}>👥 Applicants</div>
          <div className="nav-link p-3 mb-2 text-muted" style={{cursor: 'pointer'}}>📁 Employers</div>
          <div className="nav-link p-3 mb-2 text-muted" style={{cursor: 'pointer'}}>📊 Reports</div>
        </div>

        <div className="p-3 border-top">
          <button 
            onClick={handleLogout}
            className="btn btn-link text-danger text-decoration-none w-100 d-flex align-items-center gap-2 fw-bold"
          >
            <span style={{ fontSize: '20px' }}>⏻</span> Logout
          </button>
        </div>
      </nav>

      <main style={{ marginLeft: '280px', width: 'calc(100% - 280px)', backgroundColor: '#f8f9fa', minHeight: '100vh', padding: '20px' }}>
        {}
        {}
        
        {/* Placeholder text to test the layout */}
        <div className="container">
           <h2>Welcome to the Dashboard</h2>
           <p>If you see this, the white screen is fixed!</p>
        </div>
      </main>
    </div>
  );
};

export default LogOutView;