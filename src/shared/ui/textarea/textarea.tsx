import { type ReactNode, type TextareaHTMLAttributes, forwardRef, useId } from 'react';

import { cn } from '@shared/utils/cn';

import { FieldLabel } from '../field-label';

/**
 * `Textarea` — multi-line sibling of `TextField` (`.field textarea`).
 * Reference: 11-inputs.html:32 (the `.field input/select/textarea` family).
 */
export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: ReactNode;
  help?: ReactNode;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { label, help, className, id, ...rest },
  ref,
) {
  const reactId = useId();
  const textareaId = id ?? reactId;
  return (
    <div className="flex flex-col gap-1">
      {label ? <FieldLabel htmlFor={textareaId}>{label}</FieldLabel> : null}
      <textarea
        ref={ref}
        id={textareaId}
        className={cn(
          'min-h-[80px] w-full resize-y border-0 border-b border-ink-3 bg-transparent px-0 py-1.5 font-sans text-[14px] leading-[1.55] tracking-body text-ink outline-none placeholder:text-ink-4 focus:border-ink',
          className,
        )}
        {...rest}
      />
      {help ? <span className="font-sans text-[12px] text-ink-3">{help}</span> : null}
    </div>
  );
});
