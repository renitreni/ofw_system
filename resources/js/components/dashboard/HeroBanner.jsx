import React from "react";

const HeroBanner = ({ setShowRegistration }) => (
    <section className="hero-banner">
        <div className="hero-content">
            <h1>Registration for <br /> Deployment</h1>
            <p>Stay updated on real-time location and safety reports</p>
            <button className="register-btn" onClick={() => setShowRegistration(true)}>Register NOW</button>
        </div>
        <div className="hero-graphics">
            {[...Array(5)].map((_, i) => <div key={i} className={`circle circle-${i + 1}`}></div>)}
        </div>
    </section>
);

export default HeroBanner;
