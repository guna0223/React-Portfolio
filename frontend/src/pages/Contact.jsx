import React, { useState } from "react";
import "../components/css/Contact.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const Contact = () => {
  const [alertInfo, setAlertInfo] = useState({
    show: false,
    type: "",
    message: "",
  });

  const showAlert = (type, message) => {
    setAlertInfo({ show: true, type, message });
    setTimeout(() => {
      setAlertInfo({ show: false, type: "", message: "" });
    }, 4000);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    showAlert("", "SENDING...");

    // Get all form values
    const formData = new FormData(e.target);
    const name = formData.get("name");
    const email = formData.get("email");
    const subject = formData.get("subject");
    const message = formData.get("message");

    // Create clean object for Web3Forms
    const payload = {
      access_key: "272fad5e-4e4a-4fab-9083-a301958026b8",
      name: name,
      email: email,
      subject: subject,
      message: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}`
    };

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (data.success) {
        showAlert("success", "MESSAGE DELIVERED");
        e.target.reset();
      } else {
        showAlert("error", "DELIVERY FAILED");
      }
    } catch (error) {
      showAlert("error", "DELIVERY FAILED");
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
              <div className="contact-item">
                <div className="contact-icon">
                  <i className="fas fa-envelope"></i>
                </div>
                <div className="contact-details">
                  <h3>◆ EMAIL</h3>
                  <p>gunasekar0223@gmail.com</p>
                  <a href="mailto:gunasekar0223@gmail.com">[ SEND MAIL ]</a>
                </div>
              </div>
            </div>

            <div className="contact-form">
              <div className="form-header">◆ ENTER MESSAGE ◆</div>

              <form id="contactForm" onSubmit={onSubmit}>
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
      </div>
    </section>
  );
};

export default Contact;