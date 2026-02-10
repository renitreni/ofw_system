import React, { useState, useEffect } from 'react';

import StepsSidebar from '../registration/StepsSidebar';
import AccountInfoForm from '../registration/AccountInfoForm';
import PersonalDetailsForm from '../registration/PersonalDetailsForm';
import UploadDocuments from '../registration/UploadDocuments';
import ProfileCompleted from '../registration/ProfileCompleted';
import BookAppointment from '../registration/BookAppointment';
import EmailVerificationModal from '../modals/EmailVerificationModal';

export default function RegistrationFlow({
    regStep,
    setRegStep,
}) {
     const ofwId = window.AUTH_OFW_ID; // unique user ID

     // ---- LocalStorage keys per user ----
    const storageKeyData = `regFormData_${ofwId}`;
    const storageKeySteps = `regCompletedSteps_${ofwId}`;

    const [formData, setFormData] = useState(() => {
        const saved = localStorage.getItem('regFormData');
        return saved ? JSON.parse(saved) : {};
    });

    const [completedSteps, setCompletedSteps] = useState(() => {
        const saved = localStorage.getItem(storageKeySteps);
        return saved ? JSON.parse(saved) : [];
    });

    const [isVerifying, setIsVerifying] = useState(false);

    // ---- Persist ----
    useEffect(() => {
        localStorage.setItem(storageKeyData, JSON.stringify(formData));
    }, [formData]);

    useEffect(() => {
        localStorage.setItem(storageKeySteps, JSON.stringify(completedSteps));
    }, [completedSteps]);

    // ---- Step handlers ----
    const handleAccountInfoComplete = () => {
        if (!completedSteps.includes('Account Information')) {
            setCompletedSteps(prev => [...prev, 'Account Information']);
        }
        setRegStep('Personal Details');
    };

    const handlePersonalDetailsComplete = () => {
        if (!completedSteps.includes('Personal Details')) {
            setCompletedSteps(prev => [...prev, 'Personal Details']);
        }
        setRegStep('Upload Documents');
    };

    const handleDocumentsComplete = () => {
        if (!completedSteps.includes('Upload Documents')) {
            setCompletedSteps(prev => [...prev, 'Upload Documents']);
        }
        setRegStep('Profile Completed');
    };

    const resetRegistration = () => {
        localStorage.removeItem(storageKeyData);
        localStorage.removeItem(storageKeySteps);

        setFormData({});
        setCompletedSteps([]);
        setRegStep('Account Information');
    };

    return (
        <section className="registration-view">
            <h1 className="registration-title">Registration for Deployment</h1>

            <div className="registration-content">
                <StepsSidebar
                    regStep={regStep}
                    setRegStep={setRegStep}
                    completedSteps={completedSteps}
                />

                <EmailVerificationModal
                    isVerifying={isVerifying}
                    setIsVerifying={setIsVerifying}
                    setRegStep={setRegStep}
                    formData={formData}
                    setFormData={setFormData}
                    onAccountInfoComplete={handleAccountInfoComplete}
                />

                <div className="registration-form-card">
                    <div className="form-header">{regStep}</div>
                    <div className="form-body">

                        {regStep === 'Account Information' && (
                            <AccountInfoForm
                                setFormData={setFormData}
                                setIsVerifying={setIsVerifying}
                            />
                        )}

                        {regStep === 'Personal Details' && (
                            <PersonalDetailsForm
                                formData={formData}
                                setFormData={setFormData}
                                onComplete={handlePersonalDetailsComplete}
                            />
                        )}

                        {regStep === 'Upload Documents' && (
                            <UploadDocuments
                                formData={formData}
                                setRegStep={setRegStep} 
                                onComplete={handleDocumentsComplete}
                            />
                        )}

                        {regStep === 'Profile Completed' && (
                            <ProfileCompleted
                                onContinue={() => setRegStep('Book Appointment')}
                            />
                        )}

                        {regStep === 'Book Appointment' && (
                            <BookAppointment
                                formData={formData}
                            />
                        )}

                    </div>
                </div>
            </div>
        </section>
    );
}
