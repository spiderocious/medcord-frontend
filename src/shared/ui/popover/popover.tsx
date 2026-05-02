import { type ReactNode, useEffect, useRef, useState } from 'react';

import { cn } from '@shared/utils/cn';

/**
 * `Popover` — sheet with a hairline edge and a soft shadow, anchored to a
 * trigger. Closes on outside click / Esc.
 * Reference: 28-tooltips.html (popover section).
 */
export interface PopoverProps {
  trigger: (props: { open: boolean; toggle: () => void }) => ReactNode;
  /** Popover content. */
  children: ReactNode;
  /** Width hint, e.g. `'320px'`. */
  width?: string;
  /** Side of the trigger. */
  side?: 'bottom-start' | 'bottom-end';
  className?: string;
}

export function Popover({
  trigger,
  children,
  width = '320px',
  side = 'bottom-start',
  className,
}: PopoverProps) {
  const wrapperRef = useRef<HTMLSpanElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    function onDocClick(event: MouseEvent) {
      if (!wrapperRef.current?.contains(event.target as Node)) setOpen(false);
    }
    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape') setOpen(false);
    }
    document.addEventListener('mousedown', onDocClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDocClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <span ref={wrapperRef} className="relative inline-flex">
      {trigger({ open, toggle: () => setOpen((v) => !v) })}
      {open ? (
        <div
          role="dialog"
          className={cn(
            'z-dropdown absolute mt-2 rounded-card border border-hair bg-sheet p-3 shadow-[0_8px_24px_rgba(24,22,19,0.12)]',
            side === 'bottom-start' ? 'left-0' : 'right-0',
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
