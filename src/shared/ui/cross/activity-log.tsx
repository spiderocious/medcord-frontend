import { type ReactNode } from 'react';

import { cn } from '@shared/utils/cn';

/**
 * `ActivityLog` — softer cousin of AuditLog used for "what changed in this
 * chart today" / "team activity" feeds.
 * Reference: 42-cross.html (activity log section).
 */
export interface ActivityEntry {
  id: string;
  when: string;
  /** Avatar slot. */
  avatar?: ReactNode;
  /** First line (rich content allowed). */
  title: ReactNode;
  /** Optional second-line subtle context. */
  detail?: ReactNode;
}

export interface ActivityLogProps {
  entries: ReadonlyArray<ActivityEntry>;
  className?: string;
}

export function ActivityLog({ entries, className }: ActivityLogProps) {
  return (
    <ol className={cn('m-0 flex list-none flex-col gap-3 p-0', className)}>
      {entries.map((entry) => (
        <li key={entry.id} className="grid grid-cols-[36px_1fr_auto] items-start gap-3">
          <span className="pt-0.5">{entry.avatar}</span>
          <div>
            <div className="text-[13px] leading-[1.55] text-ink">{entry.title}</div>
            {entry.detail ? (
              <div className="mt-0.5 text-[12px] text-ink-3">{entry.detail}</div>
            ) : null}
          </div>
          <span className="font-mono text-[11px] tabular-nums tracking-mono text-ink-3">
            {entry.when}
          </span>
        </li>
      ))}
    </ol>
  );
}
