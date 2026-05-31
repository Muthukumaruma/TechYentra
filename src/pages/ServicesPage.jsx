import { motion } from 'framer-motion';
import {
  Globe, Smartphone, Brain, Cloud, BarChart3, Shield,
  Layers, Palette, GitBranch, Cpu, Bot, Database, ArrowRight,
} from 'lucide-react';
import { NavLink } from 'react-router-dom';
import SectionHeader from '../components/ui/SectionHeader';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import ParticleField from '../components/ParticleField';
import content from '../content.json';

const ICON_MAP = {
  Globe, Smartphone, Brain, Cloud, BarChart3, Shield,
  Layers, Palette, GitBranch, Cpu, Bot, Database,
};

const ICON_COLORS = [
  '#1d4ed8', '#7c3aed', '#059669', '#0891b2',
  '#d97706', '#dc2626', '#0f172a', '#be185d',
  '#065f46', '#1d4ed8', '#7c3aed', '#6366f1',
];

export default function ServicesPage() {
  return (
    <div className="page-wrapper">
      {/* Hero */}
      <section className="page-hero" style={{ padding: '100px 0 80px', position: 'relative', overflow: 'hidden' }}>
        <ParticleField count={45} dark />
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'linear-gradient(rgba(6,182,212,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.04) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }} />
        <div className="container" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1 }}
          >
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              background: 'rgba(6,182,212,0.12)', border: '1px solid rgba(6,182,212,0.25)',
              borderRadius: '100px', padding: '5px 16px',
              fontSize: '11px', fontWeight: 600, letterSpacing: '0.1em',
              textTransform: 'uppercase', color: '#06b6d4', marginBottom: '20px',
            }}>
              Our Services
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.2 }}
            style={{ fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 800, color: '#fff', letterSpacing: '-0.02em', marginBottom: '16px' }}
          >
            Full-Spectrum{' '}
            <span style={{
              background: 'linear-gradient(135deg, #06b6d4, #3b82f6)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>
              Technology Services
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.3 }}
            style={{ fontSize: '17px', color: 'rgba(255,255,255,0.55)', maxWidth: '580px', margin: '0 auto', lineHeight: 1.7 }}
          >
            From intelligent AI systems to scalable cloud infrastructure — we deliver end-to-end technology solutions that transform businesses.
          </motion.p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section">
        <div className="container">
          <SectionHeader
            eyebrow="12 Service Areas"
            title="Everything You Need to"
            highlight="Build & Scale"
            subtitle="A comprehensive portfolio of technology services covering every stage of your digital journey."
          />
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
            gap: '20px',
          }}>
            {content.services.map((svc, i) => (
              <ServiceCard key={svc.id} service={svc} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="section circuit-bg" style={{ background: 'var(--bg-soft)' }}>
        <div className="container">
          <SectionHeader
            eyebrow="How We Work"
            title="Our Delivery"
            highlight="Process"
            subtitle="A proven methodology that ensures quality, transparency, and on-time delivery."
          />
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
            gap: '0',
            position: 'relative',
          }}>
            {PROCESS_STEPS.map((step, i) => (
              <ProcessStep key={step.title} step={step} index={i} isLast={i === PROCESS_STEPS.length - 1} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: 'var(--primary)', padding: '80px 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, color: '#fff', letterSpacing: '-0.02em', marginBottom: '16px' }}>
              Have a Project in Mind?
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '16px', marginBottom: '32px', maxWidth: '480px', margin: '0 auto 32px' }}>
              Tell us about your requirements and we'll craft the perfect solution for you.
            </p>
            <NavLink to="/contact">
              <Button variant="white" size="lg" icon={<ArrowRight size={16} />}>
                Discuss Your Project
              </Button>
            </NavLink>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

function ServiceCard({ service, index }) {
  const Icon = ICON_MAP[service.icon] || Globe;
  const color = ICON_COLORS[index % ICON_COLORS.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6, boxShadow: 'var(--shadow-lg)' }}
      style={{
        background: '#fff',
        borderRadius: 'var(--radius-lg)',
        padding: '28px',
        border: '1px solid var(--border)',
        boxShadow: 'var(--shadow)',
        transition: 'box-shadow 0.3s ease',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
        <div style={{
          width: '52px', height: '52px', borderRadius: '14px', flexShrink: 0,
          background: `${color}10`,
          border: `1px solid ${color}20`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Icon size={22} style={{ color, strokeWidth: 1.8 }} />
        </div>
        <div style={{ flex: 1 }}>
          <h3 style={{ fontSize: '17px', fontWeight: 700, marginBottom: '10px' }}>{service.title}</h3>
          <p style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '16px' }}>
            {service.description}
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {service.technologies.map(t => (
              <Badge key={t} variant="default" style={{ fontSize: '11px' }}>{t}</Badge>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function ProcessStep({ step, index, isLast }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.12, duration: 0.5 }}
      style={{ padding: '32px 24px', position: 'relative', textAlign: 'center' }}
    >
      {!isLast && (
        <div style={{
          position: 'absolute', top: '44px', right: 0,
          width: '50%', height: '1px',
          background: 'linear-gradient(to right, var(--border), transparent)',
        }} />
      )}
      <div style={{
        width: '52px', height: '52px', borderRadius: '50%',
        background: 'var(--gradient)', color: '#fff',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '18px', fontWeight: 800,
        margin: '0 auto 16px',
        boxShadow: 'var(--shadow-blue)',
      }}>
        {index + 1}
      </div>
      <h4 style={{ fontSize: '15px', fontWeight: 700, marginBottom: '8px' }}>{step.title}</h4>
      <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.65 }}>{step.description}</p>
    </motion.div>
  );
}

const PROCESS_STEPS = [
  { title: 'Discovery', description: 'Deep dive into your requirements, goals, and technical landscape.' },
  { title: 'Architecture', description: 'Design scalable, secure system architecture and technology stack.' },
  { title: 'Development', description: 'Agile sprints with regular demos and continuous integration.' },
  { title: 'Testing', description: 'Rigorous QA, performance testing, and security audits.' },
  { title: 'Deployment', description: 'Smooth launch with CI/CD pipelines and zero-downtime releases.' },
];
