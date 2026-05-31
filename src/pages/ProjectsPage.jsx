import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight, ExternalLink } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import SectionHeader from '../components/ui/SectionHeader';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import ParticleField from '../components/ParticleField';
import content from '../content.json';

const ALL_CATEGORIES = ['All', ...new Set(content.projects.map(p => p.category.split(' / ')[0]))];

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = activeCategory === 'All'
    ? content.projects
    : content.projects.filter(p => p.category.includes(activeCategory));

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
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              background: 'rgba(6,182,212,0.12)', border: '1px solid rgba(6,182,212,0.25)',
              borderRadius: '100px', padding: '5px 16px',
              fontSize: '11px', fontWeight: 600, letterSpacing: '0.1em',
              textTransform: 'uppercase', color: '#06b6d4', marginBottom: '20px',
            }}>
              Our Portfolio
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            style={{ fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 800, color: '#fff', letterSpacing: '-0.02em', marginBottom: '16px' }}
          >
            Projects That{' '}
            <span style={{
              background: 'linear-gradient(135deg, #06b6d4, #3b82f6)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>
              Define Excellence
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            style={{ fontSize: '17px', color: 'rgba(255,255,255,0.55)', maxWidth: '560px', margin: '0 auto', lineHeight: 1.7 }}
          >
            A showcase of real-world solutions we've engineered — from AI platforms to enterprise systems.
          </motion.p>
        </div>
      </section>

      {/* Projects */}
      <section className="section">
        <div className="container">
          <SectionHeader
            eyebrow="Case Studies"
            title="Work We're"
            highlight="Proud Of"
            subtitle="Each project represents our commitment to technical excellence and measurable results."
          />

          {/* Category Filter */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '48px', marginTop: '-20px' }}>
            {ALL_CATEGORIES.map(cat => (
              <motion.button
                key={cat}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setActiveCategory(cat)}
                style={{
                  padding: '8px 20px', borderRadius: '100px', fontSize: '13px', fontWeight: 600,
                  cursor: 'pointer', transition: 'all 0.2s', border: 'none',
                  background: activeCategory === cat ? 'var(--gradient)' : 'var(--bg-muted)',
                  color: activeCategory === cat ? '#fff' : 'var(--text-muted)',
                  boxShadow: activeCategory === cat ? 'var(--shadow-blue)' : 'none',
                }}
              >
                {cat}
              </motion.button>
            ))}
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
            gap: '24px',
          }}>
            {filtered.map((proj, i) => (
              <ProjectCard key={proj.id} project={proj} delay={(i % 3) * 0.1} />
            ))}
          </div>
        </div>
      </section>

      {/* Metrics Banner */}
      <section style={{ background: 'var(--bg-soft)', padding: '64px 0' }} className="circuit-bg">
        <div className="container">
          <SectionHeader
            eyebrow="By The Numbers"
            title="The Impact We've"
            highlight="Created"
          />
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: '20px',
          }}>
            {[
              { value: '50+', label: 'Projects Shipped', detail: 'Across 10+ industries' },
              { value: '99%', label: 'On-Time Delivery', detail: 'Agile sprints that work' },
              { value: '0', label: 'Critical Bugs in Prod', detail: 'Rigorous QA standards' },
              { value: '4.9★', label: 'Client Rating', detail: 'Based on 30+ reviews' },
            ].map((m, i) => (
              <motion.div
                key={m.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                style={{
                  background: '#fff', borderRadius: 'var(--radius-lg)', padding: '28px',
                  border: '1px solid var(--border)', boxShadow: 'var(--shadow)', textAlign: 'center',
                }}
              >
                <div style={{
                  fontSize: '38px', fontWeight: 800, letterSpacing: '-0.03em',
                  background: 'var(--gradient)', WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent', backgroundClip: 'text', lineHeight: 1, marginBottom: '8px',
                }}>
                  {m.value}
                </div>
                <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text)', marginBottom: '4px' }}>{m.label}</div>
                <div style={{ fontSize: '12px', color: 'var(--text-light)' }}>{m.detail}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: 'var(--primary)', padding: '80px 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, color: '#fff', letterSpacing: '-0.02em', marginBottom: '16px' }}>
              Your Project Could Be Next
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '16px', marginBottom: '32px', maxWidth: '480px', margin: '0 auto 32px' }}>
              Let's discuss how we can build something exceptional together.
            </p>
            <NavLink to="/contact">
              <Button variant="white" size="lg" icon={<ArrowRight size={16} />}>
                Start a Project
              </Button>
            </NavLink>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

function ProjectCard({ project, delay }) {
  const isFeatured = !!project.badge;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6, boxShadow: isFeatured ? '0 24px 64px rgba(124,58,237,0.2)' : 'var(--shadow-lg)' }}
      style={{
        background: '#fff', borderRadius: 'var(--radius-xl)',
        border: isFeatured ? '1.5px solid rgba(124,58,237,0.25)' : '1px solid var(--border)',
        boxShadow: isFeatured ? '0 4px 24px rgba(124,58,237,0.1)' : 'var(--shadow)',
        overflow: 'hidden', display: 'flex', flexDirection: 'column',
        transition: 'box-shadow 0.3s ease',
        position: 'relative',
      }}
    >
      {/* Color header */}
      <div style={{
        height: '6px',
        background: isFeatured
          ? 'linear-gradient(90deg, #7c3aed, #a855f7, #06b6d4)'
          : 'linear-gradient(90deg, var(--secondary), var(--accent))',
      }} />

      {/* Featured ribbon */}
      {isFeatured && (
        <div style={{
          position: 'absolute', top: '18px', right: '-10px',
          background: 'linear-gradient(135deg, #7c3aed, #a855f7)',
          color: '#fff', fontSize: '10px', fontWeight: 800,
          letterSpacing: '0.08em', textTransform: 'uppercase',
          padding: '4px 16px 4px 12px',
          borderRadius: '4px 0 0 4px',
          boxShadow: '0 2px 8px rgba(124,58,237,0.4)',
        }}>
          ★ {project.badge}
        </div>
      )}

      <div style={{ padding: '28px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px', flexWrap: 'wrap' }}>
          <Badge
            variant={isFeatured ? 'purple' : 'accent'}
            style={{ marginBottom: '0' }}
          >
            {project.category}
          </Badge>
        </div>

        <h3 style={{ fontSize: '20px', fontWeight: 800, marginBottom: '12px', letterSpacing: '-0.02em' }}>
          {project.title}
        </h3>
        <p style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: 1.75, flex: 1, marginBottom: '16px' }}>
          {project.description}
        </p>

        {/* Feature list for astrology platform */}
        {project.features && (
          <ul style={{ marginBottom: '16px', display: 'flex', flexDirection: 'column', gap: '7px' }}>
            {project.features.map((f, i) => (
              <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13px', color: 'var(--text-muted)' }}>
                <CheckCircle2 size={13} style={{ color: '#7c3aed', flexShrink: 0, marginTop: '2px' }} />
                {f}
              </li>
            ))}
          </ul>
        )}

        {/* Highlight */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: '8px',
          padding: '10px 14px', borderRadius: '8px',
          background: isFeatured
            ? 'linear-gradient(135deg, rgba(124,58,237,0.06), rgba(168,85,247,0.06))'
            : 'linear-gradient(135deg, rgba(5,150,105,0.06), rgba(6,182,212,0.06))',
          border: isFeatured ? '1px solid rgba(124,58,237,0.12)' : '1px solid rgba(5,150,105,0.12)',
          marginBottom: '16px',
        }}>
          <CheckCircle2 size={15} style={{ color: isFeatured ? '#7c3aed' : '#059669', flexShrink: 0 }} />
          <span style={{ fontSize: '13px', fontWeight: 700, color: isFeatured ? '#7c3aed' : '#059669' }}>
            {project.highlight}
          </span>
        </div>

        {/* Tech stack */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
          {project.tech.map(t => (
            <Badge key={t} variant="default" style={{ fontSize: '11px' }}>{t}</Badge>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
