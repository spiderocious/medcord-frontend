import { type ReactNode, useEffect, useRef, useState } from 'react';

import { cn } from '@shared/utils/cn';

/**
 * `HoverCard` — richer popover that opens on hover after a short delay.
 * Reference: 28-tooltips.html (the four typeset specimens: patient, staff,
 * medication, room).
 *
 * The four "kinds" are presentational — render whichever specimen layout
 * inside. We just provide the floating sheet with the shadow and timing.
 */
export interface HoverCardProps {
  trigger: ReactNode;
  /** Anchor element wraps the trigger; the card floats off it. */
  children: ReactNode;
  /** ms before the card appears on enter. */
  openDelayMs?: number;
  /** ms before it closes on leave. */
  closeDelayMs?: number;
  width?: string;
  className?: string;
}

export function HoverCard({
  trigger,
  children,
  openDelayMs = 250,
  closeDelayMs = 150,
  width = '320px',
  className,
}: HoverCardProps) {
  const [open, setOpen] = useState(false);
  const openTimer = useRef<number | null>(null);
  const closeTimer = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (openTimer.current) window.clearTimeout(openTimer.current);
      if (closeTimer.current) window.clearTimeout(closeTimer.current);
    };
  }, []);

  function onEnter() {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    openTimer.current = window.setTimeout(() => setOpen(true), openDelayMs);
  }
  function onLeave() {
    if (openTimer.current) window.clearTimeout(openTimer.current);
    closeTimer.current = window.setTimeout(() => setOpen(false), closeDelayMs);
  }

  return (
    <span
      className="relative inline-flex"
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onFocus={onEnter}
      onBlur={onLeave}
    >
      {trigger}
      {open ? (
        <div
          role="dialog"
          className={cn(
            'absolute left-0 top-[calc(100%+8px)] z-dropdown rounded-card border border-hair bg-sheet p-4 shadow-[0_8px_24px_rgba(24,22,19,0.12)]',
            className,
          )}
          style={{ width }}
        >
          {children}
        </div>
      ) : null}
    </span>
  );
}
