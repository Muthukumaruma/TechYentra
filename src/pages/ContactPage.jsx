import { motion } from 'framer-motion';
import { useState, useCallback } from 'react';
import { Phone, Mail, Send, CheckCircle2, MessageSquare, ShieldCheck } from 'lucide-react';
import SEO from '../components/SEO';
import SectionHeader from '../components/ui/SectionHeader';
import Button from '../components/ui/Button';
import ParticleField from '../components/ParticleField';
import content from '../content.json';

const SERVICES_LIST = content.services.map(s => s.title);

const INITIAL_FORM = {
  name: '', email: '', company: '', phone: '',
  service: '', budget: '', message: '', consent: false,
};

const SITE_KEY = '6Le2ogUtAAAAACHvmBZxPp72hah9Chsp8qvWu0r6';

async function getEnterpriseToken(action) {
  return new Promise((resolve, reject) => {
    if (!window.grecaptcha?.enterprise) {
      return reject(new Error('reCAPTCHA not loaded'));
    }
    window.grecaptcha.enterprise.ready(async () => {
      try {
        const token = await window.grecaptcha.enterprise.execute(SITE_KEY, { action });
        resolve(token);
      } catch (err) {
        reject(err);
      }
    });
  });
}

export default function ContactPage() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email required';
    if (!form.message.trim()) e.message = 'Message is required';
    return e;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setLoading(true);
    try {
      const captchaToken = await getEnterpriseToken('contact_form');
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, captchaToken }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Something went wrong');
      setSubmitted(true);
    } catch (err) {
      setErrors({ submit: err.message || 'Failed to send. Please call us directly.' });
    } finally {
      setLoading(false);
    }
  }, [form]);

  return (
    <div className="page-wrapper">
      <SEO
        title="Contact Us – Get a Free Project Consultation"
        path="/contact"
        description="Get in touch with TechYenthra Technologies. Call +91 81051 77337 or fill in our contact form to discuss your software project. We respond within 24 hours."
        keywords="contact TechYenthra, hire software developers India, software development consultation, get project quote India, IT company contact Bengaluru"
      />
      {/* Hero */}
      <section className="page-hero" style={{ padding: '100px 0 80px', position: 'relative', overflow: 'hidden' }}>
        <ParticleField count={40} dark />
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'linear-gradient(rgba(6,182,212,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.04) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }} />
        <div className="container" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              background: 'rgba(6,182,212,0.12)', border: '1px solid rgba(6,182,212,0.25)',
              borderRadius: '100px', padding: '5px 16px',
              fontSize: '11px', fontWeight: 600, letterSpacing: '0.1em',
              textTransform: 'uppercase', color: '#06b6d4', marginBottom: '20px',
            }}>
              Contact Us
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            style={{ fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 800, color: '#fff', letterSpacing: '-0.02em', marginBottom: '16px' }}
          >
            {content.contact.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            style={{ fontSize: '17px', color: 'rgba(255,255,255,0.55)', maxWidth: '560px', margin: '0 auto', lineHeight: 1.7 }}
          >
            {content.contact.subtitle}
          </motion.p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section">
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '48px', alignItems: 'start',
          }}>
            {/* Left: Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <SectionHeader
                eyebrow="Get In Touch"
                title="Let's Start a"
                highlight="Conversation"
                align="left"
              />
              <p style={{ color: 'var(--text-muted)', fontSize: '16px', lineHeight: 1.75, marginBottom: '36px', marginTop: '-16px' }}>
                Whether you have a specific project in mind or just want to explore what's possible — our team is ready to help.
              </p>

              {/* Phone */}
              <ContactItem
                icon={Phone}
                label="Phone"
                value={content.contact.phone}
                href={`tel:${content.contact.phone.replace(/\s/g, '')}`}
                color="#1d4ed8"
              />
              <ContactItem
                icon={Mail}
                label="Email"
                value={content.contact.email}
                href={`mailto:${content.contact.email}`}
                color="#06b6d4"
              />
              <ContactItem
                icon={MessageSquare}
                label="Response Time"
                value="Within 24 hours"
                color="#7c3aed"
              />

              {/* Why contact us */}
              <div style={{
                marginTop: '36px',
                padding: '24px',
                borderRadius: 'var(--radius-lg)',
                background: 'linear-gradient(135deg, rgba(29,78,216,0.04), rgba(6,182,212,0.04))',
                border: '1px solid rgba(29,78,216,0.08)',
              }}>
                <h4 style={{ fontSize: '15px', fontWeight: 700, marginBottom: '14px', color: 'var(--text)' }}>
                  Why work with TechYenthra?
                </h4>
                {[
                  'Transparent communication throughout',
                  'Dedicated project manager assigned',
                  'Fixed-price and T&M engagement models',
                  'Post-launch support included',
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                    <CheckCircle2 size={14} style={{ color: '#06b6d4', flexShrink: 0 }} />
                    <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right: Form */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              {submitted ? (
                <SuccessMessage onReset={() => { setSubmitted(false); setForm(INITIAL_FORM); }} />
              ) : (
                <div style={{
                  background: '#fff', borderRadius: 'var(--radius-xl)',
                  border: '1px solid var(--border)', boxShadow: 'var(--shadow-lg)',
                  overflow: 'hidden',
                }}>
                  <div style={{
                    padding: '28px 32px 24px',
                    borderBottom: '1px solid var(--border-light)',
                    background: 'var(--bg-soft)',
                  }}>
                    <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '4px' }}>
                      {content.contact.formTitle}
                    </h3>
                    <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                      {content.contact.formSubtitle}
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} style={{ padding: '32px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                      <FormField label="Full Name *" name="name" value={form.name} onChange={handleChange} error={errors.name} placeholder="John Doe" />
                      <FormField label="Email Address *" name="email" type="email" value={form.email} onChange={handleChange} error={errors.email} placeholder="john@company.com" />
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                      <FormField label="Company (Optional)" name="company" value={form.company} onChange={handleChange} placeholder="Your Company" />
                      <FormField label="Phone (Optional)" name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="+91 XXXXX XXXXX" />
                    </div>

                    {/* Service selector */}
                    <div style={{ marginBottom: '16px' }}>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text)', marginBottom: '6px' }}>
                        Service Interested In
                      </label>
                      <select
                        name="service"
                        value={form.service}
                        onChange={handleChange}
                        style={inputStyle}
                      >
                        <option value="">Select a service...</option>
                        {SERVICES_LIST.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>

                    {/* Budget */}
                    <div style={{ marginBottom: '16px' }}>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text)', marginBottom: '6px' }}>
                        Estimated Budget
                      </label>
                      <select name="budget" value={form.budget} onChange={handleChange} style={inputStyle}>
                        <option value="">Select budget range...</option>
                        <option>Under ₹5 Lakhs</option>
                        <option>₹5 – ₹15 Lakhs</option>
                        <option>₹15 – ₹50 Lakhs</option>
                        <option>₹50 Lakhs+</option>
                        <option>Let's discuss</option>
                      </select>
                    </div>

                    {/* Message */}
                    <div style={{ marginBottom: '20px' }}>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text)', marginBottom: '6px' }}>
                        Project Description *
                      </label>
                      <textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        rows={4}
                        placeholder="Tell us about your project, goals, and any specific requirements..."
                        style={{ ...inputStyle, resize: 'vertical', minHeight: '100px' }}
                      />
                      {errors.message && <p style={{ color: '#dc2626', fontSize: '12px', marginTop: '4px' }}>{errors.message}</p>}
                    </div>

                    {/* Consent */}
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: '24px' }}>
                      <input
                        type="checkbox"
                        id="consent"
                        name="consent"
                        checked={form.consent}
                        onChange={handleChange}
                        style={{ marginTop: '3px', accentColor: 'var(--secondary)', width: '15px', height: '15px', flexShrink: 0 }}
                      />
                      <label htmlFor="consent" style={{ fontSize: '12px', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                        I agree to be contacted by TechYenthra Technologies regarding my inquiry. We respect your privacy and will never share your information.
                      </label>
                    </div>

                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      fullWidth
                      icon={loading ? null : <Send size={16} />}
                    >
                      {loading ? 'Sending...' : 'Send Message'}
                    </Button>

                    {errors.submit && (
                      <p style={{ marginTop: '12px', padding: '10px 14px', borderRadius: '8px', background: 'rgba(220,38,38,0.06)', border: '1px solid rgba(220,38,38,0.15)', color: '#dc2626', fontSize: '13px', textAlign: 'center' }}>
                        {errors.submit}
                      </p>
                    )}

                    {/* reCAPTCHA badge */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', justifyContent: 'center', marginTop: '14px' }}>
                      <ShieldCheck size={13} style={{ color: 'var(--text-light)' }} />
                      <p style={{ fontSize: '11px', color: 'var(--text-light)', margin: 0 }}>
                        Protected by reCAPTCHA · <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-light)', textDecoration: 'underline' }}>Privacy</a> &amp; <a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-light)', textDecoration: 'underline' }}>Terms</a>
                      </p>
                    </div>
                  </form>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}

