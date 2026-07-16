import { useState, useEffect, useCallback, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Download, BookOpen } from 'lucide-react';

const TOTAL = 12;
const PAGES = Array.from({ length: TOTAL }, (_, i) => `/broucher/page${i + 1}_compressed.webp`);
const PDF_URL = '/broucher/TY-brouchere.pdf';

const flipVariants = {
  enter: (d) => ({
    rotateY: d > 0 ? 55 : -55,
    opacity: 0,
    scale: 0.96,
  }),
  show: {
    rotateY: 0,
    opacity: 1,
    scale: 1,
    transition: { duration: 0.42, ease: [0.22, 1, 0.36, 1] },
  },
  exit: (d) => ({
    rotateY: d > 0 ? -55 : 55,
    opacity: 0,
    scale: 0.96,
    transition: { duration: 0.28, ease: [0.55, 0, 1, 0.45] },
  }),
};

export default function BrochureViewer({ isOpen, onClose }) {
  const [page, setPage] = useState(0);
  const [dir, setDir]   = useState(1);
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
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [isOpen, page, goTo, onClose]);

  if (!isOpen) return null;

  return (
    <>
      {/* Preload neighbours */}
      {[page - 1, page + 1].filter(p => p >= 0 && p < TOTAL).map(p => (
        <link key={p} rel="preload" as="image" href={PAGES[p]} />
      ))}

      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed', inset: 0, zIndex: 9990,
          background: 'rgba(4, 7, 18, 0.96)',
          backdropFilter: 'blur(14px)',
          WebkitBackdropFilter: 'blur(14px)',
        }}
      />

      {/* Shell */}
      <div
        style={{
          position: 'fixed', inset: 0, zIndex: 9991,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          padding: '12px 16px', gap: '12px',
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
        {/* ── Header ── */}
        <div style={{
          width: '100%', maxWidth: '860px',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          flexShrink: 0,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <BookOpen size={15} style={{ color: '#06b6d4', flexShrink: 0 }} />
            <span style={{
              color: 'rgba(255,255,255,0.55)', fontSize: '11px',
              fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase',
            }}>
              Company Profile
            </span>
            <div style={{
              display: 'inline-flex', alignItems: 'center',
              background: 'rgba(6,182,212,0.12)', border: '1px solid rgba(6,182,212,0.28)',
              borderRadius: '100px', padding: '2px 10px',
              color: '#06b6d4', fontSize: '11px', fontWeight: 700, letterSpacing: '0.04em',
              fontVariantNumeric: 'tabular-nums',
            }}>
              {page + 1} / {TOTAL}
            </div>
          </div>

          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <a
              href={PDF_URL}
              download="TechYenthra-Company-Profile.pdf"
              onClick={e => e.stopPropagation()}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '6px',
                padding: '8px 18px', borderRadius: '8px',
                background: 'linear-gradient(135deg, #1d4ed8 0%, #06b6d4 100%)',
                color: '#fff', fontSize: '13px', fontWeight: 600,
                letterSpacing: '0.01em', textDecoration: 'none',
                boxShadow: '0 4px 16px rgba(29,78,216,0.35)',
                transition: 'opacity 0.2s, transform 0.15s',
                flexShrink: 0,
              }}
              onMouseEnter={e => { e.currentTarget.style.opacity = '0.88'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
              onMouseLeave={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              <Download size={13} /> Download PDF
            </a>
            <button
              onClick={onClose}
              aria-label="Close brochure"
              style={{
                width: '36px', height: '36px', borderRadius: '8px', flexShrink: 0,
                background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)',
                color: 'rgba(255,255,255,0.65)', display: 'flex', alignItems: 'center',
                justifyContent: 'center', cursor: 'pointer', transition: 'all 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.14)'; e.currentTarget.style.color = '#fff'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.07)'; e.currentTarget.style.color = 'rgba(255,255,255,0.65)'; }}
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* ── Page viewer ── */}
        <div style={{
          width: '100%', maxWidth: '860px',
          flex: 1, minHeight: 0,
          position: 'relative',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          {/* Prev arrow */}
          <button
            onClick={() => goTo(page - 1)}
            disabled={page === 0}
            aria-label="Previous page"
            style={{
              position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)',
              zIndex: 2, width: '40px', height: '40px', borderRadius: '50%',
              background: page === 0 ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.1)',
              border: '1px solid rgba(255,255,255,0.12)',
              color: page === 0 ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.75)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: page === 0 ? 'default' : 'pointer',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => { if (page > 0) { e.currentTarget.style.background = 'rgba(6,182,212,0.18)'; e.currentTarget.style.color = '#06b6d4'; e.currentTarget.style.borderColor = 'rgba(6,182,212,0.35)'; } }}
            onMouseLeave={e => { e.currentTarget.style.background = page === 0 ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = page === 0 ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.75)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'; }}
          >
            <ChevronLeft size={20} />
          </button>

          {/* Animated page */}
          <div style={{
            width: 'calc(100% - 96px)',
            height: '100%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
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
                  width: '100%',
                  transformPerspective: 1400,
                  transformStyle: 'preserve-3d',
                }}
              >
                {/* Page shadow base */}
                <div style={{ position: 'relative', borderRadius: '6px', overflow: 'hidden' }}>
                  <img
                    src={PAGES[page]}
                    alt={`TechYenthra Company Profile — Page ${page + 1}`}
                    style={{
                      width: '100%', display: 'block',
                      maxHeight: 'calc(100vh - 160px)',
                      objectFit: 'contain',
                      borderRadius: '6px',
                    }}
                    draggable={false}
                  />
                  {/* Realistic page sheen */}
                  <div style={{
                    position: 'absolute', inset: 0, borderRadius: '6px',
                    background: 'linear-gradient(120deg, rgba(255,255,255,0.04) 0%, transparent 50%, rgba(0,0,0,0.06) 100%)',
                    pointerEvents: 'none',
                  }} />
                </div>

                {/* Drop shadow */}
                <div style={{
                  position: 'absolute', bottom: '-20px', left: '4%', right: '4%',
                  height: '20px',
                  background: 'radial-gradient(ellipse at 50% 0%, rgba(0,0,0,0.55) 0%, transparent 70%)',
                  pointerEvents: 'none',
                }} />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Next arrow */}
          <button
            onClick={() => goTo(page + 1)}
            disabled={page === TOTAL - 1}
            aria-label="Next page"
            style={{
              position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)',
              zIndex: 2, width: '40px', height: '40px', borderRadius: '50%',
              background: page === TOTAL - 1 ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.1)',
              border: '1px solid rgba(255,255,255,0.12)',
              color: page === TOTAL - 1 ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.75)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: page === TOTAL - 1 ? 'default' : 'pointer',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => { if (page < TOTAL - 1) { e.currentTarget.style.background = 'rgba(6,182,212,0.18)'; e.currentTarget.style.color = '#06b6d4'; e.currentTarget.style.borderColor = 'rgba(6,182,212,0.35)'; } }}
            onMouseLeave={e => { e.currentTarget.style.background = page === TOTAL - 1 ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = page === TOTAL - 1 ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.75)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'; }}
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* ── Page dots ── */}
        <div style={{
          display: 'flex', gap: '5px', alignItems: 'center',
          flexShrink: 0, paddingBottom: '2px',
        }}>
          {PAGES.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to page ${i + 1}`}
              style={{
                height: '6px',
                width: i === page ? '22px' : '6px',
                borderRadius: '3px',
                background: i === page
                  ? 'linear-gradient(90deg, #1d4ed8, #06b6d4)'
                  : 'rgba(255,255,255,0.18)',
                border: 'none', padding: 0, cursor: 'pointer',
                transition: 'all 0.3s ease',
                flexShrink: 0,
              }}
            />
          ))}
        </div>

        {/* ── Keyboard hint ── */}
        <p style={{
          color: 'rgba(255,255,255,0.2)', fontSize: '11px',
          letterSpacing: '0.06em', flexShrink: 0, margin: 0,
        }}>
          ← → to navigate · swipe on mobile · ESC to close
        </p>
      </div>
    </>
  );
}
