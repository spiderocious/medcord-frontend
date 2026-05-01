import { type ReactNode, useState } from 'react';

import { cn } from '@shared/utils/cn';

/**
 * `Tooltip` — small ink chip floating above an element.
 * Reference: 28-tooltips.html (tooltip section).
 *
 * CSS-only positioning + show/hide via React state — no portal so this is
 * lightweight; container needs `position: relative` if absolute placement
 * collides with overflow.
 */
export interface TooltipProps {
  label: ReactNode;
  side?: 'top' | 'bottom';
  /** Mono text style — useful for keyboard shortcuts. */
  mono?: boolean;
  children: ReactNode;
  className?: string;
}

export function Tooltip({
  label,
  side = 'top',
  mono = true,
  children,
  className,
}: TooltipProps) {
  const [open, setOpen] = useState(false);
  return (
    <span
      className={cn('relative inline-flex', className)}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
    >
      {children}
      <span
        role="tooltip"
        className={cn(
          'pointer-events-none absolute left-1/2 z-tooltip -translate-x-1/2 whitespace-nowrap rounded-paper bg-ink px-2 py-1 text-paper opacity-0 transition-opacity duration-fast ease-paper-out',
          side === 'top' ? 'bottom-[calc(100%+6px)]' : 'top-[calc(100%+6px)]',
          mono ? 'font-mono text-[10px] uppercase tracking-[0.18em]' : 'font-sans text-[11px]',
          open && 'opacity-100',
        )}
      >
        {label}
      </span>
    </span>
  );
}
