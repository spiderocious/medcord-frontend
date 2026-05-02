import { type ReactNode } from 'react';

import { cn } from '@shared/utils/cn';

/**
 * `BulkActionBar` — the slim toolbar that appears when N rows are selected.
 * Reference: 42-cross.html (bulk action bar).
 */
export interface BulkActionBarProps {
  count: number;
  /** Action slot (buttons). */
  children: ReactNode;
  /** Clear selection. */
  onClear?: () => void;
  className?: string;
}

export function BulkActionBar({ count, children, onClear, className }: BulkActionBarProps) {
  return (
    <div
      className={cn(
        'flex items-center gap-3 rounded-control border border-ink bg-ink px-3 py-2 text-paper',
        className,
      )}
    >
      <span className="font-mono text-[11px] tabular-nums tracking-mono">{count}</span>
      <span className="font-sans text-[12px]">selected</span>
      <span className="bg-paper/30 ml-2 h-4 w-px" aria-hidden />
      <div className="flex items-center gap-2">{children}</div>
      <span className="flex-1" />
      {onClear ? (
        <button
          type="button"
          onClick={onClear}
          className="text-paper/70 cursor-pointer border-0 bg-transparent p-0 font-mono text-[11px] uppercase tracking-overline hover:text-paper"
        >
          Clear
        </button>
      ) : null}
    </div>
  );
}
