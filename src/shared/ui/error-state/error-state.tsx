import { type ReactNode } from 'react';

import { cn } from '@shared/utils/cn';

/**
 * `ErrorState` — the leading red rule, like a chart-mark.
 * Reference: 25-skeletons-empty.html (error scenes).
 */
export interface ErrorStateProps {
  title: ReactNode;
  detail?: ReactNode;
  /** Optional retry / contact action. */
  action?: ReactNode;
  className?: string;
}

export function ErrorState({ title, detail, action, className }: ErrorStateProps) {
  return (
    <div
      className={cn(
        'bg-crit-bg/40 flex flex-col items-start gap-3 border-l-[3px] border-l-crit px-4 py-6',
        className,
      )}
    >
      <p className="m-0 font-serif text-[16px] italic leading-[1.45] text-crit">{title}</p>
      {detail ? <p className="m-0 text-[13px] text-ink-2">{detail}</p> : null}
      {action}
    </div>
  );
}
