import React, { useState, useEffect } from "react";

const slides = [
    {
        title: "New Safety Alert Feature",
        subtitle: "Real-time safety alerts for OFWs and families.",
        image: "/images/news-img-1.jpg",
    },
    {
        title: "Monitor Multiple OFWs Easily",
        subtitle: "Track multiple OFWs at once with ease.",
        image: "/images/news-img.jpg",
    },
    {
        title: "Health Tips for OFWs",
        subtitle: "Keep OFWs safe and healthy abroad.",
        image: "/images/news-img-3.jpg",
    },
];

function LatestUpdates() {
    const [current, setCurrent] = useState(0);

    const nextSlide = () => {
        setCurrent((prev) => (prev + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
    };

    useEffect(() => {
        const interval = setInterval(nextSlide, 5000);
        return () => clearInterval(interval);
    }, []);

    const nextPreview = slides[(current + 1) % slides.length];

    return (
        <section className="latest-updates-slider position-relative">
        
            {slides.map((slide, index) => (
                <div
                    key={index}
                    className={`slide position-absolute top-0 start-0 w-100 h-100 ${index === current ? "active" : ""
                        }`}
                    style={{
                        backgroundImage: `url(${slide.image})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        transition: "opacity 1s ease-in-out",
                        opacity: index === current ? 1 : 0,
                        zIndex: index === current ? 2 : 1,
                    }}
                ></div>
            ))}

            <div
                className="overlay position-absolute top-0 start-0 w-100 h-100"
                style={{ backgroundColor: "rgba(0,0,0,0.4)", zIndex: 3 }}
            ></div>

            <div
                className="content position-absolute bottom-0 start-0 p-5 text-white"
                style={{ zIndex: 4, maxWidth: "50%" }}
            >
                <h3 className="fw-bold">{slides[current].title}</h3>
                <p>{slides[current].subtitle}</p>
            </div>

            <div
                className="next-preview position-absolute bottom-0 end-0 p-3 rounded-3 shadow"
                style={{
                    background: "#fff",
                    width: "200px",
                    height: "120px",
                    overflow: "hidden",
                    zIndex: 5,
                }}
            >
                <img
                    src={nextPreview.image}
                    alt={nextPreview.title}
                    className="w-100 h-100"
                    style={{ objectFit: "cover" }}
                />
            </div>

            <button
                className="slider-btn prev position-absolute top-50 start-0 translate-middle-y btn"
                onClick={prevSlide}
                style={{ zIndex: 6 }}
            >
                ‹
            </button>
            <button
                className="slider-btn next position-absolute top-50 end-0 translate-middle-y btn"
                onClick={nextSlide}
                style={{ zIndex: 6 }}
            >
                ›
            </button>
        </section>
    );
}

export default LatestUpdates;
