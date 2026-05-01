import { type HTMLAttributes, type ReactNode } from 'react';

import { cn } from '@shared/utils/cn';

/**
 * `Card` — the signature paper-sheet card.
 *
 * Reference: 27-cards.html. Three signature sizes; the consumer composes the
 * inside. Use `Sheet` for raw paper without the header chrome.
 */
export type CardDensity = 'tight' | 'regular' | 'spacious';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  density?: CardDensity;
  /** Top-bar overline / mark, optional. */
  eyebrow?: ReactNode;
  /** Right-aligned meta in the header row. */
  meta?: ReactNode;
  /** The card title (serif). */
  title?: ReactNode;
  /** Subtitle line under the title. */
  subtitle?: ReactNode;
  /** Optional footer area, separated by a hairline. */
  footer?: ReactNode;
}

const DENSITY: Record<CardDensity, { px: string; gap: string }> = {
  tight: { px: 'px-4 py-3', gap: 'gap-2' },
  regular: { px: 'px-5 py-4', gap: 'gap-3' },
  spacious: { px: 'px-7 py-6', gap: 'gap-4' },
};

export function Card({
  density = 'regular',
  eyebrow,
  meta,
  title,
  subtitle,
  footer,
  className,
  children,
  ...rest
}: CardProps) {
  const { px, gap } = DENSITY[density];
  return (
    <div className={cn('rounded-card border border-sheet-edge bg-sheet', className)} {...rest}>
      {(eyebrow || meta || title || subtitle) && (
        <div className={cn('flex flex-col border-b border-hair-soft', px, gap)}>
          {(eyebrow || meta) && (
            <div className="flex items-center justify-between">
              {eyebrow ? <div>{eyebrow}</div> : <div />}
              {meta ? <div>{meta}</div> : null}
            </div>
          )}
          {title ? (
            <h3 className="m-0 font-serif text-[20px] font-medium tracking-h text-ink">
              {title}
            </h3>
          ) : null}
          {subtitle ? <div className="text-[13px] text-ink-3">{subtitle}</div> : null}
        </div>
      )}
      <div className={cn('flex flex-col', px, gap)}>{children}</div>
      {footer ? (
        <div className={cn('border-t border-hair-soft', px)}>{footer}</div>
      ) : null}
    </div>
  );
}
