import { useState, useEffect } from 'react';
import axios from 'axios';

export default function PersonalDetailsForm({ formData = {}, setFormData, onComplete }) {

    const [form, setForm] = useState({
        address: '',
        birthdate: '',
        civil_status: '',
    });

    const [errorMsg, setErrorMsg] = useState('');
    const [saving, setSaving] = useState(false);
    // hydrate form when formData changes (important!)
    useEffect(() => {
        setForm({
            address: formData.address || '',
            birthdate: formData.birthdate || '',
            civil_status: formData.civil_status || '',
        });
    }, [formData]);

    const handleChange = (e) => {
        setForm(prev => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleNext = async () => {
        // frontend validation
        if (!form.address || !form.birthdate || !form.civil_status) {
            setErrorMsg('Please fill out all fields.');
            return;
        }

        const ofwId = formData.id || localStorage.getItem('ofw_id');

        if (!ofwId) {
            setErrorMsg("OFW record not found. Please verify your email again.");
            return;
        }

        try {
            setSaving(true);
            setErrorMsg('');

            const res = await axios.post('/api/personal-details', {
                ofw_id: ofwId,
                ...form,
            });

            // update global formData
            setFormData(prev => ({
                ...prev,
                ...form,
            }));

            setSaving(false);
            if (onComplete) onComplete();

        } catch (error) {
            console.error("Personal details error:", error.response || error);
            setErrorMsg(
                error.response?.data?.message ||
                'Failed to save personal details. Try again.'
            );
            setSaving(false);
        }
    };



    return (
        <>
            <p className="form-instruction">Fill out forms:</p>

            {errorMsg && <p style={{ color: 'red' }}>{errorMsg}</p>}

            <input
                type="text"
                name="address"
                placeholder="Address"
                className="reg-input"
                value={form.address}
                onChange={handleChange}
            />

            <div className="input-with-icon">
                <input
                    type="date"
                    name="birthdate"
                    className="reg-input"
                    value={form.birthdate}
                    onChange={handleChange}
                />
                <span className="calendar-icon">🗓️</span>
            </div>

            <select
                name="civil_status"
                className="reg-input reg-select"
                value={form.civil_status}
                onChange={handleChange}
            >
                <option value="" disabled>Civil Status</option>
                <option value="single">Single</option>
                <option value="married">Married</option>
                <option value="widowed">Widowed</option>
                <option value="separated">Separated</option>
            </select>

            <button
                className="next-step-btn centered-btn"
                onClick={handleNext}
                disabled={saving}
            >
                {saving ? 'Saving...' : 'Next'}
            </button>
        </>
    );
}
