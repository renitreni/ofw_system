import { useState } from "react";

export default function SignUp() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [role, setRole] = useState("Ofw");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Frontend validation
        if (!name.trim() || !email.trim() || !password || !passwordConfirmation) {
            alert("Please fill out all required fields.");
            return;
        }

        if (password !== passwordConfirmation) {
            alert("Password and confirmation do not match.");
            return;
        }

        setLoading(true);

        try {
            const res = await fetch("/api/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name,
                    email,
                    password,
                    password_confirmation: passwordConfirmation,
                    role,
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                // Show all validation errors
                if (data.errors) {
                    const messages = Object.values(data.errors).flat().join("\n");
                    alert(messages);
                } else {
                    alert(data.message || "Registration failed");
                }
                setLoading(false);
                return;
            }

            alert("Registration successful! You can now login.");
            window.location.href = "/login";

        } catch (err) {
            console.error(err);
            alert("Something went wrong. Try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container min-vh-100 d-flex align-items-center justify-content-center">
            <div className="col-md-4">
                <div className="card shadow-sm">
                    <div className="card-body p-4">
                        <h4 className="text-center mb-4 fw-bold">Sign Up</h4>

                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label className="form-label">Full Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter your name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Email address</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Confirm Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Confirm your password"
                                    value={passwordConfirmation}
                                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Role</label>
                                <select
                                    className="form-select"
                                    value={role}
                                    onChange={(e) => setRole(e.target.value)}
                                    required
                                >
                                    <option value="Agency">Agency</option>
                                    <option value="Agent">Agent</option>
                                    <option value="Ofw">OFW</option>
                                </select>
                            </div>

                            <div className="d-grid mb-3">
                                <button type="submit" className="btn btn-success" disabled={loading}>
                                    {loading ? "Signing Up..." : "Sign Up"}
                                </button>
                            </div>

                            <div className="text-center">
                                <small>
                                    Already have an account? <a href="/login">Login</a>
                                </small>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </div>
    );
}
