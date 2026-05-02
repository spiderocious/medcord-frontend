import { type ReactNode } from 'react';

import { cn } from '@shared/utils/cn';

/**
 * `AuditLog` — immutable list of who did what to a record, when, from where.
 * Reference: 42-cross.html (audit log section).
 */
export interface AuditEvent {
  id: string;
  /** When (mono). */
  when: string;
  /** Who (display name + role). */
  actor: string;
  /** Verb / action description. */
  action: ReactNode;
  /** Optional context (`from`, `device`). */
  meta?: ReactNode;
}

export interface AuditLogProps {
  events: ReadonlyArray<AuditEvent>;
  className?: string;
}

export function AuditLog({ events, className }: AuditLogProps) {
  return (
    <ol className={cn('m-0 flex list-none flex-col p-0', className)}>
      {events.map((event, index) => (
        <li
          key={event.id}
          className={cn(
            'grid grid-cols-[140px_1fr] gap-4 py-3',
            index === events.length - 1 ? '' : 'border-b border-hair-soft',
          )}
        >
          <span className="font-mono text-[11px] tabular-nums tracking-mono text-ink-3">
            {event.when}
          </span>
          <div>
            <div className="text-[13px] text-ink">
              <span className="font-medium">{event.actor}</span>{' '}
              <span className="text-ink-3">·</span> {event.action}
            </div>
            {event.meta ? (
              <div className="mt-0.5 font-mono text-[11px] tracking-mono text-ink-3">
                {event.meta}
              </div>
            ) : null}
          </div>
        </li>
      ))}
    </ol>
  );
}
