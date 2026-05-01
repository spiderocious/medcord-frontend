import { type ReactNode } from 'react';

import { cn } from '@shared/utils/cn';

/**
 * `DropZone` — dotted-edge target with a serif italic title.
 * Reference: 14-specialized.html:21-50.
 */
export type DropZoneTone = 'default' | 'hover' | 'ok' | 'error';

export interface DropZoneProps {
  tone?: DropZoneTone;
  glyph?: ReactNode;
  title: ReactNode;
  meta?: ReactNode;
  onClick?: () => void;
  className?: string;
}

const TONE: Record<DropZoneTone, string> = {
  default: 'border-ink-3 bg-sheet',
  hover: 'border-ink bg-paper-deep',
  ok: 'border-green-700 bg-green-50',
  error: 'border-crit bg-crit-bg',
};

const TITLE_TONE: Record<DropZoneTone, string> = {
  default: 'text-ink',
  hover: 'text-ink',
  ok: 'text-green-800',
  error: 'text-crit',
};

export function DropZone({
  tone = 'default',
  glyph = '+',
  title,
  meta,
  onClick,
  className,
}: DropZoneProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'block w-full cursor-pointer border-[1.5px] border-dashed px-7 py-9 text-center',
        TONE[tone],
        className,
      )}
    >
      <span className="block font-serif text-[36px] leading-[1] text-ink">{glyph}</span>
      <span
        className={cn(
          'mt-2.5 block font-serif text-[18px] italic tracking-[-0.005em]',
          TITLE_TONE[tone],
        )}
      >
        {title}
      </span>
      {meta ? (
        <span className="mt-1.5 block font-mono text-[11px] tracking-mono text-ink-3">
          {meta}
        </span>
      ) : null}
    </button>
  );
}
