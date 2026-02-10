export default function Sidebar({
    activePage,
    setActivePage,
    setShowRegistration,
    setIsVerifying,
    setIsBookingComplete
}) {
    return (
        <aside className="ofw-sidebar">
            <div className="sidebar-brand">
                <div className="logo-icon">🐋</div>
                <h2 className="logo-text">Logo Name</h2>
            </div>

            <nav className="nav-group">
                <p className="nav-label">MAIN MENU</p>

                <button
                    className={`nav-btn ${activePage === 'dashboard' ? 'active' : ''}`}
                    onClick={() => {
                        setActivePage('dashboard');
                        setShowRegistration(false);
                        setIsVerifying(false);
                        setIsBookingComplete(false);
                    }}
                >
                    <span className="icon">📊</span> Dashboard
                </button>

                <button
                    className={`nav-btn ${activePage === 'appointment' ? 'active' : ''}`}
                    onClick={() => {
                        setActivePage('appointment');
                        setShowRegistration(false);
                        setIsVerifying(false);
                        setIsBookingComplete(false);
                    }}
                >
                    <span className="icon">📅</span> Appointment
                </button>
            </nav>

            <nav className="nav-group settings-group">
                <p className="nav-label">SETTINGS</p>
                <button className="nav-btn">
                    <span className="icon">⚙️</span> Settings
                </button>
                <button
                    className="nav-btn"
                    onClick={async () => {
                        try {
                            const ofwId = localStorage.getItem('AUTH_OFW_ID');
                            const formData = localStorage.getItem(`regFormData_${ofwId}`);
                            const completedSteps = localStorage.getItem(`regCompletedSteps_${ofwId}`);

                            // 1️⃣ Optional: save progress
                            if (ofwId && formData && completedSteps) {
                                await axios.post('/api/save-registration-progress', {
                                    ofw_id: ofwId,
                                    form_data: JSON.parse(formData),
                                    completed_steps: JSON.parse(completedSteps),
                                });
                            }
                        } catch (error) {
                            console.error('Failed to save progress:', error);
                        }

                        // 2️⃣ Clear everything
                        localStorage.clear();
                        sessionStorage.clear();

                        // 3️⃣ HARD redirect (no React render)
                        window.location.replace('/login');
                    }}
                >
                    <span className="icon">⬅️</span> Log Out
                </button>

            </nav>
        </aside>
    );
}
