import { motion } from 'framer-motion';

const variants = {
  primary: {
    background: 'var(--gradient)',
    color: '#fff',
    border: 'none',
    boxShadow: 'var(--shadow-blue)',
  },
  secondary: {
    background: 'transparent',
    color: 'var(--secondary)',
    border: '2px solid var(--secondary)',
  },
  outline: {
    background: 'transparent',
    color: 'var(--text)',
    border: '2px solid var(--border)',
  },
  ghost: {
    background: 'var(--bg-muted)',
    color: 'var(--text)',
    border: 'none',
  },
  white: {
    background: '#fff',
    color: 'var(--primary)',
    border: 'none',
    boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
  },
};

const sizes = {
  sm: { padding: '8px 18px', fontSize: '13px', borderRadius: '8px' },
  md: { padding: '12px 28px', fontSize: '15px', borderRadius: '10px' },
  lg: { padding: '16px 36px', fontSize: '16px', borderRadius: '12px' },
  xl: { padding: '18px 44px', fontSize: '17px', borderRadius: '14px' },
};

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  href,
  type = 'button',
  fullWidth = false,
  icon,
  style = {},
  className = '',
}) {
  const baseStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    fontFamily: 'Inter, sans-serif',
    fontWeight: 600,
    letterSpacing: '-0.01em',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    whiteSpace: 'nowrap',
    width: fullWidth ? '100%' : 'auto',
    ...variants[variant],
    ...sizes[size],
    ...style,
  };

  const motionProps = {
    whileHover: { scale: 1.03, y: -1 },
    whileTap: { scale: 0.97 },
    style: baseStyle,
    className,
  };

  if (href) {
    return (
      <motion.a href={href} {...motionProps}>
        {icon && <span style={{ display: 'flex' }}>{icon}</span>}
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button type={type} onClick={onClick} {...motionProps}>
      {icon && <span style={{ display: 'flex' }}>{icon}</span>}
      {children}
    </motion.button>
  );
}
