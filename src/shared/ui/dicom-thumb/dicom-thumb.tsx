import { cn } from '@shared/utils/cn';

/**
 * `DicomThumb` — grayscale-gradient placeholder for an imaging study tile.
 * Reference: 14-specialized.html:52-80.
 */
export interface DicomThumbProps {
  /** Modality glyph badge, e.g. `CT`, `MR`, `XR`. */
  modality: string;
  /** Series identifier badge. */
  series?: string;
  /** Acquisition timestamp. */
  acquired?: string;
  /** Window-width / window-level meta. */
  ww?: string;
  className?: string;
}

export function DicomThumb({ modality, series, acquired, ww, className }: DicomThumbProps) {
  return (
    <div
      className={cn(
        'relative aspect-square border border-ink text-paper',
        className,
      )}
      style={{
        background: 'linear-gradient(135deg, #2A2520, #6E665B 60%, #A39A8A)',
      }}
    >
      {series ? (
        <span className="absolute left-1.5 top-1.5 bg-black/55 px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-overline text-paper">
          {series}
        </span>
      ) : null}
      <span className="absolute right-1.5 top-1.5 bg-black/55 px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-overline text-paper">
        {modality}
      </span>
      {acquired ? (
        <span className="absolute bottom-1.5 left-1.5 font-mono text-[10px] tracking-mono text-[rgba(244,239,230,0.85)]">
          {acquired}
        </span>
      ) : null}
      {ww ? (
        <span className="absolute bottom-1.5 right-1.5 font-mono text-[9px] tracking-mono text-[rgba(244,239,230,0.85)]">
          {ww}
        </span>
      ) : null}
    </div>
  );
}
