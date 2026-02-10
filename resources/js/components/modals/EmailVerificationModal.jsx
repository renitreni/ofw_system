import { useState, useEffect } from 'react';
import axios from 'axios';

export default function EmailVerificationModal({
    isVerifying,
    setIsVerifying,
    setRegStep,
    formData = {},
    setFormData,
    onAccountInfoComplete,
}) {
    const [isChangingEmail, setIsChangingEmail] = useState(false);
    const [newEmail, setNewEmail] = useState(formData.email || "");
    const [verificationCode, setVerificationCode] = useState("");
    const [codeSent, setCodeSent] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [showSuccess, setShowSuccess] = useState(false);
    const [savingData, setSavingData] = useState(false);

    useEffect(() => {
        if (isVerifying && formData.email) {
            setNewEmail(formData.email);
            sendVerificationCode(formData.email);
        }
    }, [isVerifying, formData.email]);

    const sendVerificationCode = async (email) => {
        try {
            await axios.post('/api/send-verification-code', { email });
            setCodeSent(true);
            setErrorMsg("");
        } catch (error) {
            console.error(error);
            setErrorMsg("Failed to send verification code. Try again.");
        }
    };

    const submitCode = async () => {
        if (!newEmail || !verificationCode) {
            setErrorMsg("Please enter the verification code.");
            return;
        }

        try {
            // 1️⃣ Verify the code first
            const res = await axios.post('/api/verify-code', {
                email: newEmail,
                code: verificationCode,
            });

            if (!res.data.success) {
                setErrorMsg(res.data.message || "Incorrect verification code.");
                return;
            }

            setSavingData(true);

            // 2️⃣ Save or update OFW data
            let agency_id = formData.agency_id || null;

            if (formData.agency === "other" && formData.new_agency_name) {
                // Create new agency if "Other" is selected
                const agencyRes = await axios.post('/api/agencies', {
                    name: formData.new_agency_name,
                    status: 'pending',
                });
                agency_id = agencyRes.data.id;
            }

            let ofwRes;
            if (formData.id) {
                // Update existing OFW
                ofwRes = await axios.put(`/api/ofws/${formData.id}`, {
                    full_name: formData.full_name,
                    email: newEmail,
                    phone: formData.phone,
                    emergency_contact: formData.emergency_contact,
                    agency_id,
                });
            } else {
                // Create new OFW
                ofwRes = await axios.post('/api/ofws', {
                    full_name: formData.full_name,
                    email: newEmail,
                    phone: formData.phone,
                    emergency_contact: formData.emergency_contact,
                    agency_id,
                });
            }

            if (!ofwRes?.data?.success) {
                throw new Error("Failed to save OFW data after verification.");
            }

            const savedOfw = ofwRes.data.data;

            // 3️⃣ Update local state
            setFormData(prev => ({ ...prev, id: savedOfw.id, email: newEmail }));

            // 4️⃣ Show success modal
            setShowSuccess(true);
            setErrorMsg("");

            if (onAccountInfoComplete) onAccountInfoComplete();

        } catch (error) {
            console.error(error);
            setErrorMsg(error.message || "Error verifying code. Try again.");
        } finally {
            setSavingData(false);
        }
    };

    const saveOfwData = async () => {
        try {
            // Handle agency
            let agency_id = formData.agency_id || null;
            if (formData.agency === "other" && formData.new_agency_name) {
                const agencyRes = await axios.post('/api/agencies', {
                    name: formData.new_agency_name,
                    status: 'pending',
                });
                agency_id = agencyRes.data.id;
            }

            let ofwRes;
            if (formData.id) {
                // OFW already exists → update instead of create
                ofwRes = await axios.put(`/api/ofws/${formData.id}`, {
                    full_name: formData.full_name,
                    email: newEmail,
                    phone: formData.phone,
                    emergency_contact: formData.emergency_contact,
                    agency_id,
                });
            } else {
                // No existing OFW → create
                ofwRes = await axios.post('/api/ofws', {
                    full_name: formData.full_name,
                    email: newEmail,
                    phone: formData.phone,
                    emergency_contact: formData.emergency_contact,
                    agency_id,
                });
            }

            return ofwRes.data;
        } catch (error) {
            console.error(error);
            setErrorMsg("Failed to save your registration. Try again.");
        }
    };

    const closeSuccessModal = () => {
        setShowSuccess(false);
        setIsVerifying(false);
        setRegStep('Personal Details');
    };

    if (!isVerifying) return null;

    return (
        <div className="verification-overlay">
            <div className="verify-card custom-verify-modal">
                <div className="mail-icon-circle">
                    <span className="mail-emoji">✉️</span>
                </div>

                <h2>Verify your Email</h2>

                <p className="verify-text">
                    A verification code has been sent to <strong>{newEmail}</strong>.
                    Enter it below to continue.
                </p>

                {errorMsg && <p style={{ color: 'red' }}>{errorMsg}</p>}

                <div className="verify-actions-group">
                    <input
                        type="text"
                        placeholder="Enter verification code"
                        className="reg-input"
                        value={verificationCode}
                        onChange={(e) => setVerificationCode(e.target.value)}
                    />

                    <button
                        className="open-email-btn"
                        onClick={submitCode}
                        disabled={!verificationCode || savingData}
                    >
                        {savingData ? 'Saving...' : 'Submit Code'}
                    </button>

                    <p>
                        Not the correct email?
                        <button
                            className="text-action-btn"
                            onClick={() => setIsChangingEmail(true)}
                        >
                            Change email address
                        </button>
                    </p>

                    <p>
                        Did not receive?{' '}
                        <button
                            className="text-action-btn"
                            onClick={() => sendVerificationCode(newEmail)}
                        >
                            Resend Code
                        </button>
                    </p>
                </div>

                {isChangingEmail && (
                    <div className="inner-modal-overlay">
                        <div className="inner-modal-card">
                            <h3>Update Email Address</h3>

                            <input
                                type="email"
                                placeholder="Enter new email"
                                className="reg-input"
                                value={newEmail}
                                onChange={(e) => setNewEmail(e.target.value)}
                            />

                            <div className="inner-modal-buttons">
                                <button
                                    className="cancel-btn"
                                    onClick={() => setIsChangingEmail(false)}
                                >
                                    Cancel
                                </button>

                                <button
                                    className="confirm-btn"
                                    onClick={() => {
                                        setIsChangingEmail(false);
                                        sendVerificationCode(newEmail);
                                    }}
                                >
                                    Update & Send Code
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Success popup */}
                {showSuccess && (
                    <div className="inner-modal-overlay">
                        <div className="inner-modal-card">
                            <div className="success-header">
                                <span className="check-icon">✅</span>
                                <h2>Email Successfully Verified!</h2>
                            </div>
                            <button className="open-email-btn" onClick={closeSuccessModal}>
                                OK
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
