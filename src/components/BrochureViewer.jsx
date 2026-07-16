import { useState, useEffect, useRef, useCallback, forwardRef } from 'react';
import HTMLFlipBook from 'react-pageflip';
import { X, ChevronLeft, ChevronRight, Download } from 'lucide-react';

const TOTAL = 12;
const PAGES = Array.from({ length: TOTAL }, (_, i) => `/broucher/page${i + 1}_compressed.webp`);
const PDF_URL = '/broucher/TY-brouchere.pdf';

// A4 portrait ratio — adjust if your pages differ
const PAGE_RATIO = 1.414;

function calcSize() {
  const PAD_W = 100; // left+right margin for arrow buttons
  const PAD_H = 120; // top bar + bottom dots
  const vw = Math.max(320, window.innerWidth  - PAD_W);
  const vh = Math.max(300, window.innerHeight - PAD_H);

  // Two pages side by side in landscape book-spread view
  let pageW = Math.floor(vw / 2);
  let pageH = Math.floor(pageW * PAGE_RATIO);

  if (pageH > vh) {
    pageH = vh;
    pageW = Math.floor(pageH / PAGE_RATIO);
  }

  // clamp
  pageW = Math.max(140, Math.min(pageW, 600));
  pageH = Math.max(198, Math.min(pageH, 849));

  return { w: pageW, h: pageH };
}

// react-pageflip needs forwardRef on each page component
const Page = forwardRef(({ src, alt }, ref) => (
  <div
    ref={ref}
    style={{
      width: '100%', height: '100%',
      background: '#fff',
      overflow: 'hidden',
      userSelect: 'none',
    }}
  >
    <img
      src={src}
      alt={alt}
      draggable={false}
      style={{
        width: '100%', height: '100%',
        objectFit: 'fill',
        display: 'block',
        pointerEvents: 'none',
      }}
    />
  </div>
));

export default function BrochureViewer({ isOpen, onClose }) {
  const [size,    setSize]    = useState(calcSize);
  const [current, setCurrent] = useState(0); // leftmost visible page index
  const bookRef = useRef(null);

  // Recalculate on resize
  useEffect(() => {
    if (!isOpen) return;
    const onResize = () => setSize(calcSize());
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [isOpen]);

  // Reset + keyboard
  useEffect(() => {
    if (!isOpen) { setCurrent(0); return; }

    const h = (e) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        bookRef.current?.pageFlip().flipNext('top');
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        bookRef.current?.pageFlip().flipPrev('top');
      } else if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', h);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', h);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  const handleFlip = useCallback((e) => setCurrent(e.data), []);

  const flipPrev = () => bookRef.current?.pageFlip().flipPrev('top');
  const flipNext = () => bookRef.current?.pageFlip().flipNext('top');
  const goTo     = (i) => bookRef.current?.pageFlip().flip(i, 'top');

  if (!isOpen) return null;

  const spread     = Math.floor(current / 2); // which "spread" (pair) we're on
  const totalSpreads = Math.ceil(TOTAL / 2);
  const atStart    = current === 0;
  const atEnd      = current >= TOTAL - 2;

  return (
    <>
      {/* Dark stage — click outside to close */}
      <div
        onClick={onClose}
        style={{ position: 'fixed', inset: 0, zIndex: 9990, background: '#05080f' }}
      />

      {/* Full-screen layout */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 9991,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: '64px 52px 48px',
        pointerEvents: 'none', // children re-enable where needed
      }}>
        {/* Book */}
        <div style={{ pointerEvents: 'auto', position: 'relative' }}>
          <HTMLFlipBook
            ref={bookRef}
            width={size.w}
            height={size.h}
            size="fixed"
            minWidth={140}
            maxWidth={600}
            minHeight={198}
            maxHeight={849}
            drawShadow
            flippingTime={650}
            useMouseEvents
            swipeDistance={20}
            mobileScrollSupport={false}
            showCover={false}
            startPage={0}
            onFlip={handleFlip}
            style={{
              boxShadow: '0 32px 100px rgba(0,0,0,0.85), 0 8px 24px rgba(0,0,0,0.6)',
            }}
          >
            {PAGES.map((src, i) => (
              <Page key={i} src={src} alt={`Page ${i + 1}`} />
            ))}
          </HTMLFlipBook>
        </div>

        {/* Dot strip — one dot per spread */}
        <div style={{
          pointerEvents: 'auto',
          display: 'flex', gap: '5px', alignItems: 'center',
          marginTop: '18px',
        }}>
          {Array.from({ length: totalSpreads }, (_, i) => (
            <button
              key={i}
              onClick={() => goTo(i * 2)}
              aria-label={`Pages ${i * 2 + 1}–${Math.min(i * 2 + 2, TOTAL)}`}
              style={{
                height: '5px',
                width: spread === i ? '22px' : '5px',
                borderRadius: '3px',
                background: spread === i
                  ? 'linear-gradient(90deg,#1d4ed8,#06b6d4)'
                  : 'rgba(255,255,255,0.22)',
                border: 'none', padding: 0,
                cursor: spread === i ? 'default' : 'pointer',
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
        background: 'linear-gradient(to bottom, rgba(5,8,15,0.95) 0%, transparent 100%)',
        pointerEvents: 'none',
      }}>
        {/* Page counter pill */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: '6px',
          background: 'rgba(12,18,36,0.8)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '100px', padding: '5px 14px',
          pointerEvents: 'auto',
        }}>
          <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            Pages
          </span>
          <span style={{ color: '#06b6d4', fontSize: '12px', fontWeight: 700, fontVariantNumeric: 'tabular-nums' }}>
            {current + 1}–{Math.min(current + 2, TOTAL)}
            <span style={{ color: 'rgba(255,255,255,0.25)' }}> / {TOTAL}</span>
          </span>
        </div>

        {/* Download + close */}
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
            aria-label="Close brochure"
            style={{
              width: '34px', height: '34px', borderRadius: '8px',
              background: 'rgba(12,18,36,0.8)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
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

      {/* Left arrow */}
      <button
        onClick={flipPrev}
        aria-label="Previous pages"
        style={{
          position: 'fixed', left: '10px', top: '50%', transform: 'translateY(-50%)',
          zIndex: 9992,
          width: '40px', height: '40px', borderRadius: '50%',
          background: 'rgba(12,18,36,0.8)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          border: '1px solid rgba(255,255,255,0.1)',
          color: atStart ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.8)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: atStart ? 'default' : 'pointer',
        }}
      >
        <ChevronLeft size={20} />
      </button>

      {/* Right arrow */}
      <button
        onClick={flipNext}
        aria-label="Next pages"
        style={{
          position: 'fixed', right: '10px', top: '50%', transform: 'translateY(-50%)',
          zIndex: 9992,
          width: '40px', height: '40px', borderRadius: '50%',
          background: 'rgba(12,18,36,0.8)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          border: '1px solid rgba(255,255,255,0.1)',
          color: atEnd ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.8)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: atEnd ? 'default' : 'pointer',
        }}
      >
        <ChevronRight size={20} />
      </button>

      {/* Silent preload of all pages */}
      {PAGES.map((src, i) => (
        <img key={i} src={src} alt="" style={{ display: 'none' }} aria-hidden />
      ))}
    </>
  );
}
