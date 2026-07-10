import { NavLink } from 'react-router-dom';
import { Phone, Mail, Share2, Code2, Download } from 'lucide-react';
import content from '../../content.json';

const serviceLinks = content.services.slice(0, 6).map(s => s.title);
const quickLinks = content.nav;

const LINKEDIN_URL = 'https://www.linkedin.com/company/techyenthra/';

function LinkedInIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14zM7.12 20.45H3.56V9h3.56v11.45z" />
    </svg>
  );
}

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
            <div style={{ display: 'inline-flex', alignItems: 'flex-start', marginBottom: '20px' }}>
              <img
                src={content.company.logoLight}
                alt={content.company.legalName}
                style={{ height: '44px', width: 'auto' }}
              />
              <sup style={{ fontSize: '11px', fontWeight: 700, color: 'rgba(255,255,255,0.5)', marginLeft: '3px', marginTop: '4px' }}>™</sup>
            </div>
            <p style={{ fontSize: '14px', lineHeight: 1.75, maxWidth: '280px', marginBottom: '24px' }}>
              {content.footer.description}
            </p>
            <div style={{ display: 'flex', gap: '12px' }}>
              {[
                { Icon: LinkedInIcon, href: LINKEDIN_URL, external: true },
                { Icon: Share2, href: '#' },
                { Icon: Code2, href: '#' },
              ].map(({ Icon, href, external }, i) => (
                <a
                  key={i}
                  href={href}
                  {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
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
              <a
                href={content.company.companyProfile}
                download="TechYenthra-Company-Profile.pdf"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: 600, color: '#06b6d4', marginTop: '8px', transition: 'opacity 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.opacity = '0.75'}
                onMouseLeave={e => e.currentTarget.style.opacity = '1'}
              >
                <Download size={14} /> Download Company Profile
              </a>
              <a
                href={content.company.dpiitCertificate}
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: 600, color: '#FF9900', marginTop: '6px', transition: 'opacity 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.opacity = '0.75'}
                onMouseLeave={e => e.currentTarget.style.opacity = '1'}
              >
                🇮🇳 DPIIT Recognised Startup
              </a>
              <a
                href={content.company.udyamCertificate}
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: 600, color: '#1d4ed8', marginTop: '6px', transition: 'opacity 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.opacity = '0.75'}
                onMouseLeave={e => e.currentTarget.style.opacity = '1'}
              >
                🏭 Udyam Registered MSME
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
