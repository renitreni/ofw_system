export default function ProfileCompleted({ onContinue }) {
    return (
        <div className="success-message">
            <div className="success-header">
                <span className="check-icon">✅</span>
                <h2 className="success-title">Profile Completed!</h2>
            </div>

            <p className="success-text">
                Documents reviewed. Proceed to booking.
            </p>

            <button
                className="next-step-btn centered-btn"
                onClick={onContinue}
            >
                Proceed to Booking
            </button>
        </div>
    );
}
