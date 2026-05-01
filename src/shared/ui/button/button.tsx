import { type ButtonHTMLAttributes, forwardRef } from 'react';

import { cn } from '@shared/utils/cn';

/**
 * `Button` — three weights × three sizes, plus loading + just-saved states.
 *
 * Reference:
 *  - _foundation.css:207-238 (`.b`, weights, sizes)
 *  - 10-buttons.html:14-57   (sharper restated rules + states scenes)
 *
 * The "irreversible" hold-to-confirm variant is intentionally **out of scope**
 * for v1 (per plan). Add `IrreversibleButton` later when revisited.
 */
export type ButtonVariant = 'primary' | 'secondary' | 'quiet' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Pulses a leading dot, suppresses pointer interactions. */
  loading?: boolean;
  /** Just-saved confirmation skin. */
  confirmed?: boolean;
}

const SIZE: Record<ButtonSize, string> = {
  sm: 'h-7 px-3 text-[12px]',
  md: 'h-[34px] px-4 text-[13px]',
  lg: 'h-10 px-5 text-[14px]',
};

const VARIANT: Record<ButtonVariant, string> = {
  primary:
    'border-green-700 bg-green-700 text-white hover:border-green-800 hover:bg-green-800',
  secondary:
    'border-ink bg-transparent text-ink hover:bg-ink hover:text-paper',
  quiet:
    'border-transparent bg-transparent text-ink-2 hover:bg-ink/5 hover:text-ink',
  danger:
    'border-transparent bg-transparent text-crit hover:bg-crit-bg',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = 'secondary',
    size = 'md',
    loading = false,
    confirmed = false,
    disabled,
    className,
    children,
    type = 'button',
    ...rest
  },
  ref,
) {
  const isQuiet = variant === 'quiet';
  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled || loading}
      data-loading={loading || undefined}
      data-confirmed={confirmed || undefined}
      className={cn(
        'inline-flex items-center gap-2 whitespace-nowrap rounded-control border font-sans font-medium tracking-[0.005em] transition-colors duration-fast ease-paper-out',
        'focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-green-600/30',
        'disabled:pointer-events-none disabled:opacity-[0.38]',
        SIZE[size],
        VARIANT[variant],
        confirmed && 'border-green-300 bg-green-50 text-green-800 hover:bg-green-50',
        isQuiet && size === 'sm' && 'px-2.5',
        className,
      )}
      {...rest}
    >
      {loading ? <LoadingDot /> : null}
      {children}
    </button>
  );
});

function LoadingDot() {
  return (
    <>
      <span
        aria-hidden
        className="inline-block h-1.5 w-1.5 rounded-full bg-current"
        style={{
          animation: 'ds-button-load 1400ms ease-in-out infinite',
          opacity: 0.5,
        }}
      />
      <style>{`@keyframes ds-button-load { 0%, 100% { opacity: 0.3 } 50% { opacity: 1 } }`}</style>
    </>
  );
}
