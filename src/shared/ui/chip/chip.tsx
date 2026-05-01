import { type ButtonHTMLAttributes, type ReactNode } from 'react';

import { cn } from '@shared/utils/cn';

/**
 * `Chip` — toggle-style filter chip; can be removable.
 * Reference: 12-selection.html:135-148.
 *
 * For tone-coloured tags use `<Pill>` instead.
 */
export type ChipTone = 'neutral' | 'crit' | 'warn' | 'low';

export interface ChipProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  selected?: boolean;
  tone?: ChipTone;
  onRemove?: () => void;
  removeAriaLabel?: string;
  children: ReactNode;
}

const TONE_OFF: Record<ChipTone, string> = {
  neutral: 'border-ink-3 text-ink-2',
  crit: 'border-crit-edge bg-crit-bg text-crit',
  warn: 'border-warn-edge bg-warn-bg text-warn',
  low: 'border-low-edge bg-low-bg text-low',
};

export function Chip({
  selected = false,
  tone = 'neutral',
  onRemove,
  removeAriaLabel = 'Remove',
  className,
  children,
  ...rest
}: ChipProps) {
  return (
    <span
      className={cn(
        'inline-flex h-6 cursor-pointer items-center gap-1.5 rounded-pill border px-2.5 font-sans text-[12px] tracking-[0.005em]',
        selected ? 'border-ink bg-ink text-paper' : TONE_OFF[tone],
        className,
      )}
    >
      <button
        type="button"
        className="cursor-pointer border-0 bg-transparent p-0 font-inherit text-inherit outline-none"
        {...rest}
      >
        {children}
      </button>
      {onRemove ? (
        <button
          type="button"
          aria-label={removeAriaLabel}
          onClick={(event) => {
            event.stopPropagation();
            onRemove();
          }}
          className={cn(
            'ml-0.5 cursor-pointer border-0 bg-transparent p-0 leading-none outline-none',
            selected ? 'text-paper' : 'text-ink-3',
          )}
        >
          ×
        </button>
      ) : null}
    </span>
  );
}
