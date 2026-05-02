import { type ReactNode } from 'react';

import { cn } from '@shared/utils/cn';

/**
 * `SavedViewTabs` — cross-record pattern: a row of saved filter views (e.g.
 * "My patients", "Awaiting labs", "Discharging today"). Active is filled ink.
 * Reference: 42-cross.html (saved-view tabs section).
 */
export interface SavedView {
  id: string;
  label: string;
  /** Optional count, mono. */
  count?: number;
}

export interface SavedViewTabsProps {
  views: ReadonlyArray<SavedView>;
  activeId: string;
  onChange: (id: string) => void;
  /** Optional trailing slot for `+ New view`. */
  trailing?: ReactNode;
  className?: string;
}

export function SavedViewTabs({
  views,
  activeId,
  onChange,
  trailing,
  className,
}: SavedViewTabsProps) {
  return (
    <div className={cn('flex flex-wrap items-center gap-2', className)}>
      {views.map((view) => {
        const isActive = view.id === activeId;
        return (
          <button
            key={view.id}
            type="button"
            onClick={() => onChange(view.id)}
            className={cn(
              'inline-flex h-8 cursor-pointer items-center gap-2 rounded-control border px-3 font-sans text-[12px] tracking-[0.005em]',
              isActive
                ? 'border-ink bg-ink text-paper'
                : 'border-hair bg-sheet text-ink-2 hover:border-ink hover:text-ink',
            )}
          >
            {view.label}
            {view.count !== undefined ? (
              <span
                className={cn(
                  'font-mono text-[10px] tracking-mono',
                  isActive ? 'text-paper/70' : 'text-ink-3',
                )}
              >
                {view.count}
              </span>
            ) : null}
          </button>
        );
      })}
      {trailing}
    </div>
  );
}
