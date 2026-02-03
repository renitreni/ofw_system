import { Link } from 'react-router-dom';

export default function Nabvar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top shadow-sm">
            <div className="container">

                <a className="navbar-brand fw-bold" href="#">
                    OFW Monitor
                </a>

                {/*Mobile Toggle button*/}
                <button className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#mainNavbar"
                    aria-controls="mainNavbar"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* Navbar Links */}
                <div className="collapse navbar-collapse" id="mainNavbar">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-lg-center">

                        <li className="nav-item">
                            <a className="nav-link" href="#home">Home</a>
                        </li>

                        <li className="nav-item">
                            <a className="nav-link" href="#about">About</a>
                        </li>

                        <li className="nav-item">
                            <a className="nav-link" href="#features">Features</a>
                        </li>

                        <li className="nav-item">
                            <a className="nav-link" href="#how-it-works">How It Works</a>
                        </li>

                        <li className="nav-item">
                            <a className="nav-link" href="#faq">FAQ</a>
                        </li>

                        <li className="nav-item ms-lg-3">
                            <Link to="/login" className="btn btn-outline-primary btn-sm">
                                Login
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}