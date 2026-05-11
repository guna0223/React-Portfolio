import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Link, Send, CheckCircle, AlertCircle } from 'lucide-react';
import emailjs from 'emailjs-com';
import { contactInfo } from '../../data/portfolio';
import HoloCard from '../ui/HoloCard';
import SectionHeading from '../ui/SectionHeading';

const inputStyle = {
  width: '100%', padding: '0.875rem 1rem', borderRadius: '0.75rem',
  background: 'rgba(204,34,34,0.04)', border: '1px solid var(--color-border-subtle)',
  color: 'var(--color-text-primary)', fontFamily: 'var(--font-body)', fontSize: '1rem',
  outline: 'none', transition: 'border-color 0.3s, box-shadow 0.3s',
};
const focusStyle = { borderColor: 'var(--color-accent-primary)', boxShadow: '0 0 12px rgba(204,34,34,0.2)' };
const blurStyle = { borderColor: 'var(--color-border-subtle)', boxShadow: 'none' };

const ContactSection = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState(null);
  const [sending, setSending] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true); setStatus(null);
    try {
      await emailjs.send('service_portfolio', 'template_portfolio', formData, 'user_emailjs_id');
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch { setStatus('error'); }
    finally { setSending(false); }
  };

  const contactCards = [
    { icon: Mail, label: 'Email', value: contactInfo.email, href: `mailto:${contactInfo.email}` },
    { icon: MapPin, label: 'Location', value: contactInfo.location, href: contactInfo.mapsUrl },
    { icon: Link, label: 'LinkedIn', value: contactInfo.linkedin, href: `https://${contactInfo.linkedin}` },
    { icon: Link, label: 'WhatsApp', value: contactInfo.whatsapp, href: `https://wa.me/${contactInfo.whatsapp.replace(/\D/g, '')}` },
  ];

  return (
    <section id="contact" className="section-padding" style={{ position: 'relative', overflow: 'hidden' }}>
      <div className="aurora-bg" />
      <div className="grid-background" />
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 100%, rgba(123,47,255,0.06) 0%, transparent 60%)', pointerEvents: 'none' }} />

      <div className="section-container" style={{ position: 'relative', zIndex: 1 }}>
        <SectionHeading
          number="06"
          title={<>Let's Create Something <span className="text-gradient">Legendary</span></>}
          subtitle="Ready to deploy your next mission? Send the signal."
        />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.3fr', gap: 'clamp(2rem, 5vw, 4rem)', marginTop: '3rem' }} className="contact-grid">
          {/* Contact Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {contactCards.map((card, i) => {
              const Icon = card.icon;
              return (
                <motion.div key={card.label} initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}>
                  <HoloCard glowColor="var(--color-accent-primary)" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem', ...(card.href ? { cursor: 'none' } : {}) }}
                    {...(card.href ? { as: 'a', href: card.href, target: '_blank', rel: 'noreferrer' } : {})}
                  >
                    <div style={{ width: 50, height: 50, borderRadius: '12px', background: 'rgba(204,34,34,0.1)', border: '1px solid rgba(204,34,34,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-accent-primary)', flexShrink: 0, boxShadow: '0 0 12px rgba(204,34,34,0.15)' }}>
                      <Icon size={22} />
                    </div>
                    <div>
                      <div className="text-small" style={{ marginBottom: '0.25rem', color: 'var(--color-text-muted)' }}>{card.label}</div>
                      <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.9375rem', color: 'var(--color-text-primary)', fontWeight: 500 }}>{card.value}</div>
                    </div>
                  </HoloCard>
                </motion.div>
              );
            })}

            {/* Decorative Rinnegan ring */}
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
              style={{ width: 120, height: 120, margin: '1rem auto 0', opacity: 0.15, position: 'relative' }}
            >
              {[1, 2, 3, 4].map((r) => (
                <div key={r} style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: r * 28, height: r * 28, borderRadius: '50%', border: '1px solid #7b2fff' }} />
              ))}
            </motion.div>
          </div>

          {/* Contact Form */}
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <HoloCard glowColor="var(--color-accent-primary)" style={{ padding: '2rem' }}>
              <form onSubmit={handleSubmit}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                  <div>
                    <label className="text-small" style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--color-text-muted)' }}>Name</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="Your name" style={inputStyle} onFocus={e => Object.assign(e.target.style, focusStyle)} onBlur={e => Object.assign(e.target.style, blurStyle)} />
                  </div>
                  <div>
                    <label className="text-small" style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--color-text-muted)' }}>Email</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="your@email.com" style={inputStyle} onFocus={e => Object.assign(e.target.style, focusStyle)} onBlur={e => Object.assign(e.target.style, blurStyle)} />
                  </div>
                </div>

                <div style={{ marginBottom: '1rem' }}>
                  <label className="text-small" style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--color-text-muted)' }}>Subject</label>
                  <input type="text" name="subject" value={formData.subject} onChange={handleChange} required placeholder="Mission brief" style={inputStyle} onFocus={e => Object.assign(e.target.style, focusStyle)} onBlur={e => Object.assign(e.target.style, blurStyle)} />
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <label className="text-small" style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--color-text-muted)' }}>Message</label>
                  <textarea name="message" value={formData.message} onChange={handleChange} required placeholder="Describe your mission..." rows={5}
                    style={{ ...inputStyle, resize: 'vertical' }}
                    onFocus={e => Object.assign(e.target.style, focusStyle)} onBlur={e => Object.assign(e.target.style, blurStyle)}
                  />
                </div>

                {status === 'success' && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1rem', borderRadius: '0.75rem', background: 'rgba(204,34,34,0.1)', border: '1px solid rgba(204,34,34,0.25)', color: 'var(--color-accent-primary)', marginBottom: '1rem' }}>
                    <CheckCircle size={18} /><span style={{ fontSize: '0.875rem' }}>Message sent! I'll respond soon.</span>
                  </motion.div>
                )}
                {status === 'error' && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1rem', borderRadius: '0.75rem', background: 'rgba(255,80,80,0.1)', border: '1px solid rgba(255,80,80,0.25)', color: '#ff6666', marginBottom: '1rem' }}>
                    <AlertCircle size={18} /><span style={{ fontSize: '0.875rem' }}>Failed to send. Please try again.</span>
                  </motion.div>
                )}

                <motion.button type="submit" disabled={sending} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  style={{ width: '100%', padding: '1rem', borderRadius: '0.75rem', background: sending ? 'rgba(204,34,34,0.3)' : 'linear-gradient(135deg, var(--color-accent-primary), var(--color-accent-purple))', color: '#fff', fontFamily: 'var(--font-display)', fontSize: '0.9375rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', border: 'none', cursor: sending ? 'not-allowed' : 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', boxShadow: sending ? 'none' : '0 0 20px rgba(204,34,34,0.4), 0 0 40px rgba(123,47,255,0.2)', transition: 'all 0.3s' }}
                >
                  {sending ? (
                    <><motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }} style={{ width: 18, height: 18, border: '2px solid #fff', borderTopColor: 'transparent', borderRadius: '50%' }} />Sending...</>
                  ) : (
                    <><Send size={18} />Deploy Message</>
                  )}
                </motion.button>
              </form>
            </HoloCard>
          </motion.div>
        </div>
      </div>

      <style>{`@media (max-width: 768px) { .contact-grid { grid-template-columns: 1fr !important; } }`}</style>
    </section>
  );
};

export default ContactSection;
