import { type HTMLAttributes } from 'react';

import { cn } from '@shared/utils/cn';

/**
 * `Stamp` — the chart-stamp page header. A serif title flanked by mono labels,
 * underlined by a single ink rule. Used at the top of every preview specimen.
 * Reference: _foundation.css:129-154 (`.stamp`, `.stamp .num/.ttl/.meta`).
 */
export interface StampProps extends HTMLAttributes<HTMLElement> {
  /** e.g. `'I · 02'`. */
  number?: string;
  title: string;
  /** Right-aligned subtitle, mono. */
  meta?: string;
}

export function Stamp({ number, title, meta, className, ...rest }: StampProps) {
  return (
    <header
      className={cn('mb-9 flex items-baseline gap-4 border-b border-ink pb-[18px]', className)}
      {...rest}
    >
      {number ? (
        <span className="whitespace-nowrap font-mono text-[11px] text-ink-3">{number}</span>
      ) : null}
      <h1 className="m-0 flex-1 font-serif text-[28px] font-medium leading-[1.05] tracking-display">
        {title}
      </h1>
      {meta ? (
        <span className="whitespace-nowrap font-mono text-[11px] text-ink-3">{meta}</span>
      ) : null}
    </header>
  );
}
