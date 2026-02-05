import React from "react";

const steps = [
    {
        step: "01",
        title: "Register Your Account",
        description: "Create an account to access and manage the monitoring system.",
        icon: "📝",
    },
    {
        step: "02",
        title: "Add OFW Details",
        description: "Enter personal, work, and location information of your OFW.",
        icon: "👤",
    },
    {
        step: "03",
        title: "Monitor Status & Location",
        description: "Track real-time location, job status, and activity updates.",
        icon: "📍",
    },
    {
        step: "04",
        title: "Receive Alerts & Updates",
        description: "Get notified about emergencies, health, or safety concerns.",
        icon: "🚨",
    },
    {
        step: "05",
        title: "Communicate with Your OFW",
        description: "Stay connected through messages and important announcements.",
        icon: "💬",
    },
];

function HowItWorks() {

    return (
        <section id="how-it-works" className="how-it-works">
            <div className="container">
                <h2 className="section-title">How It Works</h2>
                <p className="section-subtitle">
                    Simple steps to stay connected and informed
                </p>

                <div className="steps-grid">
                    {steps.map((item, index) => (
                        <div className="step-card" key={index}>
                            <div className="step-icon">{item.icon}</div>
                            <span className="step-number">{item.step}</span>
                            <h4>{item.title}</h4>
                            <p>{item.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default HowItWorks;
