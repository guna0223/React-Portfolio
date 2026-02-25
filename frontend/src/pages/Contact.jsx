import React from "react";
import "../components/css/Contact.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import emailjs from "emailjs-com";

const Contact = () => {

  // SEND EMAIL FUNCTION (ADDED ONLY)
  const sendEmail = (e) => {
    e.preventDefault();

    const templateParams = {
      name: e.target.name.value,
      email: e.target.email.value,
      subject: e.target.subject.value,
      message: e.target.message.value,
    };

    emailjs
      .send(
        "service_y0ymmgf",
        "template_96kexgk",
        templateParams,
        "nFxwbwNW4OW4-i054"
      )
      .then(() => {
        alert("◆ TRANSMISSION SENT ✔");
        e.target.reset();
      })
      .catch((error) => {
        alert("◆ TRANSMISSION FAILED ✖");
        console.error(error);
      });
  };

  return (
    <section id="contact" className="section contact">
      <div className="container">
        <h2 className="section-title">[ COMM TERMINAL ]</h2>

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
            {/* CONTACT INFO */}
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

              <div className="contact-item">
                <div className="contact-icon">
                  <i className="fas fa-phone"></i>
                </div>
                <div className="contact-details">
                  <h3>◆ PHONE</h3>
                  <p>9486436037</p>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon">
                  <i className="fas fa-map-marker"></i>
                </div>
                <div className="contact-details">
                  <h3>◆ LOCATION</h3>
                  <p>BTM 1st Stage, Bengaluru</p>
                  <a
                    href="https://www.google.com/maps/place/BTM+1st+Stage,+Bangalore/@12.9199239,77.6068483,17z"
                    target="_blank"
                    rel="noreferrer"
                  >
                    [ VIEW MAP ]
                  </a>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon">
                  <i className="fab fa-whatsapp"></i>
                </div>
                <div className="contact-details">
                  <h3>◆ WHATSAPP</h3>
                  <p>9486436037</p>
                  <a
                    href="https://web.whatsapp.com/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    [ SEND MSG ]
                  </a>
                </div>
              </div>

            </div>

            {/* CONTACT FORM */}
            <div className="contact-form">
              <div className="form-header">◆ ENTER MESSAGE ◆</div>

              {/* ONLY onSubmit ADDED */}
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
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    required
                  ></textarea>
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