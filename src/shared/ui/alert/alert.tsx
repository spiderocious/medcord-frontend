import { type ReactNode } from 'react';

import { cn } from '@shared/utils/cn';

/**
 * `Alert` — callout indented from the body. Quieter than a banner, louder
 * than a tooltip.
 * Reference: 41-feedback.html (alert section).
 */
export type AlertTone = 'info' | 'ok' | 'warn' | 'crit' | 'low';

export interface AlertProps {
  tone?: AlertTone;
  title: ReactNode;
  children?: ReactNode;
  className?: string;
}

const TONE: Record<AlertTone, string> = {
  info: 'border-l-ink bg-paper-deep/40 text-ink',
  ok: 'border-l-green-700 bg-green-50 text-green-800',
  warn: 'border-l-warn bg-warn-bg text-warn',
  crit: 'border-l-crit bg-crit-bg text-crit',
  low: 'border-l-low bg-low-bg text-low',
};

export function Alert({ tone = 'info', title, children, className }: AlertProps) {
  return (
    <div
      role="alert"
      className={cn('border-l-[3px] py-3 pl-4 pr-3 font-sans text-[13px]', TONE[tone], className)}
    >
      <div className="font-serif text-[15px] italic leading-[1.4]">{title}</div>
      {children ? <div className="mt-1 text-[12px] text-ink-2">{children}</div> : null}
    </div>
  );
}
