import { MedcordIcon, X } from '@icons';

import { Button } from '../button';
import { Hair } from '../hair';

import { IconCircle } from './parts/icon-circle';
import type { FeedbackModalOptions } from './types';

interface FeedbackModalProps {
  title: string;
  message: string;
  options: FeedbackModalOptions;
  onDismiss: () => void;
  isFullscreen: boolean;
}

/**
 * Feedback panel. Centered icon circle, serif title, body, primary action.
 * Reference (port source): ohlify FeedbackModal.
 */
export function FeedbackModal({
  title,
  message,
  options,
  onDismiss,
  isFullscreen,
}: FeedbackModalProps) {
  const kind = options.kind ?? 'success';
  const showClose = options.showCloseButton ?? true;
  const confirmText = options.confirmButtonText ?? 'Done';
  const icon = options.icon ?? <IconCircle kind={kind} />;

  function handleConfirm() {
    options.onConfirm?.();
    onDismiss();
  }

  function handleAction() {
    options.onAction?.();
    onDismiss();
  }

  if (isFullscreen) {
    return (
      <div className="relative flex h-full w-full flex-col bg-paper">
        {showClose ? <CloseCorner onClick={onDismiss} /> : null}
        <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
          {icon}
          <h2 className="mt-7 font-serif text-[28px] font-medium tracking-display text-ink">
            {title}
          </h2>
          <p className="mt-3 max-w-[52ch] text-[14px] leading-[1.6] text-ink-2">{message}</p>
        </div>
        <div className="flex flex-col gap-2.5 px-8 pb-8">
          <Button
            variant="primary"
            size="lg"
            onClick={handleConfirm}
            className="w-full justify-center"
          >
            {confirmText}
          </Button>
          {options.actionLabel ? (
            <Button
              variant="quiet"
              size="lg"
              onClick={handleAction}
              className="w-full justify-center"
            >
              {options.actionLabel}
            </Button>
          ) : null}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full overflow-hidden rounded-card border border-ink bg-sheet">
      {showClose ? (
        <div className="flex justify-end px-3 pt-3">
          <CloseCorner onClick={onDismiss} inline />
        </div>
      ) : null}
      <div className="flex flex-col items-center px-7 pb-2 text-center">
        {icon}
        <h2 className="mt-5 font-serif text-[22px] font-medium tracking-h text-ink">{title}</h2>
        <p className="mt-2 text-[14px] leading-[1.55] text-ink-2">{message}</p>
      </div>
      <Hair className="mt-6" />
      <div className="flex flex-col gap-2 px-5 py-4">
        <Button variant="primary" onClick={handleConfirm} className="w-full justify-center">
          {confirmText}
        </Button>
        {options.actionLabel ? (
          <Button variant="quiet" onClick={handleAction} className="w-full justify-center">
            {options.actionLabel}
          </Button>
        ) : null}
      </div>
    </div>
  );
}

function CloseCorner({ onClick, inline = false }: { onClick: () => void; inline?: boolean }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Close"
      className={
        inline
          ? 'inline-flex h-8 w-8 items-center justify-center rounded-paper text-ink-3 transition-colors hover:bg-paper-deep hover:text-ink'
          : 'absolute right-5 top-5 inline-flex h-9 w-9 items-center justify-center rounded-paper text-ink-3 transition-colors hover:bg-paper-deep hover:text-ink'
      }
    >
      <MedcordIcon as={X} size="md" />
    </button>
  );
}