const inputStyle = {
  width: '100%',
  padding: '10px 14px',
  borderRadius: '9px',
  border: '1.5px solid var(--border)',
  fontSize: '14px',
  color: 'var(--text)',
  background: '#fff',
  outline: 'none',
  transition: 'border-color 0.2s',
  fontFamily: 'Inter, sans-serif',
};

function FormField({ label, name, type = 'text', value, onChange, error, placeholder }) {
  return (
    <div>
      <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text)', marginBottom: '6px' }}>
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        style={{
          ...inputStyle,
          borderColor: error ? '#dc2626' : 'var(--border)',
        }}
        onFocus={e => e.target.style.borderColor = 'var(--secondary)'}
        onBlur={e => e.target.style.borderColor = error ? '#dc2626' : 'var(--border)'}
      />
      {error && <p style={{ color: '#dc2626', fontSize: '12px', marginTop: '4px' }}>{error}</p>}
    </div>
  );
}

function ContactItem({ icon: Icon, label, value, href, color }) {
  const content = (
    <div style={{
      display: 'flex', alignItems: 'center', gap: '16px',
      padding: '18px 20px',
      borderRadius: 'var(--radius)',
      background: '#fff',
      border: '1px solid var(--border)',
      boxShadow: 'var(--shadow-sm)',
      marginBottom: '12px',
      transition: 'all 0.2s',
    }}>
      <div style={{
        width: '44px', height: '44px', borderRadius: '11px', flexShrink: 0,
        background: `${color}10`, border: `1px solid ${color}20`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <Icon size={20} style={{ color }} />
      </div>
      <div>
        <div style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-light)', marginBottom: '3px' }}>
          {label}
        </div>
        <div style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text)' }}>{value}</div>
      </div>
    </div>
  );

  if (href) {
    return (
      <a href={href} style={{ display: 'block', textDecoration: 'none' }}
        onMouseEnter={e => e.currentTarget.querySelector('div').style.borderColor = `${color}30`}
        onMouseLeave={e => e.currentTarget.querySelector('div').style.borderColor = 'var(--border)'}
      >
        {content}
      </a>
    );
  }
  return content;
}

