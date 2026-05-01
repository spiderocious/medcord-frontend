import { type ReactNode } from 'react';

import { cn } from '@shared/utils/cn';

/**
 * `Radio` — ink circle with a centred ink dot.
 * Reference: 12-selection.html:74-87.
 */
export interface RadioProps {
  checked?: boolean;
  disabled?: boolean;
  name?: string;
  value?: string;
  onChange?: (value: string) => void;
  children?: ReactNode;
  className?: string;
}

export function Radio({
  checked = false,
  disabled = false,
  name,
  value,
  onChange,
  children,
  className,
}: RadioProps) {
  return (
    <label
      className={cn(
        'flex cursor-pointer items-center gap-2 font-sans text-[14px]',
        disabled && 'cursor-not-allowed opacity-[0.35]',
        className,
      )}
    >
      <input
        type="radio"
        className="sr-only"
        name={name}
        value={value}
        checked={checked}
        disabled={disabled}
        onChange={() => value && onChange?.(value)}
      />
      <span
        aria-hidden
        className={cn(
          'inline-flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full border-[1.5px]',
          checked ? 'border-ink' : 'border-ink-2',
        )}
      >
        {checked ? <span className="block h-2 w-2 rounded-full bg-ink" /> : null}
      </span>
      <span>{children}</span>
    </label>
  );
}
