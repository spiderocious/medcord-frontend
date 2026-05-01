import { type HTMLAttributes } from 'react';

import { cn } from '@shared/utils/cn';

/**
 * `Pill` — hairline outline + tone-tinted state pills.
 * Reference: _foundation.css:261-279 (`.pill` and tone variants).
 * Full taxonomy: 26-avatars-pills.html.
 */
export type PillTone = 'neutral' | 'ok' | 'warn' | 'crit' | 'low' | 'ink';

export interface PillProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: PillTone;
  /** Show the leading dot (default true). */
  dot?: boolean;
}

const TONE: Record<PillTone, string> = {
  neutral: 'text-ink-2 border-hair bg-transparent',
  ok: 'text-green-800 border-green-300 bg-green-50',
  warn: 'text-warn border-warn-edge bg-warn-bg',
  crit: 'text-crit border-crit-edge bg-crit-bg',
  low: 'text-low border-low-edge bg-low-bg',
  ink: 'text-paper border-ink bg-ink',
};

export function Pill({ tone = 'neutral', dot = true, className, children, ...rest }: PillProps) {
  return (
    <span
      className={cn(
        'inline-flex h-5 items-center gap-1.5 whitespace-nowrap rounded-pill border px-2 font-sans text-[11px] font-medium tracking-label',
        TONE[tone],
        className,
      )}
      {...rest}
    >
      {dot ? <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-current opacity-80" /> : null}
      {children}
    </span>
  );
}
