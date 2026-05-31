export default function IconBox({ icon: Icon, size = 48, gradient = false, color }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: '14px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: gradient
          ? 'var(--gradient)'
          : color
          ? `${color}12`
          : 'linear-gradient(135deg, rgba(29,78,216,0.08), rgba(6,182,212,0.08))',
        border: gradient ? 'none' : `1px solid ${color ? `${color}20` : 'rgba(29,78,216,0.1)'}`,
        flexShrink: 0,
      }}
    >
      <Icon
        size={size * 0.45}
        style={{
          color: gradient ? '#fff' : color || 'var(--secondary)',
          strokeWidth: 1.8,
        }}
      />
    </div>
  );
}
