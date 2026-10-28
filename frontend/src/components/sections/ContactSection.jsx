import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Link, Send, CheckCircle, AlertCircle, Copy, Check } from 'lucide-react';
import { contactInfo } from '../../data/portfolio';
import HoloCard from '../ui/HoloCard';
import SectionHeading from '../ui/SectionHeading';
import { useToast } from '../../context/ToastContext';
import { useSound } from '../../context/SoundContext';
import './ContactSection.css';

const ContactSection = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState(null);
  const [sending, setSending] = useState(false);
  const [copied, setCopied] = useState(false);

  const { showToast } = useToast();
  const { playSfx } = useSound();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleCopyEmail = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText(contactInfo.email);
    setCopied(true);
    playSfx('click');
    showToast('Copied to Clipboard!', `${contactInfo.email} copied successfully.`, 'success');
    setTimeout(() => setCopied(false), 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setStatus(null);
    playSfx('click');
    showToast('Deploying Message', 'Opening communication frequency...', 'info');

    // Safe direct mailto trigger fallback + status confirmation
    try {
      const mailtoUrl = `mailto:${contactInfo.email}?subject=${encodeURIComponent(
        `[Portfolio] ${formData.subject}`
      )}&body=${encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
      )}`;

      window.open(mailtoUrl, '_blank');
      setStatus('success');
      playSfx('jutsu');
      showToast('Transmission Dispatched', 'Mail client opened with your message ready to send!', 'success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch {
      setStatus('error');
      showToast('Transmission Intercepted', 'Please copy email address directly or try again.', 'error');
    } finally {
      setSending(false);
    }
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
          title={
            <>
              Let's Create Something <span className="text-gradient">Legendary</span>
            </>
          }
          subtitle="Ready to deploy your next high-impact mission? Send the signal."
        />

        <div className="contact-grid">
          {/* Contact Cards */}
          <div className="contact-cards-container">
            {contactCards.map((card, i) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={card.label}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <HoloCard
                    glowColor="var(--color-accent-primary)"
                    className="contact-card"
                    {...(card.href ? { as: 'a', href: card.href, target: '_blank', rel: 'noreferrer' } : {})}
                    onClick={() => playSfx('click')}
                  >
                    <div className="contact-card-content">
                      <div className="contact-card-icon">
                        <Icon size={22} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <div className="text-small contact-card-label">{card.label}</div>
                        <div className="contact-card-value">{card.value}</div>
                      </div>
                    </div>
                  </HoloCard>
                </motion.div>
              );
            })}

            {/* Quick 1-Click Copy Email Action Card */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <button
                onClick={handleCopyEmail}
                className="contact-copy-btn"
                style={{
                  width: '100%',
                  padding: '14px 18px',
                  borderRadius: '12px',
                  background: 'rgba(204, 34, 34, 0.1)',
                  border: '1px dashed var(--color-accent-primary)',
                  color: 'var(--color-text-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.825rem',
                  cursor: 'pointer',
                  transition: 'all 0.25s ease',
                }}
              >
                {copied ? <Check size={16} color="#38ef7d" /> : <Copy size={16} />}
                <span>{copied ? 'Copied to Clipboard!' : 'Copy Direct Email Address'}</span>
              </button>
            </motion.div>

            {/* Decorative Rinnegan ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
              className="contact-rinnegan-ring"
            >
              {[1, 2, 3, 4].map((r) => (
                <div key={r} className="contact-rinnegan-circle" style={{ width: r * 28, height: r * 28 }} />
              ))}
            </motion.div>
          </div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <HoloCard glowColor="var(--color-accent-primary)" className="contact-form-card">
              <form onSubmit={handleSubmit}>
                <div className="contact-form-grid">
                  <div>
                    <label className="text-small contact-form-label">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Your name"
                      className="contact-input"
                    />
                  </div>
                  <div>
                    <label className="text-small contact-form-label">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="your@email.com"
                      className="contact-input"
                    />
                  </div>
                </div>

                <div style={{ marginBottom: '1rem' }}>
                  <label className="text-small contact-form-label">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    placeholder="Project Inquiry / Job Opportunity"
                    className="contact-input"
                  />
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <label className="text-small contact-form-label">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder="Describe your project, timeline, and requirements..."
                    rows={5}
                    className="contact-input contact-textarea"
                  />
                </div>

                {status === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="contact-success-message"
                  >
                    <CheckCircle size={18} />
                    <span>Transmission deployed! Ready to collaborate.</span>
                  </motion.div>
                )}
                {status === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="contact-error-message"
                  >
                    <AlertCircle size={18} />
                    <span>Failed to transmit. Please use the copy email button above.</span>
                  </motion.div>
                )}

                <motion.button
                  type="submit"
                  disabled={sending}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`contact-submit-btn${sending ? ' contact-submit-btn--disabled' : ''}`}
                >
                  {sending ? (
                    <>
                      <div className="contact-spinner" />
                      Deploying...
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      Deploy Message Scroll
                    </>
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
