import { motion } from 'framer-motion';

export default function Card({
  children,
  hover = true,
  padding = '28px',
  radius = 'var(--radius-lg)',
  shadow = true,
  border = true,
  style = {},
  onClick,
  delay = 0,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={hover ? { y: -6, boxShadow: 'var(--shadow-lg)' } : undefined}
      onClick={onClick}
      style={{
        background: '#fff',
        borderRadius: radius,
        padding,
        border: border ? '1px solid var(--border)' : 'none',
        boxShadow: shadow ? 'var(--shadow)' : 'none',
        transition: 'box-shadow 0.3s ease',
        cursor: onClick ? 'pointer' : 'default',
        ...style,
      }}
    >
      {children}
    </motion.div>
  );
}
