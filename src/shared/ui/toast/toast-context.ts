import { type ReactNode } from 'react';

import { DrawerService } from '@ui/drawer-service';

/**
 * Legacy `useToast` shim. Earlier in this codebase we mounted a tiny
 * `<ToastProvider>` and exposed `useToast()`; that has been replaced by the
 * `DrawerService` + `<ToastHost>` pair. To keep older preview screens
 * working unchanged, we expose the same hook signature here and translate
 * each call into a `DrawerService.toast(…)` invocation.
 *
 * New code should import `DrawerService` directly from `@ui/drawer-service`.
 */
export type ToastTone = 'neutral' | 'ok' | 'warn' | 'crit';

export interface ToastEntry {
  id: string;
  title: ReactNode;
  body?: ReactNode;
  tone: ToastTone;
}

export interface ToastApi {
  push: (toast: Omit<ToastEntry, 'id'> & Partial<Pick<ToastEntry, 'tone'>>) => void;
  dismiss: (id: string) => void;
}

const TONE_TO_TYPE = {
  neutral: 'info',
  ok: 'success',
  warn: 'warning',
  crit: 'error',
} as const;

function toMessage(node: ReactNode): string {
  if (typeof node === 'string' || typeof node === 'number') return String(node);
  if (node === null || node === undefined || node === false || node === true) return '';
  if (Array.isArray(node)) return node.map(toMessage).join(' ');
  return '';
}

export function useToast(): ToastApi {
  return {
    push(toast) {
      const titleText = toMessage(toast.title);
      const bodyText = toast.body !== undefined ? toMessage(toast.body) : '';
      const message = bodyText ? `${titleText} — ${bodyText}` : titleText;
      DrawerService.toast(message, { type: TONE_TO_TYPE[toast.tone ?? 'neutral'] });
    },
    dismiss() {
      // Legacy callers don't get an id back from `push`, so per-id dismiss
      // is a no-op. Use `DrawerService.dismissAllToasts()` to clear in bulk.
    },
  };
}
