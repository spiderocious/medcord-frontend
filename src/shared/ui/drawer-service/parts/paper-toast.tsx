import { type ReactNode } from 'react';

import {
  AlertCircle,
  AlertTriangle,
  CheckCircle,
  Info,
  MedcordIcon,
  X,
  type LucideIcon,
} from '@icons';

import { cn } from '@shared/utils/cn';

import type { ToastType } from '../types';

/**
 * `PaperToast` — the surgical-paper toast slip. Hairline edge + tone-tinted
 * leading rule + ink text. Mirrors the source `AppToast` API.
 */
export interface PaperToastProps {
  type?: ToastType;
  message: ReactNode;
  fullWidth?: boolean;
  showIcon?: boolean;
  icon?: ReactNode;
  dismissible?: boolean;
  onDismiss?: () => void;
  className?: string;
}

const ICON: Record<ToastType, LucideIcon> = {
  success: CheckCircle,
  error: AlertCircle,
  warning: AlertTriangle,
  info: Info,
};

const TONE: Record<ToastType, { rule: string; text: string }> = {
  success: { rule: 'border-l-green-700', text: 'text-green-800' },
  error: { rule: 'border-l-crit', text: 'text-crit' },
  warning: { rule: 'border-l-warn', text: 'text-warn' },
  info: { rule: 'border-l-low', text: 'text-low' },
};

export function PaperToast({
  type = 'success',
  message,
  fullWidth = false,
  showIcon = true,
  icon,
  dismissible = true,
  onDismiss,
  className,
}: PaperToastProps) {
  const Icon = ICON[type];
  const tone = TONE[type];
  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        'flex items-center gap-3 border border-l-[3px] border-hair bg-sheet px-4 py-3 shadow-[0_8px_24px_rgba(24,22,19,0.08)]',
        tone.rule,
        fullWidth ? 'rounded-none border-x-0' : 'rounded-card',
        className,
      )}
    >
      {showIcon ? (
        <span className={cn('inline-flex flex-shrink-0', tone.text)}>
          {icon ?? <MedcordIcon as={Icon} size="md" />}
        </span>
      ) : null}
      <span className="flex-1 font-serif text-[14px] leading-[1.4] text-ink">{message}</span>
      {dismissible ? (
        <button
          type="button"
          onClick={onDismiss}
          aria-label="Dismiss"
          className="inline-flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-paper text-ink-3 transition-colors hover:bg-paper-deep hover:text-ink"
        >
          <MedcordIcon as={X} size="sm" />
        </button>
      ) : null}
    </div>
  );
}
