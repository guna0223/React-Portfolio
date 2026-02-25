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
                                    technologies. From concept to deployment - making digital dreams reality.
                                </p>

                                <div className="service-features">
                                    <span>Responsive Design</span>
                                    <span>Performance Optimized</span>
                                    <span>SEO Friendly</span>
                                </div>
                            </div>

                            {/* Frontend Development */}
                            <div className="service-card">
                                <div className="service-icon">
                                    <div className="icon-box">
                                        <i className="fas fa-paint-brush"></i>
                                    </div>
                                </div>

                                <h3>◆ FRONTEND ◆</h3>
                                <p>
                                    Creating clean, interactive & user-friendly interfaces 
                                    with HTML, CSS, JavaScript & React. 
                                </p>

                                <div className="service-features">
                                    <span>Modern UI</span>
                                    <span>Reusable Components</span>
                                    <span>Cross-Browser Support</span>
                                </div>
                            </div>

                            {/* Backend Development */}
                            <div className="service-card">
                                <div className="service-icon">
                                    <div className="icon-box">
                                        <i className="fas fa-database"></i>
                                    </div>
                                </div>

                                <h3>◆ BACKEND ◆</h3>
                                <p>
                                    Developing secure & scalable backend systems using 
                                    Python and Django, with authentication & APIs.
                                </p>

                                <div className="service-features">
                                    <span>Django & REST APIs</span>
                                    <span>Authentication</span>
                                    <span>Database Design</span>
                                </div>
                            </div>

                            {/* Full Stack Solutions */}
                            <div className="service-card">
                                <div className="service-icon">
                                    <div className="icon-box">
                                        <i className="fas fa-layer-group"></i>
                                    </div>
                                </div>

                                <h3>◆ FULL STACK ◆</h3>
                                <p>
                                    End-to-end application development combining frontend 
                                    and backend technologies for complete solutions.
                                </p>

                                <div className="service-features">
                                    <span>Frontend + Backend</span>
                                    <span>API Integration</span>
                                    <span>Deployment Ready</span>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Services;
