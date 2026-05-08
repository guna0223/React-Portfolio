import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { FiLinkedin } from 'react-icons/fi';
import emailjs from 'emailjs-com';
import { contactInfo } from '../../data/portfolio';
import SectionHeading from '../ui/SectionHeading';
import GlowCard from '../ui/GlowCard';
import AuroraBackground from '../effects/AuroraBackground';

const ContactSection = () => {
  const formRef = useRef(null);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState(null); // 'success' | 'error' | 'loading' | null
  const [focusedField, setFocusedField] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    try {
      await emailjs.sendForm(
        'service_id', // Replace with actual service ID
        'template_id', // Replace with actual template ID
        formRef.current,
        'user_key' // Replace with actual user key
      );
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setStatus(null), 4000);
    } catch {
      setStatus('error');
      setTimeout(() => setStatus(null), 4000);
    }
  };

  const contactCards = [
    { icon: Mail, label: 'Email', value: contactInfo.email, href: `mailto:${contactInfo.email}` },
    { icon: MapPin, label: 'Location', value: contactInfo.location, href: null },
    { icon: FiLinkedin, label: 'LinkedIn', value: contactInfo.linkedin, href: `https://${contactInfo.linkedin}` },
  ];

  const inputStyle = (field) => ({
    width: '100%',
    padding: '0.875rem 1rem',
    borderRadius: '0.75rem',
    background: 'rgba(15, 15, 35, 0.6)',
    border: `1px solid ${focusedField === field ? 'rgba(124, 58, 237, 0.5)' : 'var(--color-border-subtle)'}`,
    color: 'var(--color-text-primary)',
    fontSize: '0.9375rem',
    fontFamily: 'var(--font-body)',
    outline: 'none',
    transition: 'border-color 0.3s, box-shadow 0.3s',
    boxShadow: focusedField === field ? '0 0 20px var(--color-glow-primary)' : 'none',
    cursor: 'none',
  });

  return (
    <section id="contact" className="section-padding" style={{ position: 'relative' }}>
      <AuroraBackground />
      <div className="grid-background" />

      <div className="section-container" style={{ position: 'relative', zIndex: 1 }}>
        <SectionHeading
          number="06"
          title={<>Let's Create Something <span className="text-gradient">Amazing</span></>}
          subtitle="Have a project in mind? Let's make it happen."
        />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 'clamp(2rem, 5vw, 4rem)', alignItems: 'start' }} className="contact-grid">
          {/* Contact Info */}
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {contactCards.map(({ icon: Icon, label, value, href }, i) => (
                <motion.div key={label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 + i * 0.1 }}>
                  <GlowCard style={{ padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(124,58,237,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-accent-primary)', flexShrink: 0 }}>
                      <Icon size={20} />
                    </div>
                    <div>
                      <div className="text-small" style={{ marginBottom: '0.125rem' }}>{label}</div>
                      {href ? (
                        <a href={href} target="_blank" rel="noreferrer" style={{ color: 'var(--color-text-primary)', fontWeight: 500, fontSize: '0.9375rem' }}>{value}</a>
                      ) : (
                        <div style={{ color: 'var(--color-text-primary)', fontWeight: 500, fontSize: '0.9375rem' }}>{value}</div>
                      )}
                    </div>
                  </GlowCard>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.2 }}>
            <GlowCard style={{ padding: 'clamp(1.5rem, 3vw, 2.5rem)' }}>
              <form ref={formRef} onSubmit={handleSubmit}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                  <div>
                    <label className="text-small" style={{ display: 'block', marginBottom: '0.375rem' }}>Name</label>
                    <input name="name" value={formData.name} onChange={handleChange} onFocus={() => setFocusedField('name')} onBlur={() => setFocusedField(null)} required placeholder="John Doe" style={inputStyle('name')} />
                  </div>
                  <div>
                    <label className="text-small" style={{ display: 'block', marginBottom: '0.375rem' }}>Email</label>
                    <input name="email" type="email" value={formData.email} onChange={handleChange} onFocus={() => setFocusedField('email')} onBlur={() => setFocusedField(null)} required placeholder="john@example.com" style={inputStyle('email')} />
                  </div>
                </div>
                <div style={{ marginBottom: '1rem' }}>
                  <label className="text-small" style={{ display: 'block', marginBottom: '0.375rem' }}>Subject</label>
                  <input name="subject" value={formData.subject} onChange={handleChange} onFocus={() => setFocusedField('subject')} onBlur={() => setFocusedField(null)} required placeholder="Project inquiry" style={inputStyle('subject')} />
                </div>
                <div style={{ marginBottom: '1.5rem' }}>
                  <label className="text-small" style={{ display: 'block', marginBottom: '0.375rem' }}>Message</label>
                  <textarea name="message" value={formData.message} onChange={handleChange} onFocus={() => setFocusedField('message')} onBlur={() => setFocusedField(null)} required rows={5} placeholder="Tell me about your project..." style={{ ...inputStyle('message'), resize: 'vertical', minHeight: '120px' }} />
                </div>
                <motion.button type="submit" disabled={status === 'loading'} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} style={{ width: '100%', padding: '0.875rem', borderRadius: '0.75rem', background: status === 'loading' ? 'rgba(124,58,237,0.5)' : 'linear-gradient(135deg, var(--color-accent-primary), #9333ea)', color: 'white', fontWeight: 600, fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', border: 'none', boxShadow: '0 0 20px var(--color-glow-primary)' }}>
                  {status === 'loading' ? 'Sending...' : <><Send size={18}/> Send Message</>}
                </motion.button>
              </form>

              {/* Status toast */}
              {(status === 'success' || status === 'error') && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ marginTop: '1rem', padding: '0.75rem 1rem', borderRadius: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', fontWeight: 500, background: status === 'success' ? 'rgba(16,185,129,0.1)' : 'rgba(244,63,94,0.1)', border: `1px solid ${status === 'success' ? 'rgba(16,185,129,0.3)' : 'rgba(244,63,94,0.3)'}`, color: status === 'success' ? 'var(--color-accent-success)' : 'var(--color-accent-tertiary)' }}>
                  {status === 'success' ? <><CheckCircle size={16}/> Message sent successfully!</> : <><AlertCircle size={16}/> Failed to send. Please try again.</>}
                </motion.div>
              )}
            </GlowCard>
          </motion.div>
        </div>
      </div>
      <style>{`@media(max-width:768px){.contact-grid{grid-template-columns:1fr!important}}`}</style>
    </section>
  );
};

export default ContactSection;
