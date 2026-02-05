import React, { useEffect, useState, useRef } from "react";

const images = [
    "/images/ofw-image.jpeg",
    "/images/ofw-images-2.jpeg",
    "/images/ofw-image-3.jpeg",
];

function Hero() {
    const fullText = "OFW Monitoring Made Easy.";

    const [current, setCurrent] = useState(0);
    const [typedText, setTypedText] = useState("");
    const heroRef = useRef(null);

    useEffect(() => {
        let index = 0;
        const speed = 100; 
        const interval = setInterval(() => {
            setTypedText(fullText.slice(0, index + 1));
            index++;
            if (index === fullText.length) clearInterval(interval);
        }, speed);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % images.length);
        }, 4000);


        return () => clearInterval(interval);
    }, []);

    return (
        <section className="position-relative vh-100 overflow-hidden">
            {images.map((img, index) => (
                <div
                    key={index}
                    className="position-absolute top-0 start-0 w-100 h-100"
                    style={{
                        backgroundImage: `url(${img})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        opacity: index === current ? 1 : 0,
                        transition: "opacity 1s ease-in-out",
                        zIndex: 1,
                    }}
                />
            ))}

            <div
                className="position-absolute top-0 start-0 w-100 h-100"
                style={{ backgroundColor: "rgba(0,0,0,0.5)", zIndex: 2 }}
            />

            <div ref={heroRef} className="position-relative h-100 d-flex align-items-center" style={{ zIndex: 3 }}>
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 text-white">
                            <h1 className="display-4 fw-bold">
                                {typedText}
                                <span className="typewriter-cursor"></span>
                            </h1>



                            <p className="lead mt-3">
                                A smarter way to stay connected with OFWs and ensure their safety.
                            </p>


                            <button className="btn btn-primary btn-lg mt-4">
                                Get Started
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </section>
    );
}

export default Hero;