import React, { useState, useEffect } from 'react';
import Sidebar from '../components/common/Sidebar';
import Header from '../components/common/Header';
import DashboardHome from '../components/dashboard/DashboardHome';
import RegistrationFlow from '../components/registration/RegistrationFlow';
import EmailVerificationModal from '../components/modals/EmailVerificationModal';
import BookingSuccessModal from '../components/modals/BookingSuccessModal';

const OfwPage = () => {
    const ofwId = window.AUTH_OFW_ID; // unique user ID

    // ---- Per-user keys for registration ----
    const storageKeyPage = `ofwActivePage_${ofwId}`;
    const storageKeyShowReg = `ofwShowRegistration_${ofwId}`;
    const storageKeyRegStep = `ofwRegStep_${ofwId}`;

    const [activePage, setActivePage] = useState(() => localStorage.getItem(storageKeyPage) || 'dashboard');
    const [showRegistration, setShowRegistration] = useState(() => localStorage.getItem(storageKeyShowReg) === 'true' || false);
    const [regStep, setRegStep] = useState(() => localStorage.getItem(storageKeyRegStep) || 'Account Information');

    const [isVerifying, setIsVerifying] = useState(false);
    const [isBookingComplete, setIsBookingComplete] = useState(false);
    const [selectedSession, setSelectedSession] = useState("");
    const [selectedSlotId, setSelectedSlotId] = useState(null);

    const slotsData = {
        morning: [
            { id: 1, date: "10-20-26", time: "8:00 am - 10:00 am" },
            { id: 2, date: "10-20-26", time: "10:30 am - 12:00 pm" }
        ],
        afternoon: [
            { id: 3, date: "10-21-26", time: "1:00 pm - 3:00 pm" },
            { id: 4, date: "10-21-26", time: "3:30 pm - 5:30 pm" }
        ],
        evening: [
            { id: 5, date: "10-22-26", time: "6:00 pm - 8:00 pm" },
            { id: 6, date: "10-22-26", time: "8:30 pm - 10:00 pm" }
        ]
    };

    // ---- Persist per-user state ----
    useEffect(() => {
        localStorage.setItem(storageKeyPage, activePage);
        localStorage.setItem(storageKeyShowReg, showRegistration);
        localStorage.setItem(storageKeyRegStep, regStep);
    }, [activePage, showRegistration, regStep, storageKeyPage, storageKeyShowReg, storageKeyRegStep]);

    // ---- Clear old user data if a new user logs in ----
    useEffect(() => {
        const lastOfw = localStorage.getItem('currentOfwId');

        if (lastOfw !== String(ofwId)) {
            // Only clear the previous user's keys
            if (lastOfw) {
                localStorage.removeItem(`ofwActivePage_${lastOfw}`);
                localStorage.removeItem(`ofwShowRegistration_${lastOfw}`);
                localStorage.removeItem(`ofwRegStep_${lastOfw}`);
                localStorage.removeItem(`regFormData_${lastOfw}`);
                localStorage.removeItem(`regCompletedSteps_${lastOfw}`);
            }

            localStorage.setItem('currentOfwId', ofwId);

            setActivePage('dashboard');
            setShowRegistration(false);
            setRegStep('Account Information');
        }
    }, [ofwId]);

    return (
        <div className="ofw-container">
            <Sidebar
                activePage={activePage}
                setActivePage={setActivePage}
                setShowRegistration={setShowRegistration}
                setIsVerifying={setIsVerifying}
                setIsBookingComplete={setIsBookingComplete}
            />

            <main className="ofw-main">
                <Header />

                <div className="dashboard-frame">
                    <EmailVerificationModal
                        isVerifying={isVerifying}
                        setIsVerifying={setIsVerifying}
                        setRegStep={setRegStep}
                    />

                    <BookingSuccessModal
                        isBookingComplete={isBookingComplete}
                        setIsBookingComplete={setIsBookingComplete}
                        setShowRegistration={setShowRegistration}
                        setActivePage={setActivePage}
                        setSelectedSlotId={setSelectedSlotId}
                        setSelectedSession={setSelectedSession}
                    />

                    {showRegistration ? (
                        <RegistrationFlow
                            regStep={regStep}
                            setRegStep={setRegStep}
                        />
                    ) : (
                        activePage === 'dashboard' && (
                            <DashboardHome setShowRegistration={setShowRegistration} />
                        )
                    )}
                </div>
            </main>
        </div>
    );
};

export default OfwPage;
