import React, { useState } from "react";
import "../components/css/Contact.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import emailjs from "emailjs-com";

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

  const sendEmail = async (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const email = e.target.email.value;
    const subject = e.target.subject.value;
    const message = e.target.message.value;

    // Build dynamic subject and message in React
    const dynamicSubject = `New Portfolio Message from ${name} - ${subject}`;
    const dynamicMessage = `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}`;

    // Send ALL required variables to EmailJS
    const emailParams = {
      name: name,
      email: email,
      subject: dynamicSubject,
      message: dynamicMessage,
      reply_to: email,
      to_email: "gunasekar0223@gmail.com"
    };

    try {
      await emailjs.send(
        "service_y0ymmgf",
        "template_z5qlmac",
        emailParams,
        "nFxwbwNW4OW4-i054"
      );

      showAlert("success", "MESSAGE DELIVERED");
      e.target.reset();
    } catch (error) {
      console.error("MAIL FAILED:", error);
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
              {alertInfo.type === "success" || alertInfo.type === "admin-success"
                ? "✔"
                : alertInfo.type === "warning"
                ? "⚠"
                : "✖"}
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

              <form id="contactForm" onSubmit={sendEmail}>
                <div className="form-group">
                  <input type="text" id="name" name="name" required />
                  <label htmlFor="name">NAME</label>
                </div>

                <div className="form-group">
                  <input type="email" id="email" name="email" required />
                  <label htmlFor="email">EMAIL</label>
                </div>

                <div className="form-group">
                  <input type="text" id="subject" name="subject" required />
                  <label htmlFor="subject">SUBJECT</label>
                </div>

                <div className="form-group">
                  <textarea id="message" name="message" rows="5" required />
                  <label htmlFor="message">
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