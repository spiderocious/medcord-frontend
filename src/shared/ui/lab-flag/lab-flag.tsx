import { type HTMLAttributes } from 'react';

import { cn } from '@shared/utils/cn';

/**
 * `LabFlag` — the small H/L/HH/LL/!!! glyph stamped onto out-of-range labs.
 * Reference: _foundation.css:298-310 (`.flag`, `.flag-h/-l/-c`).
 */
export type LabFlagTone = 'high' | 'low' | 'critical';

export interface LabFlagProps extends HTMLAttributes<HTMLSpanElement> {
  tone: LabFlagTone;
  children: string;
}

const TONE: Record<LabFlagTone, string> = {
  high: 'text-warn border-warn-edge bg-warn-bg',
  low: 'text-low border-low-edge bg-low-bg',
  critical: 'text-white border-crit bg-crit',
};

export function LabFlag({ tone, className, children, ...rest }: LabFlagProps) {
  return (
    <span
      className={cn(
        'inline-block rounded-paper border px-1 font-mono text-[10px] font-semibold leading-[14px] tracking-mono',
        TONE[tone],
        className,
      )}
      {...rest}
    >
      {children}
    </span>
  );
}