function SuccessMessage({ onReset }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      style={{
        background: '#fff', borderRadius: 'var(--radius-xl)',
        border: '1px solid var(--border)', boxShadow: 'var(--shadow-lg)',
        padding: '60px 40px', textAlign: 'center',
      }}
    >
      <div style={{
        width: '72px', height: '72px', borderRadius: '50%',
        background: 'linear-gradient(135deg, rgba(5,150,105,0.1), rgba(6,182,212,0.1))',
        border: '2px solid rgba(5,150,105,0.2)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        margin: '0 auto 24px',
      }}>
        <CheckCircle2 size={32} style={{ color: '#059669' }} />
      </div>
      <h3 style={{ fontSize: '24px', fontWeight: 800, marginBottom: '12px' }}>Message Sent!</h3>
      <p style={{ color: 'var(--text-muted)', fontSize: '15px', lineHeight: 1.7, marginBottom: '28px', maxWidth: '360px', margin: '0 auto 28px' }}>
        Thank you for reaching out! Our team will get back to you within 24 hours.
      </p>
      <button
        onClick={onReset}
        style={{
          padding: '10px 24px', borderRadius: '9px', fontSize: '14px', fontWeight: 600,
          background: 'var(--bg-muted)', border: 'none', cursor: 'pointer', color: 'var(--text)',
        }}
      >
        Send Another Message
      </button>
    </motion.div>
  );
}
