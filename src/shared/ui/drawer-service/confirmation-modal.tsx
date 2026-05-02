import { type ReactNode } from 'react';

import { MedcordIcon, X } from '@icons';

import { cn } from '@shared/utils/cn';

import { Button } from '../button';
import { Hair } from '../hair';

import { IconCircle } from './parts/icon-circle';
import type { ConfirmationModalOptions } from './types';

interface ConfirmationModalProps {
  title: string;
  message: string;
  options: ConfirmationModalOptions;
  onDismiss: () => void;
  isFullscreen: boolean;
}

export function ConfirmationModal({
  title,
  message,
  options,
  onDismiss,
  isFullscreen,
}: ConfirmationModalProps) {
  const kind = options.kind ?? 'neutral';
  const showClose = options.showCloseButton ?? true;
  const showCancel = options.showCancelButton ?? true;
  const showIcon = options.showIcon ?? true;
  const destructive = options.destructive ?? false;
  const isLoading = options.isLoading ?? false;
  const confirmText = options.confirmButtonText ?? 'Confirm';
  const cancelText = options.cancelButtonText ?? 'Cancel';
  const icon: ReactNode | null = options.icon ?? (showIcon ? <IconCircle kind={kind} /> : null);

  function onConfirm() {
    options.onConfirm?.();
    if (!isLoading) onDismiss();
  }

  function onCancel() {
    options.onCancel?.();
    onDismiss();
  }

  const confirmButton = (
    <Button
      variant={destructive ? 'danger' : 'primary'}
      size={isFullscreen ? 'lg' : 'md'}
      loading={isLoading}
      onClick={onConfirm}
      className={cn(
        'w-full justify-center',
        destructive && '!border-crit !bg-crit !text-paper hover:!bg-[#921A12]',
      )}
    >
      {confirmText}
    </Button>
  );

  const cancelButton = showCancel ? (
    <Button
      variant="secondary"
      size={isFullscreen ? 'lg' : 'md'}
      onClick={onCancel}
      className="w-full justify-center"
    >
      {cancelText}
    </Button>
  ) : null;

  if (isFullscreen) {
    return (
      <div className="relative flex h-full w-full flex-col bg-paper">
        {showClose ? <CloseCorner onClick={onCancel} /> : null}
        <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
          {icon}
          <h2
            className={cn(
              'font-serif text-[28px] font-medium tracking-display text-ink',
              icon && 'mt-7',
            )}
          >
            {title}
          </h2>
          <p className="mt-3 max-w-[52ch] text-[14px] leading-[1.6] text-ink-2">{message}</p>
        </div>
        <div className="flex gap-3 px-8 pb-8">
          {showCancel ? <div className="flex-1">{cancelButton}</div> : null}
          <div className="flex-1">{confirmButton}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full overflow-hidden rounded-card border border-ink bg-sheet">
      {showClose ? (
        <div className="flex justify-end px-3 pt-3">
          <CloseCorner onClick={onCancel} inline />
        </div>
      ) : null}
      <div className="flex flex-col items-center px-7 pb-2 text-center">
        {icon}
        <h2
          className={cn('font-serif text-[22px] font-medium tracking-h text-ink', icon && 'mt-5')}
        >
          {title}
        </h2>
        <p className="mt-2 text-[14px] leading-[1.55] text-ink-2">{message}</p>
      </div>
      <Hair className="mt-6" />
      <div className="flex flex-col gap-2 px-5 py-4">
        {confirmButton}
        {cancelButton}
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
