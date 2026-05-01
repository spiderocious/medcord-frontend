import { type ReactNode, type SelectHTMLAttributes, forwardRef, useId } from 'react';

import { cn } from '@shared/utils/cn';

import { FieldLabel } from '../field-label';

/**
 * `Select` — underline-styled native `<select>` for inline structured inputs.
 * Reference: 11-inputs.html `.field select` (rules at :32, :45-47).
 */
export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: ReactNode;
  help?: ReactNode;
  mono?: boolean;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { label, help, mono = false, className, id, children, ...rest },
  ref,
) {
  const reactId = useId();
  const selectId = id ?? reactId;
  return (
    <div className="flex flex-col gap-1">
      {label ? <FieldLabel htmlFor={selectId}>{label}</FieldLabel> : null}
      <select
        ref={ref}
        id={selectId}
        className={cn(
          'h-8 w-full appearance-none border-0 border-b border-ink-3 bg-transparent px-0 py-1.5 pr-4 text-[14px] tracking-body text-ink outline-none focus:border-ink',
          mono ? 'font-mono tabular-nums' : 'font-sans',
          className,
        )}
        {...rest}
      >
        {children}
      </select>
      {help ? <span className="font-sans text-[12px] text-ink-3">{help}</span> : null}
    </div>
  );
});
