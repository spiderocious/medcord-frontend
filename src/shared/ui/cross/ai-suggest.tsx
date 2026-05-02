import { type ReactNode } from 'react';

import { cn } from '@shared/utils/cn';

/**
 * `AiSuggest` — *suggestion only* surface. Quiet, mono, never auto-applies.
 * Reference: 42-cross.html (AI assist section).
 */
export interface AiSuggestProps {
  /** Mono caps eyebrow, e.g. `SUGGESTED — REVIEW BEFORE APPLYING`. */
  eyebrow?: ReactNode;
  /** The suggestion body. */
  children: ReactNode;
  /** Action slot. */
  actions?: ReactNode;
  className?: string;
}

export function AiSuggest({
  eyebrow = 'Suggested — review before applying',
  children,
  actions,
  className,
}: AiSuggestProps) {
  return (
    <div
      className={cn(
        'bg-paper-deep/40 rounded-card border border-dashed border-ink-3 px-4 py-3',
        className,
      )}
    >
      {eyebrow ? (
        <div className="mb-1.5 font-mono text-[10px] uppercase tracking-overline text-ink-3">
          {eyebrow}
        </div>
      ) : null}
      <div className="font-serif text-[14px] italic leading-[1.5] text-ink-2">{children}</div>
      {actions ? <div className="mt-3 flex items-center gap-2">{actions}</div> : null}
    </div>
  );
}
