import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [currentIndex, setCurrentIndex] = useState(0);

    const images = [
        "/images/login-img-1.jpeg",
        "/images/login-img-2.jpeg",
        "/images/login-img-3.jpeg"
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % images.length);
        }, 5000);

        return () => clearInterval(interval);
    }, []);

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
        <div className="container-fluid min-vh-100">
            <div className="row min-vh-100">

                <div className="col-md-5 d-flex align-items-center justify-content-center">
                    <div className="col-10 col-sm-8 col-md-10 col-lg-8">

                        <img
                            src="/images/ofw-monitoring-logo.png"
                            alt="Logo"
                            className="position-absolute"
                            style={{
                                top: "20px",
                                left: "50px",
                                height: "60px",
                                borderRadius: "50%"
                            }}
                        />

                        <div className="card border-0 position-relative">
                            <div className="card-body p-4">

                                <h4
                                    className="text-center mb-4"
                                    style={{ fontWeight: 800, fontSize: "2rem" }}
                                >
                                    Welcome Back!
                                </h4>

                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <label className="form-label">Email address</label>
                                        <input
                                            type="email"
                                            className="form-control input-custom"
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
                                            className="form-control input-custom"
                                            placeholder="Enter your password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                        />
                                    </div>

                                    <div className="d-grid mb-3">
                                        <button type="submit" className="btn btn-gray">
                                            Login
                                        </button>
                                    </div>

                                    <div className="text-center mb-3">
                                        <small>
                                            Don’t have an account?{" "}
                                            <Link to="/register">Sign up</Link>
                                        </small>
                                    </div>

                                    <div className="or-divider mb-3">
                                        <span>or</span>
                                    </div>

                                    <div className="d-grid mb-3">
                                        <button type="submit" className="btn btn-light-gray">
                                            <i className="fab fa-google me-2"></i>
                                            Continue with Google
                                        </button>
                                    </div>

                                    <div className="d-grid mb-3">
                                        <button type="submit" className="btn btn-light-gray">
                                            <i className="fab fa-apple me-2"></i>
                                            Continue with Apple
                                        </button>
                                    </div>
                                </form>

                            </div>
                        </div>

                    </div>
                </div>

                {/* RIGHT SIDE IMAGE SLIDER */}
                <div
                    className="col-md-7 d-none d-md-flex justify-content-center bg-light"
                    style={{ minHeight: "60vh", paddingTop: "8rem" }}
                >
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <img
                            src={images[currentIndex]}
                            alt={`Slide ${currentIndex + 1}`}
                            className="img-fluid"
                            style={{
                                maxHeight: "60vh",
                                width: "auto",
                                objectFit: "contain"
                            }}
                        />

                        <div className="slider-dots" style={{ marginTop: "10px" }}>
                            {images.map((_, index) => (
                                <span
                                    key={index}
                                    className={`dot ${currentIndex === index ? "active" : ""}`}
                                    onClick={() => setCurrentIndex(index)}
                                ></span>
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
