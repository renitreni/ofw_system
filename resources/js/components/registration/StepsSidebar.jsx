import React from "react";

export default function StepsSidebar({ regStep, setRegStep, completedSteps = [] }) {
    const steps = [
        'Account Information',
        'Personal Details',
        'Upload Documents',
        'Profile Completed',
        'Book Appointment'
    ];

    return (
        <div className="steps-sidebar">
            {steps.map((step, index) => {
                const isActive = regStep === step;
                const isCompleted = completedSteps.includes(step);

                return (
                    <React.Fragment key={step}>
                        <button
                            className={`step-card-btn ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}
                            onClick={() => setRegStep(step)}
                        >
                            {step}
                            {isCompleted && <span className="checkmark">✔</span>} {/* optional checkmark */}
                        </button>

                        {/* connector except after last step */}
                        {index < steps.length - 1 && <div className="step-connector"></div>}
                    </React.Fragment>
                );
            })}
        </div>
    );
}
