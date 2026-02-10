import { useState, useEffect } from 'react';

export default function AccountInfoForm({ setIsVerifying, setFormData }) {
    const [form, setForm] = useState({
        full_name: '',
        email: '',
        phone: '',
        emergency_contact: '',
        agency_id: ''
    });

    const [otherAgencyName, setOtherAgencyName] = useState('');
    const [agencies, setAgencies] = useState([]);
    const [loadingAgencies, setLoadingAgencies] = useState(true);
    const [saving, setSaving] = useState(false);

    // Fetch Admin agencies from users table
    useEffect(() => {
        const fetchAgencies = async () => {
            try {
                const res = await fetch('http://127.0.0.1:8000/api/admin-agencies'); // <-- API returning users with role Admin
                const data = await res.json();
                setAgencies(data);
            } catch (error) {
                console.error('Failed to fetch agencies:', error);
            } finally {
                setLoadingAgencies(false);
            }
        };
        fetchAgencies();
    }, []);

    // Handle input change
    const handleChange = (e) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const handleVerify = async () => {
        // Basic validation
        if (!form.full_name.trim() || !form.email.trim()) {
            alert('Full Name and Email are required.');
            return;
        }

        if (!isValidEmail(form.email)) {
            alert('Please enter a valid email.');
            return;
        }

        if (form.agency_id === '0' && !otherAgencyName.trim()) {
            alert('Please type your agency name.');
            return;
        }

        setSaving(true);

        try {
            const dataToSend = { ...form };

            if (form.agency_id === '0') {
                // New agency
                dataToSend.agency_name = otherAgencyName;
                dataToSend.agency_id = null;
            } else if (dataToSend.agency_id) {
                dataToSend.agency_id = Number(dataToSend.agency_id);
            }

            console.log('Sending data to backend:', dataToSend);

            const res = await fetch('http://127.0.0.1:8000/api/ofws', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dataToSend),
            });

            const text = await res.text();
            console.log('Backend response:', text);

            if (!res.ok) {
                throw new Error(text || 'Failed to save OFW record');
            }

            const savedOfw = JSON.parse(text);
            console.log('Saved OFW:', savedOfw);

            localStorage.setItem('ofw_id', savedOfw.data.id);
            setFormData(savedOfw.data);
            setIsVerifying(true);

        } catch (error) {
            console.error(error);
            alert(error.message || 'Failed to save your account info. Try again.');
        } finally {
            setSaving(false);
        }
    };

    return (
        <>
            <p className="form-instruction">Fill out the form:</p>

            <input
                type="text"
                name="full_name"
                placeholder="Full Name"
                className="reg-input"
                value={form.full_name}
                onChange={handleChange}
            />

            <input
                type="email"
                name="email"
                placeholder="Email"
                className="reg-input"
                value={form.email}
                onChange={handleChange}
            />

            <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                className="reg-input"
                value={form.phone}
                onChange={handleChange}
            />

            <input
                type="text"
                name="emergency_contact"
                placeholder="Emergency Contact"
                className="reg-input"
                value={form.emergency_contact}
                onChange={handleChange}
            />

            {/* Agency Dropdown */}
            {loadingAgencies ? (
                <p>Loading agencies...</p>
            ) : (
                <>
                    <select
                        name="agency_id"
                        className="reg-input"
                        value={form.agency_id}
                        onChange={handleChange}
                    >
                        <option value="">Select your Agency</option>
                        {agencies.map(a => (
                            <option key={a.id} value={a.id}>{a.name}</option>
                        ))}
                        <option value="0">Other / Not Listed</option>
                    </select>

                    {form.agency_id === '0' && (
                        <input
                            type="text"
                            placeholder="Type your Agency"
                            className="reg-input"
                            value={otherAgencyName}
                            onChange={e => setOtherAgencyName(e.target.value)}
                        />
                    )}
                </>
            )}

            <button
                className="next-step-btn centered-btn"
                onClick={handleVerify}
                disabled={saving}
            >
                {saving ? 'Saving...' : 'Verify Email'}
            </button>
        </>
    );
}
