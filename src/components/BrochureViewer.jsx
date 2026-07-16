import { useState, useEffect, useRef, forwardRef } from 'react';
import HTMLFlipBook from 'react-pageflip';
import { X, ChevronLeft, ChevronRight, Download } from 'lucide-react';

const TOTAL = 12;
const PAGES = Array.from({ length: TOTAL }, (_, i) => `/broucher/page${i + 1}_compressed.webp`);
const PDF_URL = '/broucher/TY-brouchere.pdf';

// Fit the page to fill the viewport (landscape orientation by default)
function calcSize(ratio = 0.63) {
  const ARROW_PAD = 104; // 52px per side for arrow buttons
  const TOP_BAR   = 56;
  const DOTS_STRIP = 40;
  const vw = Math.max(320, window.innerWidth  - ARROW_PAD);
  const vh = Math.max(220, window.innerHeight - TOP_BAR - DOTS_STRIP);

  let w = vw;
  let h = Math.round(w * ratio);

  if (h > vh) {
    h = vh;
    w = Math.round(h / ratio);
  }

  return { w: Math.max(280, w), h: Math.max(180, h) };
}

const Page = forwardRef(({ src, alt }, ref) => (
  <div ref={ref} style={{ width: '100%', height: '100%', background: '#fff', overflow: 'hidden', userSelect: 'none' }}>
    <img
      src={src} alt={alt} draggable={false}
      style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block', pointerEvents: 'none' }}
    />
  </div>
));

const ArrowBtn = ({ side, disabled, onClick, children }) => (
  <button
    onClick={onClick}
    aria-label={side === 'left' ? 'Previous page' : 'Next page'}
    style={{
      position: 'fixed',
      [side]: '10px',
      top: '50%', transform: 'translateY(-50%)',
      zIndex: 9992,
      width: '44px', height: '44px', borderRadius: '50%',
      background: 'rgba(10,15,30,0.85)',
      backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)',
      border: `1px solid ${disabled ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.12)'}`,
      color: disabled ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.8)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      cursor: disabled ? 'default' : 'pointer',
      transition: 'all 0.18s',
    }}
    onMouseEnter={e => {
      if (!disabled) {
        e.currentTarget.style.background    = 'rgba(6,182,212,0.18)';
        e.currentTarget.style.borderColor   = 'rgba(6,182,212,0.45)';
        e.currentTarget.style.color         = '#06b6d4';
      }
    }}
    onMouseLeave={e => {
      e.currentTarget.style.background    = 'rgba(10,15,30,0.85)';
      e.currentTarget.style.borderColor   = disabled ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.12)';
      e.currentTarget.style.color         = disabled ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.8)';
    }}
  >
    {children}
  </button>
);

