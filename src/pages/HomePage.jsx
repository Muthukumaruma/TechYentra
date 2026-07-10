import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Zap, Shield, Globe, Brain, Cpu, BarChart3, CheckCheck, ExternalLink, Download } from 'lucide-react';
import ParticleField from '../components/ParticleField';
import SEO from '../components/SEO';
import SectionHeader from '../components/ui/SectionHeader';
import AnimatedCounter from '../components/ui/AnimatedCounter';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import content from '../content.json';

const ICON_MAP = { Brain, Globe, Shield, Zap, Cpu, BarChart3 };

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
};

const featuredServices = content.services.slice(0, 6);

const HOME_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'TechYenthra Technologies Private Limited',
  url: 'https://www.techyenthra.com',
  telephone: '+918105177337',
  email: 'info@techyenthra.com',
  address: { '@type': 'PostalAddress', addressLocality: 'Bengaluru', addressRegion: 'Karnataka', addressCountry: 'IN' },
  serviceType: ['AI Development', 'Web Development', 'Mobile App Development', 'Cloud Solutions', 'OTT Platform Development', 'Online Travel Agent Software'],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'IT Services',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'AI & Machine Learning Solutions' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Web Application Development' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Mobile App Development' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'OTT Streaming Platform Development' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Online Travel Agent Platform' } },
    ],
  },
};

