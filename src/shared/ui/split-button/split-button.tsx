import { type ReactNode } from 'react';

import { cn } from '@shared/utils/cn';

import { Button, type ButtonProps } from '../button';

/**
 * `SplitButton` — primary action with a chevron-side menu trigger.
 * Reference: 10-buttons.html:90-97, 270-289.
 */
export interface SplitButtonProps {
  variant?: ButtonProps['variant'];
  size?: ButtonProps['size'];
  /** Main action label and click. */
  label: ReactNode;
  onClick?: () => void;
  /** Aria-label for the menu trigger. */
  menuAriaLabel?: string;
  onOpenMenu?: () => void;
  className?: string;
}

export function SplitButton({
  variant = 'primary',
  size = 'md',
  label,
  onClick,
  menuAriaLabel = 'More options',
  onOpenMenu,
  className,
}: SplitButtonProps) {
  return (
    <span className={cn('inline-flex items-stretch overflow-hidden rounded-control', className)}>
      <Button
        variant={variant}
        size={size}
        onClick={onClick}
        className="rounded-none border-r border-white/15"
      >
        {label}
      </Button>
      <Button
        variant={variant}
        size={size}
        aria-label={menuAriaLabel}
        onClick={onOpenMenu}
        className="rounded-none px-3"
      >
        <svg
          viewBox="0 0 24 24"
          width="14"
          height="14"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </Button>
    </span>
  );
}
