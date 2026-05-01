import { cn } from '@shared/utils/cn';

/**
 * `Switch` — small, tight ink-on-paper toggle.
 * Reference: 12-selection.html:114-133.
 */
export interface SwitchProps {
  checked?: boolean;
  disabled?: boolean;
  onChange?: (checked: boolean) => void;
  /** Accessible label, applied as `aria-label`. */
  label: string;
  className?: string;
}

export function Switch({ checked = false, disabled = false, onChange, label, className }: SwitchProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      onClick={() => onChange?.(!checked)}
      className={cn(
        'relative inline-flex h-[18px] w-8 flex-shrink-0 cursor-pointer items-center rounded-pill border bg-transparent transition-colors duration-fast ease-paper-out',
        checked ? 'border-ink bg-ink' : 'border-ink-3',
        disabled && 'pointer-events-none opacity-[0.35]',
        className,
      )}
    >
      <span
        aria-hidden
        className={cn(
          'absolute top-px inline-block h-3.5 w-3.5 rounded-full transition-[left,background] duration-fast ease-paper-out',
          checked ? 'left-[calc(100%-15px)] bg-paper' : 'left-px bg-ink-2',
        )}
      />
    </button>
  );
}
