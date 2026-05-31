import { motion } from 'framer-motion';

export default function SectionHeader({
  eyebrow,
  title,
  highlight,
  subtitle,
  align = 'center',
  dark = false,
}) {
  const textAlign = align === 'center' ? 'center' : 'left';
  const textColor = dark ? '#fff' : 'var(--text)';
  const mutedColor = dark ? 'rgba(255,255,255,0.65)' : 'var(--text-muted)';

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      style={{ textAlign, marginBottom: '56px' }}
    >
      {eyebrow && (
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'linear-gradient(135deg, rgba(29,78,216,0.08), rgba(6,182,212,0.08))',
            border: '1px solid rgba(29,78,216,0.15)',
            borderRadius: '100px',
            padding: '5px 16px',
            fontSize: '12px',
            fontWeight: 600,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: 'var(--secondary)',
            marginBottom: '16px',
          }}
        >
          <span
            style={{
              width: '6px', height: '6px',
              borderRadius: '50%',
              background: 'var(--gradient)',
              display: 'inline-block',
            }}
          />
          {eyebrow}
        </div>
      )}

      <h2
        style={{
          fontSize: 'clamp(28px, 4vw, 44px)',
          fontWeight: 700,
          letterSpacing: '-0.02em',
          color: textColor,
          lineHeight: 1.15,
          marginBottom: subtitle ? '16px' : 0,
        }}
      >
        {title}{' '}
        {highlight && <span className="text-gradient">{highlight}</span>}
      </h2>

      {subtitle && (
        <p
          style={{
            fontSize: '17px',
            lineHeight: 1.7,
            color: mutedColor,
            maxWidth: align === 'center' ? '600px' : 'none',
            margin: align === 'center' ? '0 auto' : 0,
          }}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
