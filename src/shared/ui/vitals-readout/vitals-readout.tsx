import { type HTMLAttributes, type ReactNode } from 'react';

import { cn } from '@shared/utils/cn';

/**
 * `VitalsReadout` — the big mono numeric used for vitals.
 * Reference: _foundation.css:360-371 (`.read`, `.read-lg/md/sm`, `.read .u`).
 */
export type VitalsReadoutSize = 'sm' | 'md' | 'lg';

export interface VitalsReadoutProps extends HTMLAttributes<HTMLDivElement> {
  size?: VitalsReadoutSize;
  /** Inline unit, e.g. `bpm`, `°F`. */
  unit?: ReactNode;
}

const SIZE: Record<VitalsReadoutSize, string> = {
  sm: 'text-[20px]',
  md: 'text-[28px]',
  lg: 'text-[40px]',
};

export function VitalsReadout({
  size = 'md',
  unit,
  className,
  children,
  ...rest
}: VitalsReadoutProps) {
  return (
    <div
      className={cn(
        'font-mono font-medium leading-[0.95] tabular-nums tracking-[-0.02em] text-ink',
        SIZE[size],
        className,
      )}
      {...rest}
    >
      {children}
      {unit ? (
        <span className="ml-1 font-sans text-[0.42em] font-medium tracking-wide text-ink-3">
          {unit}
        </span>
      ) : null}
    </div>
  );
}
