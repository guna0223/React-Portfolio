import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Link, Send, CheckCircle, AlertCircle } from 'lucide-react';
import emailjs from 'emailjs-com';
import { contactInfo } from '../../data/portfolio';
import HoloCard from '../ui/HoloCard';
import SectionHeading from '../ui/SectionHeading';
import './ContactSection.css';

/* ─── Alert System ─── */
const showAlert = (title, message, type = 'info') => {
  const alert = document.createElement('div');
  alert.className = 'ninja-alert';
  alert.innerHTML = `
    <div class="ninja-alert-content">
      <div class="ninja-alert-icon">${type === 'success' ? '✓' : type === 'error' ? '✗' : ''}</div>
      <div class="ninja-alert-text">
        <div class="ninja-alert-title">${title}</div>
        <div class="ninja-alert-message">${message}</div>
      </div>
    </div>
  `;
  document.body.appendChild(alert);
  setTimeout(() => alert.classList.add('show'), 10);
  setTimeout(() => {
    alert.classList.remove('show');
    setTimeout(() => alert.remove(), 300);
  }, 3000);
};

const ContactSection = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState(null);
  const [sending, setSending] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true); setStatus(null);
    showAlert('Mission Deployed', 'Your message is being transmitted to HQ...', 'info');
    try {
      await emailjs.send('service_portfolio', 'template_portfolio', formData, 'user_emailjs_id');
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      showAlert('Transmission Success', 'Your message reached HQ! I will respond before the next arc.', 'success');
    } catch {
      setStatus('error');
      showAlert('Transmission Failed', 'Your signal was intercepted. Please redeploy your message.', 'error');
    }
    finally { setSending(false); }
  };

  const handleCardClick = (label) => {
    const messages = {
      Email: 'Opening your communication scroll...',
      Location: 'Revealing the hidden village location...',
      LinkedIn: 'Connecting to the ninja network...',
      WhatsApp: 'Opening direct line to the shinobi...'
    };
    showAlert(`Opening ${label}`, messages[label] || 'Activating link...', 'info');
  };

  const contactCards = [
    { icon: Mail, label: 'Email', value: contactInfo.email, href: `mailto:${contactInfo.email}` },
    { icon: MapPin, label: 'Location', value: contactInfo.location, href: contactInfo.mapsUrl },
    { icon: Link, label: 'LinkedIn', value: contactInfo.linkedin, href: `https://${contactInfo.linkedin}` },
    { icon: Link, label: 'WhatsApp', value: contactInfo.whatsapp, href: `https://wa.me/${contactInfo.whatsapp.replace(/\D/g, '')}` },
  ];

  return (
    <section id="contact" className="section-padding contact-section">
      <div className="aurora-bg" />
      <div className="grid-background" />
      <div className="contact-gradient-overlay" />

      <div className="section-container contact-section-container">
        <SectionHeading
          number="06"
          title={<>Let's Create Something <span className="text-gradient">Legendary</span></>}
          subtitle="Ready to deploy your next mission? Send the signal."
        />

        <div className="contact-grid">
          {/* Contact Cards */}
          <div className="contact-cards-container">
            {contactCards.map((card, i) => {
              const Icon = card.icon;
              return (
                <motion.div key={card.label} initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}>
                  <HoloCard
                    glowColor="var(--color-accent-primary)"
                    className="contact-card"
                    {...(card.href ? { as: 'a', href: card.href, target: '_blank', rel: 'noreferrer' } : {})}
                    onClick={() => handleCardClick(card.label)}
                  >
                    <div className="contact-card-icon">
                      <Icon size={22} />
                    </div>
                    <div>
                      <div className="text-small contact-card-label">{card.label}</div>
                      <div className="contact-card-value">{card.value}</div>
                    </div>
                  </HoloCard>
                </motion.div>
              );
            })}

            {/* Decorative Rinnegan ring */}
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
              className="contact-rinnegan-ring"
            >
              {[1, 2, 3, 4].map((r) => (
                <div key={r} className="contact-rinnegan-circle" style={{ width: r * 28, height: r * 28 }} />
              ))}
            </motion.div>
          </div>

          {/* Contact Form */}
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <HoloCard glowColor="var(--color-accent-primary)" className="contact-form-card">
              <form onSubmit={handleSubmit}>
                <div className="contact-form-grid">
                  <div>
                    <label className="text-small contact-form-label">Name</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="Your name" className="contact-input" />
                  </div>
                  <div>
                    <label className="text-small contact-form-label">Email</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="your@email.com" className="contact-input" />
                  </div>
                </div>

                <div style={{ marginBottom: '1rem' }}>
                  <label className="text-small contact-form-label">Subject</label>
                  <input type="text" name="subject" value={formData.subject} onChange={handleChange} required placeholder="Mission brief" className="contact-input" />
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <label className="text-small contact-form-label">Message</label>
                  <textarea name="message" value={formData.message} onChange={handleChange} required placeholder="Describe your mission..." rows={5}
                    className="contact-input contact-textarea"
                  />
                </div>

                {status === 'success' && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="contact-success-message">
                    <CheckCircle size={18} /><span>Message sent! I'll respond soon.</span>
                  </motion.div>
                )}
                {status === 'error' && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="contact-error-message">
                    <AlertCircle size={18} /><span>Failed to send. Please try again.</span>
                  </motion.div>
                )}

                <motion.button type="submit" disabled={sending} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  className={`contact-submit-btn${sending ? ' contact-submit-btn--disabled' : ''}`}
                >
                  {sending ? (
                    <><div className="contact-spinner" />Sending...</>
                  ) : (
                    <><Send size={18} />Deploy Message</>
                  )}
                </motion.button>
              </form>
            </HoloCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default React.memo(ContactSection);
