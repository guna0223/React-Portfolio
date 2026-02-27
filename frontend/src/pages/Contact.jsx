import React, { useState } from "react";
import "../components/css/Contact.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import MyLocation from "../components/MyLocation/MyLocation";

const Contact = () => {
  const [alertInfo, setAlertInfo] = useState({
    show: false,
    type: "",
    message: "",
  });
  const [showLocation, setShowLocation] = useState(false);

  const showAlert = (type, message) => {
    setAlertInfo({ show: true, type, message });
    setTimeout(() => {
      setAlertInfo({ show: false, type: "", message: "" });
    }, 4000);
  };

  const openGmail = () => {
    const email = "gunasekar0223@gmail.com";
    const subject = encodeURIComponent("Portfolio Contact");
    const body = encodeURIComponent("Hello,\n\nI visited your portfolio and would like to connect with you.\n\nBest regards,");
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${subject}&body=${body}`;
    window.open(gmailUrl, "_blank");
  };

  const sendEmail = async (e) => {
    e.preventDefault();
    showAlert("", "SENDING...");

    // ✅ USE FORM DATA DIRECTLY FROM FORM
    const formData = new FormData(e.target);

    // ✅ REQUIRED ACCESS KEY
    formData.append("access_key", "272fad5e-4e4a-4fab-9083-a301958026b8");

    // ✅ OPTIONAL (GOOD PRACTICE)
    formData.append("from_name", "Portfolio Contact");
    formData.append("replyto", e.target.email.value);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        showAlert("success", "MESSAGE DELIVERED");
        e.target.reset();
      } else {
        console.error(data);
        showAlert("error", "DELIVERY FAILED");
      }
    } catch (error) {
      console.error(error);
      showAlert("error", "NETWORK ERROR");
    }
  };

  return (
    <section id="contact" className="section contact">
      <div className="container">
        <h2 className="section-title">[ COMM TERMINAL ]</h2>

        {alertInfo.show && (
          <div className={`retro-alert ${alertInfo.type}`}>
            <span className="alert-icon">
              {alertInfo.type === "success" ? "✔" : "✖"}
            </span>
            <span className="alert-message">{alertInfo.message}</span>
            <span className="alert-cursor">_</span>
          </div>
        )}

        <div className="terminal-container">
          <div className="terminal-header">
            <div className="terminal-title">◆ SEND MESSAGE ◆</div>
            <div className="terminal-dots">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>

          <div className="terminal-content">
            <div className="contact-info">
              {/* Email */}
              <div className="contact-item">
                <div className="contact-icon">
                  <i className="fas fa-envelope"></i>
                </div>
                <div className="contact-details">
                  <h3>◆ EMAIL</h3>
                  <p>gunasekar0223@gmail.com</p>
                  <a href="#" onClick={openGmail} className="gmail-link">[ SEND MAIL ]</a>
                </div>
              </div>
              {/* WhatsApp */}
              <div className="contact-item">
                <div className="contact-icon">
                  <i className="fab fa-whatsapp"></i>
                </div>
                <div className="contact-details">
                  <h3>◆ WHATSAPP</h3>
                  <p>+91 9486436037</p>
                  <a href="https://wa.me/919486436037" target="_blank" rel="noreferrer">[ SEND MSG ]</a>
                </div>
              </div>

              {/* Location */}
              <div className="contact-item location-item" onClick={() => setShowLocation(true)}>
                <div className="contact-icon">
                  <i className="fas fa-map-marker-alt"></i>
                </div>
                <div className="contact-details">
                  <h3>◆ LOCATION</h3>
                  <p>BTM 1st Stage, Bengaluru, Karnataka, India</p>
                  <span className="location-click-hint">[ CLICK TO DETECT ]</span>
                </div>
              </div>

              {/* LinkedIn */}
              <div className="contact-item">
                <div className="contact-icon">
                  <i className="fab fa-linkedin"></i>
                </div>
                <div className="contact-details">
                  <h3>◆ LINKEDIN</h3>
                  <p>LinkedIn Profile</p>
                  <a href="https://www.linkedin.com/in/gunasekar0223/" target="_blank" rel="noreferrer">[ VISIT ]</a>
                </div>
              </div>

              {/* GitHub */}
              <div className="contact-item">
                <div className="contact-icon">
                  <i className="fab fa-github"></i>
                </div>
                <div className="contact-details">
                  <h3>◆ GITHUB</h3>
                  <p>GitHub Profile</p>
                  <a href="https://github.com/guna0223" target="_blank" rel="noreferrer">[ VISIT ]</a>
                </div>
              </div>
            </div>
            {/* contact form */}
            <div className="contact-form">
              <div className="form-header">◆ ENTER MESSAGE ◆</div>

              <form id="contactForm" onSubmit={sendEmail}>
                <div className="form-group">
                  <input type="text" name="name" required />
                  <label>NAME</label>
                </div>

                <div className="form-group">
                  <input type="email" name="email" required />
                  <label>EMAIL</label>
                </div>

                <div className="form-group">
                  <input type="text" name="subject" required />
                  <label>SUBJECT</label>
                </div>

                <div className="form-group">
                  <textarea name="message" rows="5" required />
                  <label>
                    MESSAGE<span className="terminal-cursor"></span>
                  </label>
                </div>

                <button type="submit" className="submit-btn">
                  <span>▶ SEND MESSAGE</span>
                </button>
              </form>
            </div>

          </div>
        </div>

        {/* Location Panel - Slides in from right */}
        {showLocation && (
          <div className="location-panel-overlay" onClick={() => setShowLocation(false)}>
            <div className="location-panel" onClick={(e) => e.stopPropagation()}>
              <MyLocation onClose={() => setShowLocation(false)} />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Contact;