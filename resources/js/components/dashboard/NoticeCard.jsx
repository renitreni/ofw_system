import React from "react";

const NoticeCard = () => {
    return (
        <div className="notice-container">
            <div className="notice-header-bar"></div>

            <div className="notice-inner-frame">
                <section className="appointment-card">
                    <div className="appointment-content-row">
                        <span className="notice-tag">NOTICE!</span>
                        <p className="notice-text">Your Appointment is booked</p>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default NoticeCard;
