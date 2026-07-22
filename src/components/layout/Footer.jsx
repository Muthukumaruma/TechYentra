import { NavLink } from 'react-router-dom';
import { Phone, Mail, Download } from 'lucide-react';
import content from '../../content.json';

const serviceLinks = content.services.slice(0, 6).map(s => s.title);
const quickLinks = content.nav;

const LINKEDIN_URL = 'https://www.linkedin.com/company/techyenthra/';
const FACEBOOK_URL = 'https://www.facebook.com/techyenthra';
const YOUTUBE_URL   = 'https://www.youtube.com/@techyenthra';
const INSTAGRAM_URL = 'https://www.instagram.com/techyenthra';
const X_URL         = 'https://x.com/techyenthra';

function LinkedInIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14zM7.12 20.45H3.56V9h3.56v11.45z" />
    </svg>
  );
}

function FacebookIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function XIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622 5.912-5.622Zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function InstagramIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function YouTubeIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.96-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
      <polygon fill="var(--primary,#0a0f1e)" points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
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
              <span style={{ fontSize: '13px', fontWeight: 900, color: '#ffffff', marginLeft: '3px', marginTop: '3px', lineHeight: 1 }}>™</span>
            </div>
            <p style={{ fontSize: '14px', lineHeight: 1.75, maxWidth: '280px', marginBottom: '24px' }}>
              {content.footer.description}
            </p>
            <div style={{ display: 'flex', gap: '12px' }}>
              {[
                { Icon: LinkedInIcon, href: LINKEDIN_URL, external: true },
                { Icon: FacebookIcon, href: FACEBOOK_URL, external: true },
                { Icon: YouTubeIcon,    href: YOUTUBE_URL,   external: true },
                { Icon: InstagramIcon, href: INSTAGRAM_URL, external: true },
                { Icon: XIcon,        href: X_URL,         external: true },
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
            </div>
          </div>

          {/* Certifications */}
          <div>
            <h4 style={{ color: '#fff', fontSize: '14px', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '20px' }}>
              Certifications
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <a
                href={content.company.companyProfile}
                download="TechYenthra-Company-Profile.pdf"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: 600, color: '#06b6d4', transition: 'opacity 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.opacity = '0.75'}
                onMouseLeave={e => e.currentTarget.style.opacity = '1'}
              >
                <Download size={14} /> Company Profile
              </a>
              <a
                href={content.company.dpiitCertificate}
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: 600, color: '#FF9900', transition: 'opacity 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.opacity = '0.75'}
                onMouseLeave={e => e.currentTarget.style.opacity = '1'}
              >
                🇮🇳 DPIIT Recognised
              </a>
              <a
                href={content.company.udyamCertificate}
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: 600, color: '#1d4ed8', transition: 'opacity 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.opacity = '0.75'}
                onMouseLeave={e => e.currentTarget.style.opacity = '1'}
              >
                🏭 Udyam MSME
              </a>
              <a
                href="https://www.f6s.com/member/muthukumaru?follow=1"
                target="_blank"
                rel="noopener noreferrer"
                title="Follow TechYenthra on F6S"
                style={{ display: 'inline-flex', alignItems: 'center', transition: 'opacity 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.opacity = '0.75'}
                onMouseLeave={e => e.currentTarget.style.opacity = '1'}
              >
                <img
                  src="https://www.f6s.com/images/f6s-follow-secondary.png"
                  alt="Follow TechYenthra on F6S"
                  style={{ width: '78px', height: '22px', padding: 0, margin: 0, display: 'block' }}
                />
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
          <div>
            <p style={{ fontSize: '13px' }}>
              © {content.footer.copyright}
            </p>
            <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.35)', marginTop: '4px' }}>
              CIN: {content.company.cin}
            </p>
          </div>
          <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
            {[
              { label: 'Legal Center', path: '/legal' },
              { label: 'Privacy Policy', path: '/privacy' },
              { label: 'Terms & Conditions', path: '/terms' },
              { label: 'Cookie Policy', path: '/cookies' },
              { label: 'Refund Policy', path: '/refund' },
              { label: 'Acceptable Use', path: '/acceptable-use' },
              { label: 'SLA', path: '/sla' },
              { label: 'Security', path: '/security' },
              { label: 'Data Protection', path: '/data-protection' },
              { label: 'Disclosure', path: '/disclosure' },
              { label: 'Business Continuity', path: '/business-continuity' },
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
