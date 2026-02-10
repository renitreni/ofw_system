export default function BookingSuccessModal({
    isBookingComplete,
    setIsBookingComplete,
    setShowRegistration,
    setActivePage,
    setSelectedSlotId,
    setSelectedSession
}) {
    if (!isBookingComplete) return null;

    return (
        <div className="verification-overlay">
            <div className="verify-card success-pop">
                <div className="mail-icon-circle success-circle">
                    <span className="mail-emoji">✅</span>
                </div>

                <h2>Completed</h2>

                <div className="summary-details">
                    <p><strong>Reference:</strong> #OFW-2026-77B2</p>
                    <p><strong>Schedule:</strong> Oct 20, 2026 | Selected Session Time</p>
                    <p className="reminder-text">
                        Please bring original copies of your uploaded documents on your appointment date.
                    </p>
                </div>

                <div className="popup-button-group">
                    <button
                        className="open-email-btn secondary-btn"
                        onClick={() => window.print()}
                    >
                        Print Confirmation
                    </button>

                    <button
                        className="open-email-btn"
                        onClick={() => {
                            setIsBookingComplete(false);
                            setShowRegistration(false);
                            setActivePage('dashboard');
                            setSelectedSlotId(null);
                            setSelectedSession("");
                        }}
                    >
                        Done
                    </button>
                </div>
            </div>
        </div>
    );
}
