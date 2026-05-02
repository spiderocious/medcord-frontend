import { type ReactNode, useEffect } from 'react';

import { cn } from '@shared/utils/cn';

/**
 * `Modal` — sheet fastened to the desk with a paper clip.
 *
 * Variants: `default` · `critical` · `verify` · `glass`. The critical variant
 * carries an arterial-red leading rule + a mono CRITICAL stamp. Verify splits
 * the sheet down the middle for two-person sign. Break-the-glass is the
 * heaviest, ink-on-paper.
 *
 * Reference: 40-modals.html.
 */
export type ModalVariant = 'default' | 'critical' | 'verify' | 'glass';

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: ReactNode;
  variant?: ModalVariant;
  /** Mono caps eyebrow. */
  eyebrow?: ReactNode;
  /** Right-aligned mono meta. */
  meta?: ReactNode;
  /** Footer slot (typically buttons). */
  footer?: ReactNode;
  children: ReactNode;
  /** Width hint, e.g. `'520px'`. */
  width?: string;
  className?: string;
}

const VARIANT: Record<ModalVariant, string> = {
  default: 'border-ink',
  critical: 'border-l-[3px] border-l-crit border-ink',
  verify: 'border-ink',
  glass: 'border-[2px] border-ink',
};

export function Modal({
  open,
  onClose,
  title,
  variant = 'default',
  eyebrow,
  meta,
  footer,
  children,
  width = '560px',
  className,
}: ModalProps) {
  useEffect(() => {
    if (!open) return;
    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal
      className="z-modal bg-ink/40 fixed inset-0 flex items-start justify-center px-4 pt-[12vh]"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        className={cn(
          'rounded-modal border bg-sheet shadow-[0_24px_64px_rgba(24,22,19,0.18)]',
          VARIANT[variant],
          className,
        )}
        style={{ width }}
      >
        <div className="flex items-baseline gap-3 border-b border-hair px-6 py-4">
          {variant === 'critical' ? (
            <span className="bg-crit px-1.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-overline text-white">
              CRITICAL
            </span>
          ) : eyebrow ? (
            <span className="font-mono text-[11px] uppercase tracking-overline text-ink-3">
              {eyebrow}
            </span>
          ) : null}
          <h2 className="m-0 flex-1 font-serif text-[20px] font-medium tracking-h text-ink">
            {title}
          </h2>
          {meta ? (
            <span className="font-mono text-[11px] tracking-mono text-ink-3">{meta}</span>
          ) : null}
        </div>
        <div className={cn('px-6 py-5', variant === 'verify' && 'grid grid-cols-2 gap-6')}>
          {children}
        </div>
        {footer ? (
          <div className="bg-paper-deep/60 flex items-center gap-2 border-t border-hair px-6 py-3.5">
            {footer}
          </div>
        ) : null}
      </div>
    </div>
  );
}
