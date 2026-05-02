import { type HTMLAttributes, type ReactNode } from 'react';

import { cn } from '@shared/utils/cn';

/**
 * Typographic primitives — the running family of inline text marks.
 *
 * - `Mark`         · uppercase mono micro-label · _foundation.css:193-199.
 * - `Overline`     · uppercase sans label       · _foundation.css:116-123.
 * - `Numeric`      · mono + tabular figures     · _foundation.css:114-115.
 * - `RecordNumber` · MRN/encounter chart label  · _foundation.css:289-295.
 * - `DictatedText` · italic serif quote         · _foundation.css:376-383.
 */

export type TextSpanProps = HTMLAttributes<HTMLSpanElement> & { children?: ReactNode };

export function Mark({ className, ...rest }: TextSpanProps) {
  return (
    <span
      className={cn('font-mono text-[10px] uppercase tracking-[0.14em] text-ink-3', className)}
      {...rest}
    />
  );
}

export function Overline({ className, ...rest }: TextSpanProps) {
  return (
    <span
      className={cn(
        'font-sans text-[11px] font-semibold uppercase tracking-overline text-ink-3',
        className,
      )}
      {...rest}
    />
  );
}

export function Numeric({ className, ...rest }: TextSpanProps) {
  return <span className={cn('font-mono tabular-nums tracking-mono', className)} {...rest} />;
}

export function RecordNumber({ className, ...rest }: TextSpanProps) {
  return (
    <span
      className={cn('font-mono text-[11px] tabular-nums tracking-mono text-ink-3', className)}
      {...rest}
    />
  );
}

export type ParagraphProps = HTMLAttributes<HTMLParagraphElement>;

export function DictatedText({ className, ...rest }: ParagraphProps) {
  return (
    <p
      className={cn(
        'font-serif text-[16px] font-normal italic leading-[1.45] tracking-body text-ink-2',
        className,
      )}
      {...rest}
    />
  );
}
