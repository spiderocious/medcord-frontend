import { type ReactNode } from 'react';

import { cn } from '@shared/utils/cn';

/**
 * `Checkbox` — drawn ink square with a hand-tick (CSS rotated borders).
 * Reference: 12-selection.html:28-72.
 *
 * Supports default / checked / indeterminate / disabled states.
 */
export interface CheckboxProps {
  checked?: boolean;
  indeterminate?: boolean;
  disabled?: boolean;
  onChange?: (checked: boolean) => void;
  /** Optional inline label rendered alongside the box. */
  children?: ReactNode;
  /** Right-aligned helper text (e.g. mono caption). */
  meta?: ReactNode;
  className?: string;
}

export function Checkbox({
  checked = false,
  indeterminate = false,
  disabled = false,
  onChange,
  children,
  meta,
  className,
}: CheckboxProps) {
  const isOn = checked || indeterminate;
  return (
    <label
      className={cn(
        'flex cursor-pointer items-center gap-2.5 py-1.5 font-sans text-[14px] text-ink',
        disabled && 'cursor-not-allowed opacity-[0.35]',
        className,
      )}
    >
      <input
        type="checkbox"
        className="sr-only"
        checked={checked}
        disabled={disabled}
        onChange={(event) => onChange?.(event.target.checked)}
      />
      <span
        aria-hidden
        className={cn(
          'relative inline-flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-paper border-[1.5px]',
          isOn ? 'border-ink bg-ink' : 'border-ink-2 bg-transparent',
        )}
      >
        {indeterminate ? (
          <span className="block h-[1.5px] w-[7px] bg-paper" />
        ) : checked ? (
          <span
            className="block h-[5px] w-2 -translate-y-px translate-x-px"
            style={{
              borderLeft: '1.5px solid var(--paper)',
              borderBottom: '1.5px solid var(--paper)',
              transform: 'rotate(-45deg) translate(1px, -1px)',
            }}
          />
        ) : null}
      </span>
      <span className="flex-1">{children}</span>
      {meta ? (
        <span className="ml-auto font-mono text-[12px] tracking-mono text-ink-3">{meta}</span>
      ) : null}
    </label>
  );
}
