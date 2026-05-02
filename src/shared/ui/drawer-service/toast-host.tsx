import { createPortal } from 'react-dom';

import { cn } from '@shared/utils/cn';

import { PaperToast } from './parts/paper-toast';
import { drawerStore } from './store';
import type { ToastEntry } from './types';
import { useDrawerToasts } from './use-drawer-store';

interface ToastHostProps {
  /** Render target. Defaults to `document.body`. */
  container?: HTMLElement | null;
}

/**
 * `ToastHost` — mounts once at the app root. Renders any active toasts in
 * portals split by position (top / bottom × normal / full-bleed) so multiple
 * stacks don't collide.
 *
 * Reference (port source): ohlify ToastHost.
 */
export function ToastHost({ container }: ToastHostProps = {}) {
  const toasts = useDrawerToasts();
  if (toasts.length === 0 || typeof document === 'undefined') return null;
  const target = container ?? document.body;

  const splitter = (pos: 'top' | 'bottom', full: boolean) =>
    toasts.filter((t) => t.options.position === pos && t.options.fullWidth === full);

  const topNormal = splitter('top', false);
  const topFull = splitter('top', true);
  const bottomNormal = splitter('bottom', false);
  const bottomFull = splitter('bottom', true);

  return createPortal(
    <>
      {topNormal.length > 0 ? (
        <ToastColumn
          toasts={topNormal}
          className="z-toast fixed left-4 right-4 top-4 flex flex-col gap-2"
          fromAbove
        />
      ) : null}
      {topFull.length > 0 ? (
        <ToastColumn
          toasts={topFull}
          className="z-toast fixed left-0 right-0 top-0 flex flex-col gap-2"
          fromAbove
          fullBleed
        />
      ) : null}
      {bottomNormal.length > 0 ? (
        <ToastColumn
          toasts={bottomNormal}
          className="z-toast fixed bottom-4 left-4 right-4 flex flex-col-reverse gap-2"
        />
      ) : null}
      {bottomFull.length > 0 ? (
        <ToastColumn
          toasts={bottomFull}
          className="z-toast fixed bottom-0 left-0 right-0 flex flex-col-reverse gap-2"
          fullBleed
        />
      ) : null}
    </>,
    target,
  );
}

interface ToastColumnProps {
  toasts: ReadonlyArray<ToastEntry>;
  className: string;
  fromAbove?: boolean;
  fullBleed?: boolean;
}

function ToastColumn({
  toasts,
  className,
  fromAbove = false,
  fullBleed = false,
}: ToastColumnProps) {
  return (
    <div className={className}>
      {toasts.map((t) => (
        <div
          key={t.id}
          className={cn('pointer-events-auto', fullBleed ? '' : 'mx-auto w-full max-w-2xl')}
          style={{
            animation: fromAbove
              ? 'ds-toast-down 220ms cubic-bezier(0.18,0.8,0.34,1)'
              : 'ds-toast-up 220ms cubic-bezier(0.18,0.8,0.34,1)',
          }}
        >
          <PaperToast
            type={t.options.type}
            message={t.message}
            fullWidth={t.options.fullWidth}
            showIcon={t.options.showIcon}
            icon={t.options.icon}
            dismissible={t.options.dismissible}
            onDismiss={() => drawerStore.dismissToast(t.id)}
          />
        </div>
      ))}
      <style>{`
        @keyframes ds-toast-down {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes ds-toast-up {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
