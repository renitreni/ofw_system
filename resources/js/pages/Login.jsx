import { useState } from "react";
import { Link } from "react-router-dom";

export default function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch("/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                alert(data.message);
                return;
            }

            if (data.role === "SuperAdmin") {
                window.location.href = "/superadmin/dashboard";
            } else if (data.role === "Admin") {
                window.location.href = "/admin/dashboard";
            } else if (data.role === "Agent") {
                window.location.href = "/agent/dashboard";
            } else {
                window.location.href = "/ofw/home";
            }
        } catch (err) {
            console.error(err);
            alert("Something went wrong");
        }
    };

    return (
        <div className="container min-vh-100 d-flex align-items-center justify-content-center">
            <div className="col-md-4">

                <div className="card shadow-sm">
                    <div className="card-body p-4">

                        <h4 className="text-center mb-4 fw-bold">
                            Login
                        </h4>

                        <form onSubmit={handleSubmit}>
                            {/* Email */}
                            <div className="mb-3">
                                <label className="form-label">Email address</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>

                            {/* Password */}
                            <div className="mb-3">
                                <label className="form-label">Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>

                            {/* Login Button */}
                            <div className="d-grid mb-3">
                                <button type="submit" className="btn btn-primary">
                                    Login
                                </button>
                            </div>

                            {/* Extra Links */}
                            <div className="text-center">
                                <small>
                                    Don’t have an account?{" "}
                                    <Link to="/register">Sign up</Link>
                                </small>
                            </div>

                        </form>

                    </div>
                </div>

            </div>
        </div>
    );
}
