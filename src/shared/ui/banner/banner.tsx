import { type ReactNode } from 'react';

import { cn } from '@shared/utils/cn';

/**
 * `Banner` — typeset rule across the page (e.g. PHI warning, downtime notice).
 * Reference: 41-feedback.html (banner section).
 */
export type BannerTone = 'neutral' | 'ok' | 'warn' | 'crit' | 'low';

export interface BannerProps {
  tone?: BannerTone;
  /** Mono caps eyebrow that names the kind. */
  eyebrow?: ReactNode;
  children: ReactNode;
  /** Right-aligned action slot. */
  action?: ReactNode;
  className?: string;
}

const TONE: Record<BannerTone, string> = {
  neutral: 'border-y border-hair bg-paper text-ink-2',
  ok: 'border-y border-green-300 bg-green-50 text-green-800',
  warn: 'border-y border-warn-edge bg-warn-bg text-warn',
  crit: 'border-y border-crit-edge bg-crit-bg text-crit',
  low: 'border-y border-low-edge bg-low-bg text-low',
};

export function Banner({ tone = 'neutral', eyebrow, children, action, className }: BannerProps) {
  return (
    <div
      role="status"
      className={cn(
        'flex items-center gap-4 px-6 py-3 font-sans text-[13px]',
        TONE[tone],
        className,
      )}
    >
      {eyebrow ? (
        <span className="font-mono text-[10px] uppercase tracking-overline">{eyebrow}</span>
      ) : null}
      <div className="flex-1">{children}</div>
      {action}
    </div>
  );
}
