export default function BookAppointment({
    selectedSession,
    setSelectedSession,
    selectedSlotId,
    setSelectedSlotId,
    slotsData,
    setIsBookingComplete
}) {
    return (
        <div className="appointment-view">
            <div className="appointment-selection-card">
                <select
                    className="reg-input reg-select schedule-select"
                    value={selectedSession}
                    onChange={(e) => {
                        setSelectedSession(e.target.value);
                        setSelectedSlotId(null);
                    }}
                >
                    <option value="" disabled>Choose Available Schedule</option>
                    <option value="morning">Morning Session</option>
                    <option value="afternoon">Afternoon Session</option>
                    <option value="evening">Evening Session</option>
                </select>

                <div className="slots-table-container">
                    <div className="table-header">Available Slots</div>

                    <table className="slots-table">
                        <thead>
                            <tr><th>Date</th><th>Time</th><th>Select</th></tr>
                        </thead>

                        <tbody>
                            {selectedSession && slotsData[selectedSession].map((slot) => (
                                <tr key={slot.id} className={selectedSlotId === slot.id ? "selected-row" : ""}>
                                    <td>{slot.date}</td>
                                    <td>{slot.time}</td>
                                    <td>
                                        <input
                                            type="checkbox"
                                            className="slot-checkbox"
                                            checked={selectedSlotId === slot.id}
                                            onChange={() => setSelectedSlotId(slot.id)}
                                        />
                                    </td>
                                </tr>
                            ))}

                            {!selectedSession && (
                                <tr>
                                    <td colSpan="3" style={{ padding: '20px', color: '#888' }}>
                                        Please select a session to view slots
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <button
                className={`next-step-btn centered-btn ${!selectedSlotId ? "disabled-btn" : ""}`}
                disabled={!selectedSlotId}
                onClick={() => setIsBookingComplete(true)}
            >
                Appointment Booked
            </button>
        </div>
    );
}
