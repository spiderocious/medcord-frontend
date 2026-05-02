import { type ReactNode } from 'react';

import { cn } from '@shared/utils/cn';

/**
 * `SessionContext` — a small persistent badge showing who is signed in, on
 * what unit, on what shift. Lives in the top-bar.
 * Reference: 42-cross.html (session context).
 */
export interface SessionContextProps {
  /** Signed-in user name + role. */
  who: string;
  whoMeta: string;
  /** Unit / department, mono. */
  unit?: string;
  /** Shift descriptor, mono. */
  shift?: string;
  /** Optional avatar slot. */
  avatar?: ReactNode;
  className?: string;
}

export function SessionContext({
  who,
  whoMeta,
  unit,
  shift,
  avatar,
  className,
}: SessionContextProps) {
  return (
    <span className={cn('inline-flex items-center gap-3', className)}>
      {avatar}
      <span className="flex flex-col leading-tight">
        <span className="font-serif text-[14px] text-ink">{who}</span>
        <span className="font-mono text-[10px] uppercase tracking-overline text-ink-3">
          {whoMeta}
        </span>
      </span>
      {unit || shift ? (
        <span className="ml-2 border-l border-hair pl-3 font-mono text-[10px] uppercase leading-[1.7] tracking-overline text-ink-3">
          {unit ? <span className="block">{unit}</span> : null}
          {shift ? <span className="block">{shift}</span> : null}
        </span>
      ) : null}
    </span>
  );
}
