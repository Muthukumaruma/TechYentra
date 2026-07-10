import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone } from 'lucide-react';
import content from '../../content.json';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setMobileOpen(false), [pathname]);

  const isHome = pathname === '/';
  const forceDark = isHome && !scrolled;

  return (
    <>
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: 'fixed',
          top: 0, left: 0, right: 0,
          zIndex: 1000,
          background: scrolled
            ? 'rgba(255,255,255,0.95)'
            : isHome ? 'transparent' : 'rgba(255,255,255,0.95)',
          backdropFilter: scrolled || !isHome ? 'blur(20px)' : 'none',
          WebkitBackdropFilter: scrolled || !isHome ? 'blur(20px)' : 'none',
          borderBottom: scrolled || !isHome ? '1px solid rgba(226,232,240,0.8)' : 'none',
          boxShadow: scrolled ? 'var(--shadow-sm)' : 'none',
          transition: 'all 0.3s ease',
        }}
      >
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '72px' }}>
          {/* Logo */}
          <NavLink to="/" style={{ display: 'flex', alignItems: 'flex-start', position: 'relative' }}>
            <img
              src={forceDark ? content.company.logoLight : content.company.logoDark}
              alt={content.company.legalName}
              style={{ height: '40px', width: 'auto', objectFit: 'contain' }}
            />
            <span style={{
              fontSize: '11px', fontWeight: 900, lineHeight: 1,
              color: forceDark ? '#ffffff' : '#1d4ed8',
              marginLeft: '3px', marginTop: '2px', flexShrink: 0,
            }}>™</span>
          </NavLink>

          {/* Desktop nav */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }} className="desktop-nav">
            {content.nav.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                style={({ isActive }) => ({
                  padding: '8px 16px',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: isActive ? 600 : 500,
                  color: isActive
                    ? 'var(--secondary)'
                    : forceDark ? 'rgba(255,255,255,0.85)' : 'var(--text-muted)',
                  background: isActive ? 'rgba(29,78,216,0.06)' : 'transparent',
                  transition: 'all 0.2s',
                  letterSpacing: '-0.01em',
                })}
              >
                {item.label}
              </NavLink>
            ))}
          </div>

          {/* CTA */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }} className="desktop-nav">
            <a
              href={`tel:${content.company.phone.replace(/\s/g, '')}`}
              style={{
                display: 'flex', alignItems: 'center', gap: '6px',
                fontSize: '13px', fontWeight: 600,
                color: forceDark ? 'rgba(255,255,255,0.85)' : 'var(--text-muted)',
                transition: 'color 0.2s',
              }}
            >
              <Phone size={14} />
              {content.company.phone}
            </a>
            <NavLink
              to="/contact"
              style={{
                padding: '9px 20px',
                borderRadius: '9px',
                fontSize: '14px',
                fontWeight: 600,
                background: 'var(--gradient)',
                color: '#fff',
                boxShadow: 'var(--shadow-blue)',
                transition: 'opacity 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.opacity = '0.9'}
              onMouseLeave={e => e.currentTarget.style.opacity = '1'}
            >
              Get Started
            </NavLink>
          </div>

          {/* Mobile hamburger */}
          <button
            className="mobile-menu-btn"
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{
              display: 'none',
              padding: '8px',
              borderRadius: '8px',
              color: forceDark ? '#fff' : 'var(--text)',
            }}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            style={{
              position: 'fixed',
              top: 72, left: 0, right: 0,
              zIndex: 999,
              background: 'rgba(255,255,255,0.98)',
              backdropFilter: 'blur(20px)',
              borderBottom: '1px solid var(--border)',
              overflow: 'hidden',
              boxShadow: 'var(--shadow-lg)',
            }}
          >
            <div className="container" style={{ padding: '16px 24px 24px' }}>
              {content.nav.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  style={({ isActive }) => ({
                    display: 'block',
                    padding: '12px 16px',
                    borderRadius: '10px',
                    fontSize: '16px',
                    fontWeight: isActive ? 600 : 500,
                    color: isActive ? 'var(--secondary)' : 'var(--text)',
                    background: isActive ? 'rgba(29,78,216,0.06)' : 'transparent',
                    marginBottom: '4px',
                  })}
                >
                  {item.label}
                </NavLink>
              ))}
              <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid var(--border)' }}>
                <a
                  href={`tel:${content.company.phone.replace(/\s/g, '')}`}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '8px',
                    fontSize: '15px', fontWeight: 600, color: 'var(--secondary)',
                    padding: '12px 0',
                  }}
                >
                  <Phone size={16} />
                  {content.company.phone}
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 900px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </>
  );
}
