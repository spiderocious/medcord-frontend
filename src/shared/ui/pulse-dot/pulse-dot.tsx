import { type HTMLAttributes } from 'react';

import { cn } from '@shared/utils/cn';

/**
 * `PulseDot` — the only "live now" indicator. Used for shift-on-now status.
 * Reference: _foundation.css:334-343 (`.pulse` + `@keyframes pulse`).
 */
export type PulseDotProps = HTMLAttributes<HTMLSpanElement>;

export function PulseDot({ className, ...rest }: PulseDotProps) {
  return (
    <>
      <span
        aria-hidden
        className={cn('inline-block h-1.5 w-1.5 rounded-full bg-green-600', className)}
        style={{ animation: 'ds-pulse 1.6s ease-out infinite' }}
        {...rest}
      />
      <style>{`@keyframes ds-pulse {
        0%   { box-shadow: 0 0 0 0 rgba(22,163,74,0.45); }
        100% { box-shadow: 0 0 0 8px rgba(22,163,74,0); }
      }`}</style>
    </>
  );
}
