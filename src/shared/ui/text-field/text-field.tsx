import { type InputHTMLAttributes, type ReactNode, forwardRef, useId } from 'react';

import { cn } from '@shared/utils/cn';

import { FieldLabel } from '../field-label';

/**
 * `TextField` — the chart-paper input.
 *
 * The default is a *line, not a box*: underline + label above. The label is
 * uppercase mono. Set `variant='block'` for the boxed sibling-aligned form.
 *
 * Reference: 11-inputs.html:27-69 (`.field`, `.block`), states grid :572-609.
 */
export type TextFieldVariant = 'underline' | 'block';
export type TextFieldStatus = 'default' | 'ok' | 'error';

export interface TextFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: ReactNode;
  /** Inline help / error / verified text under the field. */
  help?: ReactNode;
  /** Mono numerics with tabular figures. */
  mono?: boolean;
  variant?: TextFieldVariant;
  status?: TextFieldStatus;
}

const STATUS_UNDERLINE: Record<TextFieldStatus, string> = {
  default: 'border-ink-3 focus:border-ink',
  ok: 'border-green-700 focus:border-green-700',
  error: 'border-crit focus:border-crit',
};

const STATUS_HELP: Record<TextFieldStatus, string> = {
  default: 'text-ink-3',
  ok: 'text-green-800',
  error: 'text-crit',
};

const STATUS_BLOCK: Record<TextFieldStatus, string> = {
  default: 'border-sheet-edge bg-sheet focus:border-ink focus:bg-white',
  ok: 'border-green-300 bg-green-50 focus:border-green-700',
  error: 'border-crit-edge bg-crit-bg focus:border-crit',
};

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(function TextField(
  {
    label,
    help,
    mono = false,
    variant = 'underline',
    status = 'default',
    className,
    id,
    readOnly,
    disabled,
    ...rest
  },
  ref,
) {
  const reactId = useId();
  const inputId = id ?? reactId;
  const dashed = readOnly || disabled;

  return (
    <div className="flex flex-col gap-1">
      {label ? <FieldLabel htmlFor={inputId}>{label}</FieldLabel> : null}
      <input
        ref={ref}
        id={inputId}
        readOnly={readOnly}
        disabled={disabled}
        className={cn(
          'h-8 w-full bg-transparent px-0 py-1.5 text-[14px] tracking-body text-ink outline-none placeholder:text-ink-4',
          mono ? 'font-mono tabular-nums' : 'font-sans',
          variant === 'underline' &&
            cn('border-0 border-b px-0', STATUS_UNDERLINE[status], dashed && 'border-dashed'),
          variant === 'block' &&
            cn('h-auto rounded-card border px-3 py-2', STATUS_BLOCK[status]),
          disabled && 'cursor-not-allowed text-ink-3',
          className,
        )}
        {...rest}
      />
      {help ? (
        <span className={cn('font-sans text-[12px]', STATUS_HELP[status])}>{help}</span>
      ) : null}
    </div>
  );
});
