import { type ReactNode } from 'react';

import { MedcordIcon, X } from '@icons';

import { cn } from '@shared/utils/cn';

import type { CustomModalOptions, ModalPosition } from './types';

interface CustomModalProps {
  title: string;
  options: CustomModalOptions;
  onDismiss: () => void;
  /** Resolved by `ModalHost` so the panel knows how to round itself. */
  position: ModalPosition;
  children: ReactNode;
}

/**
 * Custom modal — title bar + close + hairline divider + body.
 * Radius adapts to the position so a bottom sheet rounds top corners only,
 * a desktop right-drawer is square-edged on the inside, etc.
 */
export function CustomModal({ title, options, onDismiss, position, children }: CustomModalProps) {
  const showClose = options.showCloseButton ?? true;

  const shape = (() => {
    switch (position) {
      case 'fullscreen':
        return 'rounded-none';
      case 'bottom':
        // Mobile sheet: round top corners. Desktop drawer: round left corners.
        return 'rounded-t-modal lg:rounded-t-none lg:rounded-l-modal';
      case 'top':
        return 'rounded-b-modal';
      case 'center':
      default:
        return 'rounded-card';
    }
  })();

  const sizing = position === 'fullscreen' ? 'h-full' : position === 'bottom' ? 'lg:h-full' : '';

  return (
    <div
      className={cn(
        'flex w-full flex-col overflow-hidden border border-ink bg-sheet',
        shape,
        sizing,
      )}
    >
      <div className="flex items-center px-5 py-3.5">
        <h3 className="m-0 flex-1 truncate font-serif text-[18px] font-medium tracking-h text-ink">
          {title}
        </h3>
        {showClose ? (
          <button
            type="button"
            onClick={onDismiss}
            aria-label="Close"
            className="inline-flex h-8 w-8 items-center justify-center rounded-paper text-ink-3 transition-colors hover:bg-paper-deep hover:text-ink"
          >
            <MedcordIcon as={X} size="md" />
          </button>
        ) : null}
      </div>
      <div className="h-px w-full bg-hair" />
      <div className="flex-1 overflow-y-auto p-5">{children}</div>
    </div>
  );
}