export default function HomePage() {
  return (
    <div className="page-wrapper" style={{ paddingTop: 0 }}>
      <SEO
        path="/"
        description="TechYenthra Technologies – India's trusted software development company. We build AI platforms, web & mobile apps, OTT streaming, travel tech, and enterprise solutions. 50+ projects delivered."
        keywords="software development company India, AI development Bengaluru, web development company India, mobile app development, OTT platform development, online travel agent software India, government IT services India, GeM registered software company, e-governance platform development, enterprise software company Bengaluru, SaaS product development India"
        schema={HOME_SCHEMA}
      />
      {/* ─── Hero ─── */}
      <section
        style={{
          position: 'relative',
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #0a0f1e 0%, #0d1b3e 40%, #0a1628 100%)',
          display: 'flex',
          alignItems: 'center',
          overflow: 'hidden',
        }}
      >
        <ParticleField count={70} dark />

        {/* Gradient orbs */}
        <div style={{
          position: 'absolute', width: '600px', height: '600px',
          borderRadius: '50%', top: '-200px', right: '-100px',
          background: 'radial-gradient(circle, rgba(29,78,216,0.18) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', width: '400px', height: '400px',
          borderRadius: '50%', bottom: '-100px', left: '10%',
          background: 'radial-gradient(circle, rgba(6,182,212,0.12) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 1, paddingTop: '120px', paddingBottom: '80px' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            {/* Eyebrow */}
            <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.1 }}>
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                background: 'rgba(6,182,212,0.1)', border: '1px solid rgba(6,182,212,0.25)',
                borderRadius: '100px', padding: '6px 18px',
                fontSize: '12px', fontWeight: 600, letterSpacing: '0.08em',
                textTransform: 'uppercase', color: '#06b6d4',
                marginBottom: '24px',
              }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#06b6d4', display: 'inline-block' }} />
                Next-Generation IT Solutions
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: 0.2 }}
              style={{
                fontSize: 'clamp(36px, 6vw, 72px)',
                fontWeight: 800,
                letterSpacing: '-0.03em',
                lineHeight: 1.08,
                color: '#fff',
                marginBottom: '24px',
              }}
            >
              We Engineer{' '}
              <span style={{
                background: 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                Digital Futures
              </span>
              {' '}with AI Power
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: 0.3 }}
              style={{
                fontSize: 'clamp(16px, 2vw, 19px)',
                color: 'rgba(255,255,255,0.6)',
                lineHeight: 1.7, maxWidth: '620px', margin: '0 auto 40px',
              }}
            >
              {content.company.subTagline}
            </motion.p>

            {/* CTAs */}
            <motion.div
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: 0.4 }}
              style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}
            >
              <NavLink to="/contact">
                <motion.div
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '8px',
                    padding: '15px 32px', borderRadius: '12px',
                    background: 'linear-gradient(135deg, #1d4ed8, #06b6d4)',
                    color: '#fff', fontWeight: 700, fontSize: '15px',
                    boxShadow: '0 8px 32px rgba(29,78,216,0.4)',
                    cursor: 'pointer',
                  }}
                >
                  Start Your Project <ArrowRight size={16} />
                </motion.div>
              </NavLink>
              <NavLink to="/projects">
                <motion.div
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '8px',
                    padding: '15px 32px', borderRadius: '12px',
                    background: 'rgba(255,255,255,0.07)',
                    border: '1px solid rgba(255,255,255,0.15)',
                    color: '#fff', fontWeight: 600, fontSize: '15px',
                    cursor: 'pointer',
                  }}
                >
                  View Our Work
                </motion.div>
              </NavLink>
              <a href={content.company.companyProfile} download="TechYenthra-Company-Profile.pdf">
                <motion.div
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '8px',
                    padding: '15px 28px', borderRadius: '12px',
                    background: 'rgba(6,182,212,0.1)',
                    border: '1px solid rgba(6,182,212,0.3)',
                    color: '#06b6d4', fontWeight: 600, fontSize: '15px',
                    cursor: 'pointer',
                  }}
                >
                  <Download size={16} /> Company Profile
                </motion.div>
              </a>
            </motion.div>

          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
          style={{
            position: 'absolute', bottom: '32px', left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px',
            color: 'rgba(255,255,255,0.4)', fontSize: '11px', letterSpacing: '0.1em',
          }}
        >
          <span>SCROLL</span>
          <div style={{ width: '1px', height: '32px', background: 'linear-gradient(to bottom, rgba(6,182,212,0.6), transparent)' }} />
        </motion.div>
      </section>

      {/* ─── Stats ─── */}
      <section style={{ background: 'var(--primary)', padding: '60px 0' }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
            gap: '0',
          }}>
            {content.stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                style={{
                  textAlign: 'center', padding: '28px 24px',
                  borderRight: i < content.stats.length - 1 ? '1px solid rgba(255,255,255,0.08)' : 'none',
                }}
              >
                <div style={{
                  fontSize: 'clamp(32px, 4vw, 48px)',
                  fontWeight: 800, letterSpacing: '-0.03em',
                  background: 'linear-gradient(135deg, #06b6d4, #3b82f6)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text', lineHeight: 1,
                  marginBottom: '8px',
                }}>
                  <AnimatedCounter value={stat.value} />
                </div>
                <div style={{ color: 'rgba(255,255,255,0.55)', fontSize: '13px', fontWeight: 500, letterSpacing: '0.02em' }}>
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Trust Strip ─── */}
      <section style={{ background: 'var(--bg)', borderBottom: '1px solid var(--border)', padding: '20px 0' }}>
        <div className="container">
          <div style={{
            display: 'flex', flexWrap: 'wrap', alignItems: 'center',
            justifyContent: 'center', gap: '12px 32px',
          }}>
            {/* DPIIT Badge */}
            <a
              href={content.company.dpiitCertificate}
              target="_blank"
              rel="noopener noreferrer"
              title="View DPIIT Certificate"
              style={{
                display: 'flex', alignItems: 'center', gap: '10px',
                background: 'linear-gradient(135deg, rgba(255,153,0,0.08), rgba(19,136,8,0.08))',
                border: '1px solid rgba(255,153,0,0.25)',
                borderRadius: '10px', padding: '10px 18px',
                textDecoration: 'none', transition: 'all 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(255,153,0,0.5)'}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,153,0,0.25)'}
            >
              {/* Indian flag colors bar */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                <div style={{ width: '18px', height: '4px', background: '#FF9900', borderRadius: '2px' }} />
                <div style={{ width: '18px', height: '4px', background: '#ffffff', borderRadius: '2px', border: '1px solid #ddd' }} />
                <div style={{ width: '18px', height: '4px', background: '#138808', borderRadius: '2px' }} />
              </div>
              <div>
                <div style={{ fontSize: '11px', fontWeight: 800, color: '#FF9900', letterSpacing: '0.06em', lineHeight: 1 }}>DPIIT RECOGNISED</div>
                <div style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 500, letterSpacing: '0.04em' }}>Startup India</div>
              </div>
            </a>

            <div style={{ width: '1px', height: '32px', background: 'var(--border)' }} />

            {/* Udyam Badge */}
            <a
              href={content.company.udyamCertificate}
              target="_blank"
              rel="noopener noreferrer"
              title="View Udyam Registration Certificate"
              style={{
                display: 'flex', alignItems: 'center', gap: '10px',
                background: 'linear-gradient(135deg, rgba(29,78,216,0.07), rgba(6,182,212,0.07))',
                border: '1px solid rgba(29,78,216,0.2)',
                borderRadius: '10px', padding: '10px 18px',
                textDecoration: 'none', transition: 'all 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(29,78,216,0.45)'}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(29,78,216,0.2)'}
            >
              <span style={{ fontSize: '20px' }}>🏭</span>
              <div>
                <div style={{ fontSize: '11px', fontWeight: 800, color: '#1d4ed8', letterSpacing: '0.06em', lineHeight: 1 }}>UDYAM REGISTERED</div>
                <div style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 500, letterSpacing: '0.04em' }}>MSME · Govt. of India</div>
              </div>
            </a>

            <div style={{ width: '1px', height: '32px', background: 'var(--border)' }} />

            {[
              { icon: '🏆', label: '50+ Projects', sub: 'Successfully Delivered' },
              { icon: '🤝', label: '30+ Clients', sub: 'Across Industries' },
              { icon: '🤖', label: '10+ AI Products', sub: 'Built & Deployed' },
              { icon: '⭐', label: '5+ Years', sub: 'Of Excellence' },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '20px' }}>{item.icon}</span>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text)', lineHeight: 1.2 }}>{item.label}</div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{item.sub}</div>
                </div>
                {i < 3 && <div style={{ width: '1px', height: '28px', background: 'var(--border)', marginLeft: '12px' }} />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Services Preview ─── */}
      <section className="section circuit-bg" style={{ background: 'var(--bg-soft)' }}>
        <div className="container">
          <SectionHeader
            eyebrow="What We Do"
            title="Services Built for"
            highlight="the Digital Age"
            subtitle="From AI-powered platforms to enterprise software — we cover the full technology spectrum."
          />
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '20px',
            marginBottom: '40px',
          }}>
            {featuredServices.map((svc, i) => (
              <ServiceCard key={svc.id} service={svc} delay={i * 0.08} />
            ))}
          </div>
          <div style={{ textAlign: 'center' }}>
            <NavLink to="/services">
              <Button variant="primary" size="lg" icon={<ArrowRight size={16} />}>
                View All Services
              </Button>
            </NavLink>
          </div>
        </div>
      </section>

      {/* ─── Why TechYenthra ─── */}
      <section className="section">
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
            gap: '60px', alignItems: 'center',
          }}>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <SectionHeader
                eyebrow="Why Choose Us"
                title="Technically Strong."
                highlight="Results Focused."
                align="left"
              />
              <p style={{ color: 'var(--text-muted)', fontSize: '16px', lineHeight: 1.75, marginBottom: '28px', marginTop: '-20px' }}>
                {content.about.description}
              </p>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {content.about.highlights.map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.4 }}
                    style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', fontSize: '15px', color: 'var(--text)' }}
                  >
                    <CheckCircle2 size={18} style={{ color: '#06b6d4', flexShrink: 0, marginTop: '2px' }} />
                    {item}
                  </motion.li>
                ))}
              </ul>
              <div style={{ marginTop: '32px' }}>
                <NavLink to="/about">
                  <Button variant="secondary" size="lg" icon={<ArrowRight size={16} />}>
                    Learn About Us
                  </Button>
                </NavLink>
              </div>
            </motion.div>

            {/* Right: values grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              {content.values.map((v, i) => (
                <Card key={v.title} delay={i * 0.1} padding="24px">
                  <div style={{
                    width: '40px', height: '40px', borderRadius: '10px',
                    background: 'var(--gradient)', marginBottom: '14px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <Zap size={18} color="#fff" />
                  </div>
                  <h4 style={{ fontSize: '15px', fontWeight: 700, marginBottom: '8px' }}>{v.title}</h4>
                  <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.65 }}>{v.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Our Products ─── */}
      <section className="section" style={{ background: 'var(--bg-soft)' }}>
        <div className="container">
          <SectionHeader
            eyebrow="Own Products"
            title="SaaS Platforms We"
            highlight="Built & Own"
            subtitle="Beyond client work — we build and operate our own products that solve real-world problems."
          />
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '24px',
          }}>
            {content.products.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  background: 'var(--card-bg)',
                  border: '1px solid var(--border)',
                  borderRadius: '20px',
                  padding: '36px 32px',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <div style={{
                  position: 'absolute', top: 0, left: 0, right: 0, height: '4px',
                  background: `linear-gradient(90deg, ${product.color}, ${product.color}88)`,
                }} />
                <span style={{
                  display: 'inline-block',
                  background: `${product.color}18`,
                  color: product.color,
                  border: `1px solid ${product.color}33`,
                  borderRadius: '100px',
                  padding: '4px 14px',
                  fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  marginBottom: '20px',
                }}>
                  {product.badge}
                </span>
                <h3 style={{ fontSize: '26px', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '8px' }}>
                  {product.name}
                </h3>
                <p style={{ fontSize: '14px', fontWeight: 600, color: product.color, marginBottom: '14px' }}>
                  {product.tagline}
                </p>
                <p style={{ fontSize: '15px', color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '24px' }}>
                  {product.description}
                </p>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {product.highlights.map((h, j) => (
                    <li key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '14px', color: 'var(--text)' }}>
                      <CheckCheck size={15} style={{ color: product.color, flexShrink: 0, marginTop: '2px' }} />
                      {h}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Featured Projects ─── */}
      <section className="section dot-bg" style={{ background: 'var(--bg)' }}>
        <div className="container">
          <SectionHeader
            eyebrow="Our Work"
            title="Projects That"
            highlight="Make Impact"
            subtitle="Real solutions we've built that drive measurable results for our clients."
          />
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
            gap: '20px',
            marginBottom: '40px',
          }}>
            {content.projects.slice(0, 3).map((proj, i) => (
              <ProjectCard key={proj.id} project={proj} delay={i * 0.1} />
            ))}
          </div>
          <div style={{ textAlign: 'center' }}>
            <NavLink to="/projects">
              <Button variant="outline" size="lg" icon={<ArrowRight size={16} />}>
                View All Projects
              </Button>
            </NavLink>
          </div>
        </div>
      </section>

      {/* ─── CTA Banner ─── */}
      <section
        style={{
          background: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 50%, #0f172a 100%)',
          padding: '80px 0',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'linear-gradient(rgba(6,182,212,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.03) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }} />
        <div className="container" style={{ position: 'relative', textAlign: 'center' }}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 style={{
              fontSize: 'clamp(28px, 4vw, 48px)',
              fontWeight: 800, color: '#fff',
              letterSpacing: '-0.02em', marginBottom: '16px',
            }}>
              Ready to Build Something{' '}
              <span style={{
                background: 'linear-gradient(135deg, #06b6d4, #3b82f6)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              }}>
                Extraordinary?
              </span>
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '17px', marginBottom: '36px', maxWidth: '520px', margin: '0 auto 36px' }}>
              Let's talk about your project and see how we can help you achieve your goals faster.
            </p>
            <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <NavLink to="/contact">
                <Button variant="white" size="lg" icon={<ArrowRight size={16} />}>
                  Get In Touch
                </Button>
              </NavLink>
              <a href={`tel:${content.company.phone.replace(/\s/g, '')}`}>
                <Button size="lg" style={{
                  background: 'rgba(255,255,255,0.08)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  color: '#fff',
                }}>
                  {content.company.phone}
                </Button>
              </a>
              <a href={content.company.companyProfile} download="TechYenthra-Company-Profile.pdf">
                <Button size="lg" icon={<Download size={16} />} style={{
                  background: 'rgba(6,182,212,0.12)',
                  border: '1px solid rgba(6,182,212,0.3)',
                  color: '#06b6d4',
                }}>
                  Company Profile
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

function ServiceCard({ service, delay }) {
  return (
    <Card delay={delay} padding="28px">
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
        <div style={{
          width: '48px', height: '48px', borderRadius: '12px',
          background: 'linear-gradient(135deg, rgba(29,78,216,0.08), rgba(6,182,212,0.08))',
          border: '1px solid rgba(29,78,216,0.1)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
        }}>
          <Zap size={20} style={{ color: 'var(--secondary)' }} />
        </div>
        <div style={{ flex: 1 }}>
          <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '8px' }}>{service.title}</h3>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.65, marginBottom: '14px' }}>
            {service.description}
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {service.technologies.slice(0, 3).map(t => (
              <Badge key={t} variant="primary">{t}</Badge>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}

function ProjectCard({ project, delay }) {
  return (
    <Card delay={delay} padding="28px">
      <div style={{ marginBottom: '12px' }}>
        <Badge variant="accent">{project.category}</Badge>
      </div>
      <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '10px' }}>{project.title}</h3>
      <p style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '16px' }}>
        {project.description}
      </p>
      <div style={{
        display: 'flex', alignItems: 'center', gap: '8px',
        padding: '10px 14px', borderRadius: '8px',
        background: 'linear-gradient(135deg, rgba(29,78,216,0.05), rgba(6,182,212,0.05))',
        border: '1px solid rgba(29,78,216,0.08)',
        marginBottom: '16px',
      }}>
        <CheckCircle2 size={14} style={{ color: '#059669' }} />
        <span style={{ fontSize: '13px', fontWeight: 600, color: '#059669' }}>{project.highlight}</span>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
        {project.tech.slice(0, 3).map(t => (
          <Badge key={t} variant="default">{t}</Badge>
        ))}
      </div>
    </Card>
  );
}
