import { useEffect } from 'react';
import { createPortal } from 'react-dom';

import { cn } from '@shared/utils/cn';

import { ConfirmationModal } from './confirmation-modal';
import { CustomModal } from './custom-modal';
import { FeedbackModal } from './feedback-modal';
import { InputModal } from './input-modal';
import { drawerStore } from './store';
import type { ModalEntry, ModalPosition } from './types';
import { useDrawerModals } from './use-drawer-store';

interface ModalHostProps {
  /** Render target. Defaults to `document.body`. */
  container?: HTMLElement | null;
}

/**
 * `ModalHost` — mounts once at app root. Renders active modals as a portal
 * stacked over the page. The host owns the outer scrim + framing per
 * `ModalPosition`; each modal panel owns its own appearance.
 *
 * Reference (port source): ohlify ModalHost.
 */
export function ModalHost({ container }: ModalHostProps = {}) {
  const modals = useDrawerModals();
  if (modals.length === 0 || typeof document === 'undefined') return null;
  const target = container ?? document.body;

  return createPortal(
    <div className="medcord-modal-stack" aria-live="polite">
      {modals.map((entry) => (
        <ModalLayer key={entry.id} entry={entry} />
      ))}
      <style>{`
        @keyframes ds-modal-fade { from { opacity: 0 } to { opacity: 1 } }
        @keyframes ds-modal-pop {
          from { opacity: 0; transform: translateY(8px) scale(0.985); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes ds-modal-slide-down {
          from { opacity: 0; transform: translateY(-12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes ds-modal-slide-up {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes ds-modal-slide-up-full {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>,
    target,
  );
}

function positionOf(entry: ModalEntry): ModalPosition {
  return entry.options.position ?? 'center';
}
function dismissibleOf(entry: ModalEntry): boolean {
  return entry.options.dismissible ?? true;
}
function barrierColorOf(entry: ModalEntry): string {
  return entry.options.barrierColor ?? 'rgb(24 22 19 / 0.55)';
}

function ModalLayer({ entry }: { entry: ModalEntry }) {
  const position = positionOf(entry);
  const dismissible = dismissibleOf(entry);
  const isFullscreen = position === 'fullscreen';
  const onDismiss = () => drawerStore.dismissModal(entry.id);

  // Lock scroll while open.
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  // ESC closes top modal.
  useEffect(() => {
    if (!dismissible) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') drawerStore.dismissModal(entry.id);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [dismissible, entry.id]);

  const renderBody = () => {
    if (entry.kind === 'feedback') {
      return (
        <FeedbackModal
          title={entry.title}
          message={entry.message}
          options={entry.options}
          onDismiss={onDismiss}
          isFullscreen={isFullscreen}
        />
      );
    }
    if (entry.kind === 'confirmation') {
      return (
        <ConfirmationModal
          title={entry.title}
          message={entry.message}
          options={entry.options}
          onDismiss={onDismiss}
          isFullscreen={isFullscreen}
        />
      );
    }
    if (entry.kind === 'input') {
      return (
        <InputModal
          title={entry.title}
          message={entry.message}
          options={entry.options}
          onDismiss={onDismiss}
          isFullscreen={isFullscreen}
        />
      );
    }
    return (
      <CustomModal
        title={entry.title}
        options={entry.options}
        onDismiss={onDismiss}
        position={position}
      >
        {entry.render(onDismiss)}
      </CustomModal>
    );
  };

  // Outer scrim alignment.
  const scrimAlign = (() => {
    switch (position) {
      case 'top':
        return 'items-start justify-center pt-6';
      case 'bottom':
        // Mobile: flush to bottom. Desktop: stretch right side.
        return 'items-end justify-center lg:items-stretch lg:justify-end';
      case 'fullscreen':
        return 'items-stretch justify-stretch';
      case 'center':
      default:
        return 'items-center justify-center p-4';
    }
  })();

  // Inner frame size.
  const frameBox = (() => {
    switch (position) {
      case 'top':
        return 'w-full max-w-md mx-4';
      case 'bottom':
        return 'w-full lg:h-full lg:max-w-md';
      case 'fullscreen':
        return 'h-full w-full';
      case 'center':
      default:
        return 'w-full max-w-md';
    }
  })();

  return (
    <div
      role="dialog"
      aria-modal="true"
      style={{
        backgroundColor: barrierColorOf(entry),
        animation: 'ds-modal-fade 180ms ease-out',
      }}
      onClick={(e) => {
        if (!dismissible) return;
        if (e.target === e.currentTarget) onDismiss();
      }}
      className={cn('z-modal fixed inset-0 flex', scrimAlign)}
    >
      <div
        className={cn('pointer-events-auto relative', frameBox)}
        style={{ animation: animationFor(position) }}
        onClick={(e) => e.stopPropagation()}
      >
        {renderBody()}
      </div>
    </div>
  );
}

function animationFor(position: ModalPosition): string {
  switch (position) {
    case 'top':
      return 'ds-modal-slide-down 220ms cubic-bezier(0.22,1,0.36,1)';
    case 'bottom':
      return 'ds-modal-slide-up 220ms cubic-bezier(0.22,1,0.36,1)';
    case 'fullscreen':
      return 'ds-modal-slide-up-full 240ms cubic-bezier(0.22,1,0.36,1)';
    case 'center':
    default:
      return 'ds-modal-pop 220ms cubic-bezier(0.22,1,0.36,1)';
  }
}
