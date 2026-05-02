import { forwardRef, type SVGProps } from 'react';

/**
 * Hand-drawn clinical glyphs. Each follows the Lucide grid (24×24) and
 * inherits `currentColor` so it composes with `Icon`'s sizing wrapper.
 * Reference: 43-icons.html (healthcare set).
 */
export type ClinicalGlyphProps = SVGProps<SVGSVGElement>;

function makeGlyph(displayName: string, content: React.ReactNode) {
  const Glyph = forwardRef<SVGSVGElement, ClinicalGlyphProps>(function Glyph(props, ref) {
    return (
      <svg
        ref={ref}
        viewBox="0 0 24 24"
        width={20}
        height={20}
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
        {...props}
      >
        {content}
      </svg>
    );
  });
  Glyph.displayName = displayName;
  return Glyph;
}

export const StethoscopeGlyph = makeGlyph(
  'StethoscopeGlyph',
  <>
    <path d="M5 4v5a4 4 0 0 0 8 0V4" />
    <path d="M9 13v3a4 4 0 0 0 8 0v-2" />
    <circle cx="17" cy="11" r="2" />
  </>,
);

export const SyringeGlyph = makeGlyph(
  'SyringeGlyph',
  <>
    <path d="M14 4l6 6" />
    <path d="M11 7l6 6-7 7H4v-6z" />
    <path d="M9 12l3 3" />
    <path d="M17 1l-3 3" />
  </>,
);

export const PillGlyph = makeGlyph(
  'PillGlyph',
  <>
    <path d="M10.5 4.5l-6 6a4.243 4.243 0 1 0 6 6l6-6a4.243 4.243 0 1 0-6-6z" />
    <line x1="8" y1="13" x2="13" y2="8" />
  </>,
);

export const IvBagGlyph = makeGlyph(
  'IvBagGlyph',
  <>
    <path d="M9 3h6v3l-1 12a2 2 0 0 1-2 2h-0a2 2 0 0 1-2-2L9 6z" />
    <line x1="11" y1="9" x2="13" y2="9" />
    <line x1="11" y1="12" x2="13" y2="12" />
  </>,
);

export const DripGlyph = makeGlyph(
  'DripGlyph',
  <>
    <path d="M12 3c0 4-4 6-4 10a4 4 0 0 0 8 0c0-4-4-6-4-10z" />
  </>,
);

export const HeartPulseGlyph = makeGlyph(
  'HeartPulseGlyph',
  <>
    <path d="M3 12h4l2-4 3 8 2-4h7" />
    <path d="M3 8a4 4 0 0 1 7-2 4 4 0 0 1 7 2" />
  </>,
);

export const StretcherGlyph = makeGlyph(
  'StretcherGlyph',
  <>
    <rect x="3" y="9" width="18" height="6" rx="1" />
    <line x1="6" y1="15" x2="6" y2="20" />
    <line x1="18" y1="15" x2="18" y2="20" />
    <circle cx="6" cy="20" r="1" />
    <circle cx="18" cy="20" r="1" />
  </>,
);

export const CrutchGlyph = makeGlyph(
  'CrutchGlyph',
  <>
    <path d="M9 3h6v3a3 3 0 0 1-3 3v0a3 3 0 0 1-3-3z" />
    <line x1="12" y1="9" x2="12" y2="20" />
    <line x1="8" y1="20" x2="16" y2="20" />
  </>,
);

export const BedSideGlyph = makeGlyph(
  'BedSideGlyph',
  <>
    <path d="M3 18v-6a3 3 0 0 1 3-3h7v9" />
    <path d="M3 18h18" />
    <path d="M21 18v-3a3 3 0 0 0-3-3" />
    <circle cx="7" cy="11" r="1.5" />
  </>,
);

export const ChartGlyph = makeGlyph(
  'ChartGlyph',
  <>
    <rect x="5" y="3" width="14" height="18" rx="1" />
    <line x1="9" y1="3" x2="9" y2="6" />
    <line x1="15" y1="3" x2="15" y2="6" />
    <line x1="8" y1="11" x2="16" y2="11" />
    <line x1="8" y1="15" x2="13" y2="15" />
  </>,
);

export const VialGlyph = makeGlyph(
  'VialGlyph',
  <>
    <path d="M9 3h6v4l-1 13a2 2 0 0 1-2 2h-0a2 2 0 0 1-2-2L9 7z" />
    <path d="M9 11h6" />
  </>,
);

export const RibbonGlyph = makeGlyph(
  'RibbonGlyph',
  <>
    <path d="M6 3l6 8 6-8" />
    <path d="M6 3l6 18 6-18" />
  </>,
);
