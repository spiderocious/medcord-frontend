import { type ReactNode } from 'react';

import { cn } from '@shared/utils/cn';

/**
 * `ApprovalCard` — submit → review → approve/reject card.
 * Reference: 42-cross.html (approval card).
 */
export type ApprovalState = 'pending' | 'approved' | 'rejected' | 'changes';

export interface ApprovalCardProps {
  state: ApprovalState;
  /** Mono caps eyebrow, e.g. `RESIDENT NOTE`. */
  kind: string;
  title: ReactNode;
  /** Submitter description. */
  submitter: string;
  /** When it was submitted (mono). */
  submittedAt: string;
  /** Optional reviewer node (avatar + name). */
  reviewer?: ReactNode;
  /** Action slot (Approve, Reject, Request changes). */
  actions?: ReactNode;
  children?: ReactNode;
  className?: string;
}

const STATE_PILL: Record<ApprovalState, { label: string; cls: string }> = {
  pending: { label: 'Awaiting review', cls: 'border-low-edge bg-low-bg text-low' },
  approved: { label: 'Approved', cls: 'border-green-300 bg-green-50 text-green-800' },
  rejected: { label: 'Rejected', cls: 'border-crit-edge bg-crit-bg text-crit' },
  changes: { label: 'Changes requested', cls: 'border-warn-edge bg-warn-bg text-warn' },
};

export function ApprovalCard({
  state,
  kind,
  title,
  submitter,
  submittedAt,
  reviewer,
  actions,
  children,
  className,
}: ApprovalCardProps) {
  const pill = STATE_PILL[state];
  return (
    <div className={cn('rounded-card border border-sheet-edge bg-sheet', className)}>
      <div className="flex items-center justify-between border-b border-hair-soft px-5 py-3">
        <span className="font-mono text-[10px] uppercase tracking-overline text-ink-3">{kind}</span>
        <span
          className={cn(
            'inline-flex h-5 items-center rounded-pill border px-2 font-sans text-[11px] font-medium tracking-label',
            pill.cls,
          )}
        >
          {pill.label}
        </span>
      </div>
      <div className="px-5 py-4">
        <h3 className="m-0 mb-1 font-serif text-[18px] font-medium tracking-h text-ink">{title}</h3>
        <div className="font-mono text-[11px] tracking-mono text-ink-3">
          submitted by {submitter} · {submittedAt}
        </div>
        {reviewer ? (
          <div className="mt-1.5 text-[12px] text-ink-2">Reviewer: {reviewer}</div>
        ) : null}
        {children ? (
          <div className="mt-3 text-[13px] leading-[1.55] text-ink-2">{children}</div>
        ) : null}
      </div>
      {actions ? (
        <div className="bg-paper-deep/40 flex items-center gap-2 border-t border-hair-soft px-5 py-3">
          {actions}
        </div>
      ) : null}
    </div>
  );
}
