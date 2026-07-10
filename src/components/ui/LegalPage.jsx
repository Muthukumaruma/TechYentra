import { motion } from 'framer-motion';
import { Calendar, FileText } from 'lucide-react';

const ALL_CLAUSES = {
  governingLaw: {
    label: 'Governing Law & Jurisdiction',
    text: 'This document shall be governed by the laws of India. Subject to applicable law, the courts having jurisdiction in Madurai, Tamil Nadu, India shall have exclusive jurisdiction over any disputes arising from this document.',
  },
  liability: {
    label: 'Limitation of Liability',
    text: 'To the maximum extent permitted by applicable law, TechYenthra Technologies Private Limited shall not be liable for any indirect, incidental, consequential, special, exemplary, or punitive damages — including but not limited to loss of revenue, data, goodwill, or business interruption — arising from your use of our services or website, even if advised of the possibility of such damages.',
  },
  ip: {
    label: 'Intellectual Property',
    text: 'All content, branding, software, documentation, and materials on this website and in our deliverables are the exclusive intellectual property of TechYenthra Technologies Private Limited unless explicitly stated otherwise. Unauthorised reproduction, distribution, or use is strictly prohibited and may result in legal action.',
  },
  indemnification: {
    label: 'Indemnification',
    text: 'You agree to indemnify, defend, and hold harmless TechYenthra Technologies Private Limited, its directors, employees, and agents from and against any claims, liabilities, damages, losses, and expenses — including reasonable legal fees — arising out of your use of our services, violation of these policies, or infringement of any third-party rights.',
  },
  modify: {
    label: 'Right to Modify',
    text: 'TechYenthra Technologies Private Limited reserves the right to update, amend, or replace any part of this document at any time. Changes take effect upon publication on our website. Continued use of our services after any modification constitutes acceptance of the revised document.',
  },
  severability: {
    label: 'Severability',
    text: 'If any provision of this document is found to be invalid, unlawful, or unenforceable by a court of competent jurisdiction, such provision shall be limited or eliminated to the minimum extent necessary, and the remaining provisions shall continue in full force and effect.',
  },
};

export default function LegalPage({ title, lastUpdated, intro, sections, clauses }) {
  const activeClauses = (clauses || []).map(key => ALL_CLAUSES[key]).filter(Boolean);
  return (
    <div className="page-wrapper">
      {/* Hero */}
      <section
        style={{
          background: 'linear-gradient(135deg, #0a0f1e 0%, #0d1b3e 60%, #0a1628 100%)',
          padding: '88px 0 64px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'linear-gradient(rgba(6,182,212,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.04) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
          pointerEvents: 'none',
        }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <div style={{
                width: '36px', height: '36px', borderRadius: '9px',
                background: 'rgba(6,182,212,0.12)',
                border: '1px solid rgba(6,182,212,0.25)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <FileText size={16} style={{ color: '#06b6d4' }} />
              </div>
              <span style={{
                fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em',
                textTransform: 'uppercase', color: '#06b6d4',
              }}>
                Legal Document
              </span>
            </div>
            <h1 style={{
              fontSize: 'clamp(28px, 4vw, 48px)',
              fontWeight: 800, color: '#fff',
              letterSpacing: '-0.02em', marginBottom: '16px',
            }}>
              {title}
            </h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'rgba(255,255,255,0.45)', fontSize: '13px' }}>
              <Calendar size={13} />
              Last updated: {lastUpdated}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section style={{ padding: '64px 0 96px', background: '#fff' }}>
        <div className="container">
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            {/* Intro box */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              style={{
                padding: '24px 28px',
                borderRadius: 'var(--radius-lg)',
                background: 'linear-gradient(135deg, rgba(29,78,216,0.04), rgba(6,182,212,0.04))',
                border: '1px solid rgba(29,78,216,0.1)',
                marginBottom: '48px',
              }}
            >
              <p style={{ fontSize: '15px', color: 'var(--text-muted)', lineHeight: 1.8 }}>
                {intro}
              </p>
            </motion.div>

            {/* Sections */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
              {sections.map((sec, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.45, delay: (i % 4) * 0.06 }}
                  style={{
                    padding: '28px 0',
                    borderBottom: i < sections.length - 1 ? '1px solid var(--border-light)' : 'none',
                  }}
                >
                  <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                    {/* Section number */}
                    <div style={{
                      width: '32px', height: '32px', borderRadius: '8px',
                      background: 'var(--gradient)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '12px', fontWeight: 800, color: '#fff',
                      flexShrink: 0, marginTop: '2px',
                    }}>
                      {String(i + 1).padStart(2, '0')}
                    </div>
                    <div style={{ flex: 1 }}>
                      <h3 style={{
                        fontSize: '17px', fontWeight: 700,
                        color: 'var(--text)', marginBottom: '10px',
                        letterSpacing: '-0.01em',
                      }}>
                        {sec.heading}
                      </h3>
                      <p style={{
                        fontSize: '14px', color: 'var(--text-muted)',
                        lineHeight: 1.85,
                      }}>
                        {sec.content}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Legal Clauses */}
            {activeClauses.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                style={{ marginTop: '56px', display: 'flex', flexDirection: 'column', gap: '12px' }}
              >
                {activeClauses.map(({ label, text }) => (
                  <div
                    key={label}
                    style={{
                      padding: '16px 20px',
                      borderRadius: '10px',
                      background: 'linear-gradient(135deg,rgba(29,78,216,0.03),rgba(6,182,212,0.03))',
                      border: '1px solid rgba(29,78,216,0.08)',
                    }}
                  >
                    <p style={{ fontSize: '12px', color: 'var(--text)', lineHeight: 1.75 }}>
                      <strong style={{ color: '#1d4ed8', fontWeight: 700 }}>{label}: </strong>
                      {text}
                    </p>
                  </div>
                ))}
                <p style={{ fontSize: '11px', color: 'var(--text-muted)', textAlign: 'center', marginTop: '8px', lineHeight: 1.6 }}>
                  © {new Date().getFullYear()} TechYenthra Technologies Private Limited · CIN: U62011TN2026PTC194186 · All rights reserved.
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
