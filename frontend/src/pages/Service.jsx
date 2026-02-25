import React from "react";
import "../components/css/Services.css";

const Services = () => {
    return (
        <section id="service" className="section services">
            <div className="container">
                <h2 className="section-title">
                    [ GAME FEATURES ]
                </h2>

                <div className="services-content">
                    <div className="features-container">
                        <div className="features-header">
                            <div className="features-title">◆ WHAT I DO ◆</div>
                        </div>
                        
                        <div className="services-grid">

                            {/* Web Development */}
                            <div className="service-card">
                                <div className="service-icon">
                                    <div className="icon-box">
                                        <i className="fas fa-code"></i>
                                    </div>
                                </div>

                                <h3>◆ WEB DEV ◆</h3>
                                <p>
                                    Building responsive & modern websites using cutting-edge 

                            <div className="service-features">
                                <span className="feature-rune">✦</span>
                                <span>Responsive Design</span>
                                <span className="feature-rune">✦</span>
                                <span>Performance Optimized</span>
                                <span className="feature-rune">✦</span>
                                <span>SEO Friendly</span>
                            </div>
                        </div>

                        {/* ADDED: Frontend Development */}
                        <div className="service-card animate-on-scroll">
                            <div className="service-icon">
                                <div className="icon-circle">
                                    <i className="fas fa-paint-brush"></i>
                                </div>
                                <div className="icon-glow"></div>
                            </div>

                            <h3>Frontend Development</h3>
                            <p>
                                I build clean, interactive, and user-friendly interfaces using
                                HTML, CSS, JavaScript, and React with a strong focus on UI/UX.
                            </p>

                            <div className="service-features">
                                <span className="feature-rune">✦</span>
                                <span>Modern UI</span>
                                <span className="feature-rune">✦</span>
                                <span>Reusable Components</span>
                                <span className="feature-rune">✦</span>
                                <span>Cross-Browser Support</span>
                            </div>
                        </div>

                        {/* ADDED: Backend Development */}
                        <div className="service-card animate-on-scroll">
                            <div className="service-icon">
                                <div className="icon-circle">
                                    <i className="fas fa-database"></i>
                                </div>
                                <div className="icon-glow"></div>
                            </div>

                            <h3>Backend Development</h3>
                            <p>
                                I develop secure and scalable backend systems using Python and
                                Django, including authentication, APIs, and database management.
                            </p>

                            <div className="service-features">
                                <span className="feature-rune">✦</span>
                                <span>Django & REST APIs</span>
                                <span className="feature-rune">✦</span>
                                <span>Authentication</span>
                                <span className="feature-rune">✦</span>
                                <span>Database Design</span>
                            </div>
                        </div>

                        {/* ADDED: Full Stack Solutions */}
                        <div className="service-card animate-on-scroll">
                            <div className="service-icon">
                                <div className="icon-circle">
                                    <i className="fas fa-layer-group"></i>
                                </div>
                                <div className="icon-glow"></div>
                            </div>

                            <h3>Full Stack Solutions</h3>
                            <p>
                                End-to-end application development combining frontend and backend
                                technologies to deliver complete, scalable web solutions.
                            </p>

                            <div className="service-features">
                                <span className="feature-rune">✦</span>
                                <span>Frontend + Backend</span>
                                <span className="feature-rune">✦</span>
                                <span>API Integration</span>
                                <span className="feature-rune">✦</span>
                                <span>Deployment Ready</span>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
};

export default Services;
