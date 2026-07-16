import { useState, useEffect, useCallback, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Download } from 'lucide-react';

const TOTAL = 12;
const PAGES = Array.from({ length: TOTAL }, (_, i) => `/broucher/page${i + 1}_compressed.webp`);
const PDF_URL = '/broucher/TY-brouchere.pdf';

const flipVariants = {
  enter: (d) => ({ rotateY: d > 0 ? 50 : -50, opacity: 0, scale: 0.97 }),
  show:  {
    rotateY: 0, opacity: 1, scale: 1,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  },
  exit:  (d) => ({
    rotateY: d > 0 ? -50 : 50, opacity: 0, scale: 0.97,
    transition: { duration: 0.25, ease: [0.55, 0, 1, 0.45] },
  }),
};

const btn = (extra = {}) => ({
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  border: '1px solid rgba(255,255,255,0.14)',
  background: 'rgba(10,15,30,0.72)',
  backdropFilter: 'blur(10px)',
  WebkitBackdropFilter: 'blur(10px)',
  borderRadius: '50%',
  cursor: 'pointer',
  transition: 'all 0.18s',
  color: 'rgba(255,255,255,0.8)',
  ...extra,
});

export default function BrochureViewer({ isOpen, onClose }) {
  const [page, setPage] = useState(0);
  const [dir,  setDir]  = useState(1);
  const [busy, setBusy] = useState(false);
  const touchX = useRef(null);

  const goTo = useCallback((next) => {
    if (busy || next < 0 || next >= TOTAL) return;
    setDir(next > page ? 1 : -1);
    setPage(next);
  }, [busy, page]);

  useEffect(() => {
    if (!isOpen) { setPage(0); return; }
    const onKey = (e) => {
      if (e.key === 'ArrowRight') goTo(page + 1);
      else if (e.key === 'ArrowLeft') goTo(page - 1);
      else if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [isOpen, page, goTo, onClose]);

  if (!isOpen) return null;

  const canPrev = page > 0;
  const canNext = page < TOTAL - 1;

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed', inset: 0, zIndex: 9990,
          background: '#05080f',
        }}
      />

      {/* Full-screen viewer */}
      <div
        style={{
          position: 'fixed', inset: 0, zIndex: 9991,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}
        onTouchStart={e => { touchX.current = e.touches[0].clientX; }}
        onTouchEnd={e => {
          if (touchX.current === null) return;
          const dx = e.changedTouches[0].clientX - touchX.current;
          touchX.current = null;
          if (Math.abs(dx) < 44) return;
          dx < 0 ? goTo(page + 1) : goTo(page - 1);
        }}
      >
        {/* Preload neighbours */}
        {[page - 1, page + 1].filter(p => p >= 0 && p < TOTAL).map(p => (
          <img key={p} src={PAGES[p]} alt="" style={{ display: 'none' }} aria-hidden />
        ))}

        {/* ── Animated page — fills available height ── */}
        <AnimatePresence custom={dir} mode="wait">
          <motion.div
            key={page}
            custom={dir}
            variants={flipVariants}
            initial="enter"
            animate="show"
            exit="exit"
            onAnimationStart={() => setBusy(true)}
            onAnimationComplete={() => setBusy(false)}
            style={{
              height: '100vh',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transformPerspective: 1600,
              padding: '48px 64px',
            }}
          >
            <div style={{ position: 'relative', height: '100%', display: 'flex', alignItems: 'center' }}>
              <img
                src={PAGES[page]}
                alt={`TechYenthra Company Profile — Page ${page + 1}`}
                style={{
                  maxHeight: 'calc(100vh - 96px)',
                  maxWidth: 'calc(100vw - 128px)',
                  width: 'auto',
                  height: 'auto',
                  display: 'block',
                  borderRadius: '4px',
                  boxShadow: '0 8px 48px rgba(0,0,0,0.8), 0 2px 12px rgba(0,0,0,0.6)',
                  userSelect: 'none',
                }}
                draggable={false}
              />
              {/* Subtle sheen */}
              <div style={{
                position: 'absolute', inset: 0, borderRadius: '4px',
                background: 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, transparent 40%)',
                pointerEvents: 'none',
              }} />
            </div>
          </motion.div>
        </AnimatePresence>

        {/* ── Floating top-left: page counter ── */}
        <div style={{
          position: 'absolute', top: '14px', left: '16px',
          display: 'flex', alignItems: 'center', gap: '8px',
          background: 'rgba(10,15,30,0.75)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '100px', padding: '5px 14px',
          pointerEvents: 'none',
        }}>
          <span style={{
            color: 'rgba(255,255,255,0.45)', fontSize: '11px',
            fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase',
          }}>
            Page
          </span>
          <span style={{
            color: '#06b6d4', fontSize: '12px', fontWeight: 700,
            fontVariantNumeric: 'tabular-nums', letterSpacing: '0.04em',
          }}>
            {page + 1} <span style={{ color: 'rgba(255,255,255,0.25)' }}>/ {TOTAL}</span>
          </span>
        </div>

        {/* ── Floating top-right: download + close ── */}
        <div style={{
          position: 'absolute', top: '12px', right: '12px',
          display: 'flex', gap: '8px', alignItems: 'center',
        }}>
          <a
            href={PDF_URL}
            download="TechYenthra-Company-Profile.pdf"
            onClick={e => e.stopPropagation()}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '6px',
              padding: '8px 16px', borderRadius: '8px',
              background: 'linear-gradient(135deg, #1d4ed8, #06b6d4)',
              color: '#fff', fontSize: '12px', fontWeight: 600,
              textDecoration: 'none', letterSpacing: '0.02em',
              boxShadow: '0 4px 16px rgba(29,78,216,0.4)',
              transition: 'opacity 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
            onMouseLeave={e => e.currentTarget.style.opacity = '1'}
          >
            <Download size={13} /> Download PDF
          </a>
          <button
            onClick={onClose}
            aria-label="Close"
            style={btn({ width: '36px', height: '36px', borderRadius: '8px' })}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.12)'; e.currentTarget.style.color = '#fff'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(10,15,30,0.72)'; e.currentTarget.style.color = 'rgba(255,255,255,0.8)'; }}
          >
            <X size={16} />
          </button>
        </div>

        {/* ── Left arrow ── */}
        <button
          onClick={() => goTo(page - 1)}
          disabled={!canPrev}
          aria-label="Previous page"
          style={btn({
            position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)',
            width: '44px', height: '44px',
            opacity: canPrev ? 1 : 0.2,
            cursor: canPrev ? 'pointer' : 'default',
          })}
          onMouseEnter={e => { if (canPrev) { e.currentTarget.style.background = 'rgba(6,182,212,0.2)'; e.currentTarget.style.borderColor = 'rgba(6,182,212,0.4)'; e.currentTarget.style.color = '#06b6d4'; } }}
          onMouseLeave={e => { e.currentTarget.style.background = 'rgba(10,15,30,0.72)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.14)'; e.currentTarget.style.color = 'rgba(255,255,255,0.8)'; }}
        >
          <ChevronLeft size={22} />
        </button>

        {/* ── Right arrow ── */}
        <button
          onClick={() => goTo(page + 1)}
          disabled={!canNext}
          aria-label="Next page"
          style={btn({
            position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)',
            width: '44px', height: '44px',
            opacity: canNext ? 1 : 0.2,
            cursor: canNext ? 'pointer' : 'default',
          })}
          onMouseEnter={e => { if (canNext) { e.currentTarget.style.background = 'rgba(6,182,212,0.2)'; e.currentTarget.style.borderColor = 'rgba(6,182,212,0.4)'; e.currentTarget.style.color = '#06b6d4'; } }}
          onMouseLeave={e => { e.currentTarget.style.background = 'rgba(10,15,30,0.72)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.14)'; e.currentTarget.style.color = 'rgba(255,255,255,0.8)'; }}
        >
          <ChevronRight size={22} />
        </button>

        {/* ── Bottom dots ── */}
        <div style={{
          position: 'absolute', bottom: '14px', left: '50%', transform: 'translateX(-50%)',
          display: 'flex', gap: '5px', alignItems: 'center',
          background: 'rgba(10,15,30,0.65)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '100px', padding: '6px 12px',
        }}>
          {PAGES.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Page ${i + 1}`}
              style={{
                height: '6px',
                width: i === page ? '20px' : '6px',
                borderRadius: '3px',
                background: i === page
                  ? 'linear-gradient(90deg, #1d4ed8, #06b6d4)'
                  : 'rgba(255,255,255,0.22)',
                border: 'none', padding: 0,
                cursor: 'pointer',
                transition: 'all 0.28s ease',
                flexShrink: 0,
              }}
            />
          ))}
        </div>
      </div>
    </>
  );
}
