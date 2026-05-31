import { NavLink } from 'react-router-dom';
import { Phone, Mail, Globe, Share2, Code2 } from 'lucide-react';
import content from '../../content.json';

const serviceLinks = content.services.slice(0, 6).map(s => s.title);
const quickLinks = content.nav;

export default function Footer() {
  return (
    <footer
      style={{
        background: 'var(--primary)',
        color: 'rgba(255,255,255,0.75)',
        paddingTop: '72px',
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '48px',
            paddingBottom: '56px',
            borderBottom: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          {/* Brand */}
          <div style={{ gridColumn: 'span 2' }}>
            <img
              src={content.company.logoLight}
              alt={content.company.legalName}
              style={{ height: '44px', width: 'auto', marginBottom: '20px' }}
            />
            <p style={{ fontSize: '14px', lineHeight: 1.75, maxWidth: '280px', marginBottom: '24px' }}>
              {content.footer.description}
            </p>
            <div style={{ display: 'flex', gap: '12px' }}>
              {[
                { Icon: Globe, href: '#' },
                { Icon: Share2, href: '#' },
                { Icon: Code2, href: '#' },
              ].map(({ Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  style={{
                    width: '36px', height: '36px',
                    borderRadius: '8px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    color: 'rgba(255,255,255,0.6)',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = 'rgba(6,182,212,0.15)';
                    e.currentTarget.style.color = '#06b6d4';
                    e.currentTarget.style.borderColor = 'rgba(6,182,212,0.3)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
                    e.currentTarget.style.color = 'rgba(255,255,255,0.6)';
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                  }}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 style={{ color: '#fff', fontSize: '14px', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '20px' }}>
              Navigation
            </h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {quickLinks.map(link => (
                <li key={link.path}>
                  <NavLink
                    to={link.path}
                    style={{ fontSize: '14px', transition: 'color 0.2s' }}
                    onMouseEnter={e => e.currentTarget.style.color = '#06b6d4'}
                    onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.75)'}
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 style={{ color: '#fff', fontSize: '14px', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '20px' }}>
              Services
            </h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {serviceLinks.map(s => (
                <li key={s}>
                  <NavLink
                    to="/services"
                    style={{ fontSize: '14px', transition: 'color 0.2s' }}
                    onMouseEnter={e => e.currentTarget.style.color = '#06b6d4'}
                    onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.75)'}
                  >
                    {s}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ color: '#fff', fontSize: '14px', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '20px' }}>
              Contact
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <a
                href={`tel:${content.company.phone.replace(/\s/g, '')}`}
                style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', transition: 'color 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.color = '#06b6d4'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.75)'}
              >
                <Phone size={15} />
                {content.company.phone}
              </a>
              <a
                href={`mailto:${content.company.email}`}
                style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', transition: 'color 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.color = '#06b6d4'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.75)'}
              >
                <Mail size={15} />
                {content.company.email}
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '24px 0',
            flexWrap: 'wrap',
            gap: '12px',
          }}
        >
          <p style={{ fontSize: '13px' }}>
            © {content.footer.copyright}
          </p>
          <div style={{ display: 'flex', gap: '24px' }}>
            {[
              { label: 'Privacy Policy', path: '/privacy' },
              { label: 'Terms of Service', path: '/terms' },
            ].map(({ label, path }) => (
              <NavLink
                key={label}
                to={path}
                style={{ fontSize: '13px', transition: 'color 0.2s', color: 'rgba(255,255,255,0.75)' }}
                onMouseEnter={e => e.currentTarget.style.color = '#06b6d4'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.75)'}
              >
                {label}
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
