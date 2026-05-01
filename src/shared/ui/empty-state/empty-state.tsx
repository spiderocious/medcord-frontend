import { type ReactNode } from 'react';

import { cn } from '@shared/utils/cn';

/**
 * `EmptyState` — italic-serif sentence that names the absence honestly.
 * Reference: 25-skeletons-empty.html (empty scenes).
 */
export interface EmptyStateProps {
  title: ReactNode;
  /** Optional secondary line. */
  detail?: ReactNode;
  /** Optional call-to-action node. */
  action?: ReactNode;
  className?: string;
}

export function EmptyState({ title, detail, action, className }: EmptyStateProps) {
  return (
    <div className={cn('flex flex-col items-start gap-3 px-4 py-12 text-left', className)}>
      <p className="m-0 max-w-[42ch] font-serif text-[18px] italic leading-[1.45] text-ink-2">
        {title}
      </p>
      {detail ? (
        <p className="m-0 max-w-[42ch] text-[13px] text-ink-3">{detail}</p>
      ) : null}
      {action}
    </div>
  );
}
