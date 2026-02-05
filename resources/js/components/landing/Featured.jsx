import React, { useState } from "react";

const initialSlides = [
    {
        title: "Real-time Location Tracking",
        description: "Know where OFWs are for safety and real-time updates.",
        image: "/images/realtime-tracking.jpg",
    },
    {
        title: "Work Status Updates",
        description: "Check employment, shifts, and job reports easily.",
        image: "/images/work-updates.png",
    },
    {
        title: "Health & Safety Alerts",
        description: "Receive emergency notifications and safety updates.",
        image: "/images/health-safety.jpg",
    },
    {
        title: "Reports & Analytics",
        description: "Track trends, hours worked, and travel history. ",
        image: "/images/stats.png",
    },
];

function Featured() {
    const [slides, setSlides] = useState(initialSlides);

    const nextSlide = () => {
        setSlides((prev) => {
            const newSlides = [...prev];
            newSlides.push(newSlides.shift());
            return newSlides;
        });
    };

    const prevSlide = () => {
        setSlides((prev) => {
            const newSlides = [...prev];
            newSlides.unshift(newSlides.pop());
            return newSlides;
        });
    };

    return (
        <section id="services" style={{ background: "#fff", padding: "60px 0" }}>
            <div className="container">
                <h2
                    style={{
                        textAlign: "center",
                        fontSize: "2.5rem",
                        marginBottom: "40px",
                        fontFamily: "system-ui",
                        color: "#333",
                    }}
                >
                    System Features
                </h2>

                <div className="slider-container">
                    <div className="slide">
                        {slides.map((item, index) => (
                            <div
                                key={index}
                                className="item"
                                style={{
                                    backgroundImage: `url(${item.image})`,
                                }}
                            >
                                <div className="content">
                                    <div className="name">{item.title}</div>
                                    <div className="des">{item.description}</div>
                                    <button className="btn btn-outline-light">
                                        See More
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="button">
                        <button className="prev" onClick={prevSlide}>
                            ‹
                        </button>
                        <button className="next" onClick={nextSlide}>
                            ›
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Featured;
