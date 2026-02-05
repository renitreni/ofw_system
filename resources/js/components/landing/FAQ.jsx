import React from "react";

const faqs = [
    {
        question: "How do I add an OFW to the system?",
        answer:
            "Simply register your account, go to the 'Add OFW' section, and fill in the required details.",
    },
    {
        question: "Can I monitor multiple OFWs at once?",
        answer:
            "Yes! You can add multiple OFWs and monitor their status and location simultaneously.",
    },
    {
        question: "Is my data safe and private?",
        answer:
            "Absolutely. All your data is securely stored and encrypted to ensure your privacy.",
    },
];

function FAQ() {
    return (
        <section id="faq" className="py-5" style={{ background: "#f8f9fa" }}>
            <div className="container">
                <h2 className="text-center mb-4">Frequently Asked Questions</h2>

                <div className="accordion" id="faqAccordion">
                    {faqs.map((item, index) => (
                        <div className="accordion-item" key={index}>
                            <h2 className="accordion-header" id={`heading${index}`}>
                                <button
                                    className="accordion-button collapsed"
                                    type="button"
                                    data-bs-toggle="collapse"
                                    data-bs-target={`#collapse${index}`}
                                    aria-expanded="false"
                                    aria-controls={`collapse${index}`}
                                >
                                    {item.question}
                                </button>
                            </h2>
                            <div
                                id={`collapse${index}`}
                                className="accordion-collapse collapse"
                                aria-labelledby={`heading${index}`}
                                data-bs-parent="#faqAccordion"
                            >
                                <div className="accordion-body">{item.answer}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default FAQ;
