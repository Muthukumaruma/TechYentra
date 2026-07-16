import { useState, useEffect, useRef, useCallback } from 'react';
import { useMotionValue, useTransform, animate, motion } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Download } from 'lucide-react';

const TOTAL = 12;
const PAGES = Array.from({ length: TOTAL }, (_, i) => `/broucher/page${i + 1}_compressed.webp`);
const PDF_URL = '/broucher/TY-brouchere.pdf';

export default function BrochureViewer({ isOpen, onClose }) {
  const [page,   setPage]   = useState(0);
  const [target, setTarget] = useState(null); // page index being flipped to
  const [origin, setOrigin] = useState('left center');

  // angle: 0 = at rest, -180 = forward flip complete, +180 = backward flip complete
  const angle = useMotionValue(0);

  // Shadow peaks at ±90° (edge-on) and is invisible at rest / complete
  const shadowOpacity = useTransform(angle, [-180, -90, 0, 90, 180], [0, 0.5, 0, 0.5, 0]);

  const flipping  = useRef(false);
  const touchX    = useRef(null);
  const touchT    = useRef(null);
  const touchDir  = useRef(0); // 1 = forward, -1 = backward

  // ── core flip function (used by buttons + keyboard + swipe snap) ──
  const doFlip = useCallback((dir) => {
    const t = page + dir;
    if (t < 0 || t >= TOTAL || flipping.current) return;
    flipping.current = true;
    setOrigin(dir > 0 ? 'left center' : 'right center');
    setTarget(t);
    animate(angle, dir > 0 ? -180 : 180, {
      duration: 0.6,
      ease: [0.4, 0, 0.2, 1],
    }).then(() => {
      setPage(t);
      setTarget(null);
      angle.set(0);
      flipping.current = false;
    });
  }, [page, angle]);

  // ── touch: swipe drives the angle live ──
  const onTouchStart = useCallback((e) => {
    if (flipping.current) return;
    touchX.current = e.touches[0].clientX;
    touchT.current = Date.now();
    touchDir.current = 0;
  }, []);

  const onTouchMove = useCallback((e) => {
    if (touchX.current === null || flipping.current) return;
    const dx  = e.touches[0].clientX - touchX.current;
    const pct = Math.min(1, Math.abs(dx) / (window.innerWidth * 0.65));

    if (dx < -8 && page < TOTAL - 1) {
      touchDir.current = 1;
      setOrigin('left center');
      if (target === null) setTarget(page + 1);
      angle.set(-180 * pct);
    } else if (dx > 8 && page > 0) {
      touchDir.current = -1;
      setOrigin('right center');
      if (target === null) setTarget(page - 1);
      angle.set(180 * pct);
    }
  }, [page, target, angle]);

  const onTouchEnd = useCallback((e) => {
    if (touchX.current === null) return;
    const dx       = e.changedTouches[0].clientX - touchX.current;
    const velocity = Math.abs(dx) / Math.max(1, Date.now() - touchT.current);
    const cur      = Math.abs(angle.get());
    touchX.current = null;

    const commit = cur > 55 || velocity > 0.45;

    if (commit && touchDir.current !== 0 && target !== null) {
      flipping.current = true;
      const dest = touchDir.current > 0 ? -180 : 180;
      animate(angle, dest, { duration: 0.28, ease: 'easeOut' }).then(() => {
        setPage(target);
        setTarget(null);
        angle.set(0);
        flipping.current = false;
      });
    } else {
      animate(angle, 0, { duration: 0.3, ease: 'easeOut' }).then(() => setTarget(null));
    }
    touchDir.current = 0;
  }, [angle, target]);

  // ── keyboard ──
  useEffect(() => {
    if (!isOpen) { setPage(0); return; }
    const h = (e) => {
      if (e.key === 'ArrowRight') doFlip(1);
      else if (e.key === 'ArrowLeft') doFlip(-1);
      else if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', h);
    document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', h); document.body.style.overflow = ''; };
  }, [isOpen, doFlip, onClose]);

  if (!isOpen) return null;

  const destIndex = target ?? page;

  return (
    <>
      {/* Dark stage */}
      <div
        onClick={onClose}
        style={{ position: 'fixed', inset: 0, zIndex: 9990, background: '#060912' }}
      />

      {/* Full-screen viewer */}
      <div
        style={{
          position: 'fixed', inset: 0, zIndex: 9991,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          padding: '52px 68px 44px',
        }}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {/* ── Book stage ── */}
        <div style={{
          position: 'relative',
          flex: 1, minHeight: 0,
          width: '100%',
          perspective: '2200px',
          perspectiveOrigin: '50% 50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>

          {/* ── Layer 0: destination page (sits beneath, revealed by flip) ── */}
          <img
            src={PAGES[destIndex]}
            alt=""
            aria-hidden
            draggable={false}
            style={{
              maxHeight: '100%',
              maxWidth: '100%',
              width: 'auto', height: 'auto',
              display: 'block',
              userSelect: 'none',
              boxShadow: '0 24px 80px rgba(0,0,0,0.85)',
              borderRadius: '3px',
            }}
          />

          {/* ── Layer 1: flipping card (front = current page, back = dest page) ── */}
          <motion.div
            style={{
              position: 'absolute', inset: 0,
              transformStyle: 'preserve-3d',
              rotateY: angle,
              transformOrigin: origin,
            }}
          >
            {/* Front face — current page */}
            <div style={{
              position: 'absolute', inset: 0,
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              borderRadius: '3px',
              overflow: 'hidden',
            }}>
              <img
                src={PAGES[page]}
                alt={`Page ${page + 1}`}
                draggable={false}
                style={{
                  width: '100%', height: '100%',
                  objectFit: 'contain',
                  display: 'block',
                  userSelect: 'none',
                }}
              />
              {/* Page-edge shadow (grows as page bends toward spine) */}
              <motion.div style={{
                position: 'absolute', inset: 0,
                background: origin === 'left center'
                  ? 'linear-gradient(to left, rgba(0,0,0,0.55) 0%, transparent 55%)'
                  : 'linear-gradient(to right, rgba(0,0,0,0.55) 0%, transparent 55%)',
                opacity: shadowOpacity,
                pointerEvents: 'none',
              }} />
            </div>

            {/* Back face — destination page */}
            <div style={{
              position: 'absolute', inset: 0,
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
              borderRadius: '3px',
              overflow: 'hidden',
            }}>
              <img
                src={PAGES[destIndex]}
                alt={`Page ${destIndex + 1}`}
                draggable={false}
                style={{
                  width: '100%', height: '100%',
                  objectFit: 'contain',
                  display: 'block',
                  userSelect: 'none',
                }}
              />
              {/* Shadow on back face (mirror direction) */}
              <motion.div style={{
                position: 'absolute', inset: 0,
                background: origin === 'left center'
                  ? 'linear-gradient(to right, rgba(0,0,0,0.45) 0%, transparent 55%)'
                  : 'linear-gradient(to left, rgba(0,0,0,0.45) 0%, transparent 55%)',
                opacity: shadowOpacity,
                pointerEvents: 'none',
              }} />
            </div>
          </motion.div>

          {/* ── Nav arrows (overlaid on stage) ── */}
          {[
            { dir: -1, side: 'left',  Icon: ChevronLeft,  can: page > 0 },
            { dir:  1, side: 'right', Icon: ChevronRight, can: page < TOTAL - 1 },
          ].map(({ dir, side, Icon, can }) => (
            <button
              key={side}
              onClick={() => doFlip(dir)}
              aria-label={dir > 0 ? 'Next page' : 'Previous page'}
              style={{
                position: 'absolute',
                [side]: '-52px',
                top: '50%', transform: 'translateY(-50%)',
                width: '40px', height: '40px', borderRadius: '50%',
                background: 'rgba(12,18,36,0.8)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: can ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.15)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: can ? 'pointer' : 'default',
                transition: 'all 0.18s',
              }}
              onMouseEnter={e => { if (can) { e.currentTarget.style.background = 'rgba(6,182,212,0.22)'; e.currentTarget.style.borderColor = 'rgba(6,182,212,0.45)'; e.currentTarget.style.color = '#06b6d4'; } }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(12,18,36,0.8)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = can ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.15)'; }}
            >
              <Icon size={20} />
            </button>
          ))}
        </div>

        {/* ── Dot strip ── */}
        <div style={{
          display: 'flex', gap: '5px', alignItems: 'center',
          marginTop: '14px', flexShrink: 0,
        }}>
          {PAGES.map((_, i) => (
            <button
              key={i}
              onClick={() => !flipping.current && i !== page && doFlip(i > page ? 1 : -1)}
              aria-label={`Page ${i + 1}`}
              style={{
                height: '5px',
                width: i === page ? '18px' : '5px',
                borderRadius: '3px',
                background: i === page
                  ? 'linear-gradient(90deg,#1d4ed8,#06b6d4)'
                  : 'rgba(255,255,255,0.2)',
                border: 'none', padding: 0,
                cursor: i === page ? 'default' : 'pointer',
                transition: 'all 0.28s ease',
                flexShrink: 0,
              }}
            />
          ))}
        </div>
      </div>

      {/* ── Floating top bar (above the viewer) ── */}
      <div style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 9992,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '10px 14px',
        background: 'linear-gradient(to bottom, rgba(6,9,18,0.9) 0%, transparent 100%)',
        pointerEvents: 'none',
      }}>
        {/* Page counter */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: '8px',
          background: 'rgba(12,18,36,0.75)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '100px', padding: '5px 14px',
          pointerEvents: 'auto',
        }}>
          <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            Page
          </span>
          <span style={{ color: '#06b6d4', fontSize: '12px', fontWeight: 700, fontVariantNumeric: 'tabular-nums' }}>
            {page + 1} <span style={{ color: 'rgba(255,255,255,0.25)' }}>/ {TOTAL}</span>
          </span>
        </div>

        {/* Download + Close */}
        <div style={{ display: 'flex', gap: '8px', pointerEvents: 'auto' }}>
          <a
            href={PDF_URL}
            download="TechYenthra-Company-Profile.pdf"
            onClick={e => e.stopPropagation()}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '6px',
              padding: '7px 15px', borderRadius: '8px',
              background: 'linear-gradient(135deg,#1d4ed8,#06b6d4)',
              color: '#fff', fontSize: '12px', fontWeight: 600,
              textDecoration: 'none',
              boxShadow: '0 4px 14px rgba(29,78,216,0.4)',
              transition: 'opacity 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.opacity = '0.82'}
            onMouseLeave={e => e.currentTarget.style.opacity = '1'}
          >
            <Download size={13} /> Download PDF
          </a>
          <button
            onClick={onClose}
            aria-label="Close"
            style={{
              width: '34px', height: '34px', borderRadius: '8px',
              background: 'rgba(12,18,36,0.75)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.12)',
              color: 'rgba(255,255,255,0.7)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', transition: 'all 0.18s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.12)'; e.currentTarget.style.color = '#fff'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(12,18,36,0.75)'; e.currentTarget.style.color = 'rgba(255,255,255,0.7)'; }}
          >
            <X size={15} />
          </button>
        </div>
      </div>

      {/* Preload neighbours silently */}
      {[page - 1, page + 1].filter(p => p >= 0 && p < TOTAL).map(p => (
        <img key={p} src={PAGES[p]} alt="" style={{ display: 'none' }} aria-hidden />
      ))}
    </>
  );
}
