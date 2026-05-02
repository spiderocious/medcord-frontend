import { type ReactNode, useEffect } from 'react';

import { cn } from '@shared/utils/cn';

/**
 * `Drawer` — side panel that slides in from the right (or left).
 * Reference: 40-modals.html (drawer section).
 */
export interface DrawerProps {
  open: boolean;
  onClose: () => void;
  title: ReactNode;
  side?: 'right' | 'left';
  /** Width hint. */
  width?: string;
  /** Footer (buttons row). */
  footer?: ReactNode;
  children: ReactNode;
  className?: string;
}

export function Drawer({
  open,
  onClose,
  title,
  side = 'right',
  width = '440px',
  footer,
  children,
  className,
}: DrawerProps) {
  useEffect(() => {
    if (!open) return;
    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal
      className="z-modal bg-ink/30 fixed inset-0"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <aside
        className={cn(
          'absolute top-0 flex h-full flex-col border-ink bg-sheet shadow-[0_24px_64px_rgba(24,22,19,0.18)]',
          side === 'right' ? 'right-0 border-l' : 'left-0 border-r',
          className,
        )}
        style={{ width }}
      >
        <div className="flex items-center justify-between border-b border-hair px-6 py-4">
          <h2 className="m-0 font-serif text-[18px] font-medium tracking-h text-ink">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="cursor-pointer border-0 bg-transparent p-0 font-mono text-[14px] text-ink-3 hover:text-ink"
          >
            ×
          </button>
        </div>
        <div className="flex-1 overflow-auto px-6 py-5">{children}</div>
        {footer ? (
          <div className="bg-paper-deep/60 flex items-center gap-2 border-t border-hair px-6 py-3.5">
            {footer}
          </div>
        ) : null}
      </aside>
    </div>
  );
}
