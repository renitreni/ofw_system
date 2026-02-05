import React from "react";

const statsData = [
    { number: "500+", label: "OFWs monitored safely" },
    { number: "2,000+", label: "Alerts sent in real-time" },
    { number: "98%", label: "Family satisfaction rate" },
];

function Statistics() {
    return (
        <section
            id="statistics"
            style={{ background: "#f8f9fa", padding: "80px 0", position: "relative" }}
        >
            <div className="container">
                {/* Header */}
                <div className="stats-header">
                    <h2 className="stats-title">Lorem ipsum dolor <br />sit amet</h2>
                    <p className="stats-subtitle">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
                        nisi ut aliquip ex ea commodo consequat.
                    </p>
                </div>

                {/* Cards */}
                <div className="stats-grid">
                    {statsData.map((stat, index) => (
                        <div key={index} className="stat-card">
                            <div className={`slant ${index % 2 === 0 ? "top-right" : "bottom-left"}`}></div>
                            <h3 className="stat-number">{stat.number}</h3>
                            <p className="stat-label">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Statistics;
