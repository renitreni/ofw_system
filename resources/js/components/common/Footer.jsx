import React from "react";

function Footer() {
    return (
        <footer className="bg-dark text-white pt-5 pb-4">
            <div className="container">
                <div className="row">

                    <div className="col-md-4 mb-4">
                        <h3 className="fw-bold">OFW Monitor</h3>
                        <p>
                            Helping families stay connected and OFWs stay safe.
                        </p>
                    </div>

                    <div className="col-md-2 mb-4">
                        <h5 className="fw-bold mb-3">Quick Links</h5>
                        <ul className="list-unstyled">
                            <li><a href="#home" className="text-white text-decoration-none">Home</a></li>
                            <li><a href="#features" className="text-white text-decoration-none">Features</a></li>
                            <li><a href="#how-it-works" className="text-white text-decoration-none">How It Works</a></li>
                            <li><a href="#faq" className="text-white text-decoration-none">FAQ</a></li>
                            <li><a href="#contact" className="text-white text-decoration-none">Contact</a></li>
                        </ul>
                    </div>

                    <div className="col-md-3 mb-4">
                        <h5 className="fw-bold mb-3">Contact</h5>
                        <p>Email: support@ofwmonitor.com</p>
                        <p>Phone: +63 912 345 6789</p>
                        <p>Address: Manila, Philippines</p>
                    </div>

                    <div className="col-md-3 mb-4">
                        <h5 className="fw-bold mb-3">Follow Us</h5>
                        <div className="d-flex gap-3">
                            <a href="#" className="text-white fs-4"><i className="fab fa-facebook-f"></i></a>
                            <a href="#" className="text-white fs-4"><i className="fab fa-twitter"></i></a>
                            <a href="#" className="text-white fs-4"><i className="fab fa-instagram"></i></a>
                            <a href="#" className="text-white fs-4"><i className="fab fa-linkedin-in"></i></a>
                        </div>
                    </div>

                </div>

                <div className="row mt-4">
                    <div className="col text-center">
                        <p className="mb-0">&copy; {new Date().getFullYear()} OFW Monitor. All rights reserved.</p>
                    </div>
                </div>

            </div>
        </footer>
    );
}

export default Footer;
