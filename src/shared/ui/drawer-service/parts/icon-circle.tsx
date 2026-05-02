import { AlertTriangle, Check, HelpCircle, Info, MedcordIcon, X, type LucideIcon } from '@icons';

import { cn } from '@shared/utils/cn';

import type { ModalConfirmationKind, ModalFeedbackKind } from '../types';

/**
 * Round badge with a tinted ring + paper-tone fill, used by Feedback and
 * Confirmation panels. Mirrors the source `IconCircle`, restyled for the
 * surgical-paper palette (clinical state tones rather than teal/red rgb hex).
 */
export type IconCircleKind = ModalFeedbackKind | ModalConfirmationKind;

const ICON: Record<IconCircleKind, LucideIcon> = {
  success: Check,
  error: X,
  warning: AlertTriangle,
  info: Info,
  neutral: HelpCircle,
};

const RING: Record<IconCircleKind, string> = {
  success: 'border-green-700 text-green-700',
  error: 'border-crit text-crit',
  warning: 'border-warn text-warn',
  info: 'border-low text-low',
  neutral: 'border-ink text-ink',
};

const FILL: Record<IconCircleKind, string> = {
  success: 'bg-green-50',
  error: 'bg-crit-bg',
  warning: 'bg-warn-bg',
  info: 'bg-low-bg',
  neutral: 'bg-paper-deep',
};

export function IconCircle({ kind }: { kind: IconCircleKind }) {
  const Component = ICON[kind];
  return (
    <span
      className={cn(
        'inline-flex h-20 w-20 items-center justify-center rounded-full border-[2px]',
        RING[kind],
        FILL[kind],
      )}
    >
      <MedcordIcon as={Component} size="xl" />
    </span>
  );
}
