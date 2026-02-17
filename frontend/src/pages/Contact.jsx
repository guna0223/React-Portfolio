import React from "react";
import "../components/css/Contact.css"; // adjust path if needed
import "bootstrap-icons/font/bootstrap-icons.css";

const Contact = () => {
  return (
    <section id="contact" className="section contact">
      <div className="container">
        <h2 className="section-title">
          <span className="title-icon">🔱</span>
          Get In Touch
        </h2>

        <div className="contact-content">
          {/* CONTACT INFO */}
          <div className="contact-info">

            <div className="contact-item animate-on-scroll">
              <div className="contact-icon">
                <i className="fas fa-envelope-open-text"></i>
                <div className="contact-glow"></div>
              </div>
              <div className="contact-details">
                <h3>Email</h3>
                <p>gunasekar0223@gmail.com</p>
                <a href="mailto:gunasekar0223@gmail.com">Send Email</a>
              </div>
            </div>

            <div className="contact-item animate-on-scroll">
              <div className="contact-icon">
                <i className="bi bi-telephone"></i>
                <div className="contact-glow"></div>
              </div>
              <div className="contact-details">
                <h3>Phone</h3>
                <p>9486436037</p>
              </div>
            </div>

            <div className="contact-item animate-on-scroll">
              <div className="contact-icon">
                <i className="fas fa-location-dot"></i>
                <div className="contact-glow"></div>
              </div>
              <div className="contact-details">
                <h3>Current Realm</h3>
                <p>
                  BTM 1<sup>st</sup> Stage, Bangaluru
                </p>
                <a
                  href="https://www.google.com/maps/place/BTM+1st+Stage,+Bangalore/@12.9199239,77.6068483,17z"
                  target="_blank"
                  rel="noreferrer"
                >
                  View Coordinates
                </a>
              </div>
            </div>

            <div className="contact-item animate-on-scroll">
              <div className="contact-icon">
                <i className="fab fa-whatsapp"></i>
                <div className="contact-glow"></div>
              </div>
              <div className="contact-details">
                <h3>WhatsApp</h3>
                <p>9486436037</p>
                <a
                  href="https://web.whatsapp.com/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Send Message
                </a>
              </div>
            </div>

          </div>

          {/* CONTACT FORM */}
          <div className="contact-form animate-on-scroll">
            <form id="contactForm">
              <div className="form-group">
                <input type="text" id="name" name="name" required />
                <label htmlFor="name">Your Name</label>
                <div className="form-line"></div>
              </div>

              <div className="form-group">
                <input type="email" id="email" name="email" required />
                <label htmlFor="email">Your Email</label>
                <div className="form-line"></div>
              </div>

              <div className="form-group">
                <input type="text" id="subject" name="subject" required />
                <label htmlFor="subject">Subject</label>
                <div className="form-line"></div>
              </div>

              <div className="form-group">
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  required
                ></textarea>
                <label htmlFor="message">Message</label>
                <div className="form-line"></div>
              </div>

              <button type="submit" className="submit-btn">
                <span className="btn-rune">◈</span>
                <span>Send Message</span>
                <span className="btn-rune">◈</span>
                <i className="fas fa-paper-plane"></i>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
