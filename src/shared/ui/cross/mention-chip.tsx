import { type ReactNode } from 'react';

import { cn } from '@shared/utils/cn';

/**
 * `MentionChip` — `@person` chip used inline in notes/messages.
 * Reference: 42-cross.html (mention chip).
 */
export interface MentionChipProps {
  initials: string;
  name: string;
  role?: ReactNode;
  className?: string;
}

export function MentionChip({ initials, name, role, className }: MentionChipProps) {
  return (
    <span
      className={cn(
        'bg-paper-deep/40 inline-flex items-center gap-1.5 rounded-pill border border-hair px-1.5 py-0.5 font-sans text-[12px] text-ink',
        className,
      )}
    >
      <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-ink text-[8px] font-semibold uppercase tracking-[0.04em] text-paper">
        {initials}
      </span>
      <span>@{name}</span>
      {role ? (
        <span className="font-mono text-[10px] tracking-mono text-ink-3">· {role}</span>
      ) : null}
    </span>
  );
}
