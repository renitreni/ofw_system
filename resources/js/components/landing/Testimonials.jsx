import React from "react";

const testimonials = [
    {
        name: "Maria Santos",
        relation: "Mother of OFW",
        message:
            "This system helped me stay updated with my son’s location and work status. It gives me peace of mind.",
    },
    {
        name: "John Cruz",
        relation: "OFW",
        message:
            "Thanks to this monitoring system, I can communicate with my family easily and they can check on me anytime.",
    },
    {
        name: "Anna Reyes",
        relation: "Wife of OFW",
        message:
            "The alerts and notifications are lifesaving! I always know my husband is safe and updated.",
    },
];

function Testimonials() {
    return (
        <section
            id="testimonials"
            style={{ background: "#f8f9fa", padding: "80px 0" }}
        >
            <div className="container">
                <h2 style={{ textAlign: "center", fontSize: "2.5rem", marginBottom: "50px" }}>
                    Success Stories
                </h2>

                <div className="testimonials-grid">
                    {testimonials.map((t, index) => (
                        <div key={index} className="testimonial-card">
                            <p className="testimonial-message">"{t.message}"</p>
                            <h5 className="testimonial-name">{t.name}</h5>
                            <span className="testimonial-relation">{t.relation}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Testimonials;
