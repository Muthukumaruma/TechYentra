import { motion } from 'framer-motion';
import { Target, Eye, Users, Award, CheckCircle2, ArrowRight } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import SEO from '../components/SEO';
import SectionHeader from '../components/ui/SectionHeader';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import ParticleField from '../components/ParticleField';
import content from '../content.json';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-50px' },
  transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] },
});

export default function AboutPage() {
  return (
    <div className="page-wrapper">
      <SEO
        title="About Us – Our Mission, Vision & Team"
        path="/about"
        description="Learn about TechYenthra Technologies – our mission, vision, core values, and the passionate team of engineers and AI specialists building world-class digital solutions from India."
        keywords="about TechYenthra Technologies, software company India, IT company Bengaluru, tech company mission vision, software development team India"
      />
      {/* Page Hero */}
      <section
        className="page-hero"
        style={{ padding: '100px 0 80px', position: 'relative', overflow: 'hidden' }}
      >
        <ParticleField count={50} dark />
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'linear-gradient(rgba(6,182,212,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.04) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }} />
        <div className="container" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <motion.div {...fadeUp(0.1)}>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              background: 'rgba(6,182,212,0.12)', border: '1px solid rgba(6,182,212,0.25)',
              borderRadius: '100px', padding: '5px 16px',
              fontSize: '11px', fontWeight: 600, letterSpacing: '0.1em',
              textTransform: 'uppercase', color: '#06b6d4', marginBottom: '20px',
            }}>
              About Us
            </span>
          </motion.div>
          <motion.h1
            {...fadeUp(0.2)}
            style={{ fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 800, color: '#fff', letterSpacing: '-0.02em', marginBottom: '16px' }}
          >
            Passionate Engineers,{' '}
            <span style={{
              background: 'linear-gradient(135deg, #06b6d4, #3b82f6)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>
              Purposeful Builders
            </span>
          </motion.h1>
          <motion.p
            {...fadeUp(0.3)}
            style={{ fontSize: '17px', color: 'rgba(255,255,255,0.55)', maxWidth: '560px', margin: '0 auto', lineHeight: 1.7 }}
          >
            {content.about.teamDescription}
          </motion.p>
        </div>
      </section>

      {/* About Section */}
      <section className="section">
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
            gap: '64px', alignItems: 'center',
          }}>
            <motion.div {...fadeUp(0)}>
              <SectionHeader
                eyebrow="Our Story"
                title={content.about.title}
                highlight={content.about.subtitle.split(' ').slice(-2).join(' ')}
                align="left"
              />
              <p style={{ color: 'var(--text-muted)', fontSize: '16px', lineHeight: 1.8, marginBottom: '24px', marginTop: '-20px' }}>
                {content.about.description}
              </p>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {content.about.highlights.map((h, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '15px', color: 'var(--text)' }}
                  >
                    <CheckCircle2 size={17} style={{ color: 'var(--accent)', flexShrink: 0, marginTop: '3px' }} />
                    {h}
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Stats visual */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              {content.stats.map((stat, i) => (
                <Card key={stat.label} delay={i * 0.1} padding="28px" style={{ textAlign: 'center' }}>
                  <div style={{
                    fontSize: '40px', fontWeight: 800, letterSpacing: '-0.03em',
                    background: 'var(--gradient)', WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                    lineHeight: 1, marginBottom: '8px',
                  }}>
                    {stat.value}
                  </div>
                  <div style={{ fontSize: '13px', color: 'var(--text-muted)', fontWeight: 500 }}>{stat.label}</div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section circuit-bg" style={{ background: 'var(--bg-soft)' }}>
        <div className="container">
          <SectionHeader
            eyebrow="Mission & Vision"
            title="What Drives"
            highlight="Everything We Do"
            subtitle="Our mission and vision are the compass that guides every decision we make."
          />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '24px' }}>
            <MissionCard
              icon={Target}
              title={content.mission.title}
              text={content.mission.text}
              gradient="linear-gradient(135deg, #1d4ed8, #06b6d4)"
              delay={0}
            />
            <MissionCard
              icon={Eye}
              title={content.vision.title}
              text={content.vision.text}
              gradient="linear-gradient(135deg, #7c3aed, #1d4ed8)"
              delay={0.15}
            />
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section">
        <div className="container">
          <SectionHeader
            eyebrow="Core Values"
            title="The Principles We"
            highlight="Never Compromise On"
          />
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: '20px',
          }}>
            {content.values.map((val, i) => (
              <Card key={val.title} delay={i * 0.1} padding="28px">
                <div style={{
                  width: '44px', height: '44px', borderRadius: '12px',
                  background: 'var(--gradient)', display: 'flex',
                  alignItems: 'center', justifyContent: 'center', marginBottom: '16px',
                }}>
                  <Award size={20} color="#fff" />
                </div>
                <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '10px' }}>{val.title}</h3>
                <p style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: 1.7 }}>{val.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: 'var(--primary)', padding: '80px 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <motion.div {...fadeUp(0)}>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, color: '#fff', letterSpacing: '-0.02em', marginBottom: '16px' }}>
              Ready to Work With Us?
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '16px', marginBottom: '32px', maxWidth: '480px', margin: '0 auto 32px' }}>
              Let's build something exceptional together. Contact our team today.
            </p>
            <NavLink to="/contact">
              <Button variant="white" size="lg" icon={<ArrowRight size={16} />}>
                Get In Touch
              </Button>
            </NavLink>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

function MissionCard({ icon: Icon, title, text, gradient, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      style={{
        borderRadius: 'var(--radius-xl)',
        overflow: 'hidden',
        boxShadow: 'var(--shadow-lg)',
      }}
    >
      <div style={{ background: gradient, padding: '32px 32px 24px' }}>
        <div style={{
          width: '52px', height: '52px', borderRadius: '14px',
          background: 'rgba(255,255,255,0.15)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          marginBottom: '20px',
        }}>
          <Icon size={24} color="#fff" />
        </div>
        <h3 style={{ fontSize: '22px', fontWeight: 700, color: '#fff', marginBottom: '0' }}>{title}</h3>
      </div>
      <div style={{ background: '#fff', padding: '24px 32px 32px', border: '1px solid var(--border)', borderTop: 'none', borderRadius: '0 0 var(--radius-xl) var(--radius-xl)' }}>
        <p style={{ fontSize: '15px', color: 'var(--text-muted)', lineHeight: 1.75 }}>{text}</p>
      </div>
    </motion.div>
  );
}
