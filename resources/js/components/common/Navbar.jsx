import { Link } from 'react-router-dom';

export default function Nabvar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-transparent fixed-top">
            <div className="container">

                <a className="navbar-brand fw-bold text-white" href="#">
                    OFW Monitoring
                </a>

                {/*Mobile Toggle button*/}
                <button className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#mainNavbar"
                    aria-controls="mainNavbar"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                    style={{ backgroundColor: "white" }}
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* Navbar Links */}
                <div className="collapse navbar-collapse" id="mainNavbar">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-lg-center">

                        <li className="nav-item mx-lg-3">
                            <a className="nav-link text-white" href="#home">Home</a>
                        </li>

                        <li className="nav-item mx-lg-3">
                            <a className="nav-link text-white" href="#features">Featured</a>
                        </li>

                        <li className="nav-item mx-lg-3">
                            <a className="nav-link text-white" href="#how-it-works">How It Works</a>
                        </li>

                        <li className="nav-item mx-lg-3">
                            <a className="nav-link text-white" href="#faq">FAQ</a>
                        </li>

                        <li className="nav-item mx-lg-3">
                            <a className="nav-link text-white" href="#blog">Blog</a>
                        </li>

                        <li className="nav-item ms-lg-3">
                            <Link to="/login" className="btn btn-outline-light btn-sm">
                                Login
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}