export default function BrochureViewer({ isOpen, onClose }) {
  const [size,    setSize]    = useState(() => calcSize());
  const [current, setCurrent] = useState(0);
  const bookRef  = useRef(null);
  const ratioRef = useRef(0.63);

  // Detect actual image ratio from first page
  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      if (img.naturalWidth && img.naturalHeight) {
        ratioRef.current = img.naturalHeight / img.naturalWidth;
        setSize(calcSize(ratioRef.current));
      }
    };
    img.src = PAGES[0];
  }, []);

  // Recalculate on resize
  useEffect(() => {
    if (!isOpen) return;
    const onResize = () => setSize(calcSize(ratioRef.current));
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [isOpen]);

  // Keyboard + scroll lock
  useEffect(() => {
    if (!isOpen) { setCurrent(0); return; }
    const h = (e) => {
      if (e.key === 'ArrowRight' || e.key === ' ') { e.preventDefault(); bookRef.current?.pageFlip().flipNext('top'); }
      else if (e.key === 'ArrowLeft')               { e.preventDefault(); bookRef.current?.pageFlip().flipPrev('top'); }
      else if (e.key === 'Escape')                   onClose();
    };
    window.addEventListener('keydown', h);
    document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', h); document.body.style.overflow = ''; };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const atStart = current === 0;
  const atEnd   = current === TOTAL - 1;

  return (
    <>
      {/* Backdrop */}
      <div onClick={onClose} style={{ position: 'fixed', inset: 0, zIndex: 9990, background: '#04060e' }} />

      {/* Book stage — fills viewport, pages one at a time in landscape */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 9991,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: `${56 + 8}px 52px 40px`,
        pointerEvents: 'none',
      }}>
        <div style={{ pointerEvents: 'auto' }}>
          <HTMLFlipBook
            ref={bookRef}
            width={size.w}
            height={size.h}
            size="fixed"
            minWidth={280}
            maxWidth={1500}
            minHeight={180}
            maxHeight={900}
            usePortrait        /* single page at a time — each landscape page fills the screen */
            drawShadow
            flippingTime={600}
            useMouseEvents
            swipeDistance={25}
            mobileScrollSupport={false}
            showCover={false}
            startPage={0}
            onFlip={(e) => setCurrent(e.data)}
            style={{ boxShadow: '0 20px 80px rgba(0,0,0,0.7), 0 4px 20px rgba(0,0,0,0.4)' }}
          >
            {PAGES.map((src, i) => (
              <Page key={i} src={src} alt={`Page ${i + 1}`} />
            ))}
          </HTMLFlipBook>
        </div>

        {/* Dot strip */}
        <div style={{
          pointerEvents: 'auto',
          display: 'flex', gap: '5px', alignItems: 'center',
          marginTop: '14px',
        }}>
          {PAGES.map((_, i) => (
            <button
              key={i}
              onClick={() => bookRef.current?.pageFlip().flip(i, 'top')}
              aria-label={`Page ${i + 1}`}
              style={{
                height: '5px',
                width: i === current ? '22px' : '5px',
                borderRadius: '3px',
                background: i === current ? 'linear-gradient(90deg,#1d4ed8,#06b6d4)' : 'rgba(255,255,255,0.22)',
                border: 'none', padding: 0,
                cursor: i === current ? 'default' : 'pointer',
                transition: 'all 0.28s ease',
                flexShrink: 0,
              }}
            />
          ))}
        </div>
      </div>

      {/* Top bar */}
      <div style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 9992,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '10px 14px',
        background: 'linear-gradient(to bottom, rgba(4,6,14,0.96), transparent)',
        pointerEvents: 'none',
      }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: '6px',
          background: 'rgba(10,15,30,0.8)',
          backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '100px', padding: '5px 14px',
          pointerEvents: 'auto',
        }}>
          <span style={{ color: 'rgba(255,255,255,0.38)', fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Page</span>
          <span style={{ color: '#06b6d4', fontSize: '12px', fontWeight: 700, fontVariantNumeric: 'tabular-nums' }}>
            {current + 1}<span style={{ color: 'rgba(255,255,255,0.25)' }}> / {TOTAL}</span>
          </span>
        </div>

        <div style={{ display: 'flex', gap: '8px', pointerEvents: 'auto' }}>
          <a
            href={PDF_URL}
            download="TechYenthra-Company-Profile.pdf"
            onClick={e => e.stopPropagation()}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '6px',
              padding: '7px 16px', borderRadius: '8px',
              background: 'linear-gradient(135deg,#1d4ed8,#06b6d4)',
              color: '#fff', fontSize: '12px', fontWeight: 600,
              textDecoration: 'none',
              boxShadow: '0 4px 14px rgba(29,78,216,0.4)',
            }}
          >
            <Download size={13} /> Download PDF
          </a>
          <button
            onClick={onClose}
            aria-label="Close"
            style={{
              width: '34px', height: '34px', borderRadius: '8px',
              background: 'rgba(10,15,30,0.8)',
              backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.12)',
              color: 'rgba(255,255,255,0.7)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer',
            }}
          >
            <X size={15} />
          </button>
        </div>
      </div>

      {/* Arrow buttons */}
      <ArrowBtn side="left"  disabled={atStart} onClick={() => bookRef.current?.pageFlip().flipPrev('top')}><ChevronLeft  size={20} /></ArrowBtn>
      <ArrowBtn side="right" disabled={atEnd}   onClick={() => bookRef.current?.pageFlip().flipNext('top')}><ChevronRight size={20} /></ArrowBtn>

      {/* Silent preload all pages */}
      {PAGES.map((src, i) => <img key={i} src={src} alt="" style={{ display: 'none' }} aria-hidden />)}
    </>
  );
}
