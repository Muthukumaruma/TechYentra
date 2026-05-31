export default function Badge({ children, variant = 'default', style = {} }) {
  const styles = {
    default: {
      background: 'var(--bg-muted)',
      color: 'var(--text-muted)',
      border: '1px solid var(--border)',
    },
    primary: {
      background: 'rgba(29,78,216,0.08)',
      color: 'var(--secondary)',
      border: '1px solid rgba(29,78,216,0.15)',
    },
    accent: {
      background: 'rgba(6,182,212,0.08)',
      color: '#0891b2',
      border: '1px solid rgba(6,182,212,0.2)',
    },
    purple: {
      background: 'rgba(124,58,237,0.08)',
      color: '#7c3aed',
      border: '1px solid rgba(124,58,237,0.15)',
    },
    success: {
      background: 'rgba(16,185,129,0.08)',
      color: '#059669',
      border: '1px solid rgba(16,185,129,0.15)',
    },
    dark: {
      background: 'rgba(255,255,255,0.1)',
      color: 'rgba(255,255,255,0.85)',
      border: '1px solid rgba(255,255,255,0.15)',
    },
  };

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: '3px 10px',
        borderRadius: '100px',
        fontSize: '12px',
        fontWeight: 500,
        letterSpacing: '0.01em',
        ...styles[variant],
        ...style,
      }}
    >
      {children}
    </span>
  );
}
