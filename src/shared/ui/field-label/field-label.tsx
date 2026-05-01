import { type LabelHTMLAttributes } from 'react';

import { cn } from '@shared/utils/cn';

/**
 * `FieldLabel` — the uppercase mono caption used above input fields.
 * Reference: 11-inputs.html:19-25 (`.lab`).
 */
export type FieldLabelProps = LabelHTMLAttributes<HTMLLabelElement>;

export function FieldLabel({ className, ...rest }: FieldLabelProps) {
  return (
    <label
      className={cn(
        'mb-1.5 block font-mono text-[10px] font-semibold uppercase tracking-overline text-ink-3',
        className,
      )}
      {...rest}
    />
  );
}